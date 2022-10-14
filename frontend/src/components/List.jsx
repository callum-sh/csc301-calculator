function List(props){
    function handleClick(){
  props.deletion(props.id)
}
  return (
      <div className="item">
        <h1 >Name: {props.name},  Price: {props.price} <button onClick={handleClick}>Delete</button></h1>
      </div>
  )
}

export default List;