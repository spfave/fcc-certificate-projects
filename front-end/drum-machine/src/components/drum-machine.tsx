import { useEffect } from 'react';

import './drum-machine.css';

type DrumSound = {
	soundName: string;
	soundSrc: string;
	soundKey: string;
};

const DrumSounds: DrumSound[] = [
	{ soundName: 'Heater 1', soundSrc: 'audio/Heater-1.mp3', soundKey: 'q' },
];

// Component: Drum Machine
export default function DrumMachine() {
	return (
		<div id="drum-machine">
			<div id="drum-pads">
				<DrumButton {...DrumSounds[0]} />
			</div>
			<div id="display">Display</div>
		</div>
	);
}

// Componet: Drum Button
type DrumButtonProps = DrumSound;
function DrumButton(props: DrumButtonProps) {
	const { soundName, soundSrc, soundKey } = props;

	useEffect(() => {
		const body = document.querySelector('body') as HTMLBodyElement;
		body.addEventListener('keydown', handlePlaySoundKey);
		return () => body.removeEventListener('keydown', handlePlaySoundKey);
	}, []);

	function handlePlaySound() {
		const sound = document.getElementById(soundKey) as HTMLAudioElement;
		sound.currentTime = 0;
		sound.play();
	}

	function handlePlaySoundKey(event: KeyboardEvent) {
		if (event.key === soundKey) handlePlaySound();
	}

	return (
		<button id={soundName} className="drum-pad" onClick={handlePlaySound}>
			<audio id={soundKey} className="clip" src={soundSrc}></audio>
			{soundKey}
		</button>
	);
}
