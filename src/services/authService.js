/** @format */
import { BaseService } from './baseService'
import { Config } from '../helpers/config/constants'

const ErrorMessages = {
  500: 'Internal Server Error',
  404: 'Not Found',
  400: 'Bad Request',
}

class LoginService extends BaseService {
  constructor() {
    super()
  }

  /**
   * Método para iniciar sesion
   * @param {string} body - Los datos del cliente en formato JSON
   * @returns {Promise<Object>} - Promesa que resuelve con la respuesta del servidor
   */
  async login(body) {
    try {
      const response = await fetch(Config.urlBase + '/user/login', this.optionsSimplePost(JSON.stringify(body)))

      if (!response.ok) {
        throw new Error(`HTTP Error status: ${response.status}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error al crear el cliente:', error)
      throw error
    }
  }
}

export const loginService = new LoginService()