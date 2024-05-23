// src/services/authService.js
import axios from 'axios';

import { Config } from '../helpers/config/constants';

export const login = async (username, password) => {
  try {
    const body = {
        email: username,
        password: password,
    }
    const response = await axios.post(`${Config.urlBase}/user/login`, body);
    return response.data;
  } catch (error) {
    throw error;
  }
};
