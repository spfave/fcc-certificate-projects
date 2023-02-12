type DrumSound = {
	soundName: string;
	soundSrc: string;
	soundKey: string;
};

const DrumSounds: DrumSound[] = [
	{ soundName: 'Heater 1', soundSrc: 'audio/Heater-1.mp3', soundKey: 'Q' },
];

import './drum-machine.css';

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

	function handlePlaySound() {
		const sound = document.getElementById(soundKey) as HTMLAudioElement;
		sound.play();
	}

	return (
		<button id={soundName} className="drum-pad" onClick={handlePlaySound}>
			<audio id={soundKey} className="clip" src={soundSrc}></audio>
			{soundKey}
		</button>
	);
}
