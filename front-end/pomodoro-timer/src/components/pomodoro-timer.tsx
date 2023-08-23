import {useEffect, useReducer, useRef} from 'react';

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

// Pomodoro state and reducer
type PomodoroState = {
	sessionType: 'Session' | 'Break';
	sessionTime: number;
	breakTime: number;
	timerStatus: 'idle' | 'running';
	timeRemaining: number;
};

const pomodoroInitialState: PomodoroState = {
	sessionType: 'Session',
	sessionTime: INITIAL_SESSION_TIME,
	breakTime: INITIAL_BREAK_TIME,
	timerStatus: 'idle',
	timeRemaining: INITIAL_SESSION_TIME * 60,
};

type PomodoroActions =
	| {type: 'CHANGE_SESSION_TIME'; change: number}
	| {type: 'CHANGE_BREAK_TIME'; change: number}
	| {type: 'START_PAUSE_RESUME_TIMER'}
	| {type: 'UPDATE_TIME_REMAINING'}
	| {type: 'SWITCH_SESSION_TYPE'}
	| {type: 'RESET_TIMER'};

function pomodoroReducer(state: PomodoroState, action: PomodoroActions): PomodoroState {
	switch (action.type) {
		case 'CHANGE_SESSION_TIME':
			return {
				...state,
				sessionTime: state.sessionTime + action.change,
				timeRemaining: (state.sessionTime + action.change) * 60,
			};
		case 'CHANGE_BREAK_TIME':
			return {...state, breakTime: state.breakTime + action.change};
		case 'START_PAUSE_RESUME_TIMER':
			return state.timerStatus === 'idle'
				? {...state, timerStatus: 'running'}
				: {...state, timerStatus: 'idle'};
		case 'UPDATE_TIME_REMAINING':
			return {...state, timeRemaining: state.timeRemaining - 1};
		case 'SWITCH_SESSION_TYPE':
			return state.sessionType === 'Session'
				? {...state, timeRemaining: state.breakTime * 60, sessionType: 'Break'}
				: {...state, timeRemaining: state.sessionTime * 60, sessionType: 'Session'};
		case 'RESET_TIMER':
			return pomodoroInitialState;
		default:
			return state;
	}
}

// Component
export default function PomodoroTimer() {
	const [
		{sessionType, sessionTime, breakTime, timerStatus, timeRemaining},
		pomodoroDispatch,
	] = useReducer(pomodoroReducer, pomodoroInitialState);

	useInterval(
		() => {
			if (timeRemaining > 0) pomodoroDispatch({type: 'UPDATE_TIME_REMAINING'});
			else {
				signalSessionEnd();
				pomodoroDispatch({type: 'SWITCH_SESSION_TYPE'});
			}
		},
		timerStatus === 'running' ? 1000 : null,
	);

	function signalSessionEnd() {
		const sound = document.getElementById('beep') as HTMLAudioElement;
		sound.currentTime = 0;
		sound.play();
	}

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
					<h2 id="time-left">{formatTime(timeRemaining)}</h2>
					{/* TODO add audio source */}
					<audio id="beep" src="audio/mixkit-happy-bells-notification.wav"></audio>
				</div>
				<div className="timer-controls">
					<button
						id="start_stop"
						onClick={() => pomodoroDispatch({type: 'START_PAUSE_RESUME_TIMER'})}
					>
						start/pause
					</button>
					<button id="reset" onClick={() => pomodoroDispatch({type: 'RESET_TIMER'})}>
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
						onClick={() => pomodoroDispatch({type: 'CHANGE_SESSION_TIME', change: 1})}
						disabled={timerStatus === 'running' || sessionTime === 60}
					>
						+
					</button>
					<button
						id="session-decrement"
						onClick={() => pomodoroDispatch({type: 'CHANGE_SESSION_TIME', change: -1})}
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
						onClick={() => pomodoroDispatch({type: 'CHANGE_BREAK_TIME', change: 1})}
						disabled={timerStatus === 'running' || breakTime === 60}
					>
						+
					</button>
					<button
						id="break-decrement"
						onClick={() => pomodoroDispatch({type: 'CHANGE_BREAK_TIME', change: -1})}
						disabled={timerStatus === 'running' || breakTime === 1}
					>
						-
					</button>
				</div>
			</div>
		</div>
	);
}

// Ref: https://overreacted.io/making-setinterval-declarative-with-react-hooks/
// Ref: https://usehooks-ts.com/react-hook/use-interval
function useInterval(callback: () => void, delay: number | null) {
	const savedCallback = useRef(callback);

	// Save the latest callback function
	useEffect(() => {
		savedCallback.current = callback;
	}, [callback]);

	// Set up the interval
	useEffect(() => {
		if (delay === null) return; // Don't schedule interval if delay is not specified

		const id = setInterval(() => savedCallback.current(), delay);
		return () => clearInterval(id);
	}, [delay]);
}
