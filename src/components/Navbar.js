import { Link, useLocation } from "react-router-dom"
import { useContext } from "react";
import { AuthContext } from "../context";

const Navbar = () => {
    
    const active = useLocation().pathname;
    const { setIsAuth, setPage, setLimit } = useContext(AuthContext);
    const postID = active.slice(7);

    const logoutUser = () => {
        setIsAuth(false);
        setPage(1);
        setLimit(10);
        localStorage.removeItem('userAuth');
    }
    
    return (
        <>
        { (active != '/login') &&
            <ul className='App-navbar'>
                <li onClick={ logoutUser }><div style={{ cursor: 'pointer' }}>Logout</div></li>
                
                {/* Emty DIV max-shrink, max-etend to format Navbar */}
                <div style={{ flex: '1 1 0', padding: '0' }}></div>
                
                {postID != '' && <li className="post_id active"><div>ID: { postID }</div></li>}
                
                <li className={(active === '/posts') ? 'active' : '' }><Link to={ '/posts' }>Posts</Link></li>
                <li className={(active === '/about') ? 'active' : '' }><Link to={ '/about' }>About</Link></li>
            </ul>
        }
        </>
    )
}
export default Navbar
