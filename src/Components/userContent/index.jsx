import React, { useState, useEffect } from "react";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
} from "@material-ui/core";
import { searchStyles } from "./style";
import { Edit, CheckCircle, Close, DeleteOutline } from "@material-ui/icons";

export default function ItineraryContent({
  user,
  openModalEdit,
}) {
  const {
    container,
    card,
    textContent,
    textNotContent,
    cardContent,
  } = searchStyles();

  const [result, setResult] = useState(user);

  const [tokenUser, setTokenUser] = useState();

  useEffect(() => {
    setResult({});
    setResult(user);
  }, [user]);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token-login") || "");

    setTokenUser(token);
  }, []);

  return (
    <div className={container}>
      {result.length > 0 ? (
        <Card className={card}>
          <CardContent className={cardContent}>
            <img src={result.phone} alt={result.name} />
            <Typography variant="h4" className={textContent}>
              {result.name}
            </Typography>
            <Typography variant="h4" className={textContent}>
              {result.email}
            </Typography>
          </CardContent>
          {tokenUser._id === result.userId ? (
            <CardActions>
              <Button
                variant="contained"
                color="primary"
                onClick={() => openModalEdit(result)}
              >
                <Edit />
              </Button>
            </CardActions>
          ) : (
            <></>
          )}
        </Card>
      ) : (
        <Typography variant="h4" className={textNotContent}>
          Not Found
        </Typography>
      )}
    </div>
  );
}
