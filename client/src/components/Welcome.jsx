import React from 'react'

export const Welcome = () => {
    return (
        <div className="container" style={{ marginTop: '5%', width: '60%', fontFamily: 'Cursive', backgroundColor: 'cyan' }}>
            <div className="jumbotron">
                <h1 className="text-primary">Welcome to the Expense Tracker App</h1>
                <h3 className="text-info mt-4"><b>To use this App for recording your daily, weekly, monthly, yearly, expense please
                        {" "}<a href="/register" style={{ color: 'red' }}>Register</a> or
                        {" "}<a href="/login" style={{ color: 'red' }}>Login</a> first : </b>
                </h3>
            </div>
        </div>
    )
}

