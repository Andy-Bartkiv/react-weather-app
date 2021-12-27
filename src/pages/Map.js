import { useContext, useEffect } from "react";
import PigeonMap from "../components/PigeonMap";
import { DataContext } from "../context";
import GlobeGL from "../components/GlobeGL";
import ComponentWithDimensions from "../components/CWD";

const Map = () => {
  const { coord } = useContext(DataContext);

    return (
        <div className="App-body">

          <PigeonMap center = { coord }/>
          {/* <GlobeGL/> */}
          {/* <ComponentWithDimensions/> */}

        </div>
    )
}

export default Map
