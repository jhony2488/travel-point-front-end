/* eslint-disable no-unused-vars */
import React from "react";
import { Container } from "@material-ui/core";

import { useStyles } from "./style";

export default function Footer() {
  const classes = useStyles();

  return (
    <>
      <div className={classes.containerFooter}>
        <p className={classes.contentFooter}>Copyright @ Travel 2023</p>
      </div>
    </>
  );
}
