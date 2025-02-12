import { BaseService } from "./baseService";
import { Config, ErrorMessages } from "../helpers/config/constants";

class ScheduleService extends BaseService {
  constructor(urlBase) {
    super();
    this.urlBase = urlBase;
  }
  getActionPlan = async (id) => {
    const response = await fetch(`${this.urlBase}audit/planAction/${id}`, this.optionsGet())
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
  getScheduleAll = async ()=>{
    const response = await fetch(`${this.urlBase}protocol/schedule/all`, this.optionsGet())
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
  getAuditAll = async ()=>{
    const response = await fetch(`${this.urlBase}/audit`, this.optionsGet())
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
  getAuditAllByClient = async (id)=>{
    const response = await fetch(`${this.urlBase}audit/${id}`, this.optionsGet())
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
  getAuditAllByProfileClient = async (id)=>{
    const response = await fetch(`${this.urlBase}audit/client/${id}`, this.optionsGet())
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
  getScheduleViewByOperator = async (id)=>{
    const response = await fetch(`${this.urlBase}protocol/schedule/byOperator/${id}`, this.optionsGet())
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
  getScheduleViewByAudit = async (id)=>{
    const response = await fetch(`${this.urlBase}protocol/schedule/byAuditor/${id}`, this.optionsGet())
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
  getScheduleViewByVerify = async (id)=>{
    const response = await fetch(`${this.urlBase}protocol/schedule/byVerify/${id}`, this.optionsGet())
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
  getScheduleViewByClient = async (id)=>{
    const response = await fetch(`${this.urlBase}protocol/schedule/byClient/${id}`, this.optionsGet())
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
  getScheduleById = async(id)=>{
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
  }
  postSchedule = async (body) => {
    const response = await fetch(`${this.urlBase}protocol/schedule/`, this.optionsPost(body))
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

  patchProtocolScheduleUpdateStatus = (id, status) =>{
    fetch(`${this.urlBase}/protocol/schedule/updateStatus/${id}/${status}`, this.optionsPatch())
  }
}

const scheduleService = new ScheduleService(Config.urlBase);

export { scheduleService };