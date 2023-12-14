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
import { ItinerariesContentList, Button, Input } from "../../Components";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import axios from "axios";
import {
  getItineraries,
  deleteItinerarie,
  updateItinerarie,
} from "../../services/Itineraries";
import { schemaItineraries } from "../../schemasValidations/itineraries";
import { upload } from "../../services/upload";
import { useStyles } from "./style";

export default function MyItineraries() {
  const classes = useStyles();

  const [myItineraries, setMyItineraries] = useState([]);

  const [itinerary, setItinerary] = useState({ publicVisible: true, idUser: "" });
  const [isOpenModal, setOpenModal] = useState(false);

  const [file, setFile] = useState(null);
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [country, setCountry] = useState();
  const [city, setCity] = useState();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const getMyItineraries = async () => {
    const token = await JSON.parse(localStorage.getItem("token-login") || "");

    await getItineraries({ idUser: token.user[0]._id })
      .then((response) => {
        setMyItineraries(response.data.result ? response.data.result : []);
      })
      .catch((err) => {
        alert(err.data.message | err.message);
      });
  };

  const deleteItinerary = async (id) => {
    await deleteItinerarie(id)
      .then((response) => {
        alert(response.data.message);
        getMyItineraries();
      })
      .catch((err) => {
        alert(err.data.message | err.message);
      });
  };

  const openModalEdit = (item) => {
    setItinerary(item);
    setCountry(item.country);
    setCity(item.city);
    setOpenModal(!isOpenModal);
  };

  const closeModal = () => {
    setOpenModal(!isOpenModal);
  };

  const defaultValues = {
    ...itinerary,
    file,
    country,
    city,
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

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      // Substitua 'http://localhost:3001/upload' pela URL do seu endpoint de upload no servidor Node.js
      const response = await upload(formData);

      console.log(response.data); // Lidere com a resposta do servidor conforme necessário
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

  const getCities = async () => {
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

  const handleSubmitUpdateItineraries = async ({
    title,
    duration,
    dataInitial,
    description,
    publicVisible
  }) => {
    const token = await JSON.parse(localStorage.getItem("token-login")) || "";

    await handleUpload().then((item) => {
      updateItinerarie(itinerary._id, {
        title,
        duration,
        description,
        dataInitial,
        country,
        city,

        publicVisible,

        idUser: token.user[0]._id,
        thumbnail: item.data.path,
      })
        .then((response) => {
          alert("Success");
          setItinerary({ publicVisible: true, idUser: "" });
          closeModal();
          getMyItineraries();
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
    const token = localStorage.getItem("token-login") || "";

    if (token === "") {
      window.location.href = "/";
    }
    getCountries();

    getMyItineraries();
  }, []);

  useEffect(() => {
    getCities();
  }, [country]);

  return (
    <>
      <Modal
        open={isOpenModal}
        className={classes.modal}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={classes.box}>
          <Box className={classes.boxWrapper}>
              <Box className={classes.boxWrapper}>
                <label htmlFor="input-title">Title</label>
                <Input
                  id="input-title"
                  valueInput={itinerary?.title || ""}
                  onChange={(value) => {
                    changeInput("title", value.target.value);
                  }}
                  placeholder="To Brazil"
                />
                <p className={classes.errorMessage}>{errors.name?.message}</p>
                <label htmlFor="input-duration">Duration in days</label>
                <Input
                  id="input-duration"
                  valueInput={itinerary?.duration || ""}
                  onChange={(value) => {
                    changeInput("duration", value.target.value);
                  }}
                  type={"number"}
                  placeholder="2"
                />
                <p className={classes.errorMessage}>{errors.email?.message}</p>

                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    {country === "" || !country ? "Country" : country}
                  </InputLabel>

                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={country}
                    label="Country"
                    onChange={(event) => setCountry(event.target.value)}
                  >
                    <MenuItem
                      value=""
                      color={"black"}
                      className={classes.itemSelect}
                    >
                      Country
                    </MenuItem>

                    {countries ? (
                      countries?.map((item, key) => {
                        console.log(item.name.common);
                        return (
                          <MenuItem
                            color={"black"}
                            className={classes.itemSelect}
                            key={key}
                            value={item.name.common}
                          >
                            {item.name.common}
                          </MenuItem>
                        );
                      })
                    ) : (
                      <></>
                    )}
                  </Select>
                </FormControl>
                {country && country !== "" ? (
                  cities?.data?.length == 0 ? (
                    <></>
                  ) : (
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        {city === "" || !city ? "City" : city}
                      </InputLabel>

                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={city}
                        label="Country"
                        placeholder={city === "" || !city ? "City" : city}
                        onChange={(event) => setCity(event.target.value)}
                      >
                        {cities.data ? (
                          cities?.data?.map((item, key) => {
                            console.log(item);
                            return (
                              <MenuItem
                                color={"black"}
                                className={classes.itemSelect}
                                key={key}
                                value={item}
                              >
                                {item}
                              </MenuItem>
                            );
                          })
                        ) : (
                          <></>
                        )}
                      </Select>
                    </FormControl>
                  )
                ) : (
                  <></>
                )}
                <label htmlFor="input-date-initial">Initial Date</label>
                <Input
                  id="input-date-initial"
                  valueInput={itinerary?.dataInitial || ""}
                  onChange={(value) => {
                    changeInput("dataInitial", value.target.value);
                  }}
                  type={"text"}
                  isMask
                  mask="99/99/9999"
                  placeholder="29/01/2034"
                />

                <label htmlFor="input-description">Description</label>
                <Input
                  id="input-description"
                  valueInput={itinerary?.description || ""}
                  onChange={(value) => {
                    changeInput("description", value.target.value);
                  }}
                  type={"text"}
                />
                <label htmlFor="input-email">Is Public</label>
                <Checkbox
                  checked={itinerary.publicVisible}
                  onChange={(value, checked) =>
                    changeInputCheckBox("publicVisible", checked)
                  }
                />

                <label htmlFor="input-password">Image</label>
                <input type="file" name="file" onChange={handleFileChange} />
                <p className={classes.errorMessage}>
                  {errors.password?.message}
                </p>
              </Box>
              <div className={classes.containerButtons}>
                <Button variant="contained" color="primary" onClick={()=> handleSubmitUpdateItineraries(itinerary)}>
                  Update Itinerary
                </Button>
                <Button variant="contained" color="primary" style={{background: 'red', color: 'white'}} onClick={()=> closeModal()}>
                  Cancel
                </Button>
              </div>
          </Box>
        </Box>
      </Modal>
      <Container className={classes.main}>
        <Typography className={classes.title}>My Itineraries</Typography>
        <div className={classes.containerButtonAdd}>
        <Button
          onClick={() => {
            window.location.href = "/created-itineraries";
          }}
          color="default"
          variant="contained"
        >
          +
        </Button>
        </div>
        <ItinerariesContentList
          itineraries={myItineraries}
          openModalEdit={openModalEdit}
          handleDelete={deleteItinerary}
        />
      </Container>
    </>
  );
}
