import axios from 'axios'
import Country from '../components/Covid-19/Country'

const url = 'https://covid19.mathdro.id/api'

// get all globally data

export const FetchGloballyData = async ()=> {
    const response = await axios.get(url)
    return response.data
    
}


export const FetchCountryData = async ()=> {
    const response = await axios.get(`${url}/countries/Israel`)
    return response.data
    
}

// FetchCountryData()