"use client";
import { useSearchParams } from "next/navigation";
import { getSessionId } from "./utils/getSesionId";
import { useCancelPayment } from "./api/query";
import { StatusIcon } from "./components/icons";
import "./payment.css";

import { Gears } from "./components/gears";
import { HeadingsPayment } from "./components/headingsPayment";

const PaymentCancel = () => {
  const searchParams = useSearchParams();
  let sessionId = getSessionId(searchParams);
  const { data, statusPayment } = useCancelPayment(sessionId);

  return (
    <div id="processing" className={`${statusPayment} center`}>
      <HeadingsPayment data={data} flag="revert" />
      <div className="wrapper">
        <Gears />
        {data && (
          <StatusIcon status={statusPayment} data={data} isRevert={true} />
        )}
      </div>
    </div>
  );
};

export { PaymentCancel };
