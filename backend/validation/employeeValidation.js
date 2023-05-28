const joi = require("joi");

const schema = joi.object({
    firstname: joi.string().min(2).max(500).required(),
    lastname: joi.string().min(2).max(500).required(),
    email: joi.string().email().required(),
    password: joi.string().min(4).max(10).required(),
    gender: joi.valid("male", "female").required(),
    hobbies: joi.string().min(2).max(500).required()
})
const validate = async (req, res, next) => {
    const value = await schema.validate(req.body);
    if (value.error) {
        res.send({ error: value.error.details[0] })
    } else {
        next();
    }
}

module.exports = { validate }