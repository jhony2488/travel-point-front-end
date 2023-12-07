/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  Typography,
  Container,
  Modal,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
} from "@material-ui/core";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import axios from "axios";
import { updateTraveTip } from "../../services/traveTips";
import { schemaItineraries } from "../../schemasValidations/itineraries";

import { TravelTipsContentList, Button, Input } from "../../Components";
import { getTraveTips, deleteTraveTip } from "../../services/traveTips";
import { useStyles } from "./style";

export default function TravelTips() {
  const classes = useStyles();

  const [travelTips, setTravelTips] = useState([]);

  const [travelTip, setTravelTip] = useState({});
  const [isOpenModal, setOpenModal] = useState(false);

  const openModalEdit = (item) => {
    setTravelTip(item);
    setOpenModal(!isOpenModal);
  };

  const closeModal = () => {
    setOpenModal(!isOpenModal);
  };

  const getAllTravelTips = async () => {
    await getTraveTips()
      .then((response) => {
        setTravelTips(response.data.result);
      })
      .catch((err) => {
        alert(err.data.message | err.message);
      });
  };

  const deleteTravelTips = async (id) => {
    await deleteTraveTip(id)
      .then((response) => {
        alert(response.data.message);
      })
      .catch((err) => {
        alert(err.data.message | err.message);
      });
  };

  const defaultValues = {
    ...travelTip,
  };

  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    resolver: yupResolver(schemaItineraries),
    defaultValues,
  });

  const handleSubmitUpdateTravelTip = async ({
    title,
    description
  }) => {

    updateTraveTip(travelTip._id, {
      title,
      description,
    })
      .then((response) => {
        alert("Sucess");
        reset();
      })
      .catch((err) => {
        alert(err.data.message | err.message);
      });
  };

  useEffect(() => {
    const token = localStorage.getItem("token-login") || "";

    if (token === "") {
      window.location.href = "/";
    }

    getAllTravelTips();
  }, []);

  return (
    <>
      <Modal
        open={isOpenModal}
        onClose={closeModal}
        className={classes.modal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={classes.box}>
          <Box className={classes.boxWrapper}>
            <form onSubmit={handleSubmit(handleSubmitUpdateTravelTip)}>
              <Box className={classes.boxWrapper}>
                <label htmlFor="input-title">Title</label>
                <Input
                  id="input-title"
                  control={control}
                  nameInput={"title"}
                  placeholder="To Brazil"
                />
                <p className={classes.errorMessage}>{errors.name?.message}</p>
                <label htmlFor="input-duration">Description</label>
                <Input
                  id="input-description"
                  control={control}
                  nameInput={"description"}
                  type={"text"}
                  placeholder=""
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
              <div className={classes.containerButtons}>
                <Button variant="contained" color="primary">
                  Update Travel Tip
                </Button>
              </div>
            </form>
          </Box>
        </Box>
      </Modal>
      <Container className={classes.main}>
        <Typography className={classes.title}>Travel Tips</Typography>
        <Button
          onClick={() => {
            window.location.href = "/created-travel-tips";
          }}
          color="default"
          variant="contained"
        >
          +
        </Button>
        <TravelTipsContentList
          travelTips={travelTips}
          openModalEdit={openModalEdit}
          handleDelete={deleteTravelTips}
        />
      </Container>
    </>
  );
}
