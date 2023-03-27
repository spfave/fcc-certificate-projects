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
				<div className="timer-display">
					<h2>XX:YY</h2>
				</div>
				<div className="timer-controls">
					<button>start/pause</button>
					<button>reset</button>
				</div>
			</div>
			<div className="session-controls">
				<input type="number" name="" id="" />
				<input type="number" name="" id="" />
			</div>
		</div>
	);
}
