import AddIcon from "@material-ui/icons/Add";

import { useState, useEffect } from "react";
import axios from "axios";
import DiscountList from "./DiscountList"

function Discount() {

    const [discounts, setNewDiscount] = useState(null)
    const [formDiscount, setFormDiscount] = useState({
        type: "",
        percentage: ""
    })

    const [isExpanded, setExpanded] = useState(false)
    const [rows, setRows] = useState(1)

    useEffect(() => {
        getDiscounts();
    }, [])

    function DiscountShow() {
        setExpanded(true)
        setRows(3)
    }

    function getDiscounts() {
        axios({
            method: "GET",
            url: "/discounts/",
        }).then((response) => {
            const data = response.data
            setNewDiscount(data)
        }).catch((error) => {
            if (error.response) {
                console.log(error.response);
                console.log(error.response.status);
                console.log(error.response.headers);
            }
        })
    }

    function addDiscount(event) {
        axios({
            method: "POST",
            url: "/discounts/",
            data: {
                type: formDiscount.type,
                percentage: formDiscount.percentage
            }
        })
            .then((response) => {
                getDiscounts();
            })

        setFormDiscount(({
            type: "",
            percentage: ""
        }))
        setExpanded(false)
        event.preventDefault()
    }

    function DeleteDiscount(id) {
        axios({
            method: "DELETE",
            url: `/discounts/${id}/`,
        })
            .then((response) => {
                getDiscounts();
            })
    }

    function handleChange(event) {
        const { value, name } = event.target
        setFormDiscount(prevDiscount => ({
            ...prevDiscount, [name]: value
        })
        )
    }


    return (

        <div className=''>

            <form className="create-item">
                {isExpanded && <input onChange={handleChange} type="text" text={formDiscount.type} name="type" placeholder="discount code" value={formDiscount.type} />}
                <input onClick={DiscountShow} onChange={handleChange} type="number" name="percentage" placeholder="add percentage (%)" rows={rows} value={formDiscount.percentage} />
                {isExpanded && <button onClick={addDiscount}>
                    <AddIcon />
                </button>}
            </form>

            {discounts && discounts.map(discount => <DiscountList
                key={discount.id}
                id={discount.id}
                type={discount.type}
                percentage={discount.percentage}
                deletion={DeleteDiscount}
            />
            )}
        </div>

    );
}

export default Discount;