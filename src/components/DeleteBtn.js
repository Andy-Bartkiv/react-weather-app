import MyButton from "./UI/button/MyButton";
import { MdDeleteForever } from 'react-icons/md'

const DeleteBtn = ({ city, deleteCity }) => {
    return (
        <div style={{ position: 'absolute', top: '.2em', right: '.2em' }}>
            <MyButton 
                onClick={ (event) => deleteCity(city.id, event) } 
                style={{ borderColor: 'transparent', padding: '0' }}>
                <MdDeleteForever style={{ height: '1.75em', width: '1.75em' }}/>
            </MyButton>
        </div>
    )
}

export default DeleteBtn;
