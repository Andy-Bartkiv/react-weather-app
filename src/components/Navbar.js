import { Link, useLocation } from "react-router-dom"
import '../styles/Navbar.css';
import { useContext } from "react";
import { DataContext } from "../context";
import MySwitch from "./UI/switch/MySwitch";

const Navbar = () => {

    const { is3D, setIs3D } = useContext(DataContext);
    const active = useLocation().pathname;
    
    return (
        <ul className='App-navbar'> 
            <li className={(active === '/map') ? 'active' : '' }>
                { (active === '/map') &&
                    <MySwitch
                        name='is3D'
                        type='checkbox' 
                        checked= { is3D }
                        onChange= { (e) => setIs3D(!is3D) }
                    />
                }
                <Link to={ '/map' }>
                Map
            </Link></li>
            <li className={(active === '/five-cities') ? 'active' : '' }><Link to={ '/five-cities' }>Five Cties</Link></li>
            <li className={(active === '/my-list') ? 'active' : '' }><Link to={ '/my-list' }>My List</Link></li>
        </ul>
    )
}
export default Navbar
