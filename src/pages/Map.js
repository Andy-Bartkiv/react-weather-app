import { useState, useContext, useRef, useLayoutEffect } from "react";
import PigeonMap from "../components/PigeonMap";
import { DataContext } from "../context";
import GlobeGL from "../components/GlobeGL";
// import ComponentWithDimensions from "../components/CWD";

const Map = () => {
  const { coord, is3D } = useContext(DataContext);
  const targetRef = useRef();
  const [dim, setDim] = useState({ width:0, height: 0 });
  useLayoutEffect( () => {
    if (targetRef.current) {
      setDim({
        width: targetRef.current.offsetWidth *.99,
        height: targetRef.current.offsetHeight *.99
      });
    }
  }, []);

  return (
    <div ref={targetRef} className="App-body" style={{ padding: (is3D) && '0'}}>
      {/* style={{ margin: (is3D) ? '0 auto' : '0'}} */}
    {/* <ComponentWithDimensions/> */}
      { (is3D)
        ? <GlobeGL center={ coord } dim={ dim }/>
        : <PigeonMap center={ coord }/>
      }
    </div>
  )
}

export default Map
