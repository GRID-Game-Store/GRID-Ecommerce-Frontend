import { HeadingsPayment } from "./headingsPayment";

const ErrorIcon = () => {
  return (
    <>
      <circle className="checkmark-circle" cx="25" cy="25" r="20" fill="none" />
      <path
        className="checkmark-check"
        fill="none"
        d="M15 15 L35 35 M35 15 L15 35"
      />
    </>
  );
};
export const SuccessIcon = () => {
  return (
    <>
      <circle className="checkmark-circle" cx="25" cy="25" r="25" fill="none" />
      <path
        className="checkmark-check"
        fill="none"
        d="M14.1 27.2l7.1 7.2 16.7-16.8"
      />
    </>
  );
};

export const RevertIcon = () => {
  return (
    <>
      <circle
        className="checkmark-circle"
        cx="25"
        cy="25"
        r="25"
        fill="none"
        stroke="none"
      />
      <path className="checkmark-check" d="M30 10 L11 25 L30 39" fill="none" />
    </>
  );
};

const getStatusColor = (
  dataStatus: number,
  statusAnimation: string,
  isRevert: boolean,
) => {
  const isCompletePayment = statusAnimation === "complete" && !isRevert;
  const isCompletePaymentRevert = statusAnimation === "complete" && isRevert;
  if (dataStatus === 200) {
    if (isCompletePayment) {
      return "success";
    } else if (isCompletePaymentRevert) {
      return "revert";
    } else {
      return "error";
    }
  } else {
    return "error";
  }
};

const StatusIcon = ({
  status,
  data,
  isRevert = false,
}: {
  status: string;
  data: any;
  isRevert?: boolean;
}) => {
  const isSuccess =
    status === "complete" && data.status === 200 && !isRevert ? true : false;
  const statusColor = getStatusColor(data.status, status, isRevert);

  return (
    <svg
      className={`checkmark checkmark-${statusColor}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 50 50"
    >
      <HeadingsPayment data={data} />
      {isRevert && <RevertIcon />}
      {isSuccess && <SuccessIcon />}
      {!isSuccess && !isRevert && <ErrorIcon />}
    </svg>
  );
};

export { StatusIcon };
