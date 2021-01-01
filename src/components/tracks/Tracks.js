import React, { Component } from 'react'
import { Consumer } from '../../context'

export class Tracks extends Component {
    render() {
        return (
            <Consumer>
                {value => {
                    console.log(value);
                    return <h1>Tracks</h1>
                }}
            </Consumer>
        )
    }
}

export default Tracks
