import Bookmark from "./bookmark"
import Qualitie from "./qualitie"

const User = (props) => {
  // console.log(props.onToggleBookmark)
  return (
    <tr>
      <td>{props.user.name}</td>
      <td>
        {props.user.qualities.map((qualitie) => (
          <Qualitie key={qualitie._id} {...qualitie} />
        ))}
      </td>
      <td>{props.user.profession.name}</td>
      <td>{props.user.completedMeetings}</td>
      <td>{props.user.rate}</td>
      <td>
        <Bookmark
          status={props.user.bookmark}
          onToggleBookmark={props.onToggleBookmark}
          id={props.user._id}
        />
      </td>
      <td>
        <button
          className='btn btn-danger m-0'
          onClick={() => props.onDelete(props.user._id)}
        >
          delete
        </button>
      </td>
    </tr>
  )
}

export default User
