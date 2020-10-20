1) --> if the user is not logged in TRY NOT to let him go the your routes...! [???? i may be need not to show the navbar before the user logged in]


2) ---> add delete and edit in every page





======> YOU HAVE TO CHECK IF THE RESPOND IS EMPTY LIST OR NOT ALWAYS.........! WHEN YOU FETCHING FROM DATABASE....! <=======
3)   <h1 style={{ color: 'white', marginTop: '10%' }}>Your daily Expense: -> { !allExpense.length == 0 ? allExpense.reduce((acc, curr) => {return acc += parseInt(curr.expense_price)}, 0) : ''} </h1>


4))) ===> {
            // TODO when a user logged out you should redirect him always to the login page...
}