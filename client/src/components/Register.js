import '../App.css'
import React, { Fragment, useState } from 'react'
import { Link, Redirect } from "react-router-dom";
import { toast } from 'react-toastify'

export const Register = ({ IsLoginFunc }) => {

    const [allInputs, setAllInputs] = useState({ first_name: "", last_name: "", email: "", pwd: "", confirm_pwd: "" })




    const onChangeHandler = (e) => {
        setAllInputs({ ...allInputs, [e.target.name]: e.target.value })
    }


    const SubmitHandler = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch('http://localhost:5000/register', { method: 'POST', headers: { 'Content-Type': "application/json" }, body: JSON.stringify(allInputs) })
            const parseTheToken = await response.json()
            console.log(parseTheToken)
            // set it to localStorage
            if (parseTheToken.token) {
                localStorage.setItem("token", parseTheToken.token)
                toast.success("Registered Successfully..!")
                IsLoginFunc(true)
                console.log(parseTheToken);
            } else {

                toast.error(parseTheToken.msg)
            }

        } catch (error) {
            console.error(error.message);

        }

    }

    return (
        <div className="registerLoginForm">
            <form onSubmit={SubmitHandler}>
                <h1 className="mt-5 text-center">Signup</h1>
                <input type="name" onChange={(e) => onChangeHandler(e)} name="first_name" placeholder="first_name" className="form-control my-3" />
                <input type="name" onChange={(e) => onChangeHandler(e)} name="last_name" placeholder="last_name" className="form-control my-3" />
                <input type="email" onChange={(e) => onChangeHandler(e)} name="email" placeholder="email" className="form-control my-3" />
                <input type="password" onChange={(e) => onChangeHandler(e)} name="pwd" placeholder="password" className="form-control my-3" />
                <input type="password" onChange={(e) => onChangeHandler(e)} name="confirm_pwd" placeholder="confirm_pwd" className="form-control my-3" />
                <button className="btn btn-info btn">Register</button>
            </form>
            <Link to="/login" className="font-weight-bold">login</Link>

        </div>
    )
}
