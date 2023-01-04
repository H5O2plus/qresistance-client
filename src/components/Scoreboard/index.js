import React from 'react'
import { isEmpty } from 'lodash'

const Scoreboard = (props) => {
	const { missions, score } = props;
	if (!isEmpty(missions) && !isEmpty(score)) {
		return (
			<table>
				<thead>
					<tr>
						<th>Mission #</th>
						<th># of Agents</th>
						<th>Fails Allowed</th>
						<th>Winner?</th>
					</tr>
				</thead>
				<tbody>
					{score.map((winner, index) => {
						return (
							<tr key={index}>
								<td>{index + 1}</td>
								<td>{missions[index].total}</td>
								<td>{missions[index].total - missions[index].required}</td>
								<td>{winner}</td>
							</tr>
						);
					})}

				</tbody>
			</table>
		);
	} else {
		return <p>😳😳</p>;
	}
};

export default Scoreboard;