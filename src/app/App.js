import { React, useState } from 'react'
import api from './api'
import Users from './components/users'
import SearchStatus from './components/searchStatus'

const App = () => {
  const [users, setUsers] = useState(api.users.fetchAll())

  const handleDelUsers = (id) => {
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
      <SearchStatus length={users.length} />
      <Users
        users={users}
        onDelete={handleDelUsers}
        onToggleBookmark={handlToggleBookmark}
      />
    </div>
  )
}

export default App
