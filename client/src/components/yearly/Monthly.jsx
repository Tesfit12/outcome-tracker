import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { Description } from './Description'





// if user is not logged in you will not be able to access his id (so this will not work)

export const Monthly = ({ monthlyAllExpense }) => {

    // TODO i had here below all the functionality of this component BUT  i migrate it to the App.js cuz i want to use it in other components aswell

    const SplitHandler = (date_added) => {
        if (date_added !== undefined) {
            return date_added.split('T')[0]
        }
    }



    return (
        <div className="container">

            <h3 style={{ color: 'white', marginTop: '10%', fontFamily: 'serif' }}>Monthly Expense: {" "}₪

                     {monthlyAllExpense.reduce((acc, curr) => { return acc += parseInt(curr.expense_price) }, 0)}

            </h3>


            <table class="table table-hover table-dark table-sm" style={{ boxShadow: '3px 2px 3px 3px #00a4a4', fontFamily: 'serif' }}>

                <thead>
                    <tr>
                        <th scope="col">  № </th>
                        <th scope="col">Name</th>
                        <th scope="col">price</th>
                        <th scope="col">place</th>
                        <th scope="col">date</th>
                        <th scope="col">detail</th>
                    </tr>
                </thead>

                <tbody className="singleExpense">
                    {monthlyAllExpense ? monthlyAllExpense.map(item =>
                        <tr>
                            <th scope="row">{monthlyAllExpense.indexOf(item) + 1}</th>
                            <td>{item.expense_name}</td>
                            <td>₪{" "}{item.expense_price}</td>
                            <td>{item.place}</td>
                            <td>{SplitHandler(item.date_added)}</td>
                            <td><Description item={item} key={item.id} /></td>
                        </tr>
                    ) : ''}


                    <tr>
                        <td></td>
                        <td></td>
                        <td style={{ color: 'cyan', marginTop: '10%', fontFamily: 'serif' }}>
                            Total-Expenses: <b>{" "}₪ {" "}{monthlyAllExpense ? monthlyAllExpense.reduce((acc, curr) => { return acc += parseInt(curr.expense_price) }, 0) : ''}</b>
                        </td>
                        <td></td>
                        <td></td>
                    </tr>

                </tbody>
            </table>
        </div>
    )
}
