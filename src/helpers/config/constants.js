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

export const HttpCodes = {
  ok: 200,
  acepted: 202,
  badRequest: 400,
  forbidden: 403,
}

export const ErrorMessages = {
  500: 'Error de sistema intenta mas tarde',
}

export const langjson = {
  esp: 'es',
  eng: 'en',
}

export const ParamTypes = {
  documentTypes: 'documentTypes',
  phoneTypes: 'phoneTypes',
  studyLeverTypes: 'studyLevelTypes',
  profileTypes: 'profileTypes',
  scheduleTypes: 'scheduleTypes',
}

export const ToasterTypes = {
  Success: 'success',
  Info: 'info',
  Warning: 'warning',
  Error: 'error',
};

export const rolesName = {
  super: 'SuperAdmin',
  admin: 'Admin',
  operator: 'Operator',
  client: 'Client',
  associated: 'Associated',
}

export const Patterns = {
  movilPattern: '^3[0-9]{9}$',
  movilPlaceholder: '33333333',
  landPattern: '^[1-8][0-9]{7}$',
  landPlaceholder: '22222222',
  emailPattern: '^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$',
  emailPlaceholder: 'example@domain.com',
  passwordPattern: '^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$',
}

export const TypePhone = {
  movil: 'Movil',
  land: 'Land',
}

export const Protocols = {
  minValue: 0,
  maxValue: 10,
  step: 1,
}

export const Studies = {
  maxYearsAgo: 40,
}

export const Inoreader = {
  appId: 999999587,
  apiKey: 'MiHYA_z7xiqiKpLIBo_U7Ss87hadYe3G',
  urlBack: process.env.REACT_INOREADER || 'http://localhost:3000/inoreader',
  urlInoreader: 'https://www.inoreader.com/reader/api/0',
  csrfProtection: 'AIzaSy',
}

/*export const MainPage = {
  images: [bg1, bg2, bg3],
  admin: admin,
  client: client,
  operator: operator
}*/
