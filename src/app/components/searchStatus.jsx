import PropTypes from 'prop-types'
import React from 'react'

const SearchStatus = ({ length }) => {
  let man = 'человек'
  if (length >= 2 && length <= 4) {
    man = 'человека'
  } else if (length === 0) {
    return (
      <span className="badge bg-danger fs-5">никто с тобой не тусанет</span>
    )
  }

  return (
    <span className="badge bg-primary fs-5">
      {length} {man} тусанет с тобой сегодня
    </span>
  )
}

SearchStatus.propTypes = {
  length: PropTypes.number
}

export default SearchStatus
