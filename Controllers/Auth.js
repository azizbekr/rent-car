const pg = require('../services/db')

module.exports = async (req, res, next)=>{
    try {
        const token = req.headers.authorization;
        let decodedToken = Buffer.from(token, 'base64').toString('ascii');
        decodedToken = decodedToken.split('/')
        console.log(decodedToken)
        const {rows} = await pg.query(`SELECT * FROM users WHERE login = $1 AND id = $2`, [decodedToken[1], decodedToken[0]])
        if (!rows.length) {
            throw 'Invalid user ID';
        } else {
            req.params.id = parseInt(decodedToken[0], 10)
            next();
        }
    } catch {
        res.status(401).json({
            error: new Error('Invalid request!')
        });
    }
}


