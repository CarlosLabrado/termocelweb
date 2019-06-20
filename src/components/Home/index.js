import React, {Component} from 'react';
import {withAuthorization} from '../Session';

import * as STRINGS from '../../constants/strings';



class HomePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false
        };
    }

    componentDidMount() {
        this.setState({loading: true});
    }


    render() {
        const loading = this.state.loading;

        return (
            <div className="container">
                {loading && <div>{STRINGS.LOADING}</div>}
                <h1>Hola</h1>
            </div>
        );
    }
}

const condition = authUser => !!authUser; // or const condition = authUser => authUser != null;

export default withAuthorization(condition)(HomePage);
