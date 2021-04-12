const initialState = {
    token: null,
    userId: null,
    error: null
}

const authenticate = (state, action) => {
    localStorage.setItem('userId', action.userId);
    localStorage.setItem('token', action.token);
    return {
        ...state,
        userId: action.userId,
        token: action.token
    }
}



const setError = (state, action) => {
    return {
        ...state,
        error: action.error
    }
}

const logout = (state, action) => {
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    return {
        ...state,
        userId: null,
        token: null
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'AUTH_LOG_IN': return authenticate(state, action);
        case 'AUTH_LOG_OUT': return logout(state, action);
        case 'AUTH_ERROR': return setError(state, action);
        default: return state;
    }
}

export default reducer;