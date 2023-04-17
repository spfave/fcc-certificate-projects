import {useReducer, useRef} from 'react';

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

// Timer reducer
type TimerState = {
	sessionType: 'Session' | 'Break';
	sessionTime: number;
	breakTime: number;
	timerStatus: 'idle' | 'running';
	timerValue: number;
};

type TimerActions =
	| {type: 'CHANGE_SESSION_TIME'; change: number}
	| {type: 'CHANGE_BREAK_TIME'; change: number};

const timerInitialState: TimerState = {
	sessionType: 'Session',
	sessionTime: INITIAL_SESSION_TIME,
	breakTime: INITIAL_BREAK_TIME,
	timerStatus: 'idle',
	timerValue: INITIAL_SESSION_TIME * 60,
};

function timerReducer(state: TimerState, action: TimerActions) {
	switch (action.type) {
		case 'CHANGE_SESSION_TIME':
			return {
				...state,
				sessionTime: state.sessionTime + action.change,
				timerValue: (state.sessionTime + action.change) * 60,
			};
		case 'CHANGE_BREAK_TIME':
			return {...state, breakTime: state.breakTime + action.change};
		default:
			return state;
	}
}

// Component
export default function PomodoroTimer() {
	const [{sessionType, sessionTime, breakTime, timerStatus, timerValue}, timerDispatch] =
		useReducer(timerReducer, timerInitialState);
	const refTimer = useRef<null | number>(null);

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
						onClick={() => timerDispatch({type: 'CHANGE_SESSION_TIME', change: 1})}
						disabled={timerStatus === 'running' || sessionTime === 60}
					>
						+
					</button>
					<button
						id="session-decrement"
						onClick={() => timerDispatch({type: 'CHANGE_SESSION_TIME', change: -1})}
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
						onClick={() => timerDispatch({type: 'CHANGE_BREAK_TIME', change: 1})}
						disabled={timerStatus === 'running' || breakTime === 60}
					>
						+
					</button>
					<button
						id="break-decrement"
						onClick={() => timerDispatch({type: 'CHANGE_BREAK_TIME', change: -1})}
						disabled={timerStatus === 'running' || breakTime === 1}
					>
						-
					</button>
				</div>
			</div>
		</div>
	);
}
