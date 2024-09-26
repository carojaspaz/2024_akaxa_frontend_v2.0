
//import axios from 'axios'

import { Config } from '../helpers/config/constants'


const authData = sessionStorage.getItem('auth');
const token = authData ? JSON.parse(authData).token : null;

export const getAllClients = async () => {
    try {
        const response = await fetch(Config.urlBase + '/Client', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`, // Añade el token en los encabezados de la solicitud
                'Content-Type': 'application/json',
            },
        });
        // Asegúrate de usar la URL correcta
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching client list:', error);
        return null; // Puedes ajustar esto dependiendo de cómo quieras manejar los errores
    }
};

export const getClientID = async (clientId) => {
    try {
        const response = await fetch(Config.urlBase + `/client/${clientId}`, {
            method: 'Get',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        })
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;

    } catch (error) {
        console.log('HTTP Invalid to get a user', error)
        return null
        //return {message: ErrorMessage[500]}
    }
}

export const createUser = async (userData) => {
    const authData = sessionStorage.getItem('auth');
    const token = authData ? JSON.parse(authData).token : null;

    if (!token) {
        console.error('Sesión finalizada')
        return null
        window.location('/home')
    }

    try {
        const response = await fetch(Config.urlBase + '/createUser', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        if (!response.ok) {
            throw new Error(`HTTP Error status: ${response.status}`)
        }
        const data = await response.json();
        return data

    } catch (error) {
        console.error('Error Creating User:', error)
        return null
    }
}

export const putActiveClient = async(clientId)=>{
    const response = await fetch (Config.urlBase+`/client/${clientId}`,
    {
        method:'PUT',
        headers:{
            'Authorization':`Bearer ${token}`,
            'Content-Type':'application/json'
        }
    })
}



// export const clientEdit = async()=>{

// }

// export const clientDelete = async()=>{

// }

