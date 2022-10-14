function List(props){
    function handleClick(){
  props.deletion(props.id)
}
  return (
      <div className="note">
        <h1 >  Name: {props.name} </h1>
        <p > Price: {props.price}</p>
        <button onClick={handleClick}>Delete</button>
      </div>
  )
}

export default List;