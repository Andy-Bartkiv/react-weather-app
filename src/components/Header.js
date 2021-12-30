import Clock from "./UI/clock/Clock";
import MyButton from "./UI/button/MyButton";

const Header = () => {

    return (
        <div className='App-header'>
        
            <div style={{ width:'25%', padding:'0 .5em', display:'flex', flexDirection:'column' }}>
                <MyButton>C to F</MyButton>
                {/* <MyButton>Refresh</MyButton> */}
            </div>
            
            <h2>Andy's Weather App</h2>

            <Clock style={{ minWidth:'25%' }}/>
        
        </div>
    )
}

export default Header;
