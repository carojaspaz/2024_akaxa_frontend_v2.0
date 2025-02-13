/** @format */

const authData = JSON.parse(sessionStorage.getItem('auth'))
const token = authData.token;

class BaseService {
  constructor() {
    this.language = localStorage.getItem('i18nextLng') ?? 'en'
  }

  paramOptions = () => {
    const options = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Accept-Language': 'en',
      },
    }
    return options
  }

  optionsGet = () => {
    const options = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Accept-Language': this.language,
        Authorization: `${token}`
      },
    }
    return options
  }

  optionSimpleGet = () => {
    const options = {
      method: 'GET',
      headers: {
        Accept: '*/*',
      },
    }
    return options
  }

  optionsGetBody = (data) => {
    const options = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Accept-Language': this.language,
        Authorization: `${token}`
      },
      data: data,
    }
    return options
  }

  optionsPost = (body) => {
    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Accept-Language': this.language,
        Authorization: `${token}`
      },
      body: body,
    }
    return options
  }

  optionsSimplePost = (body) => {
    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Accept-Language': this.language
      },
      body: body,
    }
    return options
  }

  optionsPostTmp = (body) => {
    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Accept-Language': this.language,
        Authorization: `${token}`
      },
      body: body,
    }
    return options
  }

  optionsPut = (body) => {
    const options = {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Accept-Language': this.language,
        Authorization: `${token}`
      },
      body: body,
    }
    return options
  }

  optionsPatch = () => {
    const options = {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Accept-Language': this.language,
        Authorization: `${token}`
      },
    }
    return options
  }

  optionsPatchBody = (body) => {
    const options = {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Accept-Language': this.language,
        Authorization: `${token}`
      },
      body: body,
    }
    return options
  }

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
