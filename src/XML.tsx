import { useState } from "react";
import "./App.css";

const queryClient = new QueryClient();
const domParser: DOMParser = new DOMParser();

export const XML = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["xml"],
    queryFn: () => fetch("src/mindTrust2022.xml").then((res) => res.text()),
  });
  // const [xml, setXML] = useState<Document>();
  const fetchXML = async () => {
    await fetch("src/mindTrust2022.xml")
      .then(async (res) => {
        const xmlString: string = (await res.text()).toString();
        // setXML(domParser.parseFromString(xmlString, "text/xml"));
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return <button onClick={() => console.log(data)}>CLICK ME TO TEST</button>;
};
