/** @format */

import { BaseService } from './baseService'
import { Config, ErrorMessages } from '../helpers/config/constants'

class CategoryService extends BaseService {
  constructor(urlBase) {
    super()
    this.urlBase = urlBase
  }
  getCategories = async () => {
    const response = await fetch(`${this.urlBase}/inspectionCategory/`, this.optionsGet())
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
  getCategoriesById = async (id) => {
    const response = await fetch(`${this.urlBase}/inspectionCategory/${id}`, this.optionsGet())
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
}

const categoryService = new CategoryService(Config.urlBase)

export { categoryService }
