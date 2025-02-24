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

  /**
   * Método para obtener los municipios de un departamento
   * @returns {Promise<Array>} - Lista de los municipios de un departamento
   */
  async getMunicipalityStates(country) {
    try {
      const response = await fetch(`${Config.urlBase}/countries/states/municipalities/${country}/`, this.paramOptions())

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
   * Método para obtener los centros de un municipio
   * @returns {Promise<Array>} - Lista de centros de un municipio
   */
  async getPopulateCenterMunicipality(country) {
    try {
      const response = await fetch(`${Config.urlBase}/countries/states/municipalities/populate/${country}/`, this.paramOptions())

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
   * Método para agregar un nuevo tipo de empresa
   * @param {Object} body - Datos del nuevo tipo de empresa
   * @returns {Promise<Object>} - Respuesta del servidor
   */
  async postCompanyType(body) {
    try {
      const response = await fetch(`${Config.urlBase}/company/types/`, this.optionsPost(body))

      if (!response.ok) {
        throw new Error(`HTTP Error status: ${response.status}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error al agregar un nuevo tipo de empresa:', error)
      return { message: 'Error al procesar la solicitud' }
    }
  }

  /**
   * Método para editar un tipo de empresa
   * @param {string} id - ID del tipo de empresa a editar
   * @param {Object} body - Datos actualizados del tipo de empresa
   * @returns {Promise<Object>} - Respuesta del servidor
   */
  async putEditCompanyType(id, body) {
    try {
      const response = await fetch(`${Config.urlBase}/company/types/${id}`, this.optionsPut(body))

      if (!response.ok) {
        throw new Error(`HTTP Error status: ${response.status}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error al editar el tipo de empresa:', error)
      return { message: 'Error al procesar la solicitud' }
    }
  }

  async getRiskTypes (){
    try {
      const response = await fetch(`${Config.urlBase}/risk/typesList/`, this.paramOptions())

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

  async getRiskConditions() {
    try {
      const response = await fetch(`${Config.urlBase}/checklist/conditionsRisk/`, this.optionsGet());
  
      if (!response.ok) {
        throw new Error(`HTTP Error status: ${response.status}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error al obtener las condiciones de riesgo:", error);
      return null;
    }
  }

  async getTypeList() {
    try {
      const response = await fetch(`${Config.urlBase}/checklist/typesList/`, this.optionsGet());
  
      if (!response.ok) {
        throw new Error(`HTTP Error status: ${response.status}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error al obtener las Listas de Chequeo:", error);
      return null;
    }
  }
  
}

export const commonService = new CommonService()
