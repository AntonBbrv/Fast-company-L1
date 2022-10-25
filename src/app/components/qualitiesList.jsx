import React from 'react'
import PropTypes from 'prop-types'
import Qualitie from './qualitie'

const QualitiesList = (user) => {
  return (
    <>
      {user.qualities.map((qualitie) => (
        <Qualitie key={qualitie._id} {...qualitie} />
      ))}
    </>
  )
}

QualitiesList.propTypes = {
  user: PropTypes.array
}

export default QualitiesList
