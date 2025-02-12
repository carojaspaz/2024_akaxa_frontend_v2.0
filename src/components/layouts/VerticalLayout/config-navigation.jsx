/** @format */

import SvgColor from '../../common/SvgColor/Svg-Color'

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />

const navConfig = [
  {
    title: 'home',
    path: '/',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Admin',
    path: '/admin',
    icon: icon('ic_cart'),
  },
  {
    title: 'Clients',
    path: '/clients',
    icon: icon('ic_user'),
  },
  {
    title: 'Operators',
    path: '/operators',
    icon: icon('ic_cart'),
  },
  {
    title: 'Audits',
    path: '/audits',
    icon: icon('ic_user'),
  },
  {
    title: 'inspection',
    path: '/CheckListsViewInspectionCategories',
    icon: icon('ic_analytics'),
   },
  {
    title: 'Parameters',
    path: '/params',
    icon: icon('ic_cart'),
  },
  {
   title: 'Evaluations',
    path: '/protocols',
    icon: icon('ic_blog'),
  },
  
  
  // {
  //   title: 'login',
  //   path: '/login',
  //   icon: icon('ic_lock'),
  // },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: icon('ic_disabled'),
  // },
]

export default navConfig
