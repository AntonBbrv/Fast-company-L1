import React from 'react'
import PropTypes from 'prop-types'

const Bookmark = ({ status, onToggleBookmark, id }) => {
  return (
    <button onClick={() => onToggleBookmark(id)}>
      <i
        className={status ? 'bi bi-bookmark-heart-fill' : 'bi bi-bookmark'}
      ></i>
    </button>
  )
}

Bookmark.propTypes = {
  status: PropTypes.bool.isRequired,
  onToggleBookmark: PropTypes.func.isRequired,
  id: PropTypes.string
}

export default Bookmark
