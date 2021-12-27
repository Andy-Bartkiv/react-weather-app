import Globe from 'react-globe.gl';

const GlobeGL = () => {
  // Gen random data
  const N = 30;
  const gData = [...Array(N).keys()].map(() => ({
    lat: (Math.random() - 0.5) * 180,
    lng: (Math.random() - 0.5) * 360,
    size: Math.random() / 3,
    color: ['red', 'white', 'blue', 'green'][Math.round(Math.random() * 3)]
  }));

    return (
        <Globe
        // globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        pointsData={gData}
        backgroundColor="#282c34"
        pointAltitude="size"
        pointColor="color"
      />
    )
}

export default GlobeGL
