const userModel = require("../models/userModel")
const validator = require("../validators/validator")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const { isVaildPass, isValidadhar, isEmpty, isValidName, isvalidSlot, isValidPhone, isValidBody, isValidpincode, isValidAge, isvalidQuantity } = validator





const createUser = async function (req, res) {
    try {

        let data = req.body

        if (!isValidBody(data)) return res.status(400).send({ status: false, message: "Insert Data : BAD REQUEST" });
        
        let { fname, lname, phone, password, aadharNo, age, pincode } = data

        if (!fname) return res.status(400).send({ status: false, message: "fname is requires" })
        if (!isValidName(fname.trim())) return res.status(400).send({ status: false, message: `${fname} is not a valide first name.` })


        if (!lname) return res.status(400).send({ status: false, message: "lname is requires" })
        if (!isValidName(lname.trim())) return res.status(400).send({ status: false, message: `${lname} is not a valide last name.` })

        if (!phone) return res.status(400).send({ status: false, message: "phone is required" })
        if (!isValidPhone(phone)) return res.status(400).send({ status: false, message: `${phone} is not a valide phone.` })
        const isPhoneAlreadyUsed = await userModel.findOne({ phone })
        if (isPhoneAlreadyUsed) { return res.status(409).send({ status: false, message: `${phone} is already in use, Please try a new phone number.` }) }


        if (!password) return res.status(400).send({ status: false, message: "password is required" })
        if (!isVaildPass(password.trim())) return res.status(400).send({ status: false, message: "Please provide a valid Password with min 8 to 15 char with Capatial & special (@#$%^!) char " })
        const encryptedPassword = await bcrypt.hash(password, 10) //encrypting password by using bcrypt. // 10 => salt sound


        if (!age) return res.status(400).send({ status: false, message: "age is requires" })
        if (!isValidAge(age)) return res.status(400).send({ status: false, message: "not a valide age" })

        if (!aadharNo) return res.status(400).send({ status: false, message: "aadharNo is requires" })
        if (!isValidadhar(aadharNo)) return res.status(400).send({ status: false, message: "not a valide last aadharNo" })



        if (!pincode) return res.status(400).send({ status: false, message: "pincode is required" })
        if (!isValidpincode(pincode)) return res.status(400).send({ status: false, message: "Pinecode is not valide" })


        const userData = { fname, lname, phone, aadharNo, age, pincode, password: encryptedPassword, }
        const saveUserData = await userModel.create(userData);

        res.status(201).send({ status: true, message: "Success", data: saveUserData });

    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}



const login = async function (req, res) {
    try {
        let data = req.body
        if (!isValidBody(data)) return res.status(400).send({ stataus: false, msg: "please provide data" })

        const { phone, password } = data

        if (!phone) return res.status(400).send({ status: false, message: "phone is required" })
        if (!isValidPhone(phone)) return res.status(400).send({ status: false, message: `${phone} is not a valide phone.` })
        const findUser = await userModel.findOne({ phone })
        if (!findUser) { return res.status(409).send({ status: false, message: "no regirstration found for this number plese registor first" }) }

        if (!password) return res.status(400).send({ stataus: false, msg: "please provide password" })


        const matchPassword = await bcrypt.compare(password, findUser.password)
        if (!matchPassword) {
            return res.status(400).send({ status: false, message: "plese provied currect password" })
        }
        const token = jwt.sign({ phone: phone }, "BackendDeveloperAssignmentKey", { expiresIn: "24h" })

        res.setHeader("x-api-key", token)

        return res.status(200).send({ status: true, message: "user log in successfully", data: { phone: phone, token: token } })
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}


module.exports = { createUser, login }