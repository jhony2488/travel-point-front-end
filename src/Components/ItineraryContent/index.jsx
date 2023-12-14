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
  itinerary,
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
    contentCard,
    cardImage
  } = searchStyles();

  const [result, setResult] = useState(itinerary);

  const [tokenUser, setTokenUser] = useState();

  useEffect(() => {
    setResult([]);
    setResult(itinerary);
  }, [itinerary]);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token-login") || "");

    setTokenUser(token);
  }, []);

  return (
    <div className={container}>
      {result.length > 0 ? (
        <Card className={card}>
          <CardContent className={cardContent}>
            <img className={cardImage} src={result[0].thumbnail} alt={result.title} />
            <div className={contentCard}>
            <Typography variant="h4" className={textContent}>
              {result[0].title}
            </Typography>
            <Typography variant="h4" className={textContent}>
              {result[0].duration} dias
            </Typography>
            <Typography variant="h4" className={textContent}>
              Pais: {result[0].country}
            </Typography>

            <Typography variant="h4" className={textContent}>
              Cidade: {result[0].city}
            </Typography>
            <Typography variant="h4" className={textContent}>
              Data inicial: {result[0].dataInitial}
            </Typography>
            </div>
          
            <Typography variant="h4" className={textContent}>
              Description:
            </Typography>
            <Typography variant="p" className={textContent}>
              {result[0].description}
            </Typography>

            <span className={spanTextContent}>
              {result[0].publicVisible ? (
                <CheckCircle color="secondary" />
              ) : (
                <Close color="error" />
              )}
            </span>
          </CardContent>
          {tokenUser?.user[0]?._id === result[0].userId ? (
            <CardActions>
              <Button
                variant="contained"
                color="primary"
                onClick={() => openModalEdit(result)}
              >
                <Edit />
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleDelete(result._id)}
              >
                <DeleteOutline color="error" />
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
