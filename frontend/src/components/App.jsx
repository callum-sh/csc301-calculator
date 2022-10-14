import Item from "./Items"
import Discount from "./Discounts"
import Footer from "./Footer"


function App() {

    return (
        <div className='App'>
            <div class="row">
                <Item />
                <Discount />
            </div>
            <Footer />
        </div>
    );
}

export default App;