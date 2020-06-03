import React, { useState } from "react";
import { Redirect } from "react-router-dom";

import { isEmpty } from "lodash";

const Lobby = () => {
	const [name, setName] = useState("");
	const [roomName, setRoomName] = useState("");
	const [willRedirect, setWillRedirect] = useState(false);

	const handleSubmit = (event) => {
		event.preventDefault();
		if (!isEmpty(name)) {
			setWillRedirect(true);
		}
	};

	if (willRedirect)
		return <Redirect to={`/room?name=${name}&roomName=${roomName}`} />;
	else
		return (
			<div>
				<h1>Lobby</h1>
				<form onSubmit={handleSubmit}>
					<label>
						Name:{" "}
						<input
							placeholder="Name"
							type="text"
							onChange={(event) => setName(event.target.value)}
						/>
					</label>
					<br />
					<label>
						Room:{" "}
						<input
							placeholder="Room"
							type="text"
							onChange={(event) => setRoomName(event.target.value)}
						/>
					</label>
					<button type="submit">Enter</button>
				</form>
				<h2>About</h2>
				<p>
					Made by <a href="https://starptr.netlify.app/">Yuto Nishida</a>.
					Source code is available{" "}
					<a href="https://github.com/starptr/qresistance-client">here</a>.
				</p>
				<h2>Changelog</h2>
				<h3>2020-04-25</h3>
				<ul>
					<li>
						Experimental support for >10 players (linear regression used to
						extrapolate existing rules)
					</li>
				</ul>
				<h3>2020-04-11</h3>
				<ul>
					<li>Audio alert on room update with volume controls</li>
					<li>Changelog on lobby</li>
				</ul>
				<h3>2020-04-07</h3>
				<ul>
					<li>Working refresh button</li>
				</ul>
				<h3>2020-04-02</h3>
				<ul>
					<li>Initial release</li>
				</ul>
				<h2>Debug info</h2>
				<p>
					Server endpoint:{" "}
					{process.env.REACT_APP_SERVER_ENDPOINT ||
						process.env.REACT_APP_LOCAL_ENDPOINT}
				</p>
			</div>
		);
};

export default Lobby;
