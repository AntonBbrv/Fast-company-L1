import { React, useState, useEffect } from 'react'
import api from './api'
import Users from './components/users'

const App = () => {
  const [users, setUsers] = useState()

  useEffect(() => {
    api.users.fetchAll().then((data) => setUsers(data))
  }, [])

  const handleDelUsers = (id) => {
    console.log(id)
    setUsers(users.filter((user) => user._id !== id))
  }

  const handlToggleBookmark = (id) => {
    setUsers(
      users.map((user) => {
        if (user._id === id) {
          return { ...user, bookmark: !user.bookmark }
        }
        return user
      })
    )
  }

  return (
    <div>
      <Users
        // users={users}
        onDelete={handleDelUsers}
        onToggleBookmark={handlToggleBookmark}
      />
    </div>
  )
}

export default App
