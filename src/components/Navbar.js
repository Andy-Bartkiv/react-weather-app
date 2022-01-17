import { Link, useLocation } from "react-router-dom"
import '../styles/Navbar.css';
import { useContext } from "react";
import { DataContext } from "../context";
import MySwitch from "./UI/switch/MySwitch";
import { MdOutlineMap, MdOutlineLanguage} from 'react-icons/md';

const Navbar = () => {

    const { is3D, setIs3D } = useContext(DataContext);
    const active = useLocation().pathname;
    
    return (
        <ul className='App-navbar'>
        {/* MAP tab */}
            <li className={(active === '/map') ? 'active' : '' }>
                { (active === '/map') &&
                    <div style={{ padding: '.2em 0 0 .5em' }}>
                        <MdOutlineMap style={{ color: (is3D) ? 'teal' : 'orange' }}/>
                        <MySwitch 
                            isToggled= { is3D } 
                            onToggle= { () => setIs3D(!is3D) }
                        />
                        <MdOutlineLanguage style={{ color: (!is3D) ? 'teal' : 'orange'}}/>
                    </div>          
                }
                <Link to={ '/map' }> <div>Map</div> </Link>
            </li>
        {/* FIVE CITIES tab */}
            <li className={(active === '/five-cities') ? 'active' : '' }><Link to={ '/five-cities' }>Five Cities</Link></li>
        {/* MY LIST tab */}
            <li className={(active === '/my-list') ? 'active' : '' }><Link to={ '/my-list' }>My List</Link></li>
        </ul>
    )
}
export default Navbar
