module.exports = function (req, res, next) {

    const { email, first_name, pwd } = req.body;
    function validEmail(userEmail) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
    }


    if (req.path === "/register") {
        console.log('---> from validator.js email length ---> ', email.length, req.body);

        if (![first_name, email, pwd].every(Boolean)) {
            // console.log([email, name, password].every(Boolean));
            return res.status(401).json("Missing Credentials << ");
        }

        else if (!validEmail(email)) {
            // console.log('Invalid email.......')
            return res.status(401).json("Invalid Email");
        }
    }


    else if (req.path === "/login") {

        if (![email, pwd].every(Boolean)) {
            return res.status(401).json("Missing Credentials");
        } else if (!validEmail(email)) {
            return res.status(401).json("Invalid Email");
        }
    }

    next();

};

