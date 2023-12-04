"use client"
import { Box, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";


interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 1 }}>
            {children}
          </Box>
        )}
      </div>
    );
  }
  
function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

interface ISysReqProps {
  sysReq: string
}

const getSysReq = (string: string, type : number)  => {
  return string.split(/\MINIMUM|\RECOMMENDED:/)[type]
  .split(
    / OS: | Processor: | Graphics: | DirectX: | Storage: | Additional Notes: /,
  )
}

interface ISysReqItemsProps {
  activeTab : number,
  sysReq : string ,
  type : string
}


const SysReqItems: React.FC<ISysReqItemsProps> = ({activeTab, sysReq, type}) => {
  const index =  type == "MINIMUM" ? 0 : 1
  return <CustomTabPanel value={activeTab} index={index}>
          <Typography fontSize={"19px"}>OS : {getSysReq(sysReq,index+1)[1]}</Typography>
          <Typography fontSize={"19px"}>Processor : {getSysReq(sysReq,index+1)[2]}</Typography>
          <Typography fontSize={"19px"} >Memory : {getSysReq(sysReq,index+1)[3]}</Typography>
          <Typography fontSize={"19px"}>Graphics : {getSysReq(sysReq,index+1)[4]}</Typography>
          <Typography fontSize={"19px"}>DirectX : {getSysReq(sysReq,index+1)[5]}</Typography>
          <Typography fontSize={"19px"}>Storage: {getSysReq(sysReq,index+1)[6]}</Typography>
        </CustomTabPanel>
} 


 const SysReq: React.FC<ISysReqProps> = ({sysReq}) => {
    const [activeTab, setActiveTab] = useState(0);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setActiveTab(newValue);
    }

    return <Box mt={"70px"} >
            <Tabs value={activeTab} onChange={handleChange} aria-label="tabs">
                <Tab disableRipple sx={{ fontSize: "20px" }} label={"MINIMUM"} {...a11yProps(0)} />
                <Tab disableRipple sx={{ fontSize: "20px" }} label={"RECOMMENDED"} {...a11yProps(1)} />
            </Tabs>
            
            <SysReqItems activeTab={activeTab} sysReq={sysReq} type={"MINIMUM"}/>  
            <SysReqItems activeTab={activeTab} sysReq={sysReq} type={"RECOMMENDED"}/>  
          </Box>
}

export {SysReq}