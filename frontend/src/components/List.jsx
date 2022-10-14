function List(props) {
  function handleClick() {
    props.deletion(props.id)
  }
  if (props.list == "ITEM") {
    return (
      <div className="item">
        <h1 >Name: {props.name},  Price: ${props.price} <button onClick={handleClick}>Delete</button></h1>
      </div>
    )
  } else {
    return (
      <div className="item">
        <h1 >Discount: {props.type},  Percentage: %{props.percentage} <button onClick={handleClick}>Delete</button></h1>
      </div>
    )
  }

}

export default List;