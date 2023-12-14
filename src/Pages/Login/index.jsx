/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Typography, Container, Box } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaLogin } from "../../schemasValidations/login";
import { Input, Button } from "../../Components";
import { login } from "../../services/users";
import { useStyles } from "./style";

export default function Login() {
  const classes = useStyles();

  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    resolver: yupResolver(schemaLogin),
  });

  const handleSubmitLogin = async ({ email, password }) => {
    login(email, password)
      .then((response) => {
        if (response.data.message !== "Email or password incorrect" &&  response.data.result.message !== "Email or password incorrect") {
          localStorage.setItem("token-login", JSON.stringify(response.data.result));
          window.location.href = "/itineraries";
        } else {
          alert("Email or password incorrect");
        }
      })
      .catch((err) => {
        alert(err.data.message | err.message);
      });
  };

  useEffect(() => {
    const token = localStorage.getItem("token-login") || "";

    if (token !== "") {
      window.location.href = "/itineraries";
    }
  }, []);

  return (
    <>
      <Container className={classes.main}>
        <Typography className={classes.title}>Login</Typography>
        <Box className={classes.box}>
          <form onSubmit={handleSubmit(handleSubmitLogin)}>
            <Box className={classes.boxWrapper}>
              <label htmlFor="input-email">Email</label>
              <Input
                id="input-email"
                control={control}
                nameInput={"email"}
                placeholder="renan@email.com"
              />
              <p className={classes.errorMessage}>{errors.email?.message}</p>
              <label htmlFor="input-password">Password</label>
              <Input
                id="input-password"
                placeholder="***********"
                type="password"
                hintText="Password"
                control={control}
                nameInput={"password"}
              />
              <p className={classes.errorMessage}>
                {errors.passwordInput?.message}
              </p>
              <div className={classes.containerButtons}>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.buttonSubmit}
                  type="submit"
                >
                  Fazer Login
                </Button>
              </div>
            </Box>
          </form>
        </Box>
      </Container>
    </>
  );
}
