import { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import api from '../../api';

import Button from '../../components/Button/Button';

import classes from './SignUp.module.css';

const SignUp = props => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const signUp = event => {
        event.preventDefault();

        if (password === confirmPassword) {
            const query = {
                query: `
                mutation {
                    signUp(name: "${name}", email: "${email}", password: "${password}") {
                        userId
                        token
                    }
                }
                `
            }
            api.post('/graphql', query).then(response => {
                const signUp = response.data.data.signUp;
                if (signUp) {
                    const userId = signUp.userId;
                    const token = signUp.token;
                    props.authenticate(userId, token);
                }
            }).catch(error => console.error(error));
        }
    }

    return (
        <div className={classes.SignUp}>
            <h1>Time Clock</h1>
            <h3>Sign Up</h3>
            <form className={classes.form} onSubmit={signUp}>
                <input
                    className={classes.input}
                    name="name"
                    placeholder="Name"
                    type="text"
                    value={name}
                    onChange={event => setName(event.target.value)} />
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
                <input
                    className={classes.input}
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    type="password"
                    value={confirmPassword}
                    onChange={event => setConfirmPassword(event.target.value)} />
                <div><Button title="Sign Up" /></div>
            </form>
            <Link to="/login" className={classes.link}>or Log In</Link>
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

export default connect(null, mapDispatchToProps)(SignUp);