import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    BrowserRouter as Router,
    Switch,
    Redirect
  } from 'react-router-dom';
import { checkingUser } from '../actions/auth';

import { LoginScreen } from '../components/auth/LoginScreen';
import { CalendarScreen } from '../components/calendar/CalendarScreen';
import { Loading } from '../components/loading/Loading';
import {PrivateRoute} from '../router/PrivateRoute'
import {PublicRoute} from '../router/PublicRoute'




export const AppRouter = () => {
    const dispatch = useDispatch()
    const {checking , uuid} = useSelector(state => state.auth)

    useEffect(() => {

        dispatch(checkingUser())

    }, [dispatch])

    if(checking) {
        return <Loading/>
    }

    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute exact path="/login" component={ LoginScreen }  isAuthenticate = {!!uuid}/>      
                    <PrivateRoute exact path="/" component={ CalendarScreen } isAuthenticate = {!!uuid} />
                    <Redirect to="/" />   
                </Switch>
            </div>
        </Router>
    )
}
