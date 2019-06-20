import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {compose} from 'recompose';

import {SignUpLink} from '.././SignUp';
import {PasswordForgetLink} from '.././PasswordForget';
import {withFirebase} from '../Firebase';
import * as ROUTES from '../../constants/routes';

import * as STRINGS from '../../constants/strings';

const SignInPage = () => (
    <div className="container m-3">
        <SignInForm/>
        <div className="pt-3 pb-2 align-items-center">
            <PasswordForgetLink/>
        </div>
        <SignUpLink/>
    </div>
);

const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
};

class SignInFormBase extends Component {
    constructor(props) {
        super(props);

        this.state = {...INITIAL_STATE};
    }

    onSubmit = event => {
        const {email, password} = this.state;

        this.props.firebase
            .doSignInWithEmailAndPassword(email, password)
            .then(() => {
                this.setState({...INITIAL_STATE});
                this.props.history.push(ROUTES.HOME);
            })
            .catch(error => {
                this.setState({error});
            });

        event.preventDefault();
    };

    onChange = event => {
        this.setState({[event.target.name]: event.target.value});
    };

    render() {
        const {email, password, error} = this.state;

        const isInvalid = password === '' || email === '';

        return (
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">{STRINGS.SIGN_IN_EMAIL}</label>
                    <input
                        id="exampleInputEmail1"
                        className="form-control"
                        name="email"
                        value={email}
                        onChange={this.onChange}
                        type="text"
                        placeholder={STRINGS.SIGN_IN_EMAIL}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">{STRINGS.SIGN_IN_PASSWORD}</label>
                    <input
                        id="exampleInputPassword1"
                        className="form-control"
                        name="password"
                        value={password}
                        onChange={this.onChange}
                        type="password"
                        placeholder={STRINGS.SIGN_IN_PASSWORD}
                    />
                </div>
                <button className="btn btn-primary" disabled={isInvalid} type="submit">
                    {STRINGS.SIGN_IN_BUTTON}
                </button>

                {error && <p>{error.message}</p>}
            </form>
        );
    }
}

const SignInForm = compose(
    withRouter,
    withFirebase,
)(SignInFormBase);

export default SignInPage;

export {SignInForm};
