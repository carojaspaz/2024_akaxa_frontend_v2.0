/** @format */
import { BaseService } from './baseService'
import { Config } from '../helpers/config/constants'

class ClientService extends BaseService {
  constructor() {
    super()
  }

  /**
   * Método para crear un nuevo cliente
   * @param {string} body - Los datos del cliente en formato JSON
   * @returns {Promise<Object>} - Promesa que resuelve con la respuesta del servidor
   */
  async postClient(body) {
    try {      
      const response = await fetch(Config.urlBase + '/client', this.optionsPost(body))

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

  /**
   * Método para crear el perfil del cliente
   * @param {string} clientId - ID del cliente creado
   * @param {string} profileBody - Los datos del perfil en formato JSON
   * @returns {Promise<Object>} - Promesa que resuelve con la respuesta del servidor
   */
  async postProfileClient(clientId, profileBody) {
    try {
      const response = await fetch(`${Config.urlBase}/client/profile/${clientId}`, this.optionsPost(profileBody))

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

  /**
   * Método para obtener todos los clientes
   * @returns {Promise<Array>} - Lista de clientes
   */
  async getAllClients() {
    try {
      const response = await fetch(Config.urlBase + '/client', this.optionsGet())

      if (!response.ok) {
        throw new Error(`HTTP Error status: ${response.status}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error al obtener los clientes:', error)
      return null
    }
  }
}

export const clientService = new ClientService()
