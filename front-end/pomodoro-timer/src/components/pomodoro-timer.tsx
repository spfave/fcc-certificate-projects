import {useEffect, useReducer, useRef, useState} from 'react';

import './pomodoro-timer.css';

// Types
type SessionType = 'Session' | 'Break';
type TimerStatus = 'idle' | 'running' | 'paused';

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
// type TimerState = {
// 	sessionType: 'Session' | 'Break';
// 	sessionTime: number;
// 	breakTime: number;
// 	timerStatus: 'idle' | 'running'; // | 'paused'
// 	timerValue: number;
// };

// type TimerActions =
// 	| {type: 'CHANGE_SESSION_TIME'; change: number}
// 	| {type: 'CHANGE_BREAK_TIME'; change: number}
// 	| {type: 'START_TIMER'}
// 	| {type: 'UPDATE_TIMER'}
// 	| {type: 'PAUSE_TIMER'}
// 	| {type: 'RESUME_TIMER'}
// 	| {type: 'RESET_TIMER'};

// const timerInitialState: TimerState = {
// 	sessionType: 'Session',
// 	sessionTime: INITIAL_SESSION_TIME,
// 	breakTime: INITIAL_BREAK_TIME,
// 	timerStatus: 'idle',
// 	timerValue: INITIAL_SESSION_TIME * 60,
// };

// function timerReducer(state: TimerState, action: TimerActions): TimerState {
// 	switch (action.type) {
// 		case 'CHANGE_SESSION_TIME':
// 			return {
// 				...state,
// 				sessionTime: state.sessionTime + action.change,
// 				timerValue: (state.sessionTime + action.change) * 60,
// 			};
// 		case 'CHANGE_BREAK_TIME':
// 			return {...state, breakTime: state.breakTime + action.change};
// 		case 'START_TIMER':
// 			return {...state, timerStatus: 'running'};
// 		// case 'UPDATE_TIMER': {
// 		// 	const newTimerValue = state.timerValue - 1;
// 		// 	return state;
// 		// }
// 		// case 'PAUSE_TIMER':
// 		case 'RESET_TIMER':
// 			return timerInitialState;
// 		default:
// 			return state;
// 	}
// }

// Component
export default function PomodoroTimer() {
	const [sessionType, setSessionType] = useState<SessionType>('Session');
	const [sessionTime, setSessionTime] = useState(INITIAL_SESSION_TIME);
	const [breakTime, setBreakTime] = useState(INITIAL_BREAK_TIME);
	const [timerStatus, setTimerStatus] = useState<TimerStatus>('idle');
	const [timerValue, setTimerValue] = useState(INITIAL_SESSION_TIME * 60);
	const refTimer = useRef<null | number>(null);

	// const [{sessionType, sessionTime, breakTime, timerStatus, timerValue}, timerDispatch] =
	// 	useReducer(timerReducer, timerInitialState);

	/** START session time
	 * Start setInterval:
	 * set timerStatus = 'running'
	 * ever second reduce timerValue by 1 sec
	 * if timerValue = 0  (1) signal end of session (audio)  (2) change session type and start new timer
	 */
	/** PAUSE session time
	 * set timerStatus = 'idle'
	 * stop current timer clearInterval(refTimer.current)
	 */
	/** RESUME session time
	 * set timerStatus = 'running'
	 * start new timer from paused increment timer
	 */
	function startPauseResumeTimer() {
		// timerDispatch({type: 'START_TIMER'});
		if (timerStatus === 'idle') {
			setTimerStatus('running');
			refTimer.current = startTimerInterval();
		} else if (timerStatus === 'running') {
			setTimerStatus('paused');
			refTimer.current && window.clearInterval(refTimer.current);
		} else {
			setTimerStatus('running');
			refTimer.current = startTimerInterval();
		}
	}

	function startTimerInterval() {
		return window.setInterval(() => {
			setTimerValue((tValue) => tValue - 1);
		}, 1000);
	}

	function resetTimer() {
		if (refTimer.current) window.clearInterval(refTimer.current);
		setSessionType('Session');
		setSessionTime(INITIAL_SESSION_TIME);
		setBreakTime(INITIAL_BREAK_TIME);
		setTimerStatus('idle');
		setTimerValue(INITIAL_SESSION_TIME * 60);
		// timerDispatch({type: 'RESET_TIMER'});
	}

	function updateSessionTime(change: number) {
		setSessionTime(sessionTime + change);
		setTimerValue((sessionTime + change) * 60);
	}

	function updateBreakTime(change: number) {
		setBreakTime(breakTime + change);
	}

	// on destroy cleanup
	useEffect(() => {
		return () => (refTimer.current ? window.clearInterval(refTimer.current) : undefined);
	}, []);

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
					{/* TODO add audio source */}
					<audio id="beep" src=""></audio>
				</div>
				<div className="timer-controls">
					<button id="start_stop" onClick={startPauseResumeTimer}>
						start/pause
					</button>
					<button id="reset" onClick={resetTimer}>
						reset
					</button>
				</div>
			</div>
			<div className="session-controls">
				<div>
					<p id="session-label">Session Length</p>
					<p id="session-length">{sessionTime}</p>
					<button
						id="session-increment"
						// onClick={() => timerDispatch({type: 'CHANGE_SESSION_TIME', change: 1})}
						onClick={() => updateSessionTime(1)}
						disabled={timerStatus === 'running' || sessionTime === 60}
					>
						+
					</button>
					<button
						id="session-decrement"
						// onClick={() => timerDispatch({type: 'CHANGE_SESSION_TIME', change: -1})}
						onClick={() => updateSessionTime(-1)}
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
						// onClick={() => timerDispatch({type: 'CHANGE_BREAK_TIME', change: 1})}
						onClick={() => updateBreakTime(1)}
						disabled={timerStatus === 'running' || breakTime === 60}
					>
						+
					</button>
					<button
						id="break-decrement"
						// onClick={() => timerDispatch({type: 'CHANGE_BREAK_TIME', change: -1})}
						onClick={() => updateBreakTime(-1)}
						disabled={timerStatus === 'running' || breakTime === 1}
					>
						-
					</button>
				</div>
			</div>
		</div>
	);
}
