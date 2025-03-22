import "./App.css";

import axios from "axios";
import { useEffect, useState } from "react";
import * as xml from "xml2js";

const domParser: DOMParser = new DOMParser();

export const App = () => {
  const [xmlHead, setXmlHead] = useState<any>();
  const [xmlBody, setXmlBody] = useState<any>();
  const [xmlUrl, setXmlUrl] = useState<any>();
  // if (isLoading) return <>LOADING</>;
  const callApi = () => {
    axios.get("irs-data/efilexml?ein=834592277").then((res) => {
      setXmlUrl(res.data.body.results[0].URL.split("EfileData/")[1]);
      return res;
    });
  };

  useEffect(() => {
    if (xmlUrl) {
      axios.get(xmlUrl).then((res) => {
        xml.parseStringPromise(res.data).then((result) => {
          setXmlHead(result.Return.ReturnHeader[0]);
          setXmlBody(result.Return.ReturnData[0]);
        });
        return res;
      });
    }
  }, [xmlUrl]);
  return <button onClick={() => callApi()}>CLICK ME TO TEST</button>;
};
