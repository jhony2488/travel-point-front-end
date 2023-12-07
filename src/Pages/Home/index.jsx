/* eslint-disable no-unused-vars */
import React from "react";
import { Button } from "../../Components";
import { useStyles } from "./style";

export default function Home() {
  const classes = useStyles();

  return (
    <>

        <div className={classes.backgroundMain}>
         <div className={classes.backgroundMainWrapper}>
         <Button
            onClick={() => {
              window.location.href = "/login";
            }}
            color="primary"
            variant="text"
            className={classes.backgroundMainButton}
          >
            Explore
          </Button>
         </div>
        </div>
    </>
  );
}
