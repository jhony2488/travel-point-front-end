/* eslint-disable no-unused-vars */
import React from "react";
import {
  Typography,
  Container,
  Box,
} from "@material-ui/core";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaTravelTips } from "../../schemasValidations/travelTips";
import { Input, Button } from "../../Components";
import { setTraveTip} from "../../services/traveTips";
import { useStyles } from "./style";

export default function CreateItineraries() {
  const classes = useStyles();

  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    resolver: yupResolver(schemaTravelTips),
  });


  const handleSubmitSetTravelTips = async ({
    title,
    description,
  }) => {
    const token = await JSON.parse(localStorage.getItem("token-login") || "");

    setTraveTip({
      title,
      description,
      userId: token.user[0]._id,
    })
      .then((response) => {
        alert("Registration completed successfully");
        window.location.href = "/travel-tips";
        reset();
      })
      .catch((err) => {
        alert(err.data.message | err.message);
      });
  };

  return (
    <>
      <Container className={classes.main}>
        <Typography className={classes.title}>Create Travel Tip</Typography>
        <Box className={classes.box}>
          <form onSubmit={handleSubmit(handleSubmitSetTravelTips)}>
            <Box className={classes.boxWrapper}>
              <label htmlFor="input-title">Title</label>
              <Input
                id="input-title"
                control={control}
                nameInput={"title"}
                placeholder="To Tip"
              />
              <p className={classes.errorMessage}>{errors.title?.message}</p>
      
              <label htmlFor="input-description">Description</label>
              <Input
                id="input-description"
                control={control}
                nameInput={"description"}
                type={"text"}
              />
             
              <p className={classes.errorMessage}>{errors.description?.message}</p>
              <div className={classes.containerButtons}>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.buttonSubmit}
                  type="submit"
                >
                  Create
                </Button>
              </div>
            </Box>
          </form>
        </Box>
      </Container>
    </>
  );
}
