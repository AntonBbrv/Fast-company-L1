const SearchStatus = (props) => {
  let man = "человек"
  if (props.length >= 2 && props.length <= 4) {
    man = "человека"
  } else if (props.length === 0) {
    return (
      <span className='badge bg-danger fs-5'>никто с тобой не тусанет</span>
    )
  }

  return (
    <span className='badge bg-primary fs-5'>
      {props.length} {man} тусанет с тобой сегодня
    </span>
  )
}

export default SearchStatus
