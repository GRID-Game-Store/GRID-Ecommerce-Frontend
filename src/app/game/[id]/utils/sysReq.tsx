export const getSysReq = (string: string, type: number, expString: string) => {
  const re = new RegExp(expString.slice(0, -1), "");
  return string[type] && string.split(/MINIMUM|RECOMMENDED:/)[type].split(re);
};

export const checkSysReqItem = (sysReqTitle: string[], sysReq: string) => {
  let expString = "";
  sysReqTitle.map((title) => {
    if (sysReq.includes(title)) {
      expString += ` ${title}: |`;
    }
  });
  return expString;
};
