const joi = require("joi")

const schema = joi.object({
    dept_name: joi.string().min(1).max(1500).required(),
    category_name: joi.string().required(),
    location: joi.string().min(1).max(256).required(),
    salary: joi.number().integer().required(),
    emp_id: joi.string().min(1).max(100).required()
})
const validate = async (req, res, next) => {
    const value = await schema.validate(req.body)
    if (value.error) {
        res.send({ error: value.error.details[0] })
    } else {
        next();
    }
}
module.exports = { validate }