/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Typography, Container } from "@material-ui/core";
import { userContent } from "../../Components";
import { getUsers, deleteUser } from "../../services/users";
import { useStyles } from "./style";

export default function ViewUnicItinerary({ match }) {
  const classes = useStyles();

  const [user, setUser] = useState([]);

  const getUser = async () => {
    const id = await  match?.params?.id;

    await getUsers({id})
      .then((response) => {
        setUser(response.data.result);
      })
      .catch((err) => {
        alert(err.data.message | err.message);
      });
  };

  const deleteCount = async (id) => {
    await deleteUser(id)
      .then((response) => {
        alert(response.data.message);
      })
      .catch((err) => {
        alert(err.data.message | err.message);
      });
  };

  useEffect(() => {
    const token = localStorage.getItem("token-login") || "";

    /*if (token === "") {
      window.location.href = "/";
    }*/

    getUser();
  }, []);

  return (
    <>
      <Container className={classes.main}>
        <Typography className={classes.title}>Hello {user.name}</Typography>
        <userContent
          userContent={user}
          openModalEdit={() => null}
        />
      </Container>
    </>
  );
}
