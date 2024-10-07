/** @format */

const urlBase = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/v1'
const nodeEnv = process.env.REACT_APP_NODE_ENV || 'development'
export const Config = {
  urlBase: urlBase,
  nodeEnv: nodeEnv,
  apiKey: 'AIzaSyCB8YbANdqp1484dMiVpKj_ofXLeXDHJ6w',
  lat: 4,
  lng: -72,
}


export const ErrorMessages = {
  500: 'Error de sistema intenta mas tarde',
}

export const ToasterTypes = {
  Success: 1,
  Info: 2,
  Warning: 3,
  Error: 4
}

export const ParamTypes = {
  documentTypes: "documentTypes",
  phoneTypes: "phoneTypes",
  studyLeverTypes: "studyLevelTypes",
  profileTypes: "profileTypes",
  scheduleTypes: "scheduleTypes"
}

export const Patterns = {
  movilPattern: '^3[0-9]{9}$',
  movilPlaceholder: '33333333',
  landPattern: '^[1-8][0-9]{7}$',
  landPlaceholder: '22222222',
  emailPattern: '^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$',
  emailPlaceholder: 'example@domain.com',
  passwordPattern: '^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$'
}
