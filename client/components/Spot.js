import React, { Component } from 'react'
import { connect } from 'react-redux'

import saveGame from '../actions/update-game'

export class Spot extends Component {


cleanSpot() {
  const { game, spot, saveGame } = this.props
  console.log("THIS.PROPS:", this.props )
  console.log("SPOT:", spot)
  console.log("GAME:", game )
  console.log("ACTIVE SPOT ID:", this.props.spot._id)
  console.log("ANY SPOT ID:", this.props.game.spots)


  saveGame(game, { spot: spot.cleaned = true }
  )}



  render() {
    const { spot, game } = this.props

    return(
      <li>
      <button onClick={ this.cleanSpot.bind(this) }>{ spot.spot }</button>
    </li>
    )
  }

}
export default connect(null, { saveGame })(Spot)
