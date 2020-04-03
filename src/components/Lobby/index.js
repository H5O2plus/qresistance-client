import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'

import { isEmpty } from 'lodash'

const Lobby = () => {
	const [name, setName] = useState('');
	const [roomName, setRoomName] = useState('');
	const [willRedirect, setWillRedirect] = useState(false);

	const handleSubmit = event => {
		event.preventDefault();
		if (!isEmpty(name)) {
			setWillRedirect(true);
		}
	}

	if (willRedirect) return <Redirect to={`/room?name=${name}&roomName=${roomName}`} />
	else return (
		<div>
			<h1>Lobby</h1>
			<form onSubmit={handleSubmit}>
				<label>
					Name:{" "}
					<input
						placeholder="Name"
						type="text"
						onChange={event => setName(event.target.value)}
					/>
				</label><br />
				<label>
					Room:{" "}
					<input
						placeholder="Room"
						type="text"
						onChange={event => setRoomName(event.target.value)}
					/>
				</label>
				<button type="submit">Enter</button>
			</form>
			<h2>Debug info</h2>
			<p>Server endpoint: {process.env.REACT_APP_SERVER_ENDPOINT || process.env.REACT_APP_LOCAL_ENDPOINT}</p>
		</div>
	);
};

export default Lobby;