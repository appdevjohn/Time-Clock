import { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import api from '../../api';

import Header from '../../components/Header/Header';
import Stopwatch from '../../components/Stopwatch/Stopwatch';
import Table from '../../components/Table/Table';
import Button from '../../components/Button/Button';

import classes from './TimeClock.module.css';

const TimeClock = props => {
    const { clockInTime, userId } = props;
    const [stopwatchActive, setStopWatchActive] = useState(clockInTime !== null);

    const apiClockIn = useCallback(() => {
        const query = {
            query: `
            mutation {
                setUser(id: "${userId}", timeIn: "${clockInTime}") {
                    timeIn
                }
            }
            `
        }
        api.post('/graphql', query).then(response => {
            console.log(response);
        }).catch(error => console.error(error));
    }, [userId, clockInTime]);

    const apiClockOut = () => {
        const query = {
            query: `
            mutation {
                setUser(id: "${userId}", timeIn: null) {
                    timeIn
                }
                addRecord(timeIn: "${clockInTime}", timeOut: "${new Date()}", userId: "${userId}") {
                    id
                    timeIn
                    timeOut
                }
            }
            `
        }
        api.post('/graphql', query).then(response => {
            console.log(response);
        }).catch(error => console.error(error));
    }

    useEffect(() => {
        if (clockInTime) {
            apiClockIn();
        }
        setStopWatchActive(clockInTime !== null);
    }, [clockInTime, apiClockIn]);


    if (props.contentLoading) {
        return (
            <div>
                <Header name="John Champion" settings />
                <div>Loading...</div>
            </div >
        )
    }

    return (
        <div>
            <Header name="John Champion" settings />
            <div className={classes.status}>
                <div className={classes.statusTitle}>{props.status}</div>
                <div className={classes.clockInTime}>
                    {props.clockInTime ? props.clockInTime.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }) : null}
                </div>
            </div>
            <Stopwatch active={stopwatchActive} fromDate={clockInTime} />
            <div className={classes.buttonRow}>
                <Button title={'Clock ' + (props.clockInTime ? 'Out' : 'In')} big onClick={() => {
                    if (props.clockInTime) {
                        props.onAddRecord(props.clockInTime, new Date());
                        apiClockOut();
                    }
                    props.onToggleTimeClock();
                }} />
            </div>
            <div className={classes.previousWork}>
                <Table title="Total Hours" records={[
                    {
                        id: Math.random(),
                        key: 'This Month',
                        value: props.monthHours.toFixed(2)
                    },
                    {
                        id: Math.random(),
                        key: 'This Week',
                        value: props.weekHours.toFixed(2)
                    }
                ]} />
                <Table title="Previous Work" hideIfNoRecords records={props.records.map(r => {
                    return {
                        id: r.id,
                        key: r.timeIn.toLocaleDateString('en-US', { month: 'numeric', day: '2-digit' }) + ', ' + r.timeIn.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }) + ' to ' + r.timeOut.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }),
                        value: ((r.timeOut - r.timeIn) / (60 * 60 * 1000)).toFixed(2) + ' hours'
                    }
                })} />
            </div>
        </div >
    )
}

const mapStateToProps = state => {
    return {
        userId: state.auth.userId,
        token: state.auth.token,
        contentLoading: state.timeclock.loading,
        status: state.timeclock.status,
        clockInTime: state.timeclock.clockInTime,
        records: state.timeclock.records,
        monthHours: state.timeclock.totalMonthHours,
        weekHours: state.timeclock.totalWeekHours
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onToggleTimeClock: () => dispatch({
            type: 'TIMECLOCK_TOGGLE'
        }),
        onAddRecord: (startDate, endDate) => dispatch({
            type: 'TIMECLOCK_ADD_RECORD',
            timeIn: startDate,
            timeOut: endDate
        })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TimeClock);