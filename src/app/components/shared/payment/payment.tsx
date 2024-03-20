"use client";
import "./payment.css";
import { usePathname, useSearchParams } from "next/navigation";
import { useCapturePayment } from "./api/query";
import { StatusIcon } from "./components/icons";
import { HeadingsPayment } from "./components/headingsPayment";
import { Gears } from "./components/gears";
import { getSessionId } from "./utils/getSesionId";

const Payment = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const paymentMethod = pathname.split("/").at(1) || "";
  let sessionId = getSessionId(searchParams);
  const { data, statusPayment } = useCapturePayment(
    sessionId as string,
    paymentMethod,
  );

  return (
    <div>
      <div id="processing" className={`${statusPayment} center`}>
        <HeadingsPayment data={data} />
        <div className="wrapper">
          <Gears />
          {data && <StatusIcon status={statusPayment} data={data} />}
        </div>
      </div>
    </div>
  );
};
export { Payment };
