import React, { Component } from 'react'

export class Timer extends Component {

  setTimer() {
    const { timer } = this.props
    let d = new Date()
    // let n = d.getTime()
    console.log("Timer: ", d )
  }

  // onclick={ this.startTimer.bind(this)}
  //
  // funtion startTimer() {
  //   let timer =  setInterval(function, interval between executions of     function in milliseconds)
  //   function {
  //   counter = 10
  //   counter - 1
  //   return counter
  //   }
  //     if counter = 0
  //     stopTimer()
  // }
  //
  // stopTimer() {
  //   clearInterval(timer);
  // }
  //
  render() {

    return(
      <div className="timer">
        <h1>Timer</h1>
        <button onClick={this.setTimer.bind(this)}>SetTimer</button>
      </div>
    )
  }
}

export default Timer
