import React, { useRef, useLayoutEffect, useState } from "react";

const ComponentWithDimensions = props => {
  const targetRef = useRef();
  const [dimensions, setDimensions] = useState({ width:0, height: 0 });

  useLayoutEffect(() => {
    if (targetRef.current) {
      setDimensions({
        width: targetRef.current.offsetWidth,
        height: targetRef.current.offsetHeight
      });
    }
  }, []);

  return (
    <div ref={targetRef} style={{height: '100%', border:'1px solid green'}}>
      <p>{dimensions.width}</p>
      <p>{dimensions.height}</p>
    </div>
  );
};

export default ComponentWithDimensions;