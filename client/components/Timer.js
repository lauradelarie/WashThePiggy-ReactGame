import React, { Component } from 'react'
import saveGame from '../actions/update-game'
import { connect } from 'react-redux'


export class Timer extends Component {
  constructor() {
    super()
    this.state = {
      timerValue: 'Waiting to start...'
    }
  }

  beforeGameCountdown(){
    const { game, saveGame } = this.props
    const timerArray = ['Ready?', 'Set..', 'Wash that Piggy!', '']
      game.spots.map((spot) => {
      saveGame(game, { cleaned: spot.cleaned = true})
      })
    this.tickTimer(timerArray, this.setTimer.bind(this))
  }

  startGame() {
    const { game, saveGame } = this.props
    saveGame(game, { started: true })
      game.spots.map((spot) => {
        console.log("SPOT:", spot)
        saveGame(spot, { cleaned: spot.cleaned = false})
      })

  }

  stopGame() {
    const { game, saveGame } = this.props
      saveGame(game, { ended: true })
      game.spots.map((spot) => {
      saveGame(game, { cleaned: spot.cleaned = true})
      })

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

  render() {
    const { game } = this.props
    return(
      <div className="timer">
        <h1>Timer</h1>
          <p>{ this.state.timerValue }</p>
          <button onClick={this.beforeGameCountdown.bind(this)}>SetTimer</button>
          { game.ended === true ?
          <p> THE WINNER IS: { game.winner } </p> : null }
      </div>
    )
  }

}

export default connect(null, { saveGame })(Timer)
