import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import { PhotosList } from './features/photos/PhotosList'
import { SinglePhotoPage } from './features/photos/SinglePhotoPage'
import { Auth } from './api/Auth.js'

import './features/photos/styles/font-faces.css'
import './features/photos/styles/normalize.css'
import './features/photos/styles/loading-animation.css'
import './features/photos/styles/mansory-grid.css'
import './features/photos/styles/header.css'
import './features/photos/styles/photo-list.css'
import './features/photos/styles/single-photo-page.css'

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