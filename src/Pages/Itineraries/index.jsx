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
import { schemaItineraries } from "../../schemasValidations/itineraries";
import { getItineraries, deleteItinerarie , updateItinerarie} from "../../services/Itineraries";
import { upload } from "../../services/upload";
import { ItinerariesContentList, Button, Input } from "../../Components";
import { useStyles } from "./style";

export default function Itineraries() {
  const classes = useStyles();

  const [itineraries, setItineraries] = useState([]);
  const [itinerary, setItinerary] = useState({});
  const [isOpenModal, setOpenModal] = useState(false);

  const [file, setFile] = useState(null);
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [country, setCountry] = useState();
  const [isPublic, setIsPublic] = useState(true);
  const [city, setCity] = useState();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const getAllItineraries = async () => {
    await getItineraries()
      .then((response) => {
        setItineraries(response.data.result);
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

  const openModalEdit = (item) => {
    setItinerary(item);
    setOpenModal(!isOpenModal);
  };

  const closeModal = () => {
    setOpenModal(!isOpenModal);
  };

  const  defaultValues ={...itinerary ,file, country,
      city,
      publicVisible: isPublic,
    }

  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    resolver: yupResolver(schemaItineraries),
    defaultValues
  });

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      // Substitua 'http://localhost:3001/upload' pela URL do seu endpoint de upload no servidor Node.js
      const response = await upload(formData);

      console.log(response.data); // Lidere com a resposta do servidor conforme necessário
      return formData;
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
  }) => {
    const token = await JSON.parse(localStorage.getItem("token-login")) || "";

  await handleUpload().then((item)=>{
      updateItinerarie(itinerary._id,{
        title,
        duration,
        description,
        dataInitial,
        country,
        city,
        
        publicVisible: isPublic,
        
        idUser: token._id,
        thumbnail: item.path,
      })
        .then((response) => {
          alert("Sucess");
          reset();
        })
        .catch((err) => {
          alert(err.data.message | err.message);
        });
    });

   
  };

  useEffect(() => {
    const token = localStorage.getItem("token-login") || "";

    if (token === "") {
      window.location.href = "/";
    }
    getCountries();
    getAllItineraries();
  }, []);

  useEffect(() => {
    getCities();
  }, [country]);

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
            <form onSubmit={handleSubmit(handleSubmitUpdateItineraries)}>
              <Box className={classes.boxWrapper}>
                <label htmlFor="input-title">Title</label>
                <Input
                  id="input-title"
                  control={control}
                  nameInput={"title"}
                  placeholder="To Brazil"
                />
                <p className={classes.errorMessage}>{errors.name?.message}</p>
                <label htmlFor="input-duration">Duration in days</label>
                <Input
                  id="input-duration"
                  control={control}
                  nameInput={"duration"}
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
                  control={control}
                  nameInput={"dataInitial"}
                  type={"text"}
                  isMask
                  mask="99/99/9999"
                  placeholder="29/01/2034"
                />

                <label htmlFor="input-description">Description</label>
                <Input
                  id="input-description"
                  control={control}
                  nameInput={"description"}
                  type={"text"}
                />
                <label htmlFor="input-email">Is Public</label>
                <Checkbox
                  defaultChecked
                  value={isPublic}
                  onChange={(event) => setIsPublic(event.target.value)}
                />

                <label htmlFor="input-file">Image</label>
                <input type="file" name="file" onChange={handleFileChange} />
              </Box>
              <div className={classes.containerButtons}>
                <Button variant="contained" color="primary">
                  Update Itinerary
                </Button>
              </div>
            </form>
          </Box>
        </Box>
      </Modal>
      <Container className={classes.main}>
        <Typography className={classes.title}>Itineraries</Typography>
        <Button
          onClick={() => {
            window.location.href = "/created-itineraries";
          }}
          color="default"
          variant="contained"
        >
          +
        </Button>
        <ItinerariesContentList
          itineraries={itineraries}
          openModalEdit={openModalEdit}
          handleDelete={deleteItinerary}
        />
      </Container>
    </>
  );
}
