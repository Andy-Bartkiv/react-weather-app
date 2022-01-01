import cls from './MySwitch.module.css'

const MySwitch = ({ isToggled, onToggle, width, height, prmColor, secColor, bgColor }) => {
    return (
        <label 
            className={ cls.toggle_switch }
            style= {{ width: width, height: height, 
                '--prm-color': prmColor, '--sec-color': secColor, '--bg-color': bgColor }}
        >
            <input type="checkbox" checked={ isToggled } onChange={ onToggle } />
            <span className={cls.switch}></span>
        </label>
    )
}

MySwitch.defaultProps = {
    backgroundColor: '#282c34',
    bgColor: '#282c34',
    prmColor: 'teal',
    secColor: 'orange', 
    width: '2em',
    height: '1em'
}

export default MySwitch
