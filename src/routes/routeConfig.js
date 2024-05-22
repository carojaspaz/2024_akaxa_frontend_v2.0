/** @format */

import { LoginPage } from '../modules/auth'
import { HomePage } from '../modules/home'

const authProtectedRoutes = [{ path: '/home', component: HomePage }]

const publicRoutes = [{ path: '/login', component: LoginPage }]

export { authProtectedRoutes, publicRoutes }
