import React, { Component } from 'react'
import { connect } from 'react-redux'
import './Spot.sass'
import saveGame from '../actions/update-game'

export class Spot extends Component {
  cleanSpot() {
    const { game, cleanedSpots, currentUser, spot, saveGame } = this.props
    console.log("THIS.PROPS:", this.props )
    console.log("SPOT:", spot)
    console.log("GAME:", game )
    console.log("ACTIVE SPOT ID:", this.props.spot._id)
    console.log("ANY SPOT ID:", this.props.game.spots)
    console.log("Player spots: ", this.props.game.players[0].cleanedSpots)

    // player that matches current user id
    let player = game.players.filter((player) => {
      return (player.userId === currentUser._id)
    })

    saveGame(game, { spot: spot.cleaned = true })
    saveGame(game, { cleanedSpots: player[0].cleanedSpots.push(spot) })

  }



  render() {
    const { spot, game, currentUser } = this.props

    return(
      <div className="spot">
        <img onClick={ this.cleanSpot.bind(this) } style={{width: 60, height: 60}} src={`${ spot.spot }`}></img>
      </div>
    )
  }
}


export default connect(null, { saveGame })(Spot)
