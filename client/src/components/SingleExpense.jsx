import React from 'react'
import Moment from 'react-moment';

import { MdEdit, MdDelete } from 'react-icons/md'
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit'; // you can use as well -->  import {MdEdit, MdDelete} from 'react-icons/md'




export const SingleExpense = ({ item, allExpense, foundExpense, DeleteHandler, EditHandler }) => {





    const { expense_id, date_added } = item



    const SplitHandler = (date_added) => {
        if (date_added !== undefined) {
            let filteredDate = date_added.split('T')[0] // 2019-12-31T22:00:00.000Z                                    
            return filteredDate
        }
    }



    return (
        <div className="container mt-3">
            <table className="table table-sm">

                <tbody>
                    <tr className="item">
                        {/* the code below will give you the number on the table head */}
                        <th scope="row" className='mt-2'>{foundExpense.length === 0 ? allExpense.indexOf(item) + 1 : foundExpense.indexOf(item) + 1}</th>
                        <td>{item.expense_name}</td>
                        <td>{item.expense_price}</td>
                        <td>{item.place}</td>
                        <td>{SplitHandler(date_added)}</td>
                        <td>
                            {/* <IconButton aria-label="delete" onClick={() => DeleteHandler(expense_id)}>
                                <DeleteIcon style={{ color: 'red' }} />
                            </IconButton> */}
                            {/* <IconButton onClick={() => EditHandler(expense_id)} className="edit-btn" aria-label="edit button"><MdEdit style={{ color: 'green' }} /></IconButton> */}

                            <span onClick={() => DeleteHandler(expense_id)}>
                                <i className='fa fa-trash' />
                            </span>

                            <span onClick={() => EditHandler(expense_id)} className='ml-5'>
                                <i className='fa fa-edit' />
                            </span>


                        </td>

                    </tr>
                </tbody>
            </table>
            <div>

            </div>


        </div>
    )
}









