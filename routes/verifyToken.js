const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
    const exists = req.header('auth-token');
    console.log(exists);
    if (!exists) return res.send("Auth-token doesn't exist!");

        try {
            const isCorrect = await jwt.verify(exists, process.env.SECRET_TOKEN);
            next();
        }catch(e){
            res.json(e);
        }

}