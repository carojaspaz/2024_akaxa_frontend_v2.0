/** @format */
import { BaseService } from './baseService'
import { Config } from '../helpers/config/constants'

class CommonService extends BaseService {
  constructor() {
    super()
  }

  /**
   * Método para obtener todos los paises activos
   * @returns {Promise<Array>} - Lista de paises activos
   */
  async getActiveCountries() {
    try {
      const response = await fetch(Config.urlBase + '/countries/active/', this.paramOptions())

      if (!response.ok) {
        throw new Error(`HTTP Error status: ${response.status}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error al obtener los paises:', error)
      return null
    }
  }

  /**
   * Método para obtener todos los valores segun un parametro
   * @returns {Promise<Array>} - Lista de todos los valores segun un parametro
   */
  async getParameters(type) {
    try {
      const response = await fetch(`${Config.urlBase}/parameters/${type}/`, this.paramOptions())

      if (!response.ok) {
        throw new Error(`HTTP Error status: ${response.status}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error al obtener los valores segun un parametro:', error)
      return null
    }
  }

  /**
   * Método para obtener todos los tipos de empresas
   * @returns {Promise<Array>} - Lista de tipos de empresas
   */
  async getCompanyType() {
    try {
      const response = await fetch(Config.urlBase + '/company/types/', this.optionsGet())

      if (!response.ok) {
        throw new Error(`HTTP Error status: ${response.status}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error al obtener la lista de tipos de empresas:', error)
      return null
    }
  }

  /**
   * Método para obtener todas las actividades
   * @returns {Promise<Array>} - Lista de actividades
   */
  async getActivitiesVerify() {
    try {
      const response = await fetch(Config.urlBase + '/checklist/activityVerify/', this.optionsGet())

      if (!response.ok) {
        throw new Error(`HTTP Error status: ${response.status}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error al obtener la Actividad economica:', error)
      return null
    }
  }

  /**
   * Método para obtener los departamentos de un pais
   * @returns {Promise<Array>} - Lista de los departamentos de un pais
   */
  async getStateCountry(country) {
    try {
      const response = await fetch(`${Config.urlBase}/countries/states/${country}/`, this.paramOptions())

      if (!response.ok) {
        throw new Error(`HTTP Error status: ${response.status}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error al obtener los valores segun un parametro:', error)
      return null
    }
  }
}

export const commonService = new CommonService()
