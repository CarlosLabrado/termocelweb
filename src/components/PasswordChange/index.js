import React, {Component} from 'react';

import {withFirebase} from 'src/components/Firebase';

import * as STRINGS from '../../constants/strings';

const INITIAL_STATE = {
    passwordOne: '',
    passwordTwo: '',
    error: null,
};

class PasswordChangeForm extends Component {
    constructor(props) {
        super(props);

        this.state = {...INITIAL_STATE};
    }

    onSubmit = event => {
        const {passwordOne} = this.state;

        this.props.firebase
            .doPasswordUpdate(passwordOne)
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
        const {passwordOne, passwordTwo, error} = this.state;

        const isInvalid =
            passwordOne !== passwordTwo || passwordOne === '';

        return (
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label for="password1">{STRINGS.PWD_CH_NEW_PASS}</label>
                    <input
                        id="password1"
                        className="form-control"
                        name="passwordOne"
                        value={passwordOne}
                        onChange={this.onChange}
                        type="password"
                        placeholder={STRINGS.PWD_CH_NEW_PASS}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password1">{STRINGS.PWD_CH_CONFIRM_PASS}</label>
                    <input
                        id="password2"
                        className="form-control"
                        name="passwordTwo"
                        value={passwordTwo}
                        onChange={this.onChange}
                        type="password"
                        placeholder={STRINGS.PWD_CH_CONFIRM_PASS}
                    />
                </div>
                <button className="btn btn-primary" disabled={isInvalid} type="submit">
                    {STRINGS.PWD_CH_SUBMIT_BUTTON}
                </button>

                {error && <p>{error.message}</p>}
            </form>
        );
    }
}

export default withFirebase(PasswordChangeForm);
