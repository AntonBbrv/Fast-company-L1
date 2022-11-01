import { React, useEffect, useState } from 'react'
import API from '../../api'
import { useParams, useHistory } from 'react-router-dom'
import QualitiesList from '../qualitiesList'

const userPage = () => {
  const params = useParams()
  const [user, setUser] = useState()
  const userId = params.userId
  const history = useHistory()

  useEffect(() => {
    API.users.getById(userId).then((user) => setUser(user))
  }, [])

  const handleReturn = () => {
    history.push('/users')
  }

  return (
    <>
      {user ? (
        <>
          <h1>{user.name}</h1>
          <h2>{`Профессия: ${user.profession.name}`}</h2>
          <span>
            <QualitiesList qualities={user.qualities} />
          </span>
          <p>{`completedMeetings: ${user.completedMeetings}`}</p>
          <h2>{`Rate: ${user.rate}`}</h2>
          <button onClick={() => handleReturn()}>Все пользователи</button>
        </>
      ) : (
        <h1>Loading</h1>
      )}
    </>
  )
}

export default userPage
