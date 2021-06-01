const joi = require('joi');

const regVal = (data) => {
    const schema = joi.object().keys({
        email: joi.string().required().email(),
        username: joi.string().required().min(6),
        password: joi.string().required().min(6)
    });
    const {error} = schema.validate(data);

    return error;
};
module.exports = { regVal };
