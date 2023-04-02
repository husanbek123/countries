"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { api } from "../../utils/axios";



const Country = () => {
  let path = usePathname();
  let [data, setData] = useState<any>();
  let res = api.get(`name${path}`).then((data) => setData(data.data[0]));

  return <div>{data?.name?.common}</div>;
};
export default Country;
