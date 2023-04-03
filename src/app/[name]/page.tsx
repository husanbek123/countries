"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { api } from "../../utils/axios";
import styles from "./page.module.scss";
import { Button, Table } from "@nextui-org/react";
import Image from "next/image";
import { font } from "@/components/font";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Country = () => {
  let path = usePathname();
  let [data, setData] = useState<any>();
  let [currencies, setCurrencies] = useState<any>([]);
  let [languages, setLanguages] = useState<any>([]);
  let [borders, setBorders] = useState<any>([]);
  let [countries, setCountries] = useState<any>([]);

  let [hasBorder, setHasBorder] = useState<any>(true);

  let router = useRouter();

  useEffect(() => {
    api.get(`name${path}`).then((data) => {
      let myCurrencies = Object.entries(data?.data[0]?.currencies);
      let Lang = Object.entries(data?.data[0]?.languages)[0].filter(
        (i: any) => i.length > 3
      );

      setCurrencies(myCurrencies);
      setLanguages(Lang);

      if (data.data[0].borders) {
        setBorders(data.data[0].borders);
      } else {
        setHasBorder(false);
      }
      return setData(data.data[0]);
    });

    api.get("/all").then((data) => {
      setCountries(
        borders?.map((border: any) => {
          return data.data.find((i: any) => i.cioc == border);
        })
      );
    });
  }, []);
  useEffect(() => {
    console.log(countries);
  }, [countries]);

  return (
    <div className={styles.page}>
      <Button color="success" size="xs" onClick={() => router.back()}>
        Back
      </Button>
      <br />
      <br />
      <div className={styles.country}>
        <div className={styles.country_img}>
          <Image
            width={200}
            height={200}
            className={styles.img}
            src={data?.flags?.svg}
            alt=""
          />
        </div>
        <div className={[styles.country_text, font.className].join(" ")}>
          <div className={styles.main_info}>
            <h1>{data?.name?.common}</h1>
            <br />
            <div>
              <ul>
                <li>Population: {data?.population}</li>
                <li>Capital: {data?.capital.join(", ")}</li>
                <li>Currency: {currencies?.map((i: any) => i[1].name)}</li>
                <li>Locations: {data?.continents.join(",")}</li>
                <li>Languages: {languages.join(",")} </li>
              </ul>
            </div>
          </div>
          <div className={styles.borderCountries}>
            <h5>Border Countries :</h5>
            <div className={styles.borderCountries}>
              {hasBorder ? (
                countries?.length == 0 ? (
                  <h4>Loading...</h4>
                ) : (
                  countries?.map((country: any) => (
                    <Link href={`/${country.name.common}`}>
                      <p>{country.name.common}</p>
                    </Link>
                  ))
                )
              ) : (
                <h4>None</h4>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Country;
