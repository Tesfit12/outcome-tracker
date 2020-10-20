let express = require('express')
let cors = require('cors')
let pool = require('./myDB')
let bcrypt = require('bcrypt')
let color = require('colors')

const jwt = require('jsonwebtoken')
const routeProtector = require('./authorization')

const validator = require('./validator')
const jwtFunction = require('./jwtFile')

require('dotenv').config()




let app = express()



// middleware
app.use(express.json()) // if u do not have this you will get undefined of (req.body)
app.use(express.urlencoded({ extended: false }))
app.use(cors())




//TODO ==============================================================================================
app.post('/register', validator, async (req, res) => {
    const { first_name, last_name, email, pwd, confirm_pwd } = req.body

    const foundUser = await pool.checkByEmail(email)
    // console.log(foundUser.rows[0].pwd); // if ur db is empty this will not work

    try {
        if (foundUser.rows.length < 1) {
            const hashedPassword = await bcrypt.hash(pwd, 10)

            // TODO u will have the userobj b/c of the returning*
            const new_user = await pool.addUser(first_name, last_name, email, hashedPassword, confirm_pwd)
            const token = jwtFunction(new_user.rows[0].loger_id)

            const myLoggerTable = await pool.getAllUsers()
            console.table(myLoggerTable.rows)

            return res.json({ token })

        } else {
            return res.status(401).json({ msg: 'User already Existed .../..' })
        }

    } catch (error) {
        console.log(error.message, 'Something went wrong ....');


    }

})



//TODO ==============================================================================================


app.post('/login', validator, async (req, res) => {
    // 1. check if the user is in DB 
    const { email, pwd } = await req.body

    const userFromDB = await pool.checkByEmail(email)

    if (userFromDB.rows.length !== 0) {
        let diHashPwd = await bcrypt.compare(pwd, userFromDB.rows[0].pwd)

        if (!diHashPwd) {
            return res.status(401).json({ msg: 'pwd or email error.../..' })
        } else {
            const token = jwtFunction(userFromDB.rows[0].loger_id)

            return res.json({ token }) // i am sending the token to the front end.
        }

    } else {

        return res.status(500).json({ msg: 'User not in DB' })
    }


})



//TODO ==============================================================================================


app.post("/verifier", routeProtector, (req, res) => {
    const user_id = req.user
    try {
        res.json(true);

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});



//TODO ==============================================================================================

app.get('/home', routeProtector, async (req, res) => {
    var LOGER_ID = req.user


    try {
        const userFromDB = await pool.getUserById(req.user)
        // console.log(userFromDB.rows[0]); when you logged in successfully this will be run soon        
        res.json(userFromDB.rows[0])

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Server Error.../..." })
    }

})




//TODO ==============================================================================================

app.delete('/logger/:id', async (req, res) => {
    const { id } = req.params
    await pool.deleteLogger(id)
    res.json({ msg: 'deleteLogger has deleted../..' })

})



app.get('/checkUser/:id', async (req, res) => {
    const { id } = req.params
    const userFromDB = await pool.checkLogger(id)
    if (userFromDB) {
        res.send({ msg: 'True User Exist' })
    }

})


app.get('/expense/:id', async (req, res) => {
    const { id } = req.params
    const singleExpense = await pool.getSingleExpense(id)
    res.json(singleExpense.rows)

})

//TODO ==============================================================================================









//TODO ==============================================================================================

app.post('/addExpense', async (req, res) => {
    let result = req.body

    const { expense_name, expense_price, place, expense_description, date_added, owner_id } = req.body
    await pool.addNewExpense(expense_name, expense_price, place, expense_description, date_added, owner_id)
    const myExpenseDB_table = await pool.getAllExpense(owner_id)
    res.json(result)

})



app.delete('/delete_expense/:id', async (req, res) => {
    // after you delete the expense you can call the getAllExpense func then send it to the front end.
    // or you can just delete it and return nothing BUT USE the [window.something]
    const { id } = await req.params
    // it will delete it but return nothing

    await pool.deleteExpense(id)
    res.json({ msg: 'expense has deleted../..' })

})




app.put('/update_expense/:id', async (req, res) => {
    const { id } = await req.params
    const { expense_name, expense_price, place, date_added, expense_description } = await req.body
    await pool.updateExpense(expense_name, expense_price, place, date_added, expense_description, id)
    res.json({ msg: 'Success' })


})





//TODO ==============================================================================================

app.get('/allExpenses', routeProtector, async (req, res) => {
    try {

        const allExpenses = await pool.getAllExpense(parseInt(req.user))
        res.json(allExpenses.rows) // WILL SEND TO FRONT END AN ARRAY OF OBJ

    } catch (error) {
        console.error('NOT COOL....! Error from allExpenses');

    }
})



//TODO ==============================================================================================

app.get('/daily_Expenses', routeProtector, async (req, res) => {

    const currentDate = new Date()
    //  console.log(currentDate);

    try {
        const daily_expense = await pool.DailyExpenses(currentDate, owner_id = req.user)
        //  console.log(daily_expense.rows);

        res.json(daily_expense.rows)

    } catch (error) {
        console.log(error.message, ' >>> >>> NOT COOL U have an Error at daily_Expenses'.rainbow);

    }

})

//TODO ==============================================================================================



app.get('/last7days', routeProtector, async (req, res) => {
    const user_id = req.user

    try {

        const weekly_expense = await pool.WeeklyExpense(user_id)
        res.json(weekly_expense.rows)
    } catch (error) {
        console.error(error.message, '<<< >>>> NOT COOL Error at last7days'.rainbow);


    }

})

//TODO ==============================================================================================







app.listen(5000, (console.log('Server listening at 5000'.yellow)))




