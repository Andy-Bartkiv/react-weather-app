import Clock from "./UI/clock/Clock";
import MySwitch from "./UI/switch/MySwitch";
import { useContext } from "react";
import { DataContext } from "../context";
import { RiFahrenheitLine, RiCelsiusLine } from 'react-icons/ri'

const Header = () => {

    const { isCelsius, setIsCelsius } = useContext(DataContext);

    return (
        <div className='App-header'>
        
            <div style={{ width:'20%', fontSize:'.85em', padding:'0 .5em', display:'flex', alignItems:'center' }}>
                <RiFahrenheitLine style={{ color: (isCelsius) ? 'teal' : 'orange'}} />
                <MySwitch isToggled={ isCelsius } onToggle={ () => setIsCelsius(!isCelsius) }/>
                <RiCelsiusLine style={{ color: (!isCelsius) ? 'teal' : 'orange'}}/>
            </div>
            
            <h2>Andy's Weather</h2>

            <div style={{ width:'20%', fontSize:'.85em', display:'flex', justifyContent:'flex-end', alignItems:'center' }}>
                <Clock/>
            </div>
        
        </div>
    )
}

export default Header;
