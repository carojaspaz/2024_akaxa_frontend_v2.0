import { BaseService } from "./baseService";
import { Config } from "../helpers/config/constants";

class ItemService extends BaseService {
  constructor(urlBase) {
    super();
    this.urlBase = urlBase;
  }
  getCategory = async (body) => {
    const response = await fetch(
      `${this.urlBase}inspectionCategory/`,this.optionsGetBody(body))
      .then((response) => {
          console.log(response);
        return response.json();
      })
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.log(error);
      });
    return response;
  };

  getAllItems = async()=>{
    const response = await fetch(`${this.urlBase}inspectionCategory/getAll/items/`, this.optionsGet())
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

  getItemsByCategoryId = async (id) => {
    const response = await fetch(`${this.urlBase}inspectionCategory/items/${id}`, this.optionsGet())
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
  };
  postItem = async (body) => {
    const response = await fetch(
      `${this.urlBase}inspectionCategory/item/`,
      this.optionsPost(body)
    )
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
  };
}

const itemService = new ItemService(Config.urlBase);
export { itemService };
