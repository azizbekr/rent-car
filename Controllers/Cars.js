const pg = require('../services/db')
const carsModels = require('../lstore/carModels')

class Cars {

    async carModels(req, res){
        try{
            return res.json(carsModels.cars)
        }catch (e) {
            console.log(e)
        }
    }

    async addCar(req, res){
        try {
            const {model, probeg, year, color, korobka, position, price, kraska, xarajat, sostoyaniya, gos_nomer, status, client_id, info} = req.body || req.body.carData
            const  user_id = req.params.id
            console.log("addCard CLASS",req.body)
            let car = await pg.query(`SELECT * FROM cars WHERE gos_nomer = $1 AND user_id = $2`, [gos_nomer, user_id])
            car = car.rows[0]
            if(car){
                return res.json({res: "1", message: "Автомобиль с таким гос. номером уже существует"})
            }
            const {rows} = await pg.query(`INSERT INTO cars
                (user_id, model, probeg, year, color, korobka, "position", price, xarajat, kraska, sostoyaniya, added_date, gos_nomer, client_id, status, info)
                 VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,NOW(),$12,$13,'G',$14) RETURNING *`, [user_id, model, probeg, year, color, korobka, position, price, xarajat, kraska, sostoyaniya, gos_nomer, client_id, info])
            res.json({res: 0, data:rows, message: "Автомобиль муваффакиятли кушилди"})
        }catch (e) {
            console.log(e)
        }finally {

        }
    }
    async updateCar(req, res){
        try {
            const {id, model, probeg, year, color, korobka, position, price, xarajat, kraska, added_date, sostoyaniya, gos_nomer, status, info} = req.body
            const user_id = req.params.id
            console.log(req.body)
            let car = await pg.query(`SELECT * FROM cars WHERE gos_nomer = $1 AND user_id = $2`, [gos_nomer, user_id])
            if(car.rows[0] && car.rows[0].id !== id){
                return res.json({res: "1", message: "Автомобиль с таким гос. номером уже существует"})
            }
            const {rows} = await pg.query(`UPDATE cars SET model=$1, probeg=$2, year=$3, color=$4, korobka=$5, "position"=$6, price=$7, xarajat=$8, kraska=$9, sostoyaniya=$10, info=$11, gos_nomer=$13 WHERE id=$12 RETURNING *`, [model, probeg, year, color, korobka, position, price, xarajat, kraska, sostoyaniya, info, id, gos_nomer])
            if(rows[0]){
                console.log(JSON.stringify({res:0, data: rows, message: "Успешно обновлён"}))
                return res.json({res:0, data: rows, message: "Успешно обновлён"})
            }else{
                return res.json({res:1, data: rows, message: "Ошибка"})
            }
        }catch (e) {
            console.log(e)
        }finally {

        }
    }
    async deleteCar(req, res){
        try {
            console.log(req.params)
            const id = req.params.id
            const {rows} = await pg.query(`DELETE FROM cars WHERE id = $1`, [id])
            return res.json({res: 0, data:rows, message: "Успешно удалён"})
        }catch (e) {
            console.log(e)
        }finally {

        }
    }
    async getCars(req, res){
        try {
            const {rows} = await pg.query(`SELECT *, to_char(added_date, 'DD-MM-YYYY') FROM cars WHERE user_id = $1 AND status = 'G'`, [req.params.id])
            console.log(rows)
            res.send(rows)
        }catch (e) {
            console.log(e)
        }finally {

        }
    }
}

module.exports = new Cars()