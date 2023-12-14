/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import {
  Typography,
  Container,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
} from "@material-ui/core";
import { useForm } from "react-hook-form";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaItineraries } from "../../schemasValidations/itineraries";
import { Input, Button } from "../../Components";
import { setItinerarie } from "../../services/Itineraries";
import { upload } from "../../services/upload";
import { useStyles } from "./style";

export default function CreateItineraries() {
  const classes = useStyles();

  const [file, setFile] = useState(null);
  const [itinerary, setItinerary] = useState({isPublic: true, idUser: ''});
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    // resolver: yupResolver(schemaItineraries),
    defaultValues: {
      title: "",
      duration: "",
      dataInitial: "",
      description: "",
    },
  });

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      // Substitua 'http://localhost:3001/upload' pela URL do seu endpoint de upload no servidor Node.js
      const response = await upload(formData);

      return response;
    } catch (error) {
      console.error("Erro ao fazer upload do arquivo:", error);
    }
  };

  const getCountries = async () => {
    const options = {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Accept: "	application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Header":
          "Origin, X-Requested-With, Content-Type, Accept",
      },
    };
    const response = await axios
      .get("https://restcountries.com/v3.1/all", options)
      .then((items) => {
        setCountries(items.data);
      });
  };

  const getCities = async (country) => {
    const options = {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Accept: "	application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Header":
          "Origin, X-Requested-With, Content-Type, Accept",
      },
    };
    const response = await axios
      .post(
        "https://countriesnow.space/api/v0.1/countries/cities",
        { country: country ? country.toLowerCase() : null },
        options
      )
      .then((items) => {
        setCities(items.data);
      });
  };

  const handleSubmitSetItineraries = async ({
    title,
    duration,
    dataInitial,
    description,
  }) => {
    const token = await JSON.parse(localStorage.getItem("token-login") || "");

    await handleUpload().then(async (uploadSubmit) => {

      await setItinerarie({
        title,
        duration,
        country: itinerary.country,
        city: itinerary.city,
        dataInitial,
        publicVisible: itinerary.isPublic,
        description,
        idUser: token.user[0]._id,
        thumbnail: uploadSubmit.data.path,
      })
        .then((response) => {
          setTimeout(() => {
            alert("Registration completed successfully");
            window.location.href = "/my-itineraries";
          }, 1000);
          reset();
        })
        .catch((err) => {
          alert(err.data.message | err.message);
        });
    });
  };

  const changeInput = (key, value) => {
    setItinerary((prevState) => {
      return { ...prevState, [key]: value };
    });
  };

  const changeInputCheckBox = (key, value) => {
    setItinerary((prevState) => {
      return { ...prevState, [key]: value };
    });
  };

  useEffect(() => {
    getCountries();
  }, []);

  return (
    <>
      <Container className={classes.main}>
        <Typography className={classes.title}>Create Itinerary</Typography>
        <Box className={classes.box}>
          <form onSubmit={handleSubmit(handleSubmitSetItineraries)}>
            <Box className={classes.boxWrapper}>
              <label htmlFor="input-title">Title</label>
              <Input
                id="input-title"
                control={control}
                nameInput={"title"}
                placeholder="To Brazil"
              />
              <p className={classes.errorMessage}>{errors.title?.message}</p>
              <label htmlFor="input-duration">Duration in days</label>
              <Input
                id="input-duration"
                control={control}
                nameInput={"duration"}
                type={"number"}
                placeholder="2"
              />
              <p className={classes.errorMessage}>{errors.duration?.message}</p>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  {itinerary.country === "" || !itinerary.country
                    ? "Country"
                    : itinerary.country}
                </InputLabel>

                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={itinerary.country || ""}
                  label="Country"
                  onChange={(event) => {
                    changeInput("country", event.target.value);
                    getCities(event.target.value);
                  }}
                >
                  <MenuItem
                    value=""
                    color={"black"}
                    className={classes.itemSelect}
                  >
                    Country
                  </MenuItem>

                  {countries ? (
                    countries?.map((item, key) => (
                      <MenuItem
                        color={"black"}
                        className={classes.itemSelect}
                        key={key}
                        value={item.name.common}
                      >
                        {item.name.common}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem
                      value=""
                      color={"black"}
                      className={classes.itemSelect}
                    >
                      country
                    </MenuItem>
                  )}
                </Select>
              </FormControl>

              {itinerary.country && itinerary.country !== "" ? (
                cities?.data?.length == 0 ? (
                  <MenuItem
                    value=""
                    color={"black"}
                    className={classes.itemSelect}
                  >
                    country
                  </MenuItem>
                ) : (
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      {itinerary.city === "" || !itinerary.city
                        ? "City"
                        : itinerary.city}
                    </InputLabel>

                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={itinerary.city || ""}
                      label="Country"
                      placeholder={
                        itinerary.city === "" || !itinerary.city
                          ? "City"
                          : itinerary.city
                      }
                      onChange={(event) => {
                        changeInput("city", event.target.value);
                      }}
                    >
                      <MenuItem
                        value=""
                        color={"black"}
                        className={classes.itemSelect}
                      >
                        City
                      </MenuItem>
                      {cities.data ? (
                        cities?.data?.map((item, key) => (
                          <MenuItem
                            color={"black"}
                            className={classes.itemSelect}
                            key={key}
                            value={item}
                          >
                            {item}
                          </MenuItem>
                        ))
                      ) : (
                        <MenuItem
                          value=""
                          color={"black"}
                          className={classes.itemSelect}
                        >
                          City
                        </MenuItem>
                      )}
                    </Select>
                  </FormControl>
                )
              ) : (
                <MenuItem
                  value=""
                  color={"black"}
                  className={classes.itemSelect}
                >
                  City
                </MenuItem>
              )}
              <label htmlFor="input-date-initial">Initial Date</label>
              <Input
                id="input-date-initial"
                control={control}
                nameInput={"dataInitial"}
                type={"text"}
                isMask
                mask="99/99/9999"
                placeholder="29/01/2034"
              />
              <p className={classes.errorMessage}>
                {errors.dataInitial?.message}
              </p>
              <label htmlFor="input-description">Description</label>
              <Input
                id="input-description"
                control={control}
                nameInput={"description"}
                type={"text"}
              />
              <p className={classes.errorMessage}>
                {errors.description?.message}
              </p>
              <label htmlFor="input-email">Is Public</label>
              <Checkbox
                checked={itinerary.isPublic}
                onChange={(value, checked) =>
                  changeInputCheckBox("isPublic", checked)
                }
              />

              <label htmlFor="input-file">Image</label>
              <input type="file" name="file" onChange={handleFileChange} />

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
          </form>
        </Box>
      </Container>
    </>
  );
}
