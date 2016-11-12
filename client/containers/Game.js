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

  constructor() {
    super()
    this.state = {
      timerValue: 'Await the miracle of spots!'
    }
  }

  beforeGameCountdown(){
    const { game, saveGame } = this.props
    const timerArray = ['Ready?', 'Set..', 'Wash that Piggy!', '']

    this.tickTimer(timerArray, this.setTimer.bind(this))
  }

  startGame() {
    const { game, saveGame } = this.props
    saveGame(game, { started: game.started = true,
    timerStarted: game.timerStarted = true })
  }

  stopGame() {
    const { game, saveGame } = this.props
      saveGame(game, { ended: game.ended = true })
      this.checkWinner()
  }

  setTimer() {
    this.startGame(true)

    let timerArray = ['5', '4', '3', '2', '1', 'Time\'s Up!']
    this.tickTimer(timerArray, this.stopGame.bind(this))

  }

  tickTimer(timerArray, cb) {
    const timerValue = timerArray.shift()

    this.setState({
      timerValue
    })

    if (timerArray.length === 0) { return cb() }
    setTimeout(() => {
      this.tickTimer(timerArray, cb)
    }, 1500)
  }

  checkWinner(){

    const { game, saveGame } = this.props

    if (game.players[0].cleanedSpots.length > game.players[1].cleanedSpots.length) {
      saveGame(game, { winner: [game.players[0].name] })
    } else if (game.players[0].cleanedSpots.length === game.players[1].cleanedSpots.length) {
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
    saveGame(game, {
      players: game.players.concat({
      userId: currentUser._id,
      name: currentUser.name,
      color: PLAYER_COLORS[game.players.length],
    })})
    this.beforeGameCountdown()
  }
// RENDERING THE Game
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
      )}

        if (game.ended === false) {
          return(
            <div className="game">
              {/* <img className="pigface" src="http://res.cloudinary.com/dsiyhc1tt/image/upload/v1478960301/Draw-a-Pig-Step-14_gssn3r.png"/> */}
              <div className="timer">
                 {/* <h1>Await the miracle of spots!</h1> */}
                  <p>{ this.state.timerValue }</p>
                    {/* <button onClick={this.beforeGameCountdown.bind(this)}>SetTimer</button> */}
              </div>

              <div className="spots">
                {game.spots.map((spot) =>
                  spot.cleaned === false && game.started === true  ?
                    <div><Spot className='spot' key={ spot._id } spot={ spot } game={ game } currentUser={ currentUser } /></div>
                  : null )}
              </div>

            </div>
          )}

        if (game.ended === true) {
          return(
            <div>
              <p> THE WINNER IS: { game.winner } </p>
              <img className="piggy-roll" src="http://www.netanimations.net/Moving-animated-picture-of-pig-in-the-mud.gif"></img>
            </div>
          )
        }
      // closes render
  }
// class end
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
