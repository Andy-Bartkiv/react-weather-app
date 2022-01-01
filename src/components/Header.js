import Clock from "./UI/clock/Clock";
import MySwitch from "./UI/switch/MySwitch";
import { useContext } from "react";
import { DataContext } from "../context";
import { RiFahrenheitLine, RiCelsiusLine } from 'react-icons/ri'

const Header = () => {

    const { isCelsius, setIsCelsius } = useContext(DataContext);

    return (
        <div className='App-header'>
        
            <div style={{ width:'25%', padding:'0 .75em', display:'flex', alignItems:'center', fontSize: '.85em' }}>
                <RiFahrenheitLine style={{ color: (isCelsius) ? 'teal' : 'orange'}} />
                <MySwitch isToggled={ isCelsius } onToggle={ () => setIsCelsius(!isCelsius) }/>
                <RiCelsiusLine style={{ color: (!isCelsius) ? 'teal' : 'orange'}}/>
            </div>
            
            <h2>Andy's Weather</h2>

            <Clock style={{ width:'25%' }}/>
        
        </div>
    )
}

export default Header;
