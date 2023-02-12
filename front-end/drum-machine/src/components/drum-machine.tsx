import { useEffect, useState } from 'react';

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

	useEffect(() => {
		window.addEventListener('keydown', handlePlayKeySound);

		// Clean up
		return () => window.removeEventListener('keydown', handlePlayKeySound);
	}, []);

	function handlePlaySound(soundKey: string) {
		playSound(soundKey);
		setDisplaySound((drumSounds.get(soundKey) as DrumSound).soundName);
	}

	function handlePlayKeySound({ key }: KeyboardEvent) {
		const uKey = key.toUpperCase();
		if (drumSounds.has(uKey)) handlePlaySound(uKey);
	}

	return (
		<div id="drum-machine">
			<div id="drum-pads">
				{[...drumSounds.entries()].map(([soundKey, drumSound]) => (
					<DrumButton
						key={drumSound.soundName}
						soundKey={soundKey}
						{...drumSound}
						handlePlaySound={() => handlePlaySound(soundKey)}
					/>
				))}
			</div>
			<div id="display">{displaySound}</div>
		</div>
	);
}

// Component: Drum Button
type DrumButtonProps = DrumSound & { soundKey: string; handlePlaySound: () => void };
function DrumButton(props: DrumButtonProps) {
	const { soundName, soundSrc, soundKey, handlePlaySound: onPlaySound } = props;

	return (
		<button id={soundName} className="drum-pad" onClick={onPlaySound}>
			<audio id={soundKey} className="clip" src={soundSrc}></audio>
			{soundKey}
		</button>
	);
}
