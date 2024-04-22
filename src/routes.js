import React from 'react'

const Restaurant = React.lazy(() => import('./components/Content/Restaurants'))
const Menu = React.lazy(() => import('./components/Content/Menu'))


const routes = [
    { path: '/', exact: true, name: 'Restaurants Page', element: Restaurant },
    { path: '/restaurants/:restaurant_name', exact: true, name: 'Menu Page', element: Menu }
]


export default routes