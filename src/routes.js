import R         from 'ramda'
import React     from 'react'
import Qs        from 'qs'
import { Route } from 'react-router-dom'

import Home      from './containers/home.js'
import Page      from './containers/page.js'

const FROM_INDEX = 1

const parseQuery = props => R.compose(
  R.when(R.isEmpty, R.always({})),
  Qs.parse,
  R.slice(FROM_INDEX, Infinity)
)(props)

const RouteFunctor = [
  { path: '/', component: Home, exact: true },
  { path: '/:slug', component: Page }
]

const RouteActor = route => {
  return(
    <Route
      path={route.path}
      exact={route.exact}
      render={
        props => {
          const _props = parseQuery(props)
          return <route.component {..._props} routes={route.sub_routes} />
        }
      }
    />
  )
}

export {
  RouteActor,
  RouteFunctor
}
