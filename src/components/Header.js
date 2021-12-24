import Clock from "./UI/clock/Clock";
import MyButton from "./UI/button/MyButton";

const Header = () => {

    return (
        <div className='App-header'>
        
            <MyButton
                style = {{ marginLeft: '1em', fontSize: '.75em' }} 
                // onClick = { () => setModal(true) }
            >
                Add New City
            </MyButton>
            
            <h2>React Weather App</h2>

            <Clock />
        
        </div>
    )
}

export default Header;
