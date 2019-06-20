import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import {withFirebase} from '../Firebase';
import * as ROUTES from '../../constants/routes';
import * as STRINGS from '../../constants/strings';


const PasswordForgetPage = () => (
    <div className="container">
        <PasswordForgetForm/>
    </div>
);

const INITIAL_STATE = {
    email: '',
    error: null,
};

class PasswordForgetFormBase extends Component {
    constructor(props) {
        super(props);

        this.state = {...INITIAL_STATE};
    }

    onSubmit = event => {
        const {email} = this.state;

        this.props.firebase
            .doPasswordReset(email)
            .then(() => {
                this.setState({...INITIAL_STATE});
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
        const {email, error} = this.state;

        const isInvalid = email === '';

        return (
            <form className="pt-4" onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label htmlFor="inputEmail1">{STRINGS.PWD_FT_PASSWORD_RECOVERY}</label>
                    <input
                        id="inputEmail1"
                        className="form-control"
                        name="email"
                        value={this.state.email}
                        onChange={this.onChange}
                        type="text"
                        placeholder={STRINGS.PWD_FT_EMAIL_ADDRESS}
                    />
                </div>
                <button className="btn btn-primary" disabled={isInvalid} type="submit">
                    {STRINGS.PWD_FT_SUBMIT_BUTTON}
                </button>

                {error && <p>{error.message}</p>}
            </form>
        );
    }
}

const PasswordForgetLink = () => (
    <p>
        <Link to={ROUTES.PASSWORD_FORGET}>{STRINGS.PWD_FT_FORGOT_PASSWORD}</Link>
    </p>
);

export default PasswordForgetPage;

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export {PasswordForgetForm, PasswordForgetLink};
