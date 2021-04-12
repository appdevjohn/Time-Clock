import { useEffect } from 'react';
import { useStopwatch } from '../../hooks/useStopwatch';

import classes from './Stopwatch.module.css';

const Stopwatch = props => {
    const { active } = props;
    const { seconds, minutes, hours, start, reset } = useStopwatch(props.fromDate);

    useEffect(() => {
        if (active) {
            start();
        } else {
            reset();
        }
    }, [active, reset, start]);

    let displayedHours = hours.toString();
    let displayedMinutes = minutes.toString();
    let displayedSeconds = seconds.toString();

    if (displayedHours.length === 1) {
        displayedHours = '0' + displayedHours;
    }
    if (displayedMinutes.length === 1) {
        displayedMinutes = '0' + displayedMinutes;
    }
    if (displayedSeconds.length === 1) {
        displayedSeconds = '0' + displayedSeconds;
    }

    return (
        <div className={classes.Stopwatch}>{displayedHours}:{displayedMinutes}:{displayedSeconds}</div>
    );
}

export default Stopwatch;