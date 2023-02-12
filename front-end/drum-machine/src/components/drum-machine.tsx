import { useEffect } from 'react';

import './drum-machine.css';

// Data
type DrumSound = {
	soundName: string;
	soundSrc: string;
	soundKey: string;
};

const drumSounds: DrumSound[] = [
	{ soundName: 'Heater 1', soundSrc: 'audio/Heater-1.mp3', soundKey: 'q' },
	{ soundName: 'Heater 2', soundSrc: 'audio/Heater-2.mp3', soundKey: 'w' },
	{ soundName: 'Heater 3', soundSrc: 'audio/Heater-3.mp3', soundKey: 'e' },
	{ soundName: 'Heater 4', soundSrc: 'audio/Heater-4.mp3', soundKey: 'a' },
	{ soundName: 'Clap', soundSrc: 'audio/Heater-6.mp3', soundKey: 's' },
	{ soundName: 'Open HH', soundSrc: 'audio/Dsc_Oh.mp3', soundKey: 'd' },
	{ soundName: 'Kick & Hat', soundSrc: 'audio/Kick_n_Hat.mp3', soundKey: 'z' },
	{ soundName: 'Kick', soundSrc: 'audio/RP4_KICK_1.mp3', soundKey: 'x' },
	{ soundName: 'Closed HH', soundSrc: 'audio/Cev_H2.mp3', soundKey: 'c' },
];
const soundKeys = drumSounds.map(({ soundKey }) => soundKey);

// Utility functions
function playSound(soundKey: string) {
	const sound = document.getElementById(soundKey) as HTMLAudioElement;
	sound.currentTime = 0;
	sound.play();
}

function playKeySound(event: KeyboardEvent) {
	if (soundKeys.includes(event.key)) playSound(event.key);
}

// Component: Drum Machine
export default function DrumMachine() {
	useEffect(() => {
		window.addEventListener('keydown', playKeySound);

		// Clean up
		return () => window.removeEventListener('keydown', playKeySound);
	}, []);

	return (
		<div id="drum-machine">
			<div id="drum-pads">
				{drumSounds.map((drumSound) => (
					<DrumButton
						key={drumSound.soundKey}
						{...drumSound}
						handlePlaySound={() => playSound(drumSound.soundKey)}
					/>
				))}
			</div>
			<div id="display">Display</div>
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
