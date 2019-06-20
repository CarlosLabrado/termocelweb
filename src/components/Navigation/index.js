import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import SignOutButton from '.././SignOut';
import * as ROUTES from '../../constants/routes';

import {AuthUserContext} from '../Session';
import logo from '../../logo.svg';
import * as STRINGS from '../../constants/strings';

const Navigation = () => (
    <div>
        <AuthUserContext.Consumer>
            {authUser =>
                authUser ? <NavigationAuth/> : <NavigationNonAuth/>
            }
        </AuthUserContext.Consumer>
    </div>
);

const NavigationAuth = () => (
    <nav className="navbar navbar-expand-lg navbar-light bg-primary">
        <a className="navbar-brand" href="#">
            <img src={logo} height="30" className="bg-primary" alt="Responsive image"/>
        </a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navBarTop"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navBarTop">
            <ul className="navbar-nav">
                <li className="nav-item active">
                    <Link className="nav-link" to={ROUTES.LANDING}><span
                        className="text-white">{STRINGS.ROUTE_LANDING}</span></Link>
                </li>
                <li className="nav-item active">
                    <Link className="nav-link" to={ROUTES.HOME}><span className="text-white">{STRINGS.ROUTE_HOME}</span></Link>
                </li>
                <li className="nav-item active">
                    <SignOutButton/>
                </li>
            </ul>
        </div>
    </nav>
);

const NavigationNonAuth = () => (
    <nav className="navbar navbar-expand-lg navbar-light bg-primary">
        <a className="navbar-brand" href="#">
            <img src={logo} height="30" className="bg-primary" alt="Responsive image"/>
        </a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navBarTop"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navBarTop">
            <ul className="navbar-nav">
                <li className="nav-item active">
                    <Link className="nav-link" to={ROUTES.LANDING}><span
                        className="text-white">{STRINGS.ROUTE_LANDING}</span></Link>
                </li>
                <li className="nav-item active">
                    <Link className="nav-link" to={ROUTES.SIGN_IN}><span
                        className="text-white">{STRINGS.ROUTE_SIGN_IN}</span></Link>
                </li>
            </ul>
        </div>
    </nav>

);

export default Navigation;
