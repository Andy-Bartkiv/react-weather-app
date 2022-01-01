import Clock from "./UI/clock/Clock";
import MyButton from "./UI/button/MyButton";
import MySwitch from "./UI/switch/MySwitch";
import { useContext } from "react";
import { DataContext } from "../context";

const Header = () => {

    const { isCelsius, setIsCelsius } = useContext(DataContext);
    console.log(isCelsius);

    return (
        <div className='App-header'>
        
            <div style={{ width:'25%', padding:'0 .5em', display:'flex', flexDirection:'column' }}>
                {/* <MyButton>Refresh</MyButton> */}
                <MySwitch isToggled={ isCelsius } onToggle={ () => setIsCelsius(!isCelsius) }/>
            </div>
            
            <h2>Andy's Weather App</h2>

            <Clock style={{ minWidth:'25%' }}/>
        
        </div>
    )
}

export default Header;
