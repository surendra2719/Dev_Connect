const express = require(`express`)
const router = express.Router();
const User = require("../../config/models/User")
const bcrypt = require("bcryptjs")
const gravatar = require(`gravatar`)
const jwt = require(`jsonwebtoken`)
const config = require(`config`)
const { check, validationResult } = require('express-validator');
const e = require("express");
router.post("/", [
    check("name", `Name is required`).not().isEmpty(),
    check("email", `Please enter valid email `).isEmail(),
    check("password", `Please enter a password with 6 or more characters`).isLength({ min: 6 })
], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { name, email, password } = req.body;
    try {
        // see  if users exists
        //  get user gravatar
        //password encryption
        // Return json web token
        let user = User.findOne({ email })
        console.log(`user`, user);
        if (user) {
            return res.status(400).json({ errors: [{ msg: `user already exists` }] })
        }
        const avatar = gravatar.url(email, {
            S: "200",
            r: "pg",
            d: "m"
        })
        user = new User({
            name,
            email,
            avatar,
            password
        })
        console.log(`user`, user);
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt)
        await user.save()
        const payload = {
            user: {
                id: user.id
            }
        }
        console.log(`payload`, payload);
        jwt.sign(payload, config.get(`jwtSecretKey`), { expiresIn: 3600 }, (err, token) => {
            if (err) throw err
            res.json({ token })
        })

    }
    catch (e) {
        console.error(e.message)
        res.status(500).send(`Sever error`)
    }

})
module.exports = router;  