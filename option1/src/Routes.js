import React from 'react';
import { withRouter, Router, Route, Switch } from 'react-router-dom';
import history from './History';

import ListView from './views/ListView/';
import RecipeView from './views/RecipeView/';
import RecipeForm from './views/RecipeForm';

const Routes = () => (
    <Router history={history}>
        <Switch>
            <Route 
                exact
                path="/"
            >
                <ListView />
            </Route>
            <Route  path="/recipe/view/:uuid" >
                <RecipeView />
            </Route>
            <Route  path="/recipe/:action/:uuid?" >
                <RecipeForm />
            </Route>
        </Switch>
    </Router>
);

export default withRouter(Routes);

