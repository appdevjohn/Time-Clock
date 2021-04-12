import { useCallback, useEffect, useState } from "react"

export const useStopwatch = startDate => {
    let initialSeconds = 0;
    if (startDate) {
        const now = new Date();
        initialSeconds = Math.floor((now - startDate) / 1000);
    }
    const [seconds, setSeconds] = useState(initialSeconds);
    const [isRunning, setIsRunning] = useState(false);

    const startStopwatch = useCallback(() => {
        setIsRunning(true);
    }, [setIsRunning]);

    const resetStopwatch = useCallback(() => {
        setSeconds(0);
        setIsRunning(false);
    }, [setSeconds, setIsRunning]);

    useEffect(() => {
        let timer;
        if (isRunning) {
            timer = setTimeout(() => {
                setSeconds(s => s + 1);
            }, 1000);
        }

        return () => {
            clearTimeout(timer);
        };
    }, [seconds, isRunning]);

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