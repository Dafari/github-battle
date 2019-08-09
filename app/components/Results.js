import React from 'react'
import { battle } from "../utils/api";
import { FaCompass, FaBriefcase, FaUser, FaUsers, FaUserFriends, FaCode } from "react-icons/fa";
import Card from "./Card";
import PropTypes from 'prop-types'
import Loading from "./Loading";
import Tooltip from "./Tooltip";
import queryString from 'query-string'
import { Link } from "react-router-dom";


function UserCard({ user, header }) {
  return (
    <React.Fragment>
      <Card href={user.profile.html_url}
            avatar={user.profile.avatar_url}
            name={user.profile.login}
            header={header}
            subheader={`Score: ${user.score.toLocaleString()}`}>
        <ul className='card-list'>
          <li>
            <FaUser color='rgb(239, 115, 115)' size={22}/>
            {user.profile.name}
          </li>
          {user.profile.location && (
            <li>
              <Tooltip text="User's Location">
                <FaCompass color=' rgb(144, 115, 255)' size={22}/>
                {user.profile.location}
              </Tooltip>
            </li>
          )}
          {user.profile.company && (
            <li>
              <Tooltip text="User's Company">
                <FaBriefcase color='#795548' size={22}/>
                {user.profile.company}
              </Tooltip>
            </li>
          )}
          <li>
            <FaUsers color='rgb(129, 195, 245)' size={22}/>
            {user.profile.followers.toLocaleString()} followers
          </li>
          <li>
            <FaUserFriends color='rgb(64, 183, 95)' size={22}/>
            {user.profile.following.toLocaleString()} following
          </li>
        </ul>
      </Card>
    </React.Fragment>
  )
}

UserCard.propTypes = {
  user: PropTypes.object.isRequired,
  header: PropTypes.string.isRequired
}

export default class Results extends React.Component {
  state = {
    winner: null,
    loser: null,
    error: null,
    loading: true
  }

  componentDidMount() {
    const { playerOne, playerTwo } = queryString.parse(this.props.location.search)

    battle([ playerOne, playerTwo ])
      .then((players) => {
        this.setState({
          winner: players[0],
          loser: players[1],
          error: null,
          loading: false
        })
      }).catch(({ message }) => {
      this.setState({
        error: message,
        loading: false
      })
    })
  }

  render() {
    const { winner, loser, error, loading } = this.state

    if (loading === true) {
      return <Loading text='Battling'/>
    }

    if (error) {
      return (
        <p className='center-text error'>${error}</p>
      )
    }

    return (
      <React.Fragment>
        <div className='grid space-around container-sm'>
          <UserCard user={winner} header={winner.score === loser.score ? 'Tie' : 'Winner'}/>
          <UserCard user={loser} header={winner.score === loser.score ? 'Tie' : 'Loser'}/>
        </div>
        <Link className='btn-dark btn btn-space'
              to='/battle'
        >
          Reset
        </Link>
      </React.Fragment>
    )
  }
}