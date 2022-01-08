import { Link } from "react-router-dom";
import { useContext } from "react";
import { DataContext } from "../context";
import { MdOutlineMap, MdOutlineLanguage } from 'react-icons/md';

const GlobeMapBtn = ({ city }) => {

    const { is3D, setActiveCity } = useContext(DataContext);

    return (
        <Link to={ '/map' }
            className="my_btn"
            style={{ position:'absolute', top:'0', left:'0' }}
            onClick={ (e) => { 
                e.stopPropagation(); 
                setActiveCity(city); 
            }}
        >
            { (is3D) 
                ? <MdOutlineLanguage style={{ height: '1.15em', width: '1.15em' }}/> 
                : <MdOutlineMap style={{ height: '1.15em', width: '1.15em' }}/> }
        </Link>
    )
}

export default GlobeMapBtn
