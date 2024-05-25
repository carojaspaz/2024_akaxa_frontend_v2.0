/** @format */

import axios from 'axios'

import { Config } from '../helpers/config/constants'

export const login = async (email, password) => {
  const startTime = Date.now()
  try {
    const payload = JSON.stringify({ email, password })
    const response = await axios.post(`${Config.urlBase}/user/login`, payload, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Accept-Language': 'es'
      }
    })
    return response.data
  } catch (error) {
    if (error.response) {
      const { status } = error.response
      if (status === 403 || status === 404) {
        throw new Error(error.response.data.message)
      }
    }
    throw new Error('An error occurred')
  }
}
