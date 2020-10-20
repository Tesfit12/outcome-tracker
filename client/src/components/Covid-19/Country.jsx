import React from 'react'
import CountUp from 'react-countup'

const Country = ({ countryData: { confirmed, recovered, deaths, lastUpdate } }) => {
    if (!confirmed) {
        return 'Loading......'
    }




    return (


        <div className="covid-19" style={{ marginTop: '10px', marginBottom: '10px' }}>
            <span className="spanGlobally" style={{ fontFamily: 'monospace', padding: "18px", fontSize: '20px' }}>COVID-19 Israel</span>
            <span className="spanGlobally" style={{ backgroundColor: 'blue', padding: "18px", fontSize: '20px' }}>infected  ->  <CountUp start={0} end={confirmed.value} duration={2.9} separator="," /></span>{" "}
            <span className="spanGlobally" style={{ backgroundColor: 'green', padding: "18px", fontSize: '20px' }}>recovered   ->  <CountUp start={0} end={recovered.value} duration={2.9} separator="," /></span>{" "}
            <span className="spanGlobally" style={{ backgroundColor: 'red', padding: "18px", fontSize: '20px' }}>deaths ->  <CountUp start={0} end={deaths.value} duration={2.9} separator="," /></span>
        </div>

    )
}


export default Country