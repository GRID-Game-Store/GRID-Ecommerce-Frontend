"use client";
import React, { useState } from "react";
import { Box, Tab, Tabs, Typography } from "@mui/material";

import { ISysReqItemsProps, ISysReqProps, TabPanelProps } from "../types/game";
import { checkSysReqItem, getSysReq } from "../utils/sysReq";

const CustomTabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 1 }}>{children}</Box>}
    </div>
  );
};

const a11yProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};

const SysReqItems: React.FC<ISysReqItemsProps> = ({
  activeTab,
  sysReq,
  type,
}) => {
  const sysReqTitle = [
    "OS",
    "Processor",
    "Memory",
    "Graphics",
    "DirectX",
    "Network",
    "Storage",
    "Sound Card",
    "Additional Notes",
    "Attention",
  ];
  let expString = checkSysReqItem(sysReqTitle, sysReq);
  const SysReqItems = expString.split(" |").filter((item) => item);
  const index = type === "MINIMUM" ? 0 : 1;
  return (
    <>
      {sysReq.split(/MINIMUM|RECOMMENDED:/)[index + 1] && (
        <CustomTabPanel value={activeTab} index={index}>
          {SysReqItems.map((item, itemIndex) => {
            return (
              <Typography
                width={600}
                key={`${index}_${item}`}
                fontSize={"19px"}
              >
                {item} {getSysReq(sysReq, index + 1, expString)[itemIndex + 1]}
              </Typography>
            );
          })}
        </CustomTabPanel>
      )}
    </>
  );
};

const SysReq: React.FC<ISysReqProps> = ({ sysReq }) => {
  const [activeTab, setActiveTab] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };
  const MinimumORRecommended: "" | string[] =
    sysReq && sysReq.split(/MINIMUM|RECOMMENDED:/);

  return (
    <Box mt={"70px"} position={"relative"}>
      <Tabs value={activeTab} onChange={handleChange} aria-label="tabs">
        {MinimumORRecommended[1] &&
          MinimumORRecommended[1].includes("OS: ") && (
            <Tab
              disableRipple
              sx={{ fontSize: "20px" }}
              label={"MINIMUM"}
              {...a11yProps(0)}
            />
          )}
        {MinimumORRecommended[2] &&
          MinimumORRecommended[2].includes("OS: ") && (
            <Tab
              disableRipple
              sx={{ fontSize: "20px" }}
              label={"RECOMMENDED"}
              {...a11yProps(1)}
            />
          )}
      </Tabs>
      <SysReqItems activeTab={activeTab} sysReq={sysReq} type={"MINIMUM"} />
      <SysReqItems activeTab={activeTab} sysReq={sysReq} type={"RECOMMENDED"} />
    </Box>
  );
};

export { SysReq };
