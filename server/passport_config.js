// let LocalStrategy  = require('passport-local').Strategy
// let myDB           = require('./myDB')
// let bcrypt         = require('bcrypt')




// function initializer(passport) {

//     new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
//         // find the match user from DB
//         const user = await myDB.checkByEmail(email) // will return the whole obj
//         if (user.rows.length < 1) {
//             return done(null, false, {msg: 'U R not Registered...!'})
//         }else{
//             // match pwd
//             if ( await bcrypt.compare(password, user.rows[0].pwd)) {
//                 return done(null, user.rows)
//             }else{
//                 return done(null, false, {msg: 'Pwd not Much..../...'})
//             }

//         }
//     })
    
//      // match user by id
// //  let getUserById = (id) => { return All_Users.find(user => user.id === id) }
// let getAllUsers = myDB.getAllUsers()
// let getUserById = (id) => { return getAllUsers.rows.find(user => user.id === id) }

//  passport.serializeUser((user, done) => { return done(null, user.rows[0].loger_id) }); // serialize him when he logged in
//  passport.deserializeUser((id, done) => { return done(null, getUserById(id)) });// bring him from the serialize


// }

// module.exports = initializer