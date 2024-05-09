import { useEffect, useState } from 'react'
import Head from "next/head";
import Image from "next/image";

export default function Profile() {
  const [profile, setProfile] = useState({})

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
        const profile = await liff.getProfile()
        setProfile(profile)
      } else {
        console.log("Out LIFF");
      }
    }

    Init();
  });

  return (
    <section>
      <Head>
        <title>My Profile</title>
      </Head>
      <h1>Profile</h1>
      <div>
        {profile.pictureUrl && <Image
          src={profile.pictureUrl}
          alt={profile.displayName}
          width={500}
          height={500}
        />}
        <div>Name: {profile.displayName}</div>
      </div>
    </section>
  )
}