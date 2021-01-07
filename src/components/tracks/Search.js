import React, { Component } from 'react'
import {Consumer} from '../../context'
import axios from 'axios'

export class Search extends Component {
    state = {
        titleTrack : ""
    }

    onChange = e =>{
        this.setState({ [e.target.name] : e.target.value})
    }

    findTrack = (dispatch, e) => {
        e.preventDefault()
        axios
        .get(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.search?q_track=${this.state.titleTrack}&page_size=10&page=1&s_track_rating=desc&apikey=${process.env.REACT_APP_MM_KEY}`)
        .then(res => {
            console.log(res.data)
            dispatch({
                type : 'SEARCH_TRACK',
                payload : res.data.message.body.track_list
            })
            this.setState({titleTrack: ''})
            // this.setState({ track_list : res.data.message.body.track_list });
        })
        .catch(err => console.log(err))
    }

    render() {
        return (
            <Consumer>
                {value => {
                    const { dispatch } = value
                    return (
                        <div className="card card-body mb-4 p-4">
                        <h1 className="display-4 text-center">
                            <i className="fas fa-music"></i> Search for a Song
                        </h1>
                        <p className="lead text-center">Get Lyrics for any song.</p>
                        <form onSubmit={this.findTrack.bind(this, dispatch)}>
                            <div className="form-group">
                                <input type="text" className="form-control form-control-lg" placeholder="Search track..." name="titleTrack" value={this.state.titleTrack} onChange={this.onChange} />
                            </div>
                            <button className="btn btn-primary btn-block btn-lg mb-5" type="submit">Get Track Lyrics</button>
                        </form>
                        </div>
                    )
                }}
            </Consumer>
        )
    }
}

export default Search
