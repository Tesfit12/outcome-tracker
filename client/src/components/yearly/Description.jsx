import React, {Fragment}from 'react'






// TODO  this func is going to help you to popup the description when you press the 'more' button

export const Description = ({item}) => {
    
    return (
        <Fragment>
            
            <div class="container-fluid">

                        <button type="button" class="btn btn-sm btn-info" data-toggle="modal" data-target={`#id${item.expense_id}`}>
                            more
                        </button>

                        <div class="modal fade" id={`id${item.expense_id}`}>
                            <div class="modal-dialog modal-dialog-centered">
                            <div class="modal-content">

                                <div class="modal-header">
                                     <button type="button" class="close" data-dismiss="modal">&times;</button>
                                </div>

                                <p  style={{ color: 'red', marginTop: '5%'}}>DESCRIPTION...</p>


                                <div class="modal-body">
                                        <p style={{ color: 'black' }}> { item.expense_description } </p>  {/* // TODO here is the description */}
                                </div>
                                
                                <div class="modal-footer">
                                <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                                </div>
                                
                            </div>
                            </div>
                        </div>
  
        </div>



        </Fragment>
    )
}
