import "~/styles/globals.css";
import type { AppProps } from "next/app";
import { Navbar } from "~/common";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function App({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<any>(undefined);
  const route = useRouter();

  useEffect(() => {
    if (!user) {
      route.push("/login");
    }
  }, [route, user]);
  return (
    <>
      <Navbar user={user} setUser={setUser} />
      <Component user={user} setUser={setUser} {...pageProps} />
    </>
  );
}
