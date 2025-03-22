import "./App.css";

import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import * as xml from "xml2js";

const domParser: DOMParser = new DOMParser();

interface ScheduleIType {
  $?: Object;
  GrantRecordsMaintainedInd?: Array<string>;
  RecipientTable?: Array<any>;
  SupplementalInformationDetail?: Array<any>;
  Total501c3OrgCnt?: Array<string>;
  TotalOtherOrgCnt?: Array<string>;
}

const scheduleIReader = (schedule_I: ScheduleIType) => {
  console.log(schedule_I);
  schedule_I.RecipientTable?.map((grantee) => {
    console.log(grantee);
  });
};

export const App = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["xml"],
    queryFn: () => fetch("src/gpsi2021.xml").then((res) => res.text()),
  });
  const [xmlHead, setXmlHead] = useState<any>();
  const [xmlBody, setXmlBody] = useState<any>();

  useEffect(() => {
    if (data) {
      xml.parseStringPromise(data).then((result) => {
        setXmlHead(result.Return.ReturnHeader[0]);
        setXmlBody(result.Return.ReturnData[0]);
      });
    }
  }, [data]);

  if (isLoading) return <>LOADING</>;
  return (
    <button
      onClick={() => {
        // console.log(xmlHead);
        // console.log(xmlBody);
        scheduleIReader(xmlBody.IRS990ScheduleI[0]);
      }}
    >
      CLICK ME TO TEST
    </button>
  );
};
