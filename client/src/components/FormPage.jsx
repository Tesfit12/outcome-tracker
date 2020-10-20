import React, { Fragment, useState, useEffect } from 'react'
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';


import MyCalendar from './Calendar'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import styled from 'styled-components'






export default function FormPage({
    SubmitHandler,
    UpdateHandler,
    NameHandler,
    PriceHandler,
    PlaceHandler,
    DescriptionHandler,
    expense_name,
    expense_price,
    place,
    expense_description,
    DateHandler,
    ClearHandler
}) {
    return (
        <div>
            <form>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label font-weight-bold text-white" >Product Name</label>
                    <div className="col-sm-8">
                        <input type="text" className="form-control" id="product_name" value={!expense_name ? '' : expense_name} onChange={(e) => NameHandler(e)} />
                    </div>
                </div>

                {/*  */}

                <div className="form-group row">
                    <label className="col-sm-2 col-form-label font-weight-bold text-white">Expense price</label>
                    <div className="col-sm-8">
                        <input type="text" className="form-control" id="product_price" value={!expense_price ? '' : expense_price} onChange={(e) => PriceHandler(e)} />
                    </div>
                </div>

                {/*  */}

                <div className="form-group row">
                    <label className="col-sm-2 col-form-label font-weight-bold text-white">Place</label>
                    <div className="col-sm-8">
                        <input type="text" className="form-control" id="place where you bought" value={!place ? '' : place} onChange={(e) => PlaceHandler(e)} />
                    </div>
                </div>

                {/*  */}

                <div className="form-group row">
                    <label className="col-sm-2 col-form-label font-weight-bold text-white">Description</label>
                    <div className="col-sm-8">
                        <input type="text" className="form-control" id="description" value={!expense_description ? '' : expense_description} onChange={(e) => DescriptionHandler(e)} />
                    </div>
                </div>

                <p className='my-3'>
                    <MyCalendar DateHandler={DateHandler} />
                </p>

                {/*  */}

                <Button variant="contained" onClick={SubmitHandler} type="submit" color="secondary"
                    style={{ borderRadius: 3, backgroundColor: "#21b6ae", padding: "6px 18px", fontSize: "10px", }}
                    variant="contained"
                >Submit
                </Button>


                <Button variant="contained" onClick={(e) => UpdateHandler(e)} type="submit" color="green" style={{ marginLeft: '3%', fontSize: "10px", marginTop: '0%' }} >Update</Button>

                <Button onClick={(e) => ClearHandler(e)} style={{ fontSize: "10px", marginLeft: '3%' }} variant="contained" color="secondary" startIcon={<DeleteIcon />} >Clear-All</Button>




            </form>
        </div>
    )
}
