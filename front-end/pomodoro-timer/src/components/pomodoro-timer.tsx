import {useRef, useState} from 'react';

import './pomodoro-timer.css';

// Data
const TIME_HOUR_IN_SECONDS = 3600; // seconds
const INITIAL_SESSION_TIME = 25; // minutes
const INITIAL_BREAK_TIME = 5; // minutes

// Utility functions
function formatTime(seconds: number) {
	// To handle max time case without hour increment HH:MM:SS
	if (seconds === TIME_HOUR_IN_SECONDS) return '60:00';

	return new Date(seconds * 1000).toISOString().substring(14, 19); // MM:SS
}

function useIncDecButton(initialValue = 0) {
	const [value, setValue] = useState(initialValue);

	function incrementValue() {
		if (value < 60) setValue((cValue) => cValue + 1);
	}

	function decrementValue() {
		if (value > 1) setValue((cValue) => cValue - 1);
	}

	return [value, {incrementValue, decrementValue}] as const;
}

// Component
export default function PomodoroTimer() {
	const [sessionType, setSessionType] = useState<'Session' | 'Break'>('Session');
	const [sessionTime, sessionTimeFuncs] = useIncDecButton(INITIAL_SESSION_TIME);
	const [breakTime, breakTimeFuncs] = useIncDecButton(INITIAL_BREAK_TIME);

	const refTimer = useRef<null | number>(null);
	const [timerStatus, setTimerStatus] = useState<'idle' | 'running'>('idle');
	const [timerValue, setTimerValue] = useState(INITIAL_SESSION_TIME * 60);

	return (
		<div className="pomodoro-timer">
			<div className="title">
				<h1>Pomodoro Timer</h1>
			</div>
			<div className="timer">
				<div>
					<p id="timer-label">{sessionType}</p>
				</div>
				<div className="timer-display">
					<h2 id="time-left">{formatTime(timerValue)}</h2>
					<audio id="beep" src=""></audio>
				</div>
				<div className="timer-controls">
					<button id="start_stop">start/pause</button>
					<button id="reset">reset</button>
				</div>
			</div>
			<div className="session-controls">
				<div>
					<p id="session-label">Session Length</p>
					<p id="session-length">{sessionTime}</p>
					<button
						id="session-increment"
						onClick={sessionTimeFuncs.incrementValue}
						disabled={timerStatus === 'running' || sessionTime === 60}
					>
						+
					</button>
					<button
						id="session-decrement"
						onClick={sessionTimeFuncs.decrementValue}
						disabled={timerStatus === 'running' || sessionTime === 1}
					>
						-
					</button>
				</div>
				<div>
					<p id="break-label">Break Length</p>
					<p id="break-length">{breakTime}</p>
					<button
						id="break-increment"
						onClick={breakTimeFuncs.incrementValue}
						disabled={timerStatus === 'running' || breakTime === 60}
					>
						+
					</button>
					<button
						id="break-decrement"
						onClick={breakTimeFuncs.decrementValue}
						disabled={timerStatus === 'running' || breakTime === 1}
					>
						-
					</button>
				</div>
			</div>
		</div>
	);
}
