import { Link, useLocation } from "react-router-dom"
import '../styles/Navbar.css';

const Navbar = () => {
    
    const active = useLocation().pathname;
    
    return (
        <ul className='App-navbar'>          
            <li className={(active === '/my-list') ? 'active' : '' }><Link to={ '/my-list' }>My List</Link></li>
            <li className={(active === '/default') ? 'active' : '' }><Link to={ '/default' }>Five Cties</Link></li>
        </ul>
    )
}
export default Navbar
