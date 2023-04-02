"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { api } from "../utils/axios";
import { font } from "@/components/font";
import { useLocalStore } from "@/utils/store/store";
import { useEffect, useState } from "react";
import { Card, Grid, Row, Text, Input, Button } from "@nextui-org/react";
import { Loader } from "@/components/loader";
import { useRouter } from "next/navigation";
export default function Home() {
  const router = useRouter();
  const [datas, setDatas] = useState([]);
  const theme = useLocalStore((state) => state.theme);
  console.log(theme);
  useEffect(() => {
    api.get("/all").then((res) => setDatas(res?.data));
  }, []);
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.settings}>
          <div className={styles.search}>
            {datas.length && (
              <Grid
                css={{
                  display: "flex",
                  gap: "20px",
                }}
              >
                <Input bordered labelPlaceholder="Default" style={font.style} color="primary" />
                <Button shadow color="primary" auto>
                  Primary
                </Button>
              </Grid>
            )}
          </div>
        </div>
        <div className={styles.wrapper}>
          {datas.length ? (
            <Grid.Container gap={2} justify="flex-start">
              {datas?.map((item : any, index) => (
                <Grid
                  xs={6}
                  sm={3}
                  key={index}
                  onClick={() => router.push(`/${item?.name?.official}`)}
                >
                  <Card isPressable>
                    <Card.Body css={{ p: 0 }}>
                      <Card.Image
                        src={item?.flags?.png}
                        objectFit="cover"
                        width="100%"
                        height={140}
                      />
                    </Card.Body>
                    <Card.Footer css={{ justifyItems: "flex-start" }}>
                      <Row wrap="wrap" justify="space-between" align="center">
                        <Text b className={font.className}>
                          {item?.name.official}
                        </Text>
                        <Text
                          css={{
                            color: "$accents7",
                            fontWeight: "$semibold",
                            fontSize: "$sm",
                          }}
                          className={font.className}
                        >
                          {item?.region}
                        </Text>
                      </Row>
                    </Card.Footer>
                  </Card>
                </Grid>
              ))}
            </Grid.Container>
          ) : (
            <h1
              style={{
                fontSize: "50px",
              }}
            >
              <Loader></Loader>
            </h1>
          )}
        </div>
      </div>
    </main>
  );
}
