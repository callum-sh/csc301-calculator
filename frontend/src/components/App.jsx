import Item from "./Items"
import Discount from "./Discounts"
import Footer from "./Footer"


function App() {

    return (
        <div className='App'>
            <h2>Shopping Items</h2>
            <Item />
            <h3>Discounts</h3>
            <Discount />
            <p>crying</p>
            <Footer />
        </div>
    );
}

export default App;