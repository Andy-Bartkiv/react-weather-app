import cls from './MySwitch.module.css'

const MySwitch = ({ isToggled, onToggle, width, height, prmColor, secColor, bgColor }) => {
    return (
        <label 
            className={ cls.toggle_switch }
            style= {{ width: width, height: height, 
                '--prm-color': prmColor, '--sec-color': secColor, '--bg-color': bgColor }}
        >
            <input type="checkbox" checked={ isToggled } onChange={ onToggle } />
            <span className={ cls.switch }></span>
        </label>
    )
}

MySwitch.defaultProps = {
    width: '2em',
    height: '1em',
    prmColor: 'teal',
    secColor: 'orange', 
    bgColor: '#282c34',
}

export default MySwitch
