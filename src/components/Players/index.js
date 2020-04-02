import React from 'react'

const Players = (props) => {
	const { players, captain } = props;
	return (
		<>
			<h3>Leader Rotation Order</h3>
			<table>
				<thead>
					<tr>
						<th>Leader</th>
						<th>Name</th>
					</tr>
				</thead>
				<tbody>
					{players?.map(player => {
						return (
							<tr>
								<td>{player === captain ? "👑" : null}</td>
								<td>{player}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</>
	);
};

export default Players;