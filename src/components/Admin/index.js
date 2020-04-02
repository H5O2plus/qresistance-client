import React from 'react'

const Admin = (props) => {
	const { socket, room } = props;
	const [nameToRemove, setNameToRemove] = props.state;

	const handleSubmit = event => {
		event.preventDefault();
		socket.emit('kick', { nameToRemove, roomName: room.name });
		setNameToRemove('');
	};

	const handleReady = event => {
		event.preventDefault();
		socket.emit('ready', { roomName: room.name });
	}

	const readyIsDisabled = room.players.length < 5 || room.players.length > 10;

	return (
		<>
			<h2>Admin</h2>
			<form onSubmit={handleSubmit}>
				<label>
					Remove player:
					<input
						type="text"
						value={nameToRemove}
						onChange={event => setNameToRemove(event.target.value)}
					/>
				</label>
				<button type="submit">Kick</button>
			</form>
			<form onSubmit={handleReady}>
				<button type="submit" disabled={readyIsDisabled}>{readyIsDisabled ? "Too few/many players :(" : "Ready!"}</button>
			</form>
		</>
	);
};

export default Admin;