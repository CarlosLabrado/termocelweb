import React from 'react';

import {withFirebase} from '.././Firebase';
import * as STRINGS from '../../constants/strings';

const SignOutButton = ({firebase}) => (
    <button className="btn btn-block btn-light btn-outline-danger" type="button" onClick={firebase.doSignOut}>
        {STRINGS.SIGN_OUT_BUTTON}
    </button>
);

export default withFirebase(SignOutButton);
