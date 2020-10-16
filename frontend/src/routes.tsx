import React from 'react';

import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Landing from './pages/landing';
import OrphanatesMap from './pages/OrphanagesMap';
import Orphanage from './pages/Orphanage';
import CreateOrphanage from './pages/CreateOrphanage';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Landing}/>
        <Route path="/app" component={OrphanatesMap}/>

        <Route path="/orphanages/create" component={CreateOrphanage}/>
        <Route path="/orphanages/:id" component={Orphanage}/>
      </Switch>
    </BrowserRouter>
  );
}

