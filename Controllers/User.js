const pg = require('../services/db')
const axios = require('axios')
class User {

    async getUser(req, res){
        try {
            console.log(req.body)
            const {rows} = await pg.query(`SELECT * FROM users WHERE login = $1 AND password = $2`, [req.body.login, req.body.password])
            console.log(rows)
            if(rows.length){
                let data = Buffer.from(rows[0].id+'/'+rows[0].login).toString('base64')
                return res.json({res: 0, data})
            }else{
                return res.json({res:1, message: "Invalid login or password"})
            }
        }catch (e) {
            console.log(e)
        }finally {

        }
    }
    async getCourse(req, res){
        try {
            const curse = await axios.get("https://cbu.uz/ru/arkhiv-kursov-valyut/json/");
            const dollar = curse.data.filter(c=>c.id === 69)
            return res.send(dollar[0])
        }catch (e) {
            console.log(e)
        }
    }

    async getUserProc(req, res){
        try {
            const resp = await pg.query(`SELECT reffunc(null)`)
            console.log(resp)
            if(resp.rows.length){
                return res.json({res: 0, data:resp.rows})
            }else{
                return res.json({res:1, message: "Invalid login or password"})
            }
        }catch (e) {
            console.log(e)
        }
    }
}

module.exports = new User()