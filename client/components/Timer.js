import React, { Component } from 'react'

export class Timer extends Component {

  setTimer() {
    debugger
  const timerArray = ['10', '9', '8', '7', '6', '5', '4', '3', '2', '1', '0']

    timerArray.map((item) => {
      console.log("NUMBER: ", item)
        this.sleep(1000)
    })
  }

  sleep(milliseconds) {
    let start = new Date().getTime()
    for (let i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds){
        break;
      }
    }
  }


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
