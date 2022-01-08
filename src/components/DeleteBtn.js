import { MdDeleteForever } from 'react-icons/md';

const DeleteBtn = ({ id, deleteCity }) => {
    return (
        <div className="my_btn"
            style={{ position:'absolute', top:'0', right:'0' }}
            onClick={ (event) => deleteCity(event, id) } 
        >
            <MdDeleteForever style={{ height: '1.15em', width: '1.15em' }}/>
        </div>
    )
}

export default DeleteBtn;
