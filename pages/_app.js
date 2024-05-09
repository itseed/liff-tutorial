"use client"
import { useEffect } from "react";
import "@/styles/globals.css";
// import liff from "@line/liff";


export default function App({ Component, pageProps }) {
  useEffect(() => {
    async function Init() {
      const liff = (await import("@line/liff")).default;
      try {
        await liff.init({ liffId: process.env.NEXT_PUBLIC_LIFF_ID || "" });
      } catch (error) {
        console.error("liff init error", error?.message);
      }
      if (liff.isLoggedIn()) {
        console.log("In LIFF");
      } else {
        console.log("Out LIFF");
      }
    }

    Init();
  });
  // useEffect(async () => {

  // try {
  //   await liff.init({ liffId });
  // } catch (error) {
  //   console.error('liff init error', error.message)
  // }
  // if (!liff.isLoggedIn()) {
  //   liff.login();
  // }
  // })

  return <Component {...pageProps} />;
}
