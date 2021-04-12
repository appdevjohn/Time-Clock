import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import SignUp from '../SignUp/SignUp';
import LogIn from '../LogIn/LogIn';

import classes from './Auth.module.css';

const Auth = props => {
    if (props.authenticated) {
        return <Redirect path="/" />
    }

    return (
        <div className={classes.Auth}>
            <Switch>
                <Route path="/signup" component={SignUp} />
                <Route path="/" component={LogIn} />
            </Switch>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        authenticated: state.auth.token !== null
    };
}

export default connect(mapStateToProps)(Auth);