import React, { useEffect } from 'react';
import { useLocation } from 'react-router';
import { Route, Redirect, Switch } from "react-router-dom";
import { ROUTES_PATH } from '../../Constants/Routes';
import CategoryDashboardContainer from '../../Containers/CategoryListContainer';
import ItemListViewContainer from '../../Containers/ItemListViewContainer';
import ItemDetailsContainer from '../../Containers/ItemDetailsContainer';
import CheckoutContainer from '../../Containers/CheckoutItemContainers';
import CheckinContainer from '../../Containers/CheckinContainer';
import Booking from '../Booking';
import InvoiceContainer from 'src/Containers/InvoiceContainer';


const RouterWrapper = () => {
    const location = useLocation();
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
          });           
    },[location.pathname])

    return (
        <div>
            <Switch>
                <Route exact path={ROUTES_PATH.CATEGORY_LIST} component={CategoryDashboardContainer} />
                <Route exact path={ROUTES_PATH.ITEM_LIST} component={ItemListViewContainer} />
                <Route exact path={ROUTES_PATH.ITEM_DETAILS} component={ItemDetailsContainer} />
                <Route exact path={ROUTES_PATH.CHECKOUT} component={CheckoutContainer} />
                <Route exact path={ROUTES_PATH.INVOICE} component={InvoiceContainer} />
                <Route exact path={ROUTES_PATH.BOOK} component={Booking} />
                <Route exact path={ROUTES_PATH.ROOT} component={CheckinContainer} />
            </Switch>
        </div>
    )
}

export default RouterWrapper;