import { useEffect, useCallback } from 'react';
import { Route, Switch } from 'react-router';
import { connect } from 'react-redux';
import api from './api';

import Auth from './containers/Auth/Auth'
import TimeClock from './containers/TimeClock/TimeClock';
import Settings from './containers/Settings/Settings';

const App = props => {
    const { onReset, userId, authenticated, authenticate, setContentLoading, setError } = props;

    const getInitialData = useCallback(() => {
        setContentLoading(true);
        const query = {
            query: `
            {
                user(userId: "${userId}") {
                    name
                    timeIn
                }
                records(userId: "${userId}") {
                    timeIn
                    timeOut
                    id
                }
            }
            `
        }
        api.post('/graphql', query).then(response => {
            const userData = response.data.data.user;
            const records = response.data.data.records;
            onReset(userData, records);
            setContentLoading(false);
        }).catch(error => {
            setError(error);
        });
    }, [userId, onReset, setError, setContentLoading]);

    useEffect(() => {
        if (authenticated) {
            getInitialData();
        } else {
            const token = localStorage.getItem('token');
            const userId = localStorage.getItem('userId');
            if (token) {
                authenticate(userId, token);
            }
        }
    }, [getInitialData, authenticated, authenticate, setContentLoading]);

    if (!props.authenticated) {
        return <Auth />
    }

    return (
        <Switch>
            <Route path={['/login', '/signup']} component={Auth} />
            <Route path="/settings" component={Settings} />
            <Route path="/" component={TimeClock} />
        </Switch>
    )
}

const mapStateToProps = state => {
    return {
        authenticated: state.auth.token !== null,
        userId: state.auth.userId
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onReset: (user, records) => dispatch({
            type: 'TIMECLOCK_RESET',
            timeIn: user.timeIn,
            records: records
        }),
        authenticate: (userId, token) => dispatch({
            type: 'AUTH_LOG_IN',
            userId: userId,
            token: token
        }),
        setContentLoading: (loading) => dispatch({
            type: 'TIMECLOCK_LOADING',
            loading: loading
        }),
        setError: (error) => dispatch({
            type: 'AUTH_ERROR',
            error: error
        })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
