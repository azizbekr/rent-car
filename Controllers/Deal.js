const pg = require('../services/db')
const CD = require('./tools/countDebt')

class Deal {

    async addDeal(req, res){
        try {
            console.log(req.body)
            const {turi,created_at, narxi,tulov_kuni, birinchi_tulov_kuni, oraliq_tulov_kuni, oxirgi_tulov_kuni, birinchi_tolov, oraliq_tolov, oxirgi_tolov, oldindan_tulov, savdo_turi, oylik_tulov, foiz, info_deal, client_Id, kelishilgan_narxi, tan_narxi, course} = req.body.dealData
            let {muddat} = req.body.dealData
            let car_id
            car_id = req.body.dealData.car_id
            const  user_id = req.params.id
            if(turi === 'olish'){ //if buy car so add into DB
                const {model, probeg, year, color, korobka, position, kraska, sostoyaniya,xarajat, gos_nomer, info} = req.body.carData
                //check of existing car with such gos_nomer on user_id
                let car = await pg.query(`SELECT * FROM cars WHERE gos_nomer = $1 AND user_id = $2`, [gos_nomer, user_id])
                car = car.rows[0]
                if(car){
                    console.log({res: "1", message: "Автомобиль с таким гос. номером уже существует"})
                    return res.json({res: "1", message: "Автомобиль с таким гос. номером уже существует"})
                }
                //if car don't exists in DB so insert it
                const added_car = await pg.query(`INSERT INTO cars
                (user_id, model, probeg, year, color, korobka, "position", price, xarajat, kraska, sostoyaniya, added_date, gos_nomer, client_id, status, info)
                 VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,NOW(),$12,$13,'G',$14) RETURNING *`, [user_id, model, probeg, year, color, korobka, position, narxi, xarajat, kraska, sostoyaniya, gos_nomer, client_Id, info])
                console.log(added_car.rows)
                car_id = added_car.rows[0].id
            }
            let oy_tulov = parseInt(oylik_tulov, 10) || null
            let qolgan_summa = (savdo_turi === 'naqt')?0:narxi-oldindan_tulov
            let status
            let car_status
            if(savdo_turi === 'naqt') {
                muddat = 0
                status = 'N'
                car_status = 'SN'
            }else if(savdo_turi === 'muddatli'){
                status = 'M'
                car_status = 'SM'
            }else if(savdo_turi === 'foizli'){
                status = 'F'
                car_status = 'SF'
            }

            const {rows} = await pg.query(`INSERT INTO deals
                (created_at, turi, narxi, oylik_tulov, muddat, qolgan_muddat, qolgan_summa, tulov_kuni, boshlangich_tulov, savdo_turi, foiz, avto_id, client_id, status, info, user_id, birinchi_tulov, oraliq_tulov, oxirgi_tulov, oylik_qoldiq, birinchi_tulov_kuni, oraliq_tulov_kuni, oxirgi_tulov_kuni, kelishilgan_narx, tan_narxi, kurs)
                 VALUES ($24,$1,$2,$3,$4,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24) RETURNING *`, [turi, narxi, oy_tulov, muddat, qolgan_summa, tulov_kuni, oldindan_tulov, savdo_turi, foiz, car_id, client_Id, status, info_deal, user_id, birinchi_tolov, oraliq_tolov, oxirgi_tolov,0,birinchi_tulov_kuni,oraliq_tulov_kuni, oxirgi_tulov_kuni, kelishilgan_narxi, tan_narxi, created_at, course])
            if(turi === 'sotish') await pg.query(`UPDATE cars SET  status=$1 WHERE id=$2`, [car_status, car_id])
            console.log(JSON.stringify({res: 0, data:rows, message: "Сделка успешно добавлена"}))
            res.json({res: 0, data:rows, message: "Сделка успешно добавлена"})
        }catch (e) {
            console.log(e)
        }finally {

        }
    }

