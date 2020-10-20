import React from 'react'
import { SingleExpense } from './SingleExpense'





export const ListExpense = ({ allExpense, foundExpense, SubmitHandler, DeleteHandler, EditHandler }) => {


    return (
        <div className="container">


            {/*  THIS WILL CHECK IF THE SEARCH BAR FOUND ITEM, BY THE HELP OF THE FilteredExpense FUNC AT THE APP.JS */}
            {foundExpense.length === 0 ? allExpense.map(item => <SingleExpense allExpense={allExpense} foundExpense={foundExpense} item={item} SubmitHandler={SubmitHandler} DeleteHandler={DeleteHandler} EditHandler={EditHandler} />) :

                foundExpense.map(item => <SingleExpense allExpense={allExpense} foundExpense={foundExpense} item={item} SubmitHandler={SubmitHandler} DeleteHandler={DeleteHandler} EditHandler={EditHandler} />)
            }

        </div>
    )
}
