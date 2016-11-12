import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import Spot from '../components/Spot'
import Timer from '../components/Timer'

import setUpGames from '../actions/setup-games'
import setGameId from '../actions/set-current-game'
import cleanSpot from '../actions/clean-spot'
import saveGame from '../actions/update-game'

import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'

import './Game.sass'

const PLAYER_COLORS = ['#0f0', '#00f']

class Game extends Component {
  componentWillMount() {
    this.props.setGameId(this.props.routeParams.gameId)
    this.props.setUpGames()
  }

  // componentDidUpdate() {
  //   const { game, state } = this.props
  //   if (game.started === false)
  //     {this.beforeGameCountdown()}
  //     else {
  //       return state
  //     }
  // }

  constructor() {
    super()
    this.state = {
      timerValue: 'Waiting to start...'
    }
  }

  beforeGameCountdown(){
    const { game, saveGame } = this.props
    const timerArray = ['Ready?', 'Set..', 'Wash that Piggy!', '']

    this.tickTimer(timerArray, this.setTimer.bind(this))
  }

  startGame() {
    const { game, saveGame } = this.props
    saveGame(game, { started: game.started = true })

  }

  stopGame() {
    const { game, saveGame } = this.props
      saveGame(game, { ended: true })
  }

  setTimer() {
    this.startGame(true)

    let timerArray = ['', '1', '2', '3', 'Time\'s Up!']
    this.tickTimer(timerArray, this.stopGame.bind(this))

  }

  tickTimer(timerArray, cb) {
    const timerValue = timerArray.shift()

    this.setState({
      timerValue
    })

    if (timerArray.length === 0) { return cb() }
        this.checkWinner()
    setTimeout(() => {
      this.tickTimer(timerArray, cb)
    }, 1500)
  }

  checkWinner(){

    const { game, saveGame } = this.props

    if (game.players[0].cleanedSpots.length > game.players[1].cleanedSpots.length) {
      saveGame(game, { winner: [game.players[0].name] })
    } else if (game.players[0].cleanedSpots.length = game.players[1].cleanedSpots.length) {
      saveGame(game, { winner: [game.players[0].name, game.players[1].name] })
    } else {
      saveGame(game, { winner: [game.players[1].name] })
    }
  }

  isPlayer() {
    const { game, currentUser } = this.props
    return game.players.filter((player) =>
      player.userId === currentUser._id).length > 0
  }

  canJoin() {
    if (this.isPlayer()) { return false }
    const { game } = this.props
    return game.players.length < 4
  }

  joinGame() {
    const { game, saveGame, currentUser } = this.props
    saveGame(game, { players: game.players.concat({
      userId: currentUser._id,
      name: currentUser.name,
      color: PLAYER_COLORS[game.players.length],
    })})
  }

  render() {
    const { game, currentUser } = this.props
    if (!!!game._id) { return null }


    if (this.canJoin()) {
      return (
        <Paper zDepth={3} className="join-game">
          <h3>Join this Game?</h3>
          <p>Join { game.players.map((player) => player.name).join(' and ') } in this game.</p>
          <RaisedButton label="Join" primary={true} onClick={ this.joinGame.bind(this) } />
          <Link to="/"><FlatButton label="Back to the Lobby" /></Link>
        </Paper>
      )
    }

    return(
      <div>
        <div className="game-header">

            {/* <p>Is player: { this.isPlayer() ? 'Yes' : 'No' }</p>
            <p>Can join: { this.canJoin() ? 'Yes' : 'No' }</p> */}
        </div>
        <div className="game">
        <img className="pigface" src="http://res.cloudinary.com/dsiyhc1tt/image/upload/v1478889307/Screen_Shot_2016-11-11_at_19.33.51_haecpa.png"></img>

        <div className="timer">
          <h1>Timer</h1>
            <p>{ this.state.timerValue }</p>
            <button onClick={this.beforeGameCountdown.bind(this)}>SetTimer</button>
            { game.ended === true ?
            <p> THE WINNER IS: { game.winner } </p> : null }
        </div>

            {game.spots.map((spot) =>
              spot.cleaned === false && game.started === true  ?
                <Spot key={ spot._id } spot={ spot } game={ game } currentUser={ currentUser } />
            : null )}

        </div>
      </div>
    )
  }
}

Game.propTypes = {
  game: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => {
  return {
    game: state.games.reduce((currentGame, nextGame) => {
      return nextGame._id === state.currentGame ? nextGame : currentGame
    }, {}),
    currentUser: state.currentUser,
  }
}

export default connect(mapStateToProps, { setUpGames, setGameId, saveGame, cleanSpot })(Game)
