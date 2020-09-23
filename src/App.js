import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import { PhotosList } from './features/photos/PhotosList'
import { SinglePhotoPage } from './features/photos/SinglePhotoPage'
import { Auth } from './api/Auth.js'

function App() {
  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <React.Fragment>
              <PhotosList />
            </React.Fragment>
          )}
        />
        <Route exact path="/photos/:photoId" component={SinglePhotoPage} />
        <Route path="/auth" component={Auth} />
        <Redirect to="/" />
      </Switch>
    </Router>
  )
}

export default App