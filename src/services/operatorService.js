/** @format */
import { BaseService } from './baseService'
import { Config } from '../helpers/config/constants'

class OperatorService extends BaseService {
  constructor() {
    super();    
  }
  getOperators = async () => {
    const response = await fetch(`${Config.urlBase}/operator`, this.optionsGet())
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
  getOperatorId = async (id)=>{
    const response = await fetch(`${Config.urlBase}/operator/${id}`, this.optionsGet())
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
  toggleApproveOperator = async (id) => {
    const response = await fetch(`${Config.urlBase}/operator/toggleApprove/${id}`, this.optionsPatch())
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
  getOperatorsParent = async () => {
    const response = await fetch(`${Config.urlBase}/profile/operators/parents`, this.optionsGet())
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
  getOperatorsByParent = async (id) => {
    const response = await fetch(`${Config.urlBase}/profile/operators/byparent/${id}`, this.optionsGet())
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
  getOperatorsByAudit = async () => {
    const response = await fetch(`${Config.urlBase}/profile/operators/audit/`, this.optionsGet())
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
  getOperatorsByOperatorAudit = async (id) => {
    const response = await fetch(`${Config.urlBase}/profile/operators/byparent/${id}`, this.optionsGet())
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
  postOperator = async(body, isLegal)=>{
    let url = `${Config.urlBase}/operator/natural`
    if(isLegal){
      url = `${Config.urlBase}/operator/legal`
    }
    const response = await fetch(url,this.optionsPost(body))
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
  postPartner = async(body)=>{ 
    const response = await fetch(`${Config.urlBase}/profile/partner`,this.optionsPost(body))
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

export const operatorService = new OperatorService()
