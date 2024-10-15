/** @format */

const authData = JSON.parse(sessionStorage.getItem('auth'))
//const token = authData.token;
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN1cGVydXNlckBzYWZldHludHJ1c3QuY29tIiwidXNlcm5hbWUiOiJtYXN0ZXIiLCJyb2xlIjoiU3VwZXJBZG1pbiIsImV4cGlyYXRpb24iOiIyMDI0LTExLTA4VDIzOjU5OjU5Ljk5OVoiLCJpYXQiOjE3Mjg0OTk5MTd9.EueGEITQPcgIotrSk5CtuRWq-uOLbj25Jm6h9byhA40'

class BaseService {
  constructor() {
    this.language = localStorage.getItem('i18nextLng') ?? 'en'
  }

  paramOptions = () => ({
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Accept-Language': 'en',
    },
  })

  optionsGet = () => ({
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Accept-Language': this.language,
      Authorization: `${token}`,
    },
  })

  optionSimpleGet = () => ({
    method: 'GET',
    headers: {
      Accept: '*/*',
    },
  })

  optionsGetBody = (data) => ({
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Accept-Language': this.language,
      Authorization: sessionStorage.getItem('auth') || '',
    },
    body: JSON.stringify(data),
  })

  optionsPost = (body) => ({
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Accept-Language': this.language,
      Authorization: `${token}`,
    },
    body: JSON.stringify(body),
  })

  optionsPostTmp = (body) => ({
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Accept-Language': this.language,
      Authorization: sessionStorage.getItem('auth') || '',
    },
    body: JSON.stringify(body),
  })

  optionsPut = (body) => ({
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Accept-Language': this.language,
      Authorization: sessionStorage.getItem('auth') || '',
    },
    body: JSON.stringify(body),
  })

  optionsPatch = () => ({
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Accept-Language': this.language,
      Authorization: sessionStorage.getItem('auth') || '',
    },
  })

  optionsPatchBody = (body) => ({
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Accept-Language': this.language,
      Authorization: sessionStorage.getItem('auth') || '',
    },
    body: JSON.stringify(body),
  })

  optionsGetInoreader = (appId, apiKey) => {
    const options = {
      method: 'GET',
      headers: {
        Host: 'www.inoreader.com',
        Authorization: 'GoogleLogin auth=G"UlCa...Fx',
        AppId: appId,
        AppKey: apiKey,
        mode: 'no-cors',
      },
    }
    console.log(options)
    return options
  }
}

export { BaseService }
