import cls from './MySwitch.module.css'

const MySwitch = ({ isToggled, onToggle }) => {
    return (
        <label className = {cls.toggle_switch}>
            <input type="checkbox" checked={ isToggled } onChange={ onToggle } />
            <span className={cls.switch}/>
        </label>
    )
}

export default MySwitch
