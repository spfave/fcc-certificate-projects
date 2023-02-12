import { useCallback, useEffect, useState } from 'react';

import './drum-machine.css';

// Data
type DrumSound = {
	soundName: string;
	soundSrc: string;
};

const drumSounds: Map<string, DrumSound> = new Map([
	['Q', { soundName: 'Heater 1', soundSrc: 'audio/Heater-1.mp3' }],
	['W', { soundName: 'Heater 2', soundSrc: 'audio/Heater-2.mp3' }],
	['E', { soundName: 'Heater 3', soundSrc: 'audio/Heater-3.mp3' }],
	['A', { soundName: 'Heater 4', soundSrc: 'audio/Heater-4.mp3' }],
	['S', { soundName: 'Clap', soundSrc: 'audio/Heater-6.mp3' }],
	['D', { soundName: 'Open HH', soundSrc: 'audio/Dsc_Oh.mp3' }],
	['Z', { soundName: 'Kick & Hat', soundSrc: 'audio/Kick_n_Hat.mp3' }],
	['X', { soundName: 'Kick', soundSrc: 'audio/RP4_KICK_1.mp3' }],
	['C', { soundName: 'Closed HH', soundSrc: 'audio/Cev_H2.mp3' }],
]);

// Utility functions
function playSound(soundKey: string) {
	const sound = document.getElementById(soundKey) as HTMLAudioElement;
	sound.currentTime = 0;
	sound.play();
}

// Component: Drum Machine
export default function DrumMachine() {
	const [displaySound, setDisplaySound] = useState('');

	function handlePlaySound(soundKey: string) {
		playSound(soundKey);
		setDisplaySound((drumSounds.get(soundKey) as DrumSound).soundName);
	}

	// Memoize for useEffect dependency
	const handlePlayKeySound = useCallback(({ key }: KeyboardEvent) => {
		const uKey = key.toUpperCase();
		if (drumSounds.has(uKey)) handlePlaySound(uKey);
	}, []);

	// Add keydown event listener
	useEffect(() => {
		window.addEventListener('keydown', handlePlayKeySound);

		// Clean up
		return () => window.removeEventListener('keydown', handlePlayKeySound);
	}, [handlePlayKeySound]);

	return (
		<div id="drum-machine">
			<DrumBoard handlePlaySound={handlePlaySound} />
			<div id="display">{displaySound}</div>
		</div>
	);
}
// Component: Drum Board
type DrumBoardProps = { handlePlaySound: (soundKey: string) => void };
function DrumBoard(props: DrumBoardProps) {
	const { handlePlaySound } = props;

	return (
		<div id="drum-board">
			{[...drumSounds.entries()].map(([soundKey, drumSound]) => (
				<DrumButton
					key={drumSound.soundName}
					soundKey={soundKey}
					{...drumSound}
					handlePlaySound={() => handlePlaySound(soundKey)}
				/>
			))}
		</div>
	);
}

// Component: Drum Button
type DrumButtonProps = DrumSound & { soundKey: string; handlePlaySound: () => void };
function DrumButton(props: DrumButtonProps) {
	const { soundName, soundSrc, soundKey, handlePlaySound } = props;

	return (
		<button id={soundName} className="drum-pad" onClick={handlePlaySound}>
			<audio id={soundKey} className="clip" src={soundSrc}></audio>
			{soundKey}
		</button>
	);
}
