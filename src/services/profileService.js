/** @format */
import { BaseService } from './baseService'
import { Config, ErrorMessages } from '../helpers/config/constants'

class ProfileService extends BaseService {
    constructor(urlBase) {
      super();
      this.urlBase = urlBase;
    }
    getProfile = async (id) =>{
      const response = await fetch(`${this.urlBase}profile/${id}`,this.optionsGet()) //
      .then((response) => {
          return response.json();
        })
        .then((data) => {
          return data;
        })
        .catch((error) => {
          console.log(error);
        });
      return response; 
    }
    
    updatePic =async (id, data) =>{
      const formData = new FormData()
      formData.append('profile', data)
      const options = {
        method: 'POST',
        headers: {
          'Accept-Language': 'es',
          Authorization: sessionStorage.getItem('authUser'),
        },
        body: formData
      }
      const url = Config.urlBase.concat('profile/pic/', id);
      const response = await fetch(url, options)
      .then((response) => {
        return response.json
      })
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.log(error);
      });
      return response;        
    }
  
    addDocEvidence =async (id, data, type) =>{
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
      const response = await fetch(`${this.urlBase}profile/partner/docevidence/${type}/${id}`, options)
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
    addEvidence =async (id, raw, type) =>{    
      const response = await fetch(`${this.urlBase}profile/operator/evidence/${type}/${id}`, this.optionsPost(raw))
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
    deleteEvidence =async (raw) =>{    
      const response = await fetch(`${this.urlBase}profile/operator/evidence/`, this.optionsPatchBody(raw))
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
    postProfileAdmin = async (body) => {
      const response = await fetch(`${Config.urlBase}/profile/admin/`,this.optionsPost(body))
      .then((response) => {
          return response.json();
        })
        .then((data) => {
          return data;
        })
        .catch((error) => {
          return { message: ErrorMessages[500] }
        });
      return response;    
    }
    putProfileAdmin = async (body, id) => {
      const response = await fetch(`${this.urlBase}profile/admin/${id}`,this.optionsPut(body))
      .then((response) => {
          return response.json();
        })
        .then((data) => {
          return data;
        })
        .catch((error) => {
          return { message: ErrorMessages[500] }
        });
      return response;
    };
    putProfileClient = async (body, id) => {
      const response = await fetch(`${this.urlBase}profile/client/${id}`,this.optionsPut(body))
      .then((response) => {
          return response.json();
        })
        .then((data) => {
          return data;
        })
        .catch((error) => {
          return { message: ErrorMessages[500] }
        });
      return response;
    };
    putProfileOperator = async (body,id) => {
      const response = await fetch(`${this.urlBase}profile/operator/${id}`,this.optionsPut(body))
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          return data;
        })
        .catch((error) => {
          return { message: ErrorMessages[500] }
        });
      return response;
    };
    putProfilePartner = async (body,id) => {
      const response = await fetch(`${this.urlBase}profile/partner/${id}`,this.optionsPut(body))
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          return data;
        })
        .catch((error) => {
          return { message: ErrorMessages[500] }
        });
      return response;
    };
    getPartnerId = async (id)=>{
      const response = await fetch(`${this.urlBase}profile/${id}`, this.optionsGet())
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          return data;
        })
        .catch((error) => {
          return { message: ErrorMessages[500] }
        });
      return response;
    }
    toggleApprovePartner = async (id) => {
      const response = await fetch(`${this.urlBase}profile/partner/toggleApprove/${id}`, this.optionsPatch())
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          return data;
        })
        .catch((error) => {
          return { message: ErrorMessages[500] }
        });
      return response;
    };
  }
  
  export const profileService = new ProfileService()