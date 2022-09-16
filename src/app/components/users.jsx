import { React, useState } from 'react'
import Pagination from './pagination'
import User from './user'
import { paginate } from '../utils/paginate'
import PropTypes from 'prop-types'

const Users = ({ users, onDelete, onToggleBookmark }) => {
  const count = users.length
  const pageSize = 4
  const [currentPage, setCurrentPage] = useState(1)

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex)
  }

  const userCrop = paginate(users, currentPage, pageSize)

  if (users.length !== 0) {
    return (
      <>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Имя</th>
              <th scope="col">Качества</th>
              <th scope="col">Профессия</th>
              <th scope="col">Встретился, раз</th>
              <th scope="col">Оценка</th>
              <th scope="col">Избранное</th>
              <th scope="col"></th>
            </tr>
          </thead>

          <tbody>
            {userCrop.map((user) => (
              <User
                user={user}
                key={user._id}
                onDelete={onDelete}
                onToggleBookmark={onToggleBookmark}
              />
            ))}
          </tbody>
        </table>
        <Pagination
          itemsCount={count}
          currentPage={currentPage}
          pageSize={pageSize}
          onPageChange={handlePageChange}
        />
      </>
    )
  }
}

Users.propTypes = {
  users: PropTypes.array,
  onDelete: PropTypes.func,
  onToggleBookmark: PropTypes.func
}
export default Users
