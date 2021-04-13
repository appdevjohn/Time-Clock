import { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import api from '../../api';

import Button from '../../components/Button/Button';

import classes from './LogIn.module.css';

const LogIn = props => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loggingIn, setLoggingIn] = useState(false);

    const logIn = event => {
        event.preventDefault();
        setLoggingIn(true);

        const query = {
            query: `
            {
                login(email: "${email}", password: "${password}") {
                    userId
                    token
                }
            }
            `
        }
        api.post('/graphql', query, {
            headers: {
                Authorization: 'Bearer ' + props.token,
                'Content-Type': 'application/json'
            },
        }).then(response => {
            setLoggingIn(false);
            const login = response.data.data.login;
            if (login) {
                const userId = login.userId;
                const token = login.token;
                props.authenticate(userId, token);
            } else {
                alert('Login info is incorrect.');
            }
        }).catch(error => {
            console.error(error);
            setLoggingIn(false);
        });
    }

    if (loggingIn) {
        return (
            <div className={classes.LogIn}>
                <h1>Time Clock</h1>
                <h3>Logging In</h3>
            </div>
        )
    }

    return (
        <div className={classes.LogIn}>
            <h1>Time Clock</h1>
            <h3>Log In</h3>
            <form className={classes.form} onSubmit={logIn}>
                <input
                    className={classes.input}
                    name="email"
                    placeholder="Email"
                    type="email"
                    value={email}
                    onChange={event => setEmail(event.target.value)} />
                <input
                    className={classes.input}
                    name="password"
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={event => setPassword(event.target.value)} />
                <div><Button title="Log In" /></div>
            </form>
            <Link to="/signup" className={classes.link}>or Sign Up</Link>
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        authenticate: (userId, token) => dispatch({
            type: 'AUTH_LOG_IN',
            userId: userId,
            token: token
        }),
        logout: () => dispatch({
            type: 'AUTH_LOG_OUT'
        })
    };
}

export default connect(null, mapDispatchToProps)(LogIn);