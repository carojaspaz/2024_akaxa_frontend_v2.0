
import axios from 'axios'

import { Config } from '../helpers/config/constants'


const clientList = async()=>{
try{
    const response = await fetch(Config.urlBase +'/Client')
    const data = await response.json
}
catch(error){
    console.error('Error fetching client list', error)
}
}

// export const clientAdd = async()=>{
     
// }

// export const clientEdit = async()=>{

// }

// export const clientDelete = async()=>{

// }

export default clientList