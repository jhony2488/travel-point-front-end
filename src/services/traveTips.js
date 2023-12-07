/* eslint-disable no-undef */

import { api, token } from './api'

export const getTraveTips = (id) => {
  const filter = `?id=${id}`

  if (id) {
    return api.get(`/travel-tips${filter}`, {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    })
  }
  return api.get('/travel-tips', {
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
  })
}

export const setTraveTip = ({ title, description }) => {
  return api.post('/travel-tips', {
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
    data: {
      title,

      description,
    },
  })
}

export const updateTraveTip = (id, { title, description }) => {
  return api.put(`/travel-tips/${id}`, {
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
    data: {
      title,

      description,
    },
  })
}

export const deleteTraveTip = (id) => {
  return api.delete(`/travel-tips/${id}`, {
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
  })
}
