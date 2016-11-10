import React, { Component } from 'react'
import { connect } from 'react-redux'

export class Spot extends Component {

cleanSpot() {
  const { spot } = this.props

  console.log("CONSOLE:", spot._id)
}

  render() {
    const { spot } = this.props

    return(
      <li>
      <button onClick={ this.cleanSpot.bind(this) }>{ spot.spot }</button>
    </li>
    )
  }
}
export default connect(null, {})(Spot)
