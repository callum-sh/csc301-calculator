import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

function Footer() {

    useEffect(() => {
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
                this.setState({
                    sum: Sum,
                    tax: Tax,
                    total: Total
                })
            }).catch((error) => {
                if (error.response) {
                    console.log(error.response);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                }
            })
        }

        getSum()
    }, [])



    return (
        <footer>
            <div>
                <h1>Sum: ${Sum}, Tax: ${Tax}, Total: ${Total}</h1>
            </div>
        </footer>
    );
}
export default Footer;