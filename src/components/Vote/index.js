import React, { useState } from 'react'

const Vote = (props) => {
	const { name, socket, room } = props;
	const [vote, setVote] = useState('');
	const [hasVoted, setHasVoted] = useState(false);

	const handleSubmit = event => {
		event.preventDefault();
		socket.emit('vote', { name, roomName: room.name, vote });
		setVote('');
		setHasVoted(true);
	};

	return (
		<>
			<p>{room.captain} proposed the following:</p>
			<ul>
				{room.proposal.map(agent => <li key={agent}>{agent}</li>)}
			</ul>
			<p>Do you agree?</p>
			<p style={{ color: "red" }}>Careful! You cannot change your answer after submitting.</p>
			<form onSubmit={handleSubmit}>
				<label>
					<input
						name="agree"
						type="radio"
						checked={vote === "agree"}
						onChange={() => {
							setVote("agree");
						}}
						disabled={hasVoted}
					/>
					Agree
				</label>
				<label>
					<input
						name="disagree"
						type="radio"
						checked={vote === "disagree"}
						onChange={() => {
							setVote("disagree");
						}}
						disabled={hasVoted}
					/>
					Disagree
				</label>{" "}
				<button type="submit" disabled={hasVoted || !vote}>Submit</button>
			</form>
			<h3>Current Votes</h3>
			<table>
				<thead>
					<tr>
						<th>Agree</th>
						<th>Disagree</th>
					</tr>
				</thead>
				<tbody>
					<tr key="votes">
						<td>
							{room.votes_p.filter(pair => pair.vote === "agree").map(pair => <p>{pair.name}</p>)}
						</td>
						<td>
							{room.votes_p.filter(pair => pair.vote === "disagree").map(pair => <p>{pair.name}</p>)}
						</td>
					</tr>
				</tbody>

			</table>
		</>
	);
};

export default Vote;