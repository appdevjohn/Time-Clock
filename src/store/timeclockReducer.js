const initialState = {
    status: 'Clocked Out',
    clockInTime: null,
    records: [],
    totalMonthHours: 0,
    totalWeekHours: 0,
    loading: false
}

const resetState = (state, action) => {
    const records = action.records.map(r => {
        return {
            timeIn: new Date(r.timeIn),
            timeOut: new Date(r.timeOut),
            id: r.id
        }
    });

    const date = new Date();
    const firstOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const firstOfWeek = new Date(date.setDate(date.getDate() - date.getDay()));
    let monthHours = 0;
    let weekHours = 0;
    records.forEach(r => {
        const difference = (r.timeOut.getTime() - r.timeIn.getTime()) / (60 * 60 * 1000);
        const hours = difference;
        if (r.timeIn.getTime() > firstOfMonth.getTime()) {
            monthHours += hours;
        }
        if (r.timeIn.getTime() > firstOfWeek.getTime()) {
            weekHours += hours;
        }
    });

    return {
        ...state,
        status: action.timeIn ? 'Clocked In' : 'Clocked Out',
        clockInTime: action.timeIn ? new Date(action.timeIn) : null,
        records: records,
        totalMonthHours: monthHours,
        totalWeekHours: weekHours
    }
}

const toggle = (state, action) => {
    if (state.status === 'Clocked In') {
        return {
            ...state,
            status: 'Clocked Out',
            clockInTime: null
        }
    } else {
        return {
            ...state,
            status: 'Clocked In',
            clockInTime: new Date()
        }
    }
}

const addRecord = (state, action) => {
    const record = {
        timeIn: action.timeIn,
        timeOut: action.timeOut
    }
    const newRecords = state.records.map(r => ({ ...r }));
    newRecords.push(record);

    const date = new Date();
    const firstOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const firstOfWeek = new Date(date.setDate(date.getDate() - date.getDay()));
    let monthHours = 0;
    let weekHours = 0;
    newRecords.forEach(r => {
        const difference = (r.timeOut.getTime() - r.timeIn.getTime()) / (60 * 60 * 1000);
        const hours = difference;
        if (r.timeIn.getTime() > firstOfMonth.getTime()) {
            monthHours += hours;
        }
        if (r.timeIn.getTime() > firstOfWeek.getTime()) {
            weekHours += hours;
        }
    });

    return {
        ...state,
        records: newRecords,
        totalMonthHours: monthHours,
        totalWeekHours: weekHours
    }
}

const setTotalHours = (state, action) => {
    return {
        ...state,
        totalMonthHours: action.monthHours,
        totalWeekHours: action.weekHours
    }
}

const setLoading = (state, action) => {
    return {
        ...state,
        loading: action.loading
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'TIMECLOCK_RESET': return resetState(state, action)
        case 'TIMECLOCK_TOGGLE': return toggle(state, action)
        case 'TIMECLOCK_ADD_RECORD': return addRecord(state, action)
        case 'TIMECLOCK_SET_TOTALS': return setTotalHours(state, action)
        case 'TIMECLOCK_LOADING': return setLoading(state, action)
        default: return state;
    }
}

export default reducer;