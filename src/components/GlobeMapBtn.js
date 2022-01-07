import MyButton from "./UI/button/MyButton";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { DataContext } from "../context";
import { MdOutlineMap, MdOutlineLanguage } from 'react-icons/md'

const GlobeMapBtn = ({ city }) => {

    const { is3D, setActiveCity } = useContext(DataContext);

    return (
        <div style={{ position: 'absolute', top: '.15em', left: '.15em' }}>
        <Link style={{ textDecoration:'none' }} to={ '/map' }>
            <MyButton 
                style={{ borderColor: 'transparent', padding: '0' }} 
                onClick={ (e) => { 
                    e.stopPropagation(); 
                    setActiveCity(city); 
                }}>
                { (is3D) 
                    ? <MdOutlineLanguage style={{ height: '1.75em', width: '1.75em' }}/> 
                    : <MdOutlineMap style={{ height: '1.75em', width: '1.75em' }}/> }
            </MyButton>
        </Link>
        </div>
    )
}

export default GlobeMapBtn
