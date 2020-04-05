import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import queryString from 'query-string'
import io from 'socket.io-client'
import { isEmpty } from 'lodash'

import Players from '../Players'
import Admin from '../Admin'
import PlayerDistribution from '../PlayerDistribution'
import Scoreboard from '../Scoreboard'
import Role from '../Role'
import Captain from '../Captain'
import Vote from '../Vote'
import Mission from '../Mission'
import End from '../End'

const ENDPOINT = process.env.REACT_APP_SERVER_ENDPOINT || process.env.REACT_APP_LOCAL_ENDPOINT;

let socket;

const Room = ({ location }) => {
	const [name, setName] = useState('');
	const [roomName, setRoomName] = useState('');
	const [room, setRoom] = useState({});
	const [rule, setRule] = useState({});
	const [willRedirectMsg, setWillRedirectMsg] = useState('');
	const [nameToRemove, setNameToRemove] = useState('');

	useEffect(() => {
		const { name, roomName } = queryString.parse(location.search);
		socket = io(ENDPOINT);

		setName(name);
		setRoomName(roomName);

		socket.emit('join', { name, roomName }, (reply) => {
			if (!isEmpty(reply.error)) {
				setWillRedirectMsg(reply.error);
			}
		});

		return () => {
			socket.off();
		};
	}, [location.search]);

	useEffect(() => {
		socket.on('roomUpdate', ({ room, rule }) => {
			setRoom(room);
			setRule(rule);
		});
	});

	useEffect(() => {
		socket.on('kick', () => {
			setWillRedirectMsg("You have been removed");
		});
	});

	const reload = () => {
		window.location.reload();
	};

	if (!isEmpty(willRedirectMsg)) {
		return <Redirect to={`/error?msg=${willRedirectMsg}`} />
	} else {
		return (
			<>
				<h1>Room {roomName}</h1>
				<button onClick={reload}>Reload page (EXPERIMENTAL! May break)</button>
				{room.gameState === 4 || room.gameState === 5 ? <End room={room} /> : null}
				<h2>Dashboard</h2>
				<Role name={name} players={room.players} roles={room.roles} />
				{room.gameState === 1 && name === room.captain ? <Captain socket={socket} room={room} rule={rule} /> : null}
				{room.gameState === 2 ? <Vote name={name} socket={socket} room={room} /> : null}
				{room.gameState === 3 && room.proposal.includes(name) ? <Mission socket={socket} room={room} name={name} /> : null}
				<h2>Room Information</h2>
				{room.gameState !== 3 && <p>Last mission's Success : Fail = {room.votes_m} : {room.votes_mt - room.votes_m}</p>}
				<Scoreboard missions={rule.missions} score={room?.score} />
				<Players players={room?.players} captain={room?.captain} />
				<PlayerDistribution playerDist={rule.playerDist} />
				{name === room.admin ? <Admin socket={socket} room={room} state={[nameToRemove, setNameToRemove]} /> : null}
			</>
		);
	}
};

export default Room;