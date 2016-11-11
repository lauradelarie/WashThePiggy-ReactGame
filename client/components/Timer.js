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
    const timerArray = ['Wash that Piggy!', '']

    this.tickTimer(timerArray, this.setTimer.bind(this))
  }

  startGame() {
    const { game, saveGame } = this.props
    saveGame(game, { started: true })
  }

  stopGame() {
    const { game, saveGame } = this.props
    saveGame(game, { ended: true })
    // saveGame(game, { started: false })
    this.checkWinner()
  }

  setTimer() {
    this.startGame(true)

    let timerArray = ['', '1', 'Time\'s Up!']
    this.tickTimer(timerArray, this.stopGame.bind(this))
  }

  tickTimer(timerArray, cb) {
    const timerValue = timerArray.shift()
    console.log("COUNTDOWN: ", timerValue)

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
    console.log("GAME:", game)
    console.log("PLAYER_0: ", game.players[0])
    console.log("NAME_PLAYER_0: ", game.players[0].name)


    if (game.players[0].cleanedSpots.length > game.players[1].cleanedSpots.length) {
      saveGame(game, { winner: [game.players[0].name] })
    } else {
      saveGame(game, { winner: [game.players[1].name] })
    }
    console.log("WINNER: ", game.winner[0])
  }

  render() {
    const { game } = this.props
    return(
      <div className="timer">
        <h1>Timer</h1>
        <p>{ this.state.timerValue }</p>
        <button onClick={this.beforeGameCountdown.bind(this)}>SetTimer</button>
        { game.ended === true ?
            <p> { game.winner } </p> : null}
      </div>
    )
  }

}

export default connect(null, { saveGame })(Timer)
