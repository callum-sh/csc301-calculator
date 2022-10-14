import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

function Footer() {

    useEffect(() => {
        getSum()
    }, [])

    const [Sum, setSum] = useState()
    const [Total, setTotal] = useState()
    const [Tax, setTax] = useState()

    function getSum() {
        axios({
            method: "GET",
            url: "/sum/",
        }).then((response) => {
            setSum(response.data["sum"]);
            setTax(response.data["tax"]);
            setTotal(response.data["total"]);
        }).catch((error) => {
            if (error.response) {
                console.log(error.response);
                console.log(error.response.status);
                console.log(error.response.headers);
            }
        })
    }

    function resetValues() {
        axios({
            method: "GET",
            url: "/reset/",
        }).then((response) => {
            getSum()
        }).catch((error) => {
            if (error.response) {
                console.log(error.response);
                console.log(error.response.status);
                console.log(error.response.headers);
            }
        })
    }

    return (
        <footer>
            <div id="wrapper">
                <div id="div1">
                    <button id="reset" onClick={resetValues}>HARD RESET ON VALUES NOT ITEMS</button>
                </div>
                <div id="div2">
                    <h1>Sum: ${Sum}, Tax: ${Tax}, Total: ${Total}</h1>
                </div>
            </div>
        </footer>
    );
}
export default Footer;