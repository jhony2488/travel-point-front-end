import React from "react";
import { Header, Footer } from "../../Components";

export default function Dash(props) {
  const { children } = props;
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
