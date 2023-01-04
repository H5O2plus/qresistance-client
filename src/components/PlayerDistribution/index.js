import React from 'react'
import { isEmpty } from 'lodash'

const Players = (props) => {
	const { playerDist } = props;
	if (!isEmpty(playerDist)) {
		return (
			<>
				<h3>Team Distribution</h3>
				<table>
					<thead>
						<tr>
							<th>Resistance</th>
							<th>Spies</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>{playerDist.resistance}</td>
							<td>{playerDist.spies}</td>
						</tr>
					</tbody>
				</table>
			</>
		);
	} else {
		return <p>🤡🤡</p>;
	}
};

export default Players;