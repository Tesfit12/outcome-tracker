import React, { Fragment, useState, useEffect } from 'react'
import FormPage from './FormPage'
import { ListExpense } from './ListExpense';
import { CurrentDate } from './CurrentDate'
import { Row, Col, Container } from "react-bootstrap";
import GridList from '@material-ui/core/GridList';

import { ToastsContainer, ToastsStore } from 'react-toasts';







export const Home = ({ IsLoginFunc, foundExpense, globalData, countryData }) => {


  // TODO ===================================************************************************************
  // TODO ===================================************************************************************

  const [allExpense, setAllExpense] = useState([])

  const [owner_id, setOwnerId] = useState(0) // something was wrong here, at first owner_id is 0 so it won't fetch any thing. So get all his data at the server file...!
  const [name, setName] = useState('')

  const [expense_name, setExpense_name] = useState('')
  const [expense_price, setExpense_price] = useState('')
  const [place, setPlace] = useState('')
  const [expense_description, setExpense_description] = useState('')
  const [date_added, setDate_added] = useState(CurrentDate())
  const [expense_id, setExpenseId] = useState('')


  const [updated, setUpdated] = useState(false)

  // TODO ===================================*************************************************************
  // TODO you need to fetch from server (index.js) then get the user then have access to his full identity...!!!!
  // TODO putting this at the top is IMPORTANT otherwise it will not work it will only run the ItemsObject <<<<<<<<<<<<<<


  const getName = async () => {
    const userFromDB = await fetch('http://localhost:5000/home', { method: 'GET', headers: { token: localStorage.token } })
    const userToParse = await userFromDB.json()
    await setName(userToParse.first_name)
    await setOwnerId(userToParse.loger_id) // depending on this state you can have access to all the users records from DB....!
    await IsLoginFunc(true)

  }


  useEffect(() => {
    getName(setName)
    getAllExpense()

  }, [expense_name]) // []  will help you to not request many request in once





  // TODO ===================================*************************************************************============

  const getAllExpense = async () => {
    const response = await fetch('http://localhost:5000/daily_expenses', { headers: { token: localStorage.token } })
    const parseRes = await response.json()
    await setAllExpense(parseRes)
  }


  // TODO ============== value getter from the form <<<<<=***********************************************

  const NameHandler = (e) => {
    setExpense_name(e.target.value.toLowerCase())

  }

  const PriceHandler = (e) => {
    setExpense_price(e.target.value.toLowerCase())

  }

  const PlaceHandler = (e) => {
    setPlace(e.target.value.toLowerCase())

  }

  const DescriptionHandler = (e) => {
    setExpense_description(e.target.value.toLowerCase())


  }

  const DateHandler = (e) => {
    setDate_added(e.target.value)

  }

  const ClearHandler = (e) => {
    console.log('clear the page ...')
    setAllExpense([])
  }

  const EditHandler = async (id) => {
    const response = await fetch(`http://localhost:5000/expense/${id}`)// it will return u [{obj}]
    const parseRes = await response.json()
    setExpense_name(parseRes[0].expense_name)
    setExpense_price(parseRes[0].expense_price)
    setPlace(parseRes[0].place)
    setExpense_description(parseRes[0].expense_description)
    setExpenseId(parseRes[0].expense_id)

  }

  const UpdateHandler = async (e) => {
    e.preventDefault()

    if (expense_name == '') {
      ToastsStore.error('Hey, Click the edit button first !');
      return ''
    } else {
      const body = { expense_name, expense_price, place, expense_description, date_added }

      const response = await fetch(`http://localhost:5000/update_expense/${expense_id}`, {
        method: 'PUT', headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)

      });
      setUpdated(!updated)
      setExpense_name('')
      setExpense_price('')
      setPlace('')
      setExpense_description('')
    }


  }

  const DeleteHandler = async (expense_id) => {
    // delete form db but it will return nothing just the message.
    await fetch(`http://localhost:5000/delete_expense/${expense_id}`, { method: 'DELETE', headers: { 'Content-Type': 'application-json' } })
    setAllExpense(allExpense.filter(item => item.expense_id !== expense_id)) // this will delete from the front page.

  }


  // TODO ===================================*************************************************************



  const SubmitHandler = async (e) => {
    e.preventDefault()
    const body = await {
      expense_name,
      expense_price,
      place,
      expense_description,
      date_added,
      owner_id

    }

    if (expense_name == '' || expense_price == '') {
      ToastsStore.error('Hey, field can not be empty ... !');
      return ''
    } else {
      const response = await fetch('http://localhost:5000/addExpense', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
      const result = await response.json()
    }

    console.log(body)
    await setExpense_name('')
    await setExpense_price('')
    await setPlace('')
    await setExpense_description('')

  }



  // TODO =================== logoutHandler ===*************************************************************
  const logoutHandler = (e) => {
    e.preventDefault()
    localStorage.removeItem('token')
    window.location = '/home'
    IsLoginFunc(false)
  }



  return (
    <div>

      <h4 style={{ color: 'black', marginTop: '2%', fontFamily: 'Cuprum, sans-serif' }}>Welcome : <b style={{ color: 'blue', textTransform: 'capitalize', fontFamily: 'Sansita Swashed' }}> {name} </b>add your expense below</h4>
      <h5 style={{ color: 'black', fontFamily: 'Sansita Swashed', fontWeight: 'bolder' }}>Total-Expense: {allExpense !== undefined ? allExpense.reduce((acc, curr) => { return acc += parseInt(curr.expense_price) }, 0) : ''}</h5>


      <Container className="container mt-4">
        <GridList style={{ height: '520px', display: 'grid', border: '5px solid rgb(188, 213, 255)', borderRadius: '10px' }}>



          <ListExpense
            allExpense={allExpense}
            DeleteHandler={DeleteHandler}
            EditHandler={EditHandler}
            foundExpense={foundExpense}
          />

          <FormPage
            UpdateHandler={UpdateHandler}
            SubmitHandler={SubmitHandler}
            NameHandler={NameHandler}
            PriceHandler={PriceHandler}
            PlaceHandler={PlaceHandler}
            DescriptionHandler={DescriptionHandler}
            DateHandler={DateHandler}
            expense_name={expense_name}
            expense_price={expense_price}
            place={place}
            expense_description={expense_description}
            ClearHandler={ClearHandler}
          />
        </GridList>


      </Container>



    </div>
  )
}
