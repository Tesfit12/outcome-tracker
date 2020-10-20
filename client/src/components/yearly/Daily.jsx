import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { Description } from './Description'




export const Daily = ({ dailyAllExpense }) => {


    // this func is going to help u split the date!
    const SplitHandler = (date_added) => {
        if (date_added !== undefined) {
            return date_added.split('T')[0]
        }
    }




    return (
        <div className="container">
            <h1 style={{ color: 'white', marginTop: '10%', fontFamily: 'serif' }}>Your daily Expense: {" "}₪ {dailyAllExpense.reduce((acc, curr) => { return acc += parseInt(curr.expense_price) }, 0)} </h1>

            <table class="table table-hover table-dark table-sm">
                <thead>
                    <tr>
                        <th scope="col"> № </th>
                        <th scope="col">Name</th>
                        <th scope="col">price</th>
                        <th scope="col">place</th>
                        <th scope="col">date</th>
                        <th scope="col">detail</th>
                    </tr>
                </thead>

                <tbody className="singleExpense">

                    {
                        dailyAllExpense.map(item =>

                            <tr>
                                <th scope="row">{dailyAllExpense.indexOf(item) + 1}</th>
                                <td>{item.expense_name}</td>
                                <td>₪{" "}{item.expense_price}</td>
                                <td>{item.place}</td>
                                <td>{SplitHandler(item.date_added)}</td>
                                <td><Description item={item} /></td>
                            </tr>

                        )
                    }


                    <tr>
                        <td></td>
                        <td></td>

                        <td style={{ color: 'cyan', marginTop: '10%', fontFamily: 'serif' }}>
                            Total-Expenses: <b>{" "}₪ {" "}{dailyAllExpense.reduce((acc, curr) => { return acc += parseInt(curr.expense_price) }, 0)}</b>
                        </td>

                        <td></td>
                        <td></td>
                    </tr>

                </tbody>
            </table>

        </div>
    )
}

