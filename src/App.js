import { useEffect, useCallback } from 'react';
import { Route, Switch } from 'react-router';
import { connect } from 'react-redux';
import api from './api';

import Auth from './containers/Auth/Auth'
import TimeClock from './containers/TimeClock/TimeClock';
import Settings from './containers/Settings/Settings';

const App = props => {
    const { onReset, userId, token, authenticated, authenticate, setContentLoading, setError } = props;

    const getInitialData = useCallback(() => {
        setContentLoading(true);
        const query = {
            query: `
            {
                user(userId: "${userId}") {
                    name
                    timeIn
                    records {
                        timeIn
                        timeOut
                    }
                }
            }
            `
        }
        api.post('/graphql', query, {
            headers: {
                Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
        }).then(response => {
            if (response.data.errors?.length > 0) {
                setError(response.data.errors[0].message);
            } else {
                const userData = response.data.data.user;
                onReset(userData, userData.records);
            }
            setContentLoading(false);
        }).catch(error => {
            setContentLoading(false);
            setError(error);
        });
    }, [userId, token, onReset, setError, setContentLoading]);

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

    return (
        <Switch>
            <Route path={['/login', '/signup', '/auth']} component={Auth} />
            <Route path="/settings" component={Settings} />
            <Route path="/" component={TimeClock} />
        </Switch>
    )
}

const mapStateToProps = state => {
    return {
        authenticated: state.auth.token !== null,
        userId: state.auth.userId,
        token: state.auth.token
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
