"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { api } from "../../utils/axios";

// async function getData() {
//   let path = usePathname();
//   console.log(path);

//   let res = await api.get(`/name${path}`);
//   let data = await res.data;
//   return data;
// }

const Country = () => {
  let path = usePathname();
  let [data, setData] = useState<any>();
  let res = api.get(`name${path}`).then((data) => setData(data.data[0]));

  return <div>{data?.name?.common}</div>;
};
export default Country;

// export async function getServerSideProps() {
//   let path = usePathname();

//   let res = await api.get(`/${path.split("/")}`);
//   let data = await res.data;

//   return {
//     props: {
//       data: data,
//     },
//   };
// }
