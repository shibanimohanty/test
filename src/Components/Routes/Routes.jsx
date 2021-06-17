import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import RouterWrapper from './RouteWrapper';
import history from '../../Helpers/history';


const Routes = () => {

    return (
        <Router history={history}>
            <RouterWrapper/>
        </Router>
    )
}

export default Routes;