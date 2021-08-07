const pg = require('../services/db')

class Stats {
    async getStats(req, res){
        try {
            const {rows} = await pg.query(`SELECT d.id, d.created_at, d.narxi, d.muddat, d.qolgan_muddat, d.oylik_tulov, d.muddat, d.kelishilgan_narx, d.tan_narxi, 
                ( CAST(d.kelishilgan_narx as INTEGER) - CAST(d.tan_narxi as INTEGER)) as naqt_foyda, 
                ( CAST(d.narxi as INTEGER) - CAST(d.tan_narxi as INTEGER)) as umumiy_foyda, 
                TRUNC( ((CAST(d.narxi as decimal) - CAST(d.tan_narxi as decimal)) * 100 / CAST(d.tan_narxi as decimal)), 2) as umumiy_foyda_foizda,
                TRUNC( (((CAST(d.narxi as decimal) - CAST(d.tan_narxi as decimal)) * 100 / CAST(d.tan_narxi as decimal)) / CAST(d.muddat as decimal)), 2) as oylik_foyda_foizda,
                TRUNC( ((CAST(d.narxi as decimal) - CAST(d.tan_narxi as decimal)) / CAST(d.muddat as decimal)), 2) as oylik_foyda,
                CONCAT(c.full_name, ' - ',a.gos_nomer, ' ', a.model) as name
                FROM public.deals AS d 
                LEFT JOIN public.clients AS c 
                ON d.client_id = c.id 
                LEFT JOIN public.cars AS a
                ON d.avto_id = a.id
                WHERE d.user_id = $1 
                AND d.turi = 'sotish'`, [req.params.id])
            console.log(rows)
            if(rows.length){
                return res.json({res:0, data:rows})
            }else{
                return res.json({res:1, message: "Маълумотлар мавжуд эмас"})
            }
        }catch (e) {
            console.log(e)
        }finally {

        }
    }
}

module.exports = new Stats()