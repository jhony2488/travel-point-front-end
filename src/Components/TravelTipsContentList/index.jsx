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

export default function ReservationsContentList({
  travelTips,
  openModalEdit,
  handleDelete,
}) {
  const {
    container,
    card,
    textContent,
    textNotContent,
    spanTextContent,
    cardContent,
  } = searchStyles();

  const [result, setResult] = useState(travelTips);

  const [tokenUser, setTokenUser] = useState();

  useEffect(() => {
    setResult([]);
    setResult(travelTips);
  }, [travelTips]);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token-login") || "");

    setTokenUser(token);
  }, []);

  return (
    <div className={container}>
      {result.length > 0 ? (
        result?.map((item, index) => (
          <Card key={index} className={card}>
            <CardContent className={cardContent}>
              <Typography variant="h4" className={textContent}>
                {item.title}
              </Typography>
              <Typography variant="p" className={textContent}>
                {item.description}
              </Typography>

              <span className={spanTextContent}>
                {item.active ? (
                  <CheckCircle color="secondary" />
                ) : (
                  <Close color="error" />
                )}
              </span>
            </CardContent>
            {tokenUser !== "" && (
              <CardActions>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => openModalEdit(item)}
                >
                  <Edit />
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleDelete(item.reservation_id)}
                >
                  <DeleteOutline color="error" />
                </Button>
              </CardActions>
            )}
          </Card>
        ))
      ) : (
        <Typography variant="h4" className={textNotContent}>
         Not Found
        </Typography>
      )}
    </div>
  );
}
