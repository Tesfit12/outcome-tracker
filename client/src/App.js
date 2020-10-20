import React, { Fragment, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect, NavLink, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './App.css';

import Particles from 'react-particles-js';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import MuiThemProvider from 'material-ui/styles/MuiThemeProvider'


import { Login } from './components/Login';
import { Register } from './components/Register';
import { Home } from './components/Home';
import { NavBar } from './components/NavBar';
import { Welcome } from './components/Welcome';
import { Yearly } from './components/yearly/Yearly';
import { Daily } from './components/yearly/Daily';
import { Monthly } from './components/yearly/Monthly';
import { Last7days } from './components/yearly/Weekly';
import { FetchGloballyData, FetchCountryData } from './api/api'
import Chart from './components/Chart'
import CovidMainPage from './components/Covid-19/CovidMainPage';
import Test from './Test'


// TODO IF YOU DO NOT USE THE useEffect THE FUNC WILL RUN 3 TIMES.
// IF YOU HAVE AN ERROR IT WILL POP UP 3 TIMES....!



// Material style you can style your Particles
// const useStyles = makeStyles({
//   particlesCanva: {
//     position: "absolute",
//     top: '20%',
//     left: '20%'
//   }
// })



toast.configure()



function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user_id, setUserId] = useState(0)
  const [foundExpense, setFoundExpense] = useState([])

  const [globalData, setGlobalData] = useState([])
  const [countryData, setCountryData] = useState({})
  const [dailyAllExpense, setDailyAllExpense] = useState([])
  const [weeklyAllExpense, setWeeklyAllExpense] = useState([])
  const [monthlyAllExpense, setMonthlyAllExpense] = useState([])
  const [yearlyAllExpense, setYearlyAllExpense] = useState([])







  /** 
  **========================================================================================================================================================================== 
  **==========================================================================================================================================================================
  */



  const IsLoginFunc = (bool) => {
    setIsAuthenticated(bool)
  }



  const checkAuthenticated = async () => {

    try {
      const boolResponse = await fetch("http://localhost:5000/verifier", {
        method: "POST",
        headers: { token: localStorage.token }
      });


      const userToParse = await boolResponse.json(); // from here u can get the true and the user_obj
      setUserId(userToParse.user_id)
      // alert(`${userToParse.user_id} <<<< from the app.js checkAuthenticated func <<<<`);

      // IMPORTANT (meaning if user is not logged out let him access to the routes )
      userToParse === true ? setIsAuthenticated(true) : setIsAuthenticated(false); // TODO will help u to stay authorized every time u refresh
    } catch (err) {
      console.error(err.message);
    }
  };


  useEffect(() => {
    checkAuthenticated(); // TODO as long as you are not logged out this func will keep u authorized
  }, []);


  /** 
**========================================================================================================================================================================== 
** COVID-19
**==========================================================================================================================================================================
*/

  useEffect(() => {

    const FetchedData = async () => {
      setGlobalData(await FetchGloballyData())
      setCountryData(await FetchCountryData())

    }

    FetchedData()

  }, [])


  /** 
  **========================================================================================================================================================================== 
  **==========================================================================================================================================================================
  */


  const FilteredExpense = async (matchedExpense) => {
    /** 
     *!this func will fetch all the expenses first then ---> it will check if the search input value is in one of the expenses, if so push it to an empty list then set the state then pass it through the ListExp then through the SingleExp */

    const response = await fetch('http://localhost:5000/allExpenses', {
      method: "GET",
      headers: { token: localStorage.token }
    })

    const parseRes = await response.json()
    // console.log(parseRes.msg);

    if (parseRes.msg) { // meaning if there is an error it the user is not logged in
      // console.log('NO Items....!');
      toast.error('U need to Login First NO Items....!')
      return
    }


    if (parseRes.length > 0) {
      let searchedExpense = []

      for (const exp of parseRes) {

        if (exp.expense_name.includes(matchedExpense)) {
          searchedExpense.push(exp)
        } else {
          setFoundExpense('')
        }
      }
      setFoundExpense(searchedExpense)
    } else {
      toast.error('You have no records...!')
    }


  }

  /** 
  **========================================================================================================================================================================== 
  **==========================================================================================================================================================================
  */

  // i have to set this func here in the App.js b/c i want to have all the results here and  my navBar is located on this component                      
  const SearchInputHandler = (e) => {
    e.preventDefault()
    // TODO when i write something inside the input search it gives me the value then if i delete it it shows me all the expense SO i decided to use undefined...!
    e.target.value === '' ? FilteredExpense(undefined) : FilteredExpense(e.target.value.trim())



  }

  /** 
  **========================================================================================================================================================================== 
  **========  getDailyAllExpense ==========
  **==========================================================================================================================================================================
  */


  const getDailyAllExpense = async () => {
    const response = await fetch('http://localhost:5000/daily_expenses', { headers: { token: localStorage.token } })
    const parseRes = await response.json()

    try {

      if (parseRes.length !== undefined) {
        setDailyAllExpense(parseRes)

      } else {
        // toast.error('You have NO new expense of today..!')
        return ''
      }

    } catch (error) {
      toast.error('Something went wrong at getDailyAllExpense')
    }

  }


  useEffect(() => {
    getDailyAllExpense()
  }, [])


  /** 
  **========================================================================================================================================================================== 
  **========  getMonthlyAllExpense ==========
  **==========================================================================================================================================================================
  */


  // TODO this is ONE WAY OF DOING IT...! check the SECONDE WAY OF DOING IT IN THE Monthly.jsx component....
  var newDate = new Date()

  let fullDate = newDate.getFullYear() + '-' + (newDate.getMonth() + 1) + '-' + newDate.getDate();
  const fullYear = fullDate.split('-')[0]
  const fullMonth = `${fullDate.split('-')[1]}`
  const fullDay = fullDate.split('-')[2] < 10 ? `0${fullDate.split('-')[2]}` : fullDate.split('-')[2]




  const getMonthlyAllExpense = async () => {

    const response = await fetch('http://localhost:5000/allExpenses', {
      method: "GET",
      headers: { token: localStorage.token }
    })
    const parseRes = await response.json()
    // console.log(Object.prototype.toString.call(parseRes));

    if (parseRes.length !== undefined) {
      let boxExpenses = []

      parseRes.forEach(item => {

        let dateFromDB = item.date_added.split('-')[2]
        var monthFromDB = item.date_added.split('-')[1]
        let yearFromDB = item.date_added.split('-')[0]

        return fullMonth == monthFromDB ? boxExpenses.push(item) : ''
        // if (fullMonth == monthFromDB) {
        //     boxExpenses.push(item)
        //     }
      });
      setMonthlyAllExpense(boxExpenses)

    } else {
      //  toast.error('YOU NEED TO LOGIN FIRST TO SEE YOUR EXPENSES <<< ....! from getAllExpense.')
      return ''
    }

  }


  useEffect(() => {
    getMonthlyAllExpense()
  }, [])


  /** 
  **========================================================================================================================================================================== 
  **========  getYearlyAllExpense ==========
  **==========================================================================================================================================================================
  */


  // TODO this is ONE WAY OF DOING IT...! check the SECONDE WAY OF DOING IT IN THE Monthly.jsx comps....
  var today = new Date()
  let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  const year = date.split('-')[0]
  const month = `0${date.split('-')[1]}`
  const day = date.split('-')[2] < 10 ? `0${date.split('-')[2]}` : date.split('-')[2]


  const getYearlyAllExpense = async () => {
    // use this for post method...!
    // const NewHeader = new Headers()
    // NewHeader.append("Content-Type", "application/json")
    // NewHeader.append("token", localStorage.token)

    const response = await fetch('http://localhost:5000/allExpenses', {
      method: "GET",
      headers: { token: localStorage.token }
    })
    const parseRes = await response.json()
    // console.log(Object.prototype.toString.call(parseRes));                                            

    if (parseRes.length !== undefined) {
      let boxExpenses = []

      parseRes.forEach(item => {

        let dateFromDB = item.date_added.split('-')[2]
        var monthFromDB = item.date_added.split('-')[1]
        let yearFromDB = item.date_added.split('-')[0]

        return year == yearFromDB ? boxExpenses.push(item) : ''
        // if (year == yearFromDB) {
        //     boxExpenses.push(item)
        //     }
      });
      setYearlyAllExpense(boxExpenses)
    } else {
      // toast.error('YOU NEED TO LOGIN FIRST TO SEE YOUR EXPENSES <<< ....! from getAllExpense.')
      return ''
    }

  }


  useEffect(() => {
    // getMonthlyAllExpense()
    getYearlyAllExpense()
  }, [])


  /** 
  **========================================================================================================================================================================== 
  **========  getWeeklyAllExpense ==========
  **==========================================================================================================================================================================
  */


  // TODO i move this func to the App.js cuz i want to use it at the Chart.js as well


  const getWeeklyAllExpense = async () => {
    const response = await fetch('http://localhost:5000/last7days', {
      method: "GET",
      headers: { token: localStorage.token }
    })

    const parseRes = await response.json()
    if (parseRes.constructor !== Object) {
      setWeeklyAllExpense(parseRes)


    } else {
      // toast.error('YOU NEED TO LOGIN FIRST TO SEE YOUR EXPENSES <<< ....! from getAllExpense.')
      // toast.error(parseRes.msg)
      return ''
    }
  }


  useEffect(() => {
    getWeeklyAllExpense()

  }, [])


  /** 
  **========================================================================================================================================================================== 
  **==========================================================================================================================================================================
  */




  // const classes = useStyles()

  return (
    <div className="App" style={{ height: '100vh' }}>

      {/* <div className="particles_js">
                          <Particles  params={ { particles:{ number:{value: 45}, density: { value_area: 900 } } } } />

                </div> */}


      <div className="particles_js">

        <Particles params={{
          "particles": {
            "number": { "value": 120 },
            "size": { "value": 3 },
            // "color": { // The color for every node, not the connecting lines.
            //   "value": "#011a2e" // Or use an array of colors like ["#9b0000", "#001378", "#0b521f"]
            // },
            // "line_linked": {
            //   "enable": true,
            //   "distance": 100, // The radius before a line is added, the lower the number the more lines.
            //   "color": "#00060a",
            //   "opacity": 0.6,
            //   "width": 1
            // },
          },

          "interactivity": {
            "events": {
              "onhover": {
                "enable": true,
                "mode": "repulse"
              }
            }
          }
        }} />
      </div>





      <div className="insideApp">

        <Fragment>


          <MuiThemProvider>
            {/* <AppBar title="Expense-page"/>  */}
            <NavBar IsLoginFunc={IsLoginFunc} SearchInputHandler={SearchInputHandler} isAuthenticated={isAuthenticated} />

          </MuiThemProvider>


          <Router>

            <Switch>
              {/** YOU CAN USE component or render --> BUT render is is better cuz when the page refresh it will not mount every time */}
              <Route path="/login" component={props => !isAuthenticated ? (<Login {...props} IsLoginFunc={IsLoginFunc} />) : <Redirect to="/home" />} />
              <Route path="/register" render={props => !isAuthenticated ? (<Register {...props} IsLoginFunc={IsLoginFunc} />) : (<Redirect to="/login" />)} exact />
              <Route path="/home" render={props => isAuthenticated ? (<Home {...props} IsLoginFunc={IsLoginFunc} globalData={globalData} countryData={countryData} foundExpense={foundExpense} />) : <Redirect to="/login" />} />

              <Route path="/daily" render={props => <Daily {...props} dailyAllExpense={dailyAllExpense} />} />
              <Route path='/last7days' render={props => <Last7days {...props} weeklyAllExpense={weeklyAllExpense} />} />
              <Route path="/monthly" render={props => <Monthly {...props} monthlyAllExpense={monthlyAllExpense} />} />
              <Route path="/yearly" render={props => <Yearly {...props} yearlyAllExpense={yearlyAllExpense} />} />

              <Route path="/chart" render={props => <Chart {...props} dailyAllExpense={dailyAllExpense} yearlyAllExpense={yearlyAllExpense} weeklyAllExpense={weeklyAllExpense} monthlyAllExpense={monthlyAllExpense} />} />
              <Route path="/covid-19" render={props => <CovidMainPage {...props} globalData={globalData} countryData={countryData} />} />

              <Route path="/test" render={props => <Test {...props} />} />
              <Route path="/" render={props => <Welcome {...props} />} />{/** U need to put this here(bottom) always or add exact to it .!!!! */}

            </Switch>

          </Router>

        </Fragment>

      </div>


    </div>

  );
}

export default App;
