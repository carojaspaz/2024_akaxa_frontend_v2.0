/**
 * //import axios from 'axios'
 *
 * import { Config } from '../helpers/config/constants'
 *
 *
 * const authData = sessionStorage.getItem('auth');
 * const token = authData ? JSON.parse(authData).token : null;
 *
 * export const getAllClients = async () => {
 *     try {
 *         const response = await fetch(Config.urlBase + '/Client', {
 *             method: 'GET',
 *             headers: {
 *                 'Authorization': `Bearer ${token}`, // Añade el token en los encabezados de la solicitud
 *                 'Content-Type': 'application/json',
 *             },
 *         });
 *         // Asegúrate de usar la URL correcta
 *         if (!response.ok) {
 *             throw new Error(`HTTP error! status: ${response.status}`);
 *         }
 *         const data = await response.json();
 *         return data;
 *     } catch (error) {
 *         console.error('Error fetching client list:', error);
 *         return null; // Puedes ajustar esto dependiendo de cómo quieras manejar los errores
 *     }
 * };
 *
 * export const getClientID = async (clientId) => {
 *     try {
 *         const response = await fetch(Config.urlBase + `/client/${clientId}`, {
 *             method: 'Get',
 *             headers: {
 *                 'Authorization': `Bearer ${token}`,
 *                 'Content-Type': 'application/json'
 *             },
 *         })
 *         if (!response.ok) {
 *             throw new Error(`HTTP error! status: ${response.status}`);
 *         }
 *         const data = await response.json();
 *         return data;
 *
 *     } catch (error) {
 *         console.log('HTTP Invalid to get a user', error)
 *         return null
 *         //return {message: ErrorMessage[500]}
 *     }
 * }
 *
 * export const createUser = async (userData) => {
 *     const authData = sessionStorage.getItem('auth');
 *     const token = authData ? JSON.parse(authData).token : null;
 *
 *     if (!token) {
 *         console.error('Sesión finalizada')
 *         return null
 *         window.location('/home')
 *     }
 *
 *     try {
 *         const response = await fetch(Config.urlBase + '/createUser', {
 *             method: 'POST',
 *             headers: {
 *                 'Authorization': `Bearer ${token}`,
 *                 'Content-Type': 'application/json'
 *             },
 *             body: JSON.stringify(userData)
 *         })
 *         if (!response.ok) {
 *             throw new Error(`HTTP Error status: ${response.status}`)
 *         }
 *         const data = await response.json();
 *         return data
 *
 *     } catch (error) {
 *         console.error('Error Creating User:', error)
 *         return null
 *     }
 * }
 *
 * postClient = async (body) => {
 *     const response = await fetch(
 *       `${this.urlBase}client/`,
 *       this.optionsPost(body)
 *     )
 *       .then((response) => {
 *         return response.json();
 *       })
 *       .then((data) => {
 *         return data;
 *       })
 *       .catch((error) => {
 *         return { message: ErrorMessages[500] }
 *       });
 *     return response;
 *   };
 *
 * export const putActiveClient = async(clientId)=>{
 *     const response = await fetch (Config.urlBase+`/client/${clientId}`,
 *     {
 *         method:'PUT',
 *         headers:{
 *             'Authorization':`Bearer ${token}`,
 *             'Content-Type':'application/json'
 *         }
 *     })
 * }
 *
 *
 *
 * // export const clientEdit = async()=>{
 *
 * // }
 *
 * // export const clientDelete = async()=>{
 *
 * // }
 *
 * @format
 */

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
      body = {
        legalName: 'empresa3Lau',
        businessName: 'empresa3Lau',
        email: 'empresa3Lau@yopmail.com',
        identification: { type: 'CC', number: '200225333' },
        typeCompany: '5f23a01e9af25e2ed0faad74',
        totalEmployees: '25',
        phones: [{ type: 'Movil', number: '3012563636' }],
        description: 'ninguna',
        contacts: [{ name: 'claudia ', position: 'peluquera', email: 'empresa3@yopmail.com', phone: { type: 'Movil', number: '3152853636' } }],
        codeCIIU: { sector: 'A', division: '02', subdivision: '023', activity: '0230' },
        address: { country: 'CO', firstPoliticalDivision: '52', secondPoliticalDivision: '52001', thirdPoliticalDivision: '52001004', address: 'cll 27', description: 'ninguna', latitude: 1.2131716, longitude: -77.285516 },
        activities: [{ type: 'PROD', isSelected: true }],
      }
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
