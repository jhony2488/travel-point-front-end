/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Typography, Container } from "@material-ui/core";
import { ItineraryContent,Button } from "../../Components";
import { getItineraries, deleteItinerarie } from "../../services/Itineraries";
import { useStyles } from "./style";

export default function ViewUnicItinerary({ match }) {
  const classes = useStyles();

  const [itinerary, setItinerary] = useState([]);

  const getItinerary = async () => {
    const id = await  match?.params?.id;


    await getItineraries({id})
      .then((response) => {
        setItinerary(response.data.result);
      })
      .catch((err) => {
        alert(err.data.message | err.message);
      });
  };

  const deleteItinerary = async (id) => {
    await deleteItinerarie(id)
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

    getItinerary();
  }, []);

  return (
    <>
      <Container className={classes.main}>
        <Typography className={classes.title}>Itinerary</Typography>
        <ItineraryContent
          itinerary={typeof itinerary ==='object' ? [itinerary] : itinerary}
          openModalEdit={() => null}
          handleDelete={deleteItinerary}
        />
      </Container>
    </>
  );
}
