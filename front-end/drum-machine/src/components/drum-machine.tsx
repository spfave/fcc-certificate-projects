import { useEffect, useState } from 'react';

import './drum-machine.css';

// Data
type DrumSound = {
	soundName: string;
	soundSrc: string;
	soundKey: string;
};

const drumSounds: Map<string, DrumSound> = new Map([
	['q', { soundName: 'Heater 1', soundSrc: 'audio/Heater-1.mp3', soundKey: 'q' }],
	['w', { soundName: 'Heater 2', soundSrc: 'audio/Heater-2.mp3', soundKey: 'w' }],
	['e', { soundName: 'Heater 3', soundSrc: 'audio/Heater-3.mp3', soundKey: 'e' }],
	['a', { soundName: 'Heater 4', soundSrc: 'audio/Heater-4.mp3', soundKey: 'a' }],
	['s', { soundName: 'Clap', soundSrc: 'audio/Heater-6.mp3', soundKey: 's' }],
	['d', { soundName: 'Open HH', soundSrc: 'audio/Dsc_Oh.mp3', soundKey: 'd' }],
	['z', { soundName: 'Kick & Hat', soundSrc: 'audio/Kick_n_Hat.mp3', soundKey: 'z' }],
	['x', { soundName: 'Kick', soundSrc: 'audio/RP4_KICK_1.mp3', soundKey: 'x' }],
	['c', { soundName: 'Closed HH', soundSrc: 'audio/Cev_H2.mp3', soundKey: 'c' }],
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

	function handlePlaySound(sound: DrumSound) {
		playSound(sound.soundKey);
		setDisplaySound(sound.soundName);
	}

	function handlePlayKeySound({ key }: KeyboardEvent) {
		if (drumSounds.has(key)) {
			playSound(key);
			setDisplaySound((drumSounds.get(key) as DrumSound).soundName);
		}
	}

	return (
		<div id="drum-machine">
			<div id="drum-pads">
				{[...drumSounds.values()].map((drumSound) => (
					<DrumButton
						key={drumSound.soundKey}
						{...drumSound}
						handlePlaySound={() => handlePlaySound(drumSound)}
					/>
				))}
			</div>
			<div id="display">{displaySound}</div>
		</div>
	);
}

// Component: Drum Button
type DrumButtonProps = DrumSound & { handlePlaySound: () => void };
function DrumButton(props: DrumButtonProps) {
	const { soundName, soundSrc, soundKey, handlePlaySound: onPlaySound } = props;

	return (
		<button id={soundName} className="drum-pad" onClick={onPlaySound}>
			<audio id={soundKey} className="clip" src={soundSrc}></audio>
			{soundKey}
		</button>
	);
}
