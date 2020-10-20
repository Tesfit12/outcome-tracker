const Pool = require('pg').Pool;
let bcrypt = require('bcrypt')

const pool = new Pool({
    user: 'tesfalemhaile',
    password: '222333444',
    host: 'localhost',
    port: '5432',
    database: 'expense_db'
})





// TODO ===============================================================================================
        // TODO  expense //
// TODO ===============================================================================================
const addNewExpense = (expense_name, expense_price, place, expense_description, date_added, owner_id) => {
    return pool.query(
        "INSERT INTO \
        expense(expense_name, expense_price, place, expense_description, date_added, owner_id) \
        VALUES($1, $2, $3, $4, $5, $6) RETURNING *",
        [expense_name, expense_price, place, expense_description, date_added, owner_id]
    )

}

const getAllExpense = (id) => {
    return pool.query(
        "SELECT * FROM expense WHERE owner_id=$1", [id]
    )
}


const deleteExpense = (id) => {
    return pool.query(
        "DELETE FROM expense WHERE expense_id = $1", [id]
    )
}

// get single todo by id
const getSingleExpense = (id) => {
    return pool.query(
        "SELECT * FROM expense WHERE expense_id=$1", [id]
    )
}

// "UPDATE todo SET description = $1 WHERE todo_id = $2", [description, id]

const updateExpense = (expense_name, expense_price, place, date_added, expense_description, id) => {
    return pool.query(
         "UPDATE expense SET (expense_name, expense_price, place, date_added, expense_description) = ($1, $2, $3, $4, $5) WHERE expense_id = $6",
        [expense_name, expense_price, place, date_added, expense_description, id]
    )
}



const DailyExpenses = (currentDate, owner_id) => {
    return pool.query(
        "SELECT * FROM expense WHERE (date_added, owner_id) = ($1, $2)", [currentDate, owner_id]
    )
}



const WeeklyExpense = (user_id) => {
    return pool.query(
        // "SELECT * FROM expense WHERE owner_id = $1 AND expense.date_added > current_date - interval '5 days'", [user_id]
        "SELECT * FROM expense WHERE owner_id = $1 AND date_added > current_date - interval '10' day", [user_id]
    )
}


// TODO first get allExpense the loop through them in the front End



// const YearlyExpenses = () => {
//     return pool.query(
//         "SELECT * FROM expense WHERE date_added BETWEEN '2020-01-01' AND '2020-12-30'"
//     )
// }





// TODO ===============================================================================================
        // TODO  logger //
// TODO ===============================================================================================
const getAllUsers = () => {
    return pool.query(
        "SELECT * FROM logger"
    )
}


const  checkLogger = (id) => {
    return pool.query(
        "SELECT FROM logger WHERE loger_id = $1", [id]
    )
}

const checkByEmail = (email) => {
    return pool.query(
        "SELECT * FROM logger WHERE email = $1", [email] // will return the whole obj
    
    )
}

const getUserById = (loger_id) => {
    return pool.query(
        "SELECT * FROM logger WHERE loger_id = $1", [loger_id] // will return the whole obj
    
    )
}



const addUser = (first_name, last_name, email, pwd, confirm_pwd) => {

        return pool.query(

            "INSERT INTO \
            logger(first_name, last_name, email, pwd, confirm_pwd) \
            VALUES($1, $2, $3, $4, $5) RETURNING *",
            [first_name, last_name, email, pwd, confirm_pwd]

            )
    
}

const deleteLogger = (id) => {
    return pool.query(
        "DELETE FROM logger WHERE loger_id = $1", [id]
    )
}

//===============================================================================================
//===============================================================================================




module.exports = {
    pool,
    addNewExpense,
    getUserById,
    getAllExpense,
    deleteExpense,
    getSingleExpense,
    updateExpense,
    getAllUsers,
    checkLogger,
    addUser,
    checkByEmail,
    deleteLogger,
    DailyExpenses,
    WeeklyExpense
}


// SELECT * FROM expense WHERE date_added > current_date - interval '10' day;