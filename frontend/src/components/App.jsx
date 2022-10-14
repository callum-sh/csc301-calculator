import Item from "./Items"
import Discount from "./Discounts"
import Footer from "./Footer"


function App() {

    return (
        <div className='App'>
            <h3>Shopping Items</h3>
            <Item />
            <h3>Discounts</h3>
            <Discount />

            <Footer />
        </div>
    );
}

export default App;