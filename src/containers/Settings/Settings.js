import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from '../../components/Header/Header';
import Button from '../../components/Button/Button';

import classes from './Settings.module.css';

const Settings = props => {
    if (!props.authenticated) {
        return <Redirect to="/login" />
    }

    return (
        <div className={classes.Settings}>
            <Header name="Settings" />
            <Button title="Log Out" onClick={() => {
                props.logout();
            }} />
        </div>
    )
}

const mapStateToProps = state => {
    return {
        authenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch({
            type: 'AUTH_LOG_OUT'
        })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);