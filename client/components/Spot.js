import React, { Component } from 'react'
import { connect } from 'react-redux'
import './Spot.sass'
import saveGame from '../actions/update-game'

export class Spot extends Component {
  cleanSpot() {
    const { game, cleanedSpots, spot, saveGame } = this.props
    console.log("THIS.PROPS:", this.props )
    console.log("SPOT:", spot)
    console.log("GAME:", game )
    console.log("ACTIVE SPOT ID:", this.props.spot._id)
    console.log("ANY SPOT ID:", this.props.game.spots)
    console.log("Players: ", this.props.game.players[0].cleanedSpots)

    saveGame(game, { spot: spot.cleaned = true })
    saveGame(game, {cleanedSpots: this.props.game.players[0].cleanedSpots.push(spot)})

  }

  render() {
    const { spot, game } = this.props

    return(
      <div className="spot">
      <button onClick={ this.cleanSpot.bind(this) }>{ spot.spot }</button>
    </div>
    )
  }
}

export default connect(null, { saveGame })(Spot)
