import {useState} from 'react';

import './pomodoro-timer.css';

// Data
const INITIAL_SESSION_TIME = 25; // minutes
const INITIAL_BREAK_TIME = 5; // minutes

export default function PomodoroTimer() {
	// state:
	// breakTime: number
	// sessionTime: number
	// session type: 'session' | 'break'
	// ? timer status: 'running' | 'paused'
	// timerValue: number
	const [sessionType, setSessionType] = useState<'Session' | 'Break'>('Session');
	const [sessionTime, setSessionTime] = useState(INITIAL_SESSION_TIME);
	const [breakTime, setBreakTime] = useState(INITIAL_BREAK_TIME);

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
					<h2 id="time-left">XX:YY</h2>
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
					<button id="session-increment">+</button>
					<button id="session-decrement">-</button>
				</div>
				<div>
					<p id="break-label">Break Length</p>
					<p id="break-length">{breakTime}</p>
					<button id="break-increment">+</button>
					<button id="break-decrement">-</button>
				</div>
			</div>
		</div>
	);
}
