/* eslint-disable no-undef */

import { api, token } from './api'

export const getItineraries = ({ id=null, idUser=null }) => {
  const filter = `?id=${id}`
  const filterIdUser = `?idUser=${idUser}`

  if (id) {
    return api.get(`/itineraries${filter}`, {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    })
  }
 else if (idUser) {
    return api.get(`/itineraries${filterIdUser}`, {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    })
  }
  else{
    return api.get('/itineraries', {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    })
  }
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
  console.log(
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
    },
  )
  return api.post(
    '/itineraries',
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
    },
    {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    }
  )
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
  return api.put(
    `/itineraries/${id}`,
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
    },
    {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    }
  )
}

export const deleteItinerarie = (id) => {
  return api.delete(`/itineraries/${id}`, {
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
  })
}
