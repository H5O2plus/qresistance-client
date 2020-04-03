import React from 'react'
import { isEmpty } from 'lodash'

const End = (props) => {
	const { room } = props;
	const resistance = room.players.filter((player, index) => room.roles[index] === "Resistance");
	const spies = room.players.filter((player, index) => room.roles[index] === "Spy");
	return (
		<>
			<h1>Winner: 🎊🎉🥳{room.gameState === 4 ? "Resistance" : "Spies"}🥳🎉🎊</h1>
			<h2>Team Spies:</h2>
			<ul>
				{spies.map(member => <li key={member}>{member}</li>)}
			</ul>
			<h2>Team Resistance:</h2>
			<ul>
				{resistance.map(member => <li key={member}>{member}</li>)}
			</ul>
		</>
	);
};

export default End;