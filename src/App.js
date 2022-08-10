import React, { useState } from 'react'
import data from './custom.geo.json'
import GeoChart from './Components/Geochart'
import "./App.css";

const App = () => {

  const [property, setProperty] = useState("pop_est");


  return (
    <React.Fragment>
      <div style={{ padding: '5% 10% 10% 30%', backgroundColor: 'lightsteelblue' }}>
        <h2 style={{ marginLeft: '20%' }}> World Map with d3-Geo</h2>
        <h2 style={{ marginLeft: '20%' }}>Select property to highlight</h2>
        <select style={{ width: '60%' }} value={property} onChange={(e) => setProperty(e.target.value)}>
          <option value='pop_est'>Population</option>
          <option value='name_len'>Name Length</option>
          <option value='gdp_md'>GDP</option>
        </select>
        <div style={{ marginTop: '5%', width: '70%' }}>
          <GeoChart data={data} property={property} />
        </div>


      </div>

    </React.Fragment>
  )
}

export default App