import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import ReactGA from 'react-ga';

import Lobby from './components/Lobby'
import Room from './components/Room'
import ErrorPage from './components/ErrorPage'

ReactGA.initialize(process.env.REACT_APP_GA_TRACKING_ID, {
	gaOptions: {
		siteSpeedSampleRate: 100,
	}
})

class App extends React.Component {
	render() {
		return (
			<Router>
				<Route exact path="/" component={Lobby} />
				<Route path="/room" component={Room} />
				<Route path="/error" component={ErrorPage} />
			</Router>
		);
	}
}

export default App;