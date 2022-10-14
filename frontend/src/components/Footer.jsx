import { useState, useEffect } from "react";
import axios from "axios";

function Footer() {

    useEffect(() => {
        getSum()
    }, [])

    const [sum, setSum] = useState(null)
    const [total, setTotal] = useState(null)
    const [tax, setTax] = useState(null)
    
    function getSum() {
        axios({
            method: "GET",
            url: "/sum/",
        }).then((response) => {
            setSum(response.data["sum"]);
            setTax(response.data["tax"]);
            setTotal(response.data["total"]);
            console.log(sum);
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
        <div>
            <h1>Sum: ${sum}, Tax: ${tax}, Total: ${total}</h1>
        </div>
      </footer>
    );
  }
  export default Footer;