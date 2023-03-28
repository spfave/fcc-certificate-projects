import './pomodoro-timer.css';

export default function PomodoroTimer() {
	// state:
	// breakTime: number
	// sessionTime: number
	// session type: 'session' | 'break'
	// ? timer status: 'running' | 'paused'
	// timerValue: number

	return (
		<div className="pomodoro-timer">
			<div className="title">
				<h1>Pomodoro Timer</h1>
			</div>
			<div className="timer">
				<div>
					<p id="timer-label">Session</p>
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
					<p id="session-length">25</p>
					<button id="session-increment">+</button>
					<button id="session-decrement">-</button>
				</div>
				<div>
					<p id="break-label">Break Length</p>
					<p id="break-length">5</p>
					<button id="break-increment">+</button>
					<button id="break-decrement">-</button>
				</div>
			</div>
		</div>
	);
}
