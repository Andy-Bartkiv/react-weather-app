import { Map, Marker, ZoomControl, Overlay } from "pigeon-maps"

const PigeonMap = ({ center }) => {
    return (
        <Map 
            // defaultCenter={[51, 0]} 
            defaultCenter={ center } 
            defaultZoom={5}>
            <ZoomControl
                style={{left:'auto', right: '.5em', top: '.5em'}} 
                buttonStyle={{ background: '#0886', color: 'orange'}}/>
            <Marker width={25} anchor={center} />
            <Overlay anchor={center} offset={[0, '50%']}>
                <div style={{ color: 'orange' }}>KURSK</div>
            </Overlay>
        </Map>
    )
}

export default PigeonMap
