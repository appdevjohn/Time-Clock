import { useCallback, useEffect, useState } from "react";

const getSecondDifference = (start, end) => {
    return Math.floor((end - start) / 1000);
}

export const useStopwatch = start => {
    const [startDate, setStartDate] = useState(start ? start.getTime() : Date.now());
    const [seconds, setSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    const startStopwatch = useCallback(() => {
        if (!startDate) {
            setStartDate(Date.now());
        }

        let initialSeconds = getSecondDifference(startDate, Date.now());

        setSeconds(initialSeconds);
        setIsRunning(true);
    }, [setIsRunning, startDate]);

    const resetStopwatch = useCallback(() => {
        setStartDate(null);
        setSeconds(0);
        setIsRunning(false);
    }, [setStartDate, setSeconds, setIsRunning]);

    useEffect(() => {
        let timer;
        if (isRunning) {
            timer = setTimeout(() => {
                console.log(getSecondDifference(startDate, Date.now()));
                setSeconds(getSecondDifference(startDate, Date.now()));
            }, 1000);
        }

        return () => {
            clearTimeout(timer);
        };
    }, [isRunning, startDate, seconds]);

    let secondsLeft = seconds;
    const outputHours = Math.floor(secondsLeft / 3600);
    secondsLeft = secondsLeft % 3600;
    const outputMinutes = Math.floor(secondsLeft / 60);
    secondsLeft = secondsLeft % 60;
    const outputSeconds = Math.floor(secondsLeft);

    return {
        hours: outputHours,
        minutes: outputMinutes,
        seconds: outputSeconds,
        isRunning: isRunning,
        start: startStopwatch,
        reset: resetStopwatch
    };
}