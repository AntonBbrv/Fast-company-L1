import React from "react"
import { useState } from "react"
import api from "../api"

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll())

  const handleDelUsers = (id) => {
    setUsers((prevState) => prevState.filter((user) => user._id !== id))
  }

  const renderUsers = () => {
    let classes = "badge m-1 "
    return users.map((user) => (
      <tr key={user._id}>
        <td>{user.name}</td>
        <td>
          {user.qualities.map((quality) => (
            <span className={classes + `bg-${quality.color}`}>
              {quality.name}
            </span>
          ))}
        </td>
        <td>{user.profession.name}</td>
        <td>{user.completedMeetings}</td>
        <td>{user.rate}</td>
        <td>
          <button
            className='btn btn-danger m-0'
            onClick={() => handleDelUsers(user._id)}
          >
            delete
          </button>
        </td>
      </tr>
    ))
  }

  const setPeopleCount = () => {
    if (users.length >= 2 && users.length <= 4) {
      return `${users.length} человека тусанет с тобой сегодня`
    } else return `${users.length} человек тусанет с тобой сегодня`
  }

  if (users.length !== 0) {
    return (
      <>
        <span className='badge bg-primary fs-5'>{setPeopleCount()}</span>
        <table className='table'>
          <thead>
            <tr>
              <th scope='col'>Имя</th>
              <th scope='col'>Качества</th>
              <th scope='col'>Профессия</th>
              <th scope='col'>Встретился, раз</th>
              <th scope='col'>Оценка</th>
              <th scope='col'></th>
            </tr>
          </thead>
          <tbody>{renderUsers()}</tbody>
        </table>
      </>
    )
  }

  return (
    <>
      <span className='badge bg-danger fs-5'>никто с тобой не тусанет</span>
    </>
  )
}

export default Users
