/* eslint-disable no-undef */

import { api, token } from './api'

export const getUsers = ({ id, email }) => {
  const filter = `?id=${id}`
  const filterEmail = `?id=${email}`

  if (id) {
    return api.get(`/users${filter}`, {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    })
  }
  if (email) {
    return api.get(`/users${filterEmail}`, {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    })
  }
  return api.get('/users', {
    headers: {
      Authorization: token,
    },
  })
}
export const login = (email, password) => {

  return api.post(
    '/login',
    {
      email,
      password,
    },
    {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    }
  )
}

export const setUser = (name, email, password, photo) => {
  console.log(name, email, password, photo)
  return api.post(
    '/users',
    { name, email, password, photo },
    {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    }
  )
}

export const updateUser = (id, name, email, password, photo) => {
  return api.put(
    `/users/${id}`,
    {
      name,
      email,
      password,
      photo,
    },
    {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    }
  )
}

export const deleteUser = (id) => {
  return api.delete(`/users/${id}`, {
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
  })
}
