function DiscountList(props){
  function handleClick(){
props.deletion(props.id)
}
return (
    <div className="item">
      <h1 >Discount: {props.type},  Percentage: {props.percentage} <button onClick={handleClick}>Delete</button></h1>
    </div>
)
}

export default DiscountList;