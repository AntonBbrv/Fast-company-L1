import React from 'react'
import Bookmark from './bookmark'
import Qualitie from './qualitie'
import PropTypes from 'prop-types'

const User = ({ user, onDelete, onToggleBookmark }) => {
  return (
    <tr>
      <td>{user.name}</td>
      <td>
        {user.qualities.map((qualitie) => (
          <Qualitie key={qualitie._id} {...qualitie} />
        ))}
      </td>
      <td>{user.profession.name}</td>
      <td>{user.completedMeetings}</td>
      <td>{user.rate}</td>
      <td>
        <Bookmark
          status={user.bookmark}
          onToggleBookmark={onToggleBookmark}
          id={user._id}
        />
      </td>
      <td>
        <button
          className="btn btn-danger m-0"
          onClick={() => onDelete(user._id)}
        >
          delete
        </button>
      </td>
    </tr>
  )
}

User.propTypes = {
  user: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggleBookmark: PropTypes.func.isRequired
}

export default User
