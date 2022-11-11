import React from 'react'
import PropTypes from 'prop-types'

const Search = ({ value, onChange }) => {
  return (
    <form>
      <div className="input-group mb-3 mt-2">
        <input
          className="form-control w-100"
          placeholder="search..."
          id="search"
          type="text"
          value={value}
          onChange={onChange}
        ></input>
      </div>
    </form>
  )
}

Search.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string
}

export default Search
