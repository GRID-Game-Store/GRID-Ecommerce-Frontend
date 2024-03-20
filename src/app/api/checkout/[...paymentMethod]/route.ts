import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { getAccessToken } from "@/app/utils/sessionTokenAccessor";
import { authOptions } from "../../auth/[...nextauth]/route";
import { NextApiRequest } from "next";

export async function POST(req: NextApiRequest) {
  const paymentMethod = req.url?.split("?")[0].split("/").at(-1);
  const session = await getServerSession(authOptions);
  const searchParams = new URLSearchParams(req.url?.split("?")[1]);
  const balanceAction = searchParams.get("balanceAction") || "NO_ACTION";
  const action =
    paymentMethod === "balance" ? "" : `?balanceAction=${balanceAction}`;

  if (session) {
    const url = `${process.env.URL}checkout/${paymentMethod}/create-payment${action}`;

    let accessToken = await getAccessToken();

    const resp = await fetch(url, {
      headers: {
        Authorization: "Bearer " + accessToken,
        Origin: "http://localhost:3000/",
      },
      method: "POST",
    });

    if (resp.ok) {
      const data = await resp.json();
      return NextResponse.json({ data }, { status: resp.status });
    }

    return NextResponse.json(
      { error: await resp.text() },
      { status: resp.status },
    );
  }
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}
