import React       from 'react'
//import { connect } from 'react-redux'
import {
  BrowserRouter, Switch
} from 'react-router-dom'
import {
  RouteActor,
  RouteFunctor
} from './routes'

class App extends React.Component {
  render(){
    return(
      <BrowserRouter>
        <div>
          <Switch>
            {
              RouteFunctor.map( (route,key) => (
                <RouteActor key={key} {...route} />
              ))
            }
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default App
