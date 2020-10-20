import React, { useEffect, useState } from 'react'
import { Line, Bar } from 'react-chartjs-2' // u must install also npm install --save chart.js
import '../App.css'
export default function Chart({ dailyAllExpense, weeklyAllExpense, yearlyAllExpense, monthlyAllExpense }) {

    console.log(monthlyAllExpense);


    const barChart = (

        dailyAllExpense ? (
            <Bar data={{
                labels: ['Daily-Expense', 'Yearly-Expense', 'Weekly-Expense', 'Monthly-Expense'],
                datasets: [{
                    label: '₪ Shekels',
                    backgroundColor: ['red', 'blue', 'black', 'green'],
                    data: [
                        dailyAllExpense.length !== 0 ? dailyAllExpense.reduce((acc, curr) => { return acc += parseInt(curr.expense_price) }, 0) : '',

                        yearlyAllExpense.length !== 0 ? yearlyAllExpense.reduce((acc, curr) => { return acc += parseInt(curr.expense_price) }, 0) : '',

                        weeklyAllExpense.length !== 0 ? weeklyAllExpense.reduce((acc, curr) => { return acc += parseInt(curr.expense_price) }, 0) : '',

                        monthlyAllExpense.length !== 0 ? monthlyAllExpense.reduce((acc, curr) => { return acc += parseInt(curr.expense_price) }, 0) : ''

                    ]
                }]
            }}
            />
        ) : null
    );


    return (
        <div className="chartContainer">

            <h1 style={{ color: 'white', marginTop: '7%', fontFamily: 'Impact' }}> Expense Chart </h1>

            <h4 style={{ color: 'white', fontFamily: 'Cursive' }}>  Total-Expense
                <span style={{ color: 'black' }}>
                    {" "}₪ {yearlyAllExpense.reduce((acc, curr) => { return acc += parseInt(curr.expense_price) }, 0)}
                </span>
            </h4>

            {barChart}
        </div>
    )
}
