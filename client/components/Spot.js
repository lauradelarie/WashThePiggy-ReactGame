import React, { Component } from 'react'

class Spot extends Component {
  render() {
    const { label } = this.props

    return(
      <h1>{ label }</h1>
    )
  }
}
export default Spot
