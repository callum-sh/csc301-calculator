import AddIcon from "@material-ui/icons/Add";

import { useState, useEffect } from "react";
import axios from "axios";
import List from "./List";

function Item() {

    const [items, setNewItems] = useState(null)
    const [formItem, setFormItem] = useState({
        name: "",
        price: ""
    })

    const [isExpanded, setExpanded] = useState(false)
    const [rows, setRows] = useState(1)

    useEffect(() => {
        getItems()
    }, [])

    function ItemShow() {
        setExpanded(true)
        setRows(3)
    }

    function getItems() {
        axios({
            method: "GET",
            url: "/items/",
        }).then((response) => {
            const data = response.data
            setNewItems(data)
        }).catch((error) => {
            if (error.response) {
                console.log(error.response);
                console.log(error.response.status);
                console.log(error.response.headers);
            }
        })
    }

    function addItem(event) {
        axios({
            method: "POST",
            url: "/items/",
            data: {
                name: formItem.name,
                price: formItem.price
            }
        })
            .then((response) => {
                getItems()
            })

        setFormItem(({
            name: "",
            price: ""
        }))
        setExpanded(false)
        event.preventDefault()
    }

    function DeleteItem(id) {
        axios({
            method: "DELETE",
            url: `/items/${id}/`,
        })
            .then((response) => {
                getItems()
            })
    }

    function handleChange(event) {
        const { value, name } = event.target
        setFormItem(prevItem => ({
            ...prevItem, [name]: value
        })
        )
    }


    return (

        <div class='column'>
            <h3>Shopping Items</h3>
            <form className="create-item">
                {isExpanded && <input onChange={handleChange} type="text" text={formItem.name} name="name" placeholder="item name" value={formItem.name} />}
                <input onClick={ItemShow} onChange={handleChange} type="number" step=".01" name="price" placeholder="add price ($)" rows={rows} value={formItem.price} />
                {isExpanded && <button onClick={addItem}>
                    <AddIcon />
                </button>}
            </form>

            {items && items.map(item => <List
                list={"ITEM"}
                key={item.id}
                id={item.id}
                name={item.name}
                price={item.price}
                deletion={DeleteItem}
            />
            )}
        </div>

    );
}

export default Item;