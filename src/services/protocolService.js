import { BaseService } from './baseService'
import { Config, ErrorMessages } from '../helpers/config/constants'

class ProtocolService extends BaseService {
  constructor(urlBase) {
    super();
    this.urlBase = urlBase;
  }

  saveProtocol = async (body) => {
    const response = await fetch(`${this.urlBase}protocol/`, this.optionsPost(body))
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

  getProtocols = async () => {
    const response = await fetch(`${this.urlBase}protocol/`, this.optionsGet())
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

  getReputationalImpact = async () => {
    const response = await fetch(`${this.urlBase}protocol/audit/reputationalImpact/getAll/`, this.optionsGet())
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

  getAudit = async (id) => {
    const response = await fetch(`${this.urlBase}protocol/audit/${id}`, this.optionsGet())
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
  getProtocolScheduled = async (id) => {
    const response = await fetch(`${this.urlBase}protocol/schedule/byId/${id}`, this.optionsGet())
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

  getProtocolsNameIdByCuii = async (body) => {
    const response = await fetch(`${this.urlBase}protocol/ciiu/name`, this.optionsPost(body))
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

  getProtocolsNameId = async () => {
    const response = await fetch(`${this.urlBase}protocol/`, this.optionsGet())
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

  getProtocolById = async (id) => {
    const response = await fetch(`${this.urlBase}protocol/${id}/`, this.optionsGet())
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
  putUpdateProtocol=async(id, body)=>{    
    const response = await fetch(`${this.urlBase}protocol/${id}`,this.optionsPut(body))
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

  postProtocolsBySector = async(body)=>{
    const response = await fetch(`${this.urlBase}/protocol/ciiu/`, this.optionsPost(body))
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
}

const protocolService = new ProtocolService(Config.urlBase);

export { protocolService };
