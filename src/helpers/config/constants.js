/** @format */

const urlBase = process.env.REACT_APP_API_URL || 'http://localhost:4000/api/v1'
const nodeEnv = process.env.REACT_APP_NODE_ENV || 'development'
export const Config = {
  urlBase: urlBase,
  nodeEnv: nodeEnv,
  apiKey: 'AIzaSyCB8YbANdqp1484dMiVpKj_ofXLeXDHJ6w',
  lat: 4,
  lng: -72,
}
