/** @format */

import React from 'react'
import { useTranslation } from 'react-i18next'

const LoginPage = () => {
  const { t } = useTranslation()

  const handleLogin = () => {
    sessionStorage.setItem('auth', 'true')
    window.location.href = '/home'
  }

  return (
    <div>
      <h1>{t('login.title')}</h1>
      <form>
        <div>
          <label htmlFor="username">{t('login.username')}</label>
          <input type="text" id="username" name="username" />
        </div>
        <div>
          <label htmlFor="password">{t('login.password')}</label>
          <input type="password" id="password" name="password" />
        </div>
        <button type="submit">{t('login.loginButton')}</button>
      </form>
    </div>
  )
}

export default LoginPage
