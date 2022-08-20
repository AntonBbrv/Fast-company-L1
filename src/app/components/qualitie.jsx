const Qualitie = (props) => {
  // console.log(props)
  return <span className={"badge m-1 bg-" + props.color}>{props.name}</span>
}

export default Qualitie
