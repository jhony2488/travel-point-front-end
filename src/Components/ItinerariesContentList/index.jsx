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

export default function ItinerariesContentList({
  itineraries,
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
    cardImage,
    contentCard
  } = searchStyles();

  const [result, setResult] = useState(itineraries);

  useEffect(() => {
    setResult([]);
    setResult(itineraries);
   
  }, [itineraries]);

  return (
    <div className={container}>
      {result.length > 0 ? (
        result?.map((item, index) => {
          const token = JSON.parse(localStorage.getItem("token-login") || "");
          return (
            <Card key={index} className={card}>
              <CardContent className={cardContent}>
                <img className={cardImage} src={item.thumbnail} alt={item.title} />
                <div className={contentCard}>
                  <Typography variant="h4" className={textContent}>
                  {item.title}
                </Typography>
                <Typography variant="h4" className={textContent}>
                  {item.duration} dias
                </Typography>
                <Typography variant="h4" className={textContent}>
                  Pais: {item.country}
                </Typography>
  
                <Typography variant="h4" className={textContent}>
                  Cidade: {item.city}
                </Typography>
                <Typography variant="h4" className={textContent}>
                  Data inicial: {item.dataInitial}
                </Typography>
                </div>
  
                <span className={spanTextContent}>
                  {item.publicVisible ? (
                    <CheckCircle color="secondary" />
                  ) : (
                    <Close color="error" />
                  )}
                </span>
  
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() =>
                    (window.location.href = "/itinerary/" + item?._id)
                  }
                >
                  Know More
                </Button>
              </CardContent>
              {token.user[0]._id === item.idUser ? (
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
              ) : (
                <></>
              )}
            </Card>
          )
        })
      ) : (
        <Typography variant="h4" className={textNotContent}>
          Not Found
        </Typography>
      )}
    </div>
  );
}
