import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {compose} from 'recompose';

import {withFirebase} from '../Firebase';
import * as ROUTES from '../../constants/routes';
import * as STRINGS from '../../constants/strings';

const SignUpPage = () => (
    <div className="container">
        <SignUpForm/>
    </div>
);

const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
};

class SignUpFormBase extends Component {
    constructor(props) {
        super(props);
        this.state = {...INITIAL_STATE}
    }

    onSubmit = event => {
        const {username, email, passwordOne} = this.state;

        this.props.firebase
            .doCreateUserWithEmailAndPassword(email, passwordOne)
            .then(authUser => {
                // Create a user in your Firebase realtime database
                return this.props.firebase.user(authUser.user.uid).set({
                        username,
                        email,
                    },
                    {merge: true},
                );
            })
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
        const {
            username,
            email,
            passwordOne,
            passwordTwo,
            error,
        } = this.state;

        const isInvalid =
            passwordOne !== passwordTwo ||
            passwordOne === '' ||
            email === '' ||
            username === '';

        return (
            <form className="pt-4" onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label for="username1">{STRINGS.SIGN_UP_USER_NAME}</label>
                    <input
                        id="username1"
                        className="form-control"
                        name="username"
                        value={username}
                        onChange={this.onChange}
                        type="text"
                        placeholder={STRINGS.SIGN_UP_USER_NAME}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email1">{STRINGS.SIGN_UP_EMAIL}</label>
                    <input
                        id="email1"
                        className="form-control"
                        name="email"
                        value={email}
                        onChange={this.onChange}
                        type="text"
                        placeholder={STRINGS.SIGN_UP_EMAIL}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password1">{STRINGS.SIGN_UP_PASSWORD}</label>
                    <input
                        id="password1"
                        className="form-control"
                        name="passwordOne"
                        value={passwordOne}
                        onChange={this.onChange}
                        type="password"
                        placeholder={STRINGS.SIGN_UP_PASSWORD}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password2">{STRINGS.SIGN_UP_CONFIRM_PASSWORD}</label>
                    <input
                        id="password2"
                        className="form-control"
                        name="passwordTwo"
                        value={passwordTwo}
                        onChange={this.onChange}
                        type="password"
                        placeholder={STRINGS.SIGN_UP_CONFIRM_PASSWORD}
                    />
                </div>
                <button className="btn btn-primary" disabled={isInvalid} type="submit">
                    {STRINGS.SIGN_UP_BUTTON}
                </button>

                {error && <p>{error.message}</p>}
            </form>
        );
    }
}

const SignUpLink = () => (
    <p>
        {STRINGS.SIGN_UP_DONT_HAVE_ACCOUNT} <Link to={ROUTES.SIGN_UP}>{STRINGS.SIGN_UP}</Link>
    </p>
);

const SignUpForm = compose(
    withRouter,
    withFirebase,
)(SignUpFormBase);

export default SignUpPage;

export {SignUpForm, SignUpLink};
