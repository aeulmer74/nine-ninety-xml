import { useState } from "react";
import "./App.css";

import { useQuery } from "@tanstack/react-query";

const domParser: DOMParser = new DOMParser();

export const App = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["xml"],
    queryFn: () => fetch("src/mindTrust2022.xml").then((res) => res.text()),
  });

  if (isLoading) return <>LOADING</>;
  return <button onClick={() => console.log(data)}>CLICK ME TO TEST</button>;
};
