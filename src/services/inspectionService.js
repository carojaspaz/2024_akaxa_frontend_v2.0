/** @format */

import { BaseService } from './baseService'
import { Config, ErrorMessages } from '../helpers/config/constants'

class InspectionService extends BaseService {
  constructor() {
    super()
  }

  getCIIU = async () => {
    const response = await fetch(`${Config.urlBase}/ciiu/`, this.optionsGet())
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

  getDivisions = async (sector) => {
    const response = await fetch(`${Config.urlBase}/ciiu/${sector}/`, this.optionsGet())
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

  getSubdivisions = async (sector, division) => {
    const response = await fetch(`${Config.urlBase}/ciiu/${sector}/${division}/`, this.optionsGet())
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

  getActivities = async (sector, division, subdivision) => {
    const response = await fetch(`${Config.urlBase}/ciiu/${sector}/${division}/${subdivision}/`, this.optionsGet())
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

  getActivity = async (sector, division, subdivision, activity) => {
    const response = await fetch(`${Config.urlBase}/ciiu/${sector}/${division}/${subdivision}/${activity}/`, this.optionsGet())
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

  getCategories = async (filter) => {
    const response = await fetch(`${Config.urlBase}/inspectionCategory/getAll/`, this.optionsPost(filter))
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

  getCategoryById = async (id) => {
    const response = await fetch(`${Config.urlBase}/inspectionCategory/${id}`, this.optionsGet())
      .then((response) => {
        if (response.status === 200) {
          return response.json()
        } else {
          return []
        }
      })
      .then((data) => {
        return data
      })
      .catch((error) => {
        return { message: ErrorMessages[500] }
      })
    return response
  }

  getCategoryItemById = async (id) => {
    const response = await fetch(`${Config.urlBase}/inspectionCategory/item/${id}`, this.optionsGet())
      .then((response) => {
        if (response.status === 200) {
          return response.json()
        } else {
          return []
        }
      })
      .then((data) => {
        return data
      })
      .catch((error) => {
        return { message: ErrorMessages[500] }
      })
    return response
  }

  postCategory = async (category) => {
    console.log("Datos enviados al backend:", category);
    const response = await fetch(`${Config.urlBase}/inspectionCategory/`, this.optionsPost(category))
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        return data
      })
      .catch((error) => {
        console.log(error)
      })
    return response
  }

  patchCategory = async (id, category) => {
    const response = await fetch(`${Config.urlBase}/inspectionCategory/edit/${id}`, this.optionsPatchBody(category))
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        return data
      })
      .catch((error) => {
        console.log(error)
      })
    return response
  }

  patchCategoryItem = async (id, category) => {
    const response = await fetch(`${Config.urlBase}/inspectionCategory/item/edit/${id}`, this.optionsPatchBody(category))
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        return data
      })
      .catch((error) => {
        console.log(error)
      })
    return response
  }

  getSector = (code) => {
    var dictionary = {}
    dictionary['01'] = 'A'
    dictionary['02'] = 'A'
    dictionary['03'] = 'A'
    dictionary['04'] = '0'
    dictionary['05'] = 'B'
    dictionary['06'] = 'B'
    dictionary['07'] = 'B'
    dictionary['08'] = 'B'
    dictionary['09'] = 'B'
    dictionary['10'] = 'C'
    dictionary['11'] = 'C'
    dictionary['12'] = 'C'
    dictionary['13'] = 'C'
    dictionary['14'] = 'C'
    dictionary['15'] = 'C'
    dictionary['16'] = 'C'
    dictionary['17'] = 'C'
    dictionary['18'] = 'C'
    dictionary['19'] = 'C'
    dictionary['20'] = 'C'
    dictionary['21'] = 'C'
    dictionary['22'] = 'C'
    dictionary['23'] = 'C'
    dictionary['24'] = 'C'
    dictionary['25'] = 'C'
    dictionary['26'] = 'C'
    dictionary['27'] = 'C'
    dictionary['28'] = 'C'
    dictionary['29'] = 'C'
    dictionary['30'] = 'C'
    dictionary['31'] = 'C'
    dictionary['32'] = 'C'
    dictionary['33'] = 'C'
    dictionary['34'] = '0'
    dictionary['35'] = 'D'
    dictionary['36'] = 'E'
    dictionary['37'] = 'E'
    dictionary['38'] = 'E'
    dictionary['39'] = 'E'
    dictionary['40'] = '0'
    dictionary['41'] = 'F'
    dictionary['42'] = 'F'
    dictionary['43'] = 'F'
    dictionary['44'] = '0'
    dictionary['45'] = 'G'
    dictionary['46'] = '0'
    dictionary['47'] = 'G'
    dictionary['48'] = '0'
    dictionary['49'] = 'H'
    dictionary['50'] = 'H'
    dictionary['51'] = 'H'
    dictionary['52'] = 'H'
    dictionary['53'] = 'H'
    dictionary['54'] = '0'
    dictionary['55'] = 'I'
    dictionary['56'] = 'I'
    dictionary['57'] = '0'
    dictionary['58'] = 'I'
    dictionary['59'] = 'I'
    dictionary['60'] = 'I'
    dictionary['61'] = 'I'
    dictionary['62'] = 'I'
    dictionary['63'] = 'I'
    dictionary['64'] = 'K'
    dictionary['65'] = 'K'
    dictionary['66'] = 'K'
    dictionary['67'] = '0'
    dictionary['68'] = 'L'
    dictionary['69'] = 'M'
    dictionary['70'] = 'M'
    dictionary['71'] = 'M'
    dictionary['72'] = 'M'
    dictionary['73'] = 'M'
    dictionary['74'] = 'M'
    dictionary['75'] = 'M'
    dictionary['76'] = '0'
    dictionary['77'] = 'N'
    dictionary['78'] = 'N'
    dictionary['79'] = 'N'
    dictionary['80'] = 'N'
    dictionary['81'] = 'N'
    dictionary['82'] = 'N'
    dictionary['83'] = '0'
    dictionary['84'] = 'O'
    dictionary['85'] = 'P'
    dictionary['86'] = 'Q'
    dictionary['87'] = 'Q'
    dictionary['88'] = 'Q'
    dictionary['89'] = '0'
    dictionary['90'] = 'R'
    dictionary['91'] = 'R'
    dictionary['92'] = 'R'
    dictionary['93'] = 'R'
    dictionary['94'] = 'S'
    dictionary['95'] = 'S'
    dictionary['96'] = 'S'
    dictionary['97'] = 'S'
    dictionary['98'] = 'S'
    dictionary['99'] = 'U'
    const response = dictionary[code]
    return response
  }
}

const inspectionService = new InspectionService(Config.urlBase)

export { inspectionService }
