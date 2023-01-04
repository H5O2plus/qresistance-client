import React from 'react'

import { BrowserRouter as Router, Route } from 'react-router-dom'

import Lobby from './components/Lobby'
import Room from './components/Room'
import ErrorPage from './components/ErrorPage'

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