import React, { useState } from 'react'
import { isEmpty } from 'lodash'

const Role = (props) => {
	const [showSecret, setShowSecret] = useState(true);
	const { name, players, roles } = props;
	if (!isEmpty(roles)) {
		const role = roles[players.indexOf(name)];
		const spies = players.filter((player, index) => roles[index] === "Spy");

		return (
			<>
				<button onClick={() => setShowSecret(!showSecret)}>
					{showSecret ? "Hide my role" : "Show my role"}
				</button>
				{showSecret && (
					<>
						<p>Role: {role}</p>
						{role === "Spy"
							? <>
								<p>Other Spies:</p>
								<ul>
									{spies.map(spy => <li key={spy}>{spy}</li>)}
								</ul>
							</>
							: null
						}
					</>
				)}

			</>
		);
	} else {
		return <p>Role not yet assigned</p>;
	}
};

export default Role;