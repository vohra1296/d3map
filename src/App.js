import React, { useState, useCallback } from "react"
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api"


const containerStyle = {
  width: '960px',
  height: '600px'
};

const center = {
  lat: 43.589046,
  lng: -79.644119
};




const App = () => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: ""
  })

  const [map, setMap] = useState(null)

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map)
  }, [])

  const onUnmount = useCallback(function callback(map) {
    setMap(null)
  }, [])


  return isLoaded ? (
    <div style={{ padding: '10%', marginLeft: "15%" }}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
      </GoogleMap>
    </div>

  ) : <></>
}

export default App;