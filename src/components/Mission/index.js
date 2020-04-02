import React, { useState } from 'react'

const Mission = (props) => {
	const { socket, room, name } = props;
	const [vote, setVote] = useState('');
	const [hasVoted, setHasVoted] = useState(false);

	const handleSubmit = event => {
		event.preventDefault();
		const role = room.roles[room.players.indexOf(name)];

		let emittedVote = vote;
		if (role === "Resistance") emittedVote = "success";

		socket.emit('mission', { roomName: room.name, vote: emittedVote });
		setVote('');
		setHasVoted(true);
	};

	return (
		<>
			<p>These agents are part of the mission:</p>
			<ul>
				{room.proposal.map(agent => <li key={agent}>{agent}</li>)}
			</ul>
			<p>What will you do with the mission?</p>
			<p style={{ color: "red" }}>Resistance will count as a success regardless of what you choose.</p>
			<form onSubmit={handleSubmit}>
				<label>
					<input
						name="success"
						type="radio"
						checked={vote === "success"}
						onChange={() => {
							setVote("success");
						}}
						disabled={hasVoted}
					/>
					Success
				</label>
				<label>
					<input
						name="fail"
						type="radio"
						checked={vote === "fail"}
						onChange={() => {
							setVote("fail");
						}}
						disabled={hasVoted}
					/>
					Fail
				</label>{" "}
				<button type="submit" disabled={hasVoted || !vote}>Submit</button>
			</form>
		</>
	);
};

export default Mission;