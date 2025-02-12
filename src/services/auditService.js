/** @format */

import { BaseService } from './baseService'
import { Config, ErrorMessages } from '../helpers/config/constants'

class AuditService extends BaseService {
  constructor(urlBase) {
    super()
    this.urlBase = urlBase
  }
  getAuditById = async (id) => {
    const response = await fetch(`${this.urlBase}protocol/audit/${id}`, this.optionsGet())
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        return data
      })
      .catch((error) => {
        return { message: ErrorMessages[500] }
      })
    return response
  }
  finishAudit = async (id, body) => {
    const response = await fetch(`${this.urlBase}protocol/audit/finish/${id}`, this.optionsPut(body))
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        return data
      })
      .catch((error) => {
        return { message: ErrorMessages[500] }
      })
    return response
  }
  loadEvidence =async (audit, category, item, data) =>{
    const formData = new FormData()
    formData.append('evidence', data)
    const options = {
      method: 'POST',
      headers: {
        'Accept-Language': 'es',
        Authorization: sessionStorage.getItem('authUser'),
      },
      body: formData
    }
    const url = `${this.urlBase}audit/item/evidence/${audit}/${category}/${item}`
    const response = await fetch(url, options)
    .then((response) => {
      return response.json
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return { message: ErrorMessages[500] }
    });
    return response;        
  }
}

const auditService = new AuditService(Config.urlBase)

export { auditService }
