import React, { Fragment, useState } from 'react'
import { Link, Redirect } from "react-router-dom";
import { toast } from 'react-toastify'





export const Login = ({ IsLoginFunc }) => {

    const [allInputs, setAllInputs] = useState({ email: "", pwd: "" })


    const { email, pwd } = allInputs


    // will let you write on the input
    const onChangeHandler = (e) => {
        setAllInputs({ ...allInputs, [e.target.name]: e.target.value })

    }


    // onSubmit fetch
    const SubmitLogin = async (e) => {
        e.preventDefault()

        const user_logger = await allInputs
        const response = await fetch('http://localhost:5000/login', { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(user_logger) })
        const parseTheToken = await response.json()

        if (parseTheToken.token) {

            localStorage.setItem("token", parseTheToken.token)
            toast.success('Login Successfully...!')
            IsLoginFunc(true)
        } else {
            toast.error(parseTheToken.msg)
            IsLoginFunc(false)

        }


    }



    return (
        <div className="registerLoginForm">
            <Fragment>
                <h1 className="mt-5 text-center">Login</h1>

                <form onSubmit={SubmitLogin}>

                    <input type="text" onChange={(e) => onChangeHandler(e)} name="email" placeholder="email" className="form-control my-3" />
                    <input type="password" onChange={(e) => onChangeHandler(e)} name="pwd" placeholder="password" className="form-control my-3" />
                    <button className="btn btn-info btn">Login</button>
                </form>
                <Link to="/register" className="font-weight-bold">Register</Link>

            </Fragment>
        </div>
    )
}
