import BackToTop from "@/components/common/BackToTop";

import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (<>
  
  <Component {...pageProps} />
    <BackToTop/>
  </>);

}
