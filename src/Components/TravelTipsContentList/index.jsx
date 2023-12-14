import React, { useState, useEffect } from "react";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
} from "@material-ui/core";
import { searchStyles } from "./style";
import { Edit, DeleteOutline } from "@material-ui/icons";

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
    cardContent,
  } = searchStyles();

  const [result, setResult] = useState(travelTips);

  useEffect(() => {
    setResult([]);
    setResult(travelTips);
  }, [travelTips]);

  return (
    <div className={container}>
      {result.length > 0 ? (
        result?.map((item, index) => {
          const token = JSON.parse(localStorage.getItem("token-login") || "");
          return (
            <Card key={index} className={card}>
              <CardContent className={cardContent}>
                <Typography variant="h4" className={textContent}>
                  {item.title}
                </Typography>
                <Typography variant="h4" className={textContent}>
                  {item.description}
                </Typography>
              </CardContent>
              {token.user[0]._id === item.userId && (
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
                    onClick={() => handleDelete(item._id)}
                  >
                    <DeleteOutline color="error" />
                  </Button>
                </CardActions>
              )}
            </Card>
          )
        })) : (
        <Typography variant="h4" className={textNotContent}>
         Not Found
        </Typography>
      )}
    </div>
  );
}
