import cls from './SortBar.module.css'
import { useLocation } from "react-router-dom";
import { MdLocationCity, MdOutlineFlag, MdOutlineAccessTime } from "react-icons/md";
import { BsThermometerSun } from 'react-icons/bs';
import { VscSortPrecedence } from 'react-icons/vsc'
import { CgSortAz, CgSortZa } from 'react-icons/cg'
// import { WiHumidity, WiBarometer } from 'react-icons/wi';
// import { GiWindsock } from 'react-icons/gi'

const SortBar = ({ sort, setSort }) => {

    const isNotMap = useLocation().pathname !== '/map';
    const options = [
        { value: 'name', icon: <MdLocationCity/> },
        { value: 'country', icon: <MdOutlineFlag/> },
        { value: '', icon: <VscSortPrecedence/> },
        { value: 'offset', icon: <MdOutlineAccessTime/> },
        { value: 'temp', icon: <BsThermometerSun/>},
        // { value: 'humidity', icon: <WiHumidity/> },
        // { value: 'pressure', icon: <WiBarometer/>},
        // { value: 'wind.speed', icon: <GiWindsock/> },
        ];

    const handleClick = (optValue) => {
        const newSort = (optValue === sort.value)
            ? { ...sort, reverse: !sort.reverse }
            : { ...sort, value: optValue };
        setSort(newSort);
    }

    return (
        <>
        { (isNotMap) && 
            <div className={ cls.sort_bar }>
                { options.map( opt =>
                    <div key={ opt.value }
                        className={ (opt.value !== sort.value) ? cls.sort_item : `${cls.sort_item} ${cls.active}` } 
                        onClick={ () => handleClick(opt.value) }
                    >
                        { opt.icon } 
                        { (opt.value === sort.value && opt.value !== '') && 
                            ((!sort.reverse) ? <CgSortAz/> : <CgSortZa/>)
                        }
                    </div>
                )}
            </div>

        }
        </>
    )
}

export default SortBar
