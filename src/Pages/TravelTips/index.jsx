/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Typography, Container, Modal, Box } from "@material-ui/core";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { schemaItineraries } from "../../schemasValidations/itineraries";

import { TravelTipsContentList, Button, Input } from "../../Components";
import {
  getTraveTips,
  deleteTraveTip,
  updateTraveTip,
} from "../../services/traveTips";
import { useStyles } from "./style";

export default function TravelTips() {
  const classes = useStyles();

  const [travelTips, setTravelTips] = useState([]);

  const [travelTip, setTravelTip] = useState({ title: "", description: "" });
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
        getAllTravelTips();
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

  const handleSubmitUpdateTravelTip = async ({ title, description }) => {
    updateTraveTip(travelTip._id, {
      title,
      description,
    })
      .then((response) => {
        alert("Success");
        setTravelTip({ title: "", description: "" });
        closeModal ();
        getAllTravelTips();
      })
      .catch((err) => {
        alert(err.data.message | err.message);
      });
  };

  const changeInput = (key, value) => {
    setTravelTip((prevState) => {
      return { ...prevState, [key]: value };
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
              <Box className={classes.boxWrapper}>
                <label htmlFor="input-title">Title</label>
                <Input
                  id="input-title"
                  valueInput={travelTip?.title}
                  onChange={(value) => {
                    changeInput("title", value.target.value);
                  }}
                  placeholder="To Brazil"
                />
                <p className={classes.errorMessage}>{errors.name?.message}</p>
                <label htmlFor="input-duration">Description</label>
                <Input
                  id="input-description"
                  valueInput={travelTip?.description}
                  onChange={(value) => {
                    changeInput("description", value.target.value);
                  }}
                  type={"text"}
                  placeholder=""
                />
                <p className={classes.errorMessage}>
                  {errors.description?.message}
                </p>

                <div className={classes.containerButtons}>
                  <Button variant="contained" color="primary" onClick={()=>handleSubmitUpdateTravelTip(travelTip)}>
                    Update Travel Tip
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ background: "red", color: "white" }}
                    onClick={() => closeModal()}
                  >
                    Cancel
                  </Button>
                </div>
              </Box>
          </Box>
        </Box>
      </Modal>
      <Container className={classes.main}>
        <Typography className={classes.title}>Travel Tips</Typography>
        <div className={classes.containerButtonAdd}>
        <Button
          onClick={() => {
            window.location.href = "/created-travel-tips";
          }}
          color="default"
          variant="contained"
        >
          +
        </Button>
        </div>
        <TravelTipsContentList
          travelTips={travelTips}
          openModalEdit={openModalEdit}
          handleDelete={deleteTravelTips}
        />
      </Container>
    </>
  );
}
