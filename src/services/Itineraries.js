/* eslint-disable no-undef */

import { api, token } from './api'

export const getItineraries = ({ id, idUser }) => {
  const filter = `?id=${id}`
  const filterIdUser = `?id=${idUser}`

  if (id) {
    return api.get(`/itineraries${filter}`, {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    })
  }
  if (idUser) {
    return api.get(`/itineraries${filterIdUser}`, {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    })
  }
  return api.get('/itineraries', {
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
  })
}

export const setItinerarie = ({
  title,
  duration,
  country,
  city,
  dataInitial,
  publicVisible,
  description,
  idUser,
  thumbnail,
}) => {
  return api.post('/itineraries', {
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
    data: {
      title,
      duration,
      country,
      city,
      dataInitial,
      publicVisible,
      description,
      idUser,
      thumbnail,
    },
  })
}

export const updateItinerarie = (
  id,
  {
    title,
    duration,
    country,
    city,
    dataInitial,
    publicVisible,
    description,
    idUser,
    thumbnail,
  }
) => {
  return api.put(`/itineraries/${id}`, {
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
    data: {
      title,
      duration,
      country,
      city,
      dataInitial,
      publicVisible,
      description,
      idUser,
      thumbnail,
    },
  })
}

export const deleteItinerarie = (id) => {
  return api.delete(`/itineraries/${id}`, {
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
  })
}
