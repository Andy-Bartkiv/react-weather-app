function handleLabelClick(city) {
    const rotationDelay = 0;
    const rotationPrecission = 25;
    let [lat, lon] = [...centerPOV];
    const dLat = (centerPOV[0] - city.coord.lat)/rotationPrecission;
    const dLon = (centerPOV[1] - city.coord.lon)/rotationPrecission;
    let counter = 0;
    let timer = setTimeout( function tick() {
      counter++;
      [lat, lon] = [lat-dLat, lon-dLon]
      setCenterPOV([lat, lon])
      if (counter < rotationPrecission) 
        timer = setTimeout( tick, rotationDelay );
      else 
        setCenterPOV([city.coord.lat, city.coord.lon]) 
    }, rotationDelay);
  }