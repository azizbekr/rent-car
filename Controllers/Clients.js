const pg = require('../services/db')

class Clients {
    async addClient(req, res){
        try {
            const {full_name, born_date, passport, address, inn, phone, type, info, passport_file, client_photo} = req.body
            const  user_id = req.params.id
            console.log(req.body)
            if(passport){
                let client = await pg.query(`SELECT * FROM clients WHERE passport = $1 AND user_id = $2`, [passport, user_id])
                if(client.rows[0]){
                    return res.json({res: "1", message: "Клиент с таким паспортом уже существует"})
                }
            }
            const {rows} = await pg.query(`INSERT INTO clients
                (user_id, full_name, created_at, born_date, passport, address, inn, phone, type, info, passport_file, client_photo)
                 VALUES ($1,$2,NOW(),$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *`, [user_id, full_name,born_date,passport,address,inn,phone,type,info,passport_file,client_photo])
            res.json({res: 0, data:rows, message: "Мижоз муваффакиятли кушилди"})
        }catch (e) {
            console.log(e)
        }finally {

        }
    }
    async updateClient(req, res){
        try {
            const {id, full_name, born_date, passport, address, inn, phone, type, info, passport_file, client_photo} = req.body
            const  user_id = req.params.id
            console.log(req.body)
            let client = await pg.query(`SELECT * FROM clients WHERE passport = $1 AND user_id =$2`, [passport, user_id])
            if(client.rows[0] && client.rows[0].id !== id){
                return res.json({res: "1", message: "Клиент с таким паспортом уже существует"})
            }
            const {rows} = await pg.query(`UPDATE clients SET full_name=$1, born_date=$2, passport=$3, address=$4, inn=$5, phone=$6, type=$7, info=$8, passport_file=$9, client_photo=$10 WHERE id=$11 RETURNING *`, [full_name, born_date, passport, address, inn, phone, type, info, passport_file, client_photo, id])
            if(rows[0]){
                console.log(JSON.stringify({res: 0, data: rows, message: "Успешно обновлён"}))
                return res.json({res: 0, data: rows, message: "Успешно обновлён"})
            }else{
                return res.json({res:1, data: rows, message: "Ошибка"})
            }
        }catch (e) {
            console.log(e)
        }finally {

        }
    }
    async deleteClient(req, res){
        try {
            const id = req.params.id
            const {rows} = await pg.query(`DELETE FROM clients WHERE id = $1`, [id])
            return res.json({res: 0, data:rows, message: "Успешно удалён"})
        }catch (e) {
            console.log(e)
        }finally {

        }
    }
    async getClients(req, res){
        try {
            const {rows} = await pg.query(`SELECT *, to_char(born_date, 'DD-MM-YYYY') as born, to_char(created_at, 'DD-MM-YYYY') as created  FROM clients WHERE user_id = $1`, [req.params.id])
            console.log(rows)
            res.send(rows)
        }catch (e) {
            console.log(e)
        }finally {

        }
    }
    async clientDeals(req, res){
        try {
            const id = req.params.id
            const {rows} = await pg.query(`SELECT d.*, c.full_name, a.model, a.gos_nomer
            FROM public.deals AS d 
            LEFT JOIN public.clients AS c 
            ON d.client_id = c.id 
            LEFT JOIN public.cars AS a
            ON d.avto_id = a.id
            WHERE d.client_id = $1`, [id])
            return res.json({res: 0, data:rows})
        }catch (e) {
            console.log(e)
        }finally {

        }
    }
}

module.exports = new Clients()