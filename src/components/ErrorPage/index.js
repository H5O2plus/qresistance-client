import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import queryString from 'query-string'
import { isEmpty } from 'lodash'

const ErrorPage = ({ location }) => {
	const [msg, setMsg] = useState('');

	useEffect(() => {
		const { msg } = queryString.parse(location.search);
		setMsg(msg);
	}, [location.search]);

	return (
		<>
			<h1>Error</h1>
			<p>{msg}</p>
		</>
	);
};

export default ErrorPage;