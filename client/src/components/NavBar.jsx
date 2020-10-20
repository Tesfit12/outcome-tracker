import React from 'react'
import styled from 'styled-components'





export const NavBar = ({ IsLoginFunc, SearchInputHandler, isAuthenticated }) => {


  // TODO this func will help you when ever you click the logout button it will log u out and redirect you to the home page...!
  const logoutHandler = (e) => {

    // e.preventDefault()

    localStorage.removeItem('token')
    IsLoginFunc(false)
    window.location = '/home'

    console.log(isAuthenticated)

  }





  return (
    <NavContainer>
      <nav className="navbar sticky-top navbar-expand-lg navbar-light bg-info">
        <a className="navbar-brand" href="/home">Home</a>

        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">

          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            <li className="nav-item m-2">
              <a className="nav-link" href="/daily">Daily</a>
            </li>
            <li className="nav-item m-2">
              <a className="nav-link" href="/last7days">Weekly</a>
            </li>
            <li className="nav-item m-2">
              <a className="nav-link" href="/monthly" >Monthly</a>
            </li>
            <li className="nav-item m-2">
              <a className="nav-link" href="/yearly" >Yearly</a>
            </li>

            <li className="nav-item m-2">
              <a className="nav-link" href="/chart" >Chart</a>
            </li>
            <li className="nav-item m-2">
              <a className="nav-link" href="/covid-19" >COVID-19</a>
            </li>
          </ul>



          <form className="form-inline my-2 my-lg-0">
            <input onChange={SearchInputHandler} className="form-control mr-sm-2" type="search" placeholder="Search" />
            <button className="btn btn-outline-primary my-2 my-sm-0 mr-4 text-white" type="submit">Search</button>
          </form>


          {isAuthenticated ?
            (<button onClick={(e) => logoutHandler(e)} className="btn btn-danger">Log out</button>)
            :
            (
              <div className='d-flex'>
                <a className="mr-5" className="nav-link text-danger" href="/login"><b>Login</b></a>
                <a className="mr-5" className="nav-link text-danger" href="/register"><b>Register</b></a>
              </div>
            )
          }


        </div>

      </nav>
    </NavContainer>
  )


}




const NavContainer = styled.div`

.nav-link {
  color: white !important;
  font-weight: bolder;
}

`

