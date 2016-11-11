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
    const timerArray = ['3', '2', '1', 'Time\'s Up!']

    this.tickTimer(timerArray, this.setTimer.bind(this))
  }

  startGame() {
    const { game, saveGame } = this.props
    saveGame(game, { started: true })
  }

  stopGame() {
    const { game, saveGame } = this.props
    saveGame(game, { started: false })
  }

  setTimer() {
    this.startGame(true)

    let timerArray = ['10', '9', '8', '7', '6', '5', '4', '3', '2', '1', 'Time\'s Up!']
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
    }, 1000)
  }

  render() {

    return(
      <div className="timer">
        <h1>Timer</h1>
        <p>{ this.state.timerValue }</p>
        <button onClick={this.beforeGameCountdown.bind(this)}>SetTimer</button>
      </div>
    )
  }

}

export default connect(null, { saveGame })(Timer)
