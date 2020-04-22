import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import ReactGA from 'react-ga';

import Lobby from './components/Lobby'
import Room from './components/Room'
import ErrorPage from './components/ErrorPage'

const App = () => {
	useEffect(() => {
		ReactGA.initialize(process.env.REACT_APP_GA_TRACKING_ID, {
			gaOptions: {
				siteSpeedSampleRate: 100,
			}
		});
		ReactGA.pageview(window.location.pathname + window.location.search);
	}, [])

	return (
		<Router>
			<Route exact path="/" component={Lobby} />
			<Route path="/room" component={Room} />
			<Route path="/error" component={ErrorPage} />
		</Router>
	);
}

export default App;