import React, { useState } from 'react'

const Captain = (props) => {
	const { socket, room, rule } = props;
	const [proposal, setProposal] = useState({});

	const handleSubmit = event => {
		event.preventDefault();
		socket.emit('propose', { roomName: room.name, proposal: Object.entries(proposal).filter(pair => pair[1]).map(pair => pair[0]) });
		setProposal([]);
	};

	const handleChange = event => {
		setProposal({ ...proposal, [event.target.name]: event.target.checked });
	};

	let missionNum;
	let agentCt;
	if (room.score) {
		missionNum = room.score.findIndex(score => !score);
		agentCt = rule.missions && rule.missions[missionNum]?.total;
	}
	let checkedCt = Object.entries(proposal).filter(pair => pair[1]).length;

	return (
		<>
			<p>Propose who gets to go on the next mission:</p>
			<form onSubmit={handleSubmit}>
				{room.players?.map(player => {
					return (
						<>
							<label>
								<input
									name={player}
									type="checkbox"
									checked={proposal.player}
									onChange={handleChange}
								/>
								{player}
							</label>
						</>
					)
				})}
				<button type="submit" disabled={agentCt !== checkedCt}>Propose</button>
			</form>
		</>
	);
};

export default Captain;