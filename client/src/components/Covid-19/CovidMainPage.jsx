import React from 'react'

import Country from './Country'
import Globally from './Globally'

export default function CovidMainPage({ globalData, countryData }) {
    return (
        <div className="container" style={{ marginTop: '5%', width: '60%', fontFamily: 'Cursive', backgroundColor: 'cyan' }}>
            <div className="jumbotron bg-secondary">
                <h1 className="text-white">COVID-19 Tracker </h1>
                <Country countryData={countryData} />
                <Globally globalData={globalData} />
            </div>
        </div>
    )
}




