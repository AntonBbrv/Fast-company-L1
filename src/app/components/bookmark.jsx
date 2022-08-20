const Bookmark = (props) => {
  return (
    <button onClick={() => props.onToggleBookmark(props.id)}>
      <i
        className={
          props.status ? "bi bi-bookmark-heart-fill" : "bi bi-bookmark"
        }
      ></i>
    </button>
  )
}

export default Bookmark