    async updateDeal(req, res){
        try {
            const {narxi, oylik_tulov, muddat, qolgan_summa, qolgan_muddat, boshlangich_tulov, birinchi_tulov, oraliq_tulov, oxirgi_tulov, id} = req.body
            console.log(req.body)
            const {rows} = await pg.query(`UPDATE deals SET
                narxi=$1, oylik_tulov=$2, muddat=$3, qolgan_summa=$4, qolgan_muddat=$5, boshlangich_tulov=$6, birinchi_tulov=$7, oraliq_tulov=$8, oxirgi_tulov=$9 
                WHERE id=$10 RETURNING *`, [narxi, oylik_tulov, muddat, qolgan_summa, qolgan_muddat, boshlangich_tulov, birinchi_tulov, oraliq_tulov, oxirgi_tulov, id])
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

    async ModifyDeal(req, res){
        try{
            const deal = await pg.query(`SELECT * FROM deals WHERE id = $1`, [req.body.id])
            console.log(deal.rows)

        }catch (e) {
            console.log(e)
        }
    }

    async deleteDeal(req, res){
        try {
            const id = req.params.id
            const {rows} = await pg.query(`DELETE FROM deals WHERE id = $1`, [id])
            return res.json({res: 0, data:rows, message: "Успешно удалён"})
        }catch (e) {
            console.log(e)
        }finally {

        }
    }
    async getDeals(req, res){
        try {
            const {rows} = await pg.query(`SELECT d.*, to_char(d.created_at, 'DD-MM-YYYY'), c.model, c.gos_nomer, c.xarajat FROM public.deals AS d LEFT JOIN public.cars AS c ON d.avto_id = c.id WHERE d.user_id = $1 AND ( d.status = 'M' OR d.status = 'F') AND d.modified = 0`, [req.params.id])
            if(rows[0]){
                // const c = new CD.debt()
                return res.json(rows)
            }else{
                return res.json({res:3, message: "Deal not found"})
            }
        }catch (e) {
            console.log(e)
        }finally {

        }
    }

    async getOneDeal(req, res){
        try {
            const {rows} = await pg.query(`SELECT d.*, a.xarajat, a.model, a.gos_nomer, to_char(created_at, 'DD-MM-YYYY') AS created_date  
                FROM deals as d LEFT JOIN public.cars AS a
                ON d.avto_id = a.id  WHERE d.id = $1 `, [req.params.id])
            console.log(rows)
            if(rows){
                const check = new CD(rows[0])
                rows[0].debt = check.debt()
                return res.json(rows)
            }else{
                return res.json({res:2, message: "Invalid id or some problem"})
            }
        }catch (e) {
            console.log(e)
        }finally {

        }
    }

    async getOlishList(req,res){
        const {id} = req.params
        console.log("OLISH", id)
        const olishList = await pg.query(`SELECT d.*, c.full_name, a.model, a.gos_nomer, CONCAT(c.full_name, ' - ',a.gos_nomer, ' ', a.model) as name
            FROM public.deals AS d 
            LEFT JOIN public.clients AS c 
            ON d.client_id = c.id 
            LEFT JOIN public.cars AS a
            ON d.avto_id = a.id
            WHERE d.user_id = $1 
            AND d.turi = 'olish'
            AND ( d.status = 'M' OR d.status = 'F') `, [id])
        console.log(olishList.rows)
        return res.json({res:0, data: olishList.rows})
    }
    async getSotishList(req,res){
        const {id} = req.params
        const sotishList = await pg.query(`SELECT d.*, c.full_name, a.model, a.gos_nomer, CONCAT(c.full_name, ' - ',a.gos_nomer, ' ', a.model) as name
            FROM deals AS d 
            LEFT JOIN clients AS c 
            ON d.client_id = c.id 
            LEFT JOIN cars AS a
            ON d.avto_id = a.id
            WHERE d.user_id = $1 
            AND d.turi = 'sotish'
            AND ( d.status = 'M' OR d.status = 'F') `, [id])
        console.log("ID",id)
        console.log("sotishList",sotishList.rows)
        return res.json({res:0, data: sotishList.rows})
    }

    async getOneDealTest(req, res){
        try {
            const {rows} = await pg.query(`SELECT d.*, a.xarajat, a.model, a.gos_nomer, to_char(created_at, 'DD-MM-YYYY') AS created_date  
                FROM deals as d LEFT JOIN public.cars AS a
                ON d.avto_id = a.id  WHERE d.id = $1 `, [req.params.id])
            console.log(rows)
            if(rows[0]){
                const check = new CD(rows[0])
                let d = check.debt()
                res.json({data: rows, d})
            }else{
                res.json({res:2, message: "Invalid id or some problem"})
            }
        }catch (e) {
            console.log(e)
        }finally {

        }
    }
}

module.exports = new Deal()