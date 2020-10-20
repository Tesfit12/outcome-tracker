import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { Description } from './Description'

import { Row, Col, Container } from "react-bootstrap";
import GridList from '@material-ui/core/GridList';




// if user is not logged in you will not be able to access his id (so this will not work)

export const Yearly = ({ yearlyAllExpense }) => {


    // this func is going to help u split the date!
    const SplitHandler = (date_added) => {
        if (date_added !== undefined) {
            return date_added.split('T')[0]
        }
    }



    return (

        <div className="container" style={{ boxShadow: '3px 2px 3px 3px #00a4a4' }}>
            <h3 style={{ color: 'black', marginTop: '2%', paddingTop: '1%', fontFamily: 'serif' }}>
                Yearly Expense: {" "}₪ {yearlyAllExpense.reduce((acc, curr) => { return acc += parseInt(curr.expense_price) }, 0)}
            </h3>

            <Container className="container p-3">
                <GridList style={{ height: '520px', width: '100%', display: 'grid', border: '5px solid rgb(188, 213, 255)', borderRadius: '10px' }}>
                    <table class="table table-hover table-dark table-md" style={{ width: '100%' }}>
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
                            {yearlyAllExpense.map(item =>
                                <tr>
                                    <th scope="row">{yearlyAllExpense.indexOf(item) + 1}</th>
                                    <td>{item.expense_name}</td>
                                    <td>₪{" "}{item.expense_price}</td>
                                    <td>{item.place}</td>
                                    <td>{SplitHandler(item.date_added)}</td>
                                    <td><Description item={item} /></td>
                                </tr>
                            )}


                            <tr>
                                <td></td>
                                <td></td>
                                <td style={{ color: 'cyan', marginTop: '10%', fontFamily: 'serif' }}>
                                    Total-Expenses:  <b>{" "}₪ {" "}{yearlyAllExpense.reduce((acc, curr) => { return acc += parseInt(curr.expense_price) }, 0)}</b>
                                </td>
                                <td></td>
                                <td></td>
                            </tr>

                        </tbody>
                    </table>


                </GridList>
            </Container>


        </div>
    )
}
