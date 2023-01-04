import React, { useState, useEffect } from 'react'
import { isEmpty } from 'lodash'

const VolumeSlider = (props) => {
	const [alertVolume, setAlertVolume] = props.alertAudioState;
	const [sliderRaw, setSliderRaw] = useState(0);

	return (
		<>
			Alert sound volume:
			<input
				type="range"
				min="0"
				max="100"
				value={sliderRaw}
				onChange={event => {
					setSliderRaw(event.target.value);
					setAlertVolume(event.target.value / 100);
				}}
			/>
			{sliderRaw}
		</>
	)
};

export default VolumeSlider;