const pg = require('../services/db')


class Payments {

    async addPayment(req, res){
        try {
            const {sdelka_id, info, pay_date} = req.body
            const user_id = req.params.id
            let {summa} = req.body
            console.log("BODY PARAMS", req.body)
            let sdelka = await pg.query(`SELECT * FROM deals WHERE id = $1`, [sdelka_id])
            console.log("SDELKA",sdelka.rows)

            let {oylik_qoldiq, oylik_tulov, qolgan_muddat, qolgan_summa, muddat, birinchi_tulov, oraliq_tulov, oxirgi_tulov} = sdelka.rows[0]
            let StopFlag = false
            let muddat_uchun = []
            ////**********************************************************************************/////
            //QOLGAN SUMMA (sdelkada)
            if(parseInt(summa, 10) > parseInt(qolgan_summa,  10)) {
                console.log(summa, qolgan_summa)
                return res.json({res:2, message: "Сумма бутун суммадан катта! Суммани тугри киритинг!"})
            }
            let summaIn = summa
            qolgan_summa = qolgan_summa - summa

            /////////////////////////BIRINCHI TOLOV /////////////////////////////////////////
            if(parseInt(birinchi_tulov, 10)){
                birinchi_tulov = parseInt(birinchi_tulov, 10)
                console.log("birinchi_tulov", birinchi_tulov)
                if(birinchi_tulov>= summa){
                    birinchi_tulov = birinchi_tulov - summa
                    summa = 0
                }else{
                    summa = summa - birinchi_tulov
                    birinchi_tulov = 0
                }

                if(birinchi_tulov){
                    StopFlag = true
                    oylik_qoldiq = birinchi_tulov
                }else{
                    oylik_qoldiq = 0
                    qolgan_muddat = qolgan_muddat - 1
                }
                muddat_uchun.push(1)
            }
            /////////////////////////BIRINCHI TOLOV /////////////////////////////////////////

            /////////////////////////ORALIQ TOLOV /////////////////////////////////////////
            if(!StopFlag && summa>0 && parseInt(oraliq_tulov, 10)) {
                oraliq_tulov = parseInt(oraliq_tulov, 10)
                console.log("oraliq_tulov", oraliq_tulov)
                if(oraliq_tulov>= summa){
                    oraliq_tulov = oraliq_tulov - summa
                    summa = 0
                }else{
                    summa = summa - oraliq_tulov
                    oraliq_tulov = 0
                }
                if(oraliq_tulov){
                    StopFlag = true
                    oylik_qoldiq = oraliq_tulov
                }else{
                    oylik_qoldiq = 0
                    qolgan_muddat = qolgan_muddat - 1
                }
                muddat_uchun.push(2)
            }
            /////////////////////////ORALIQ TOLOV /////////////////////////////////////////



            /////////////////////////MUDDAT TOLOVLARI /////////////////////////////////////////
            let oraliq_muddat = qolgan_muddat
            if(parseInt(oxirgi_tulov, 10)) oraliq_muddat = oraliq_muddat - 1
            if(!StopFlag && summa>0 && parseInt(oraliq_muddat, 10)){

                console.log("MUDDAT TOLOVLARI", oraliq_muddat)
                let yopiladigan_muddat_soni = 0
                oylik_qoldiq = parseInt(oylik_qoldiq, 10)
                if(summa > 0 && (summa <= oylik_qoldiq)){
                    console.log("Summa <= OYlik qldq")
                    muddat_uchun.push((1+ +muddat) - qolgan_muddat)
                    if(summa < oylik_qoldiq){
                        oylik_qoldiq = oylik_qoldiq - summa
                    }else{
                        oylik_qoldiq = 0
                        yopiladigan_muddat_soni = yopiladigan_muddat_soni + 1
                        qolgan_muddat = qolgan_muddat - yopiladigan_muddat_soni
                    }
                }else if(summa > 0 && (summa > oylik_qoldiq)){
                    console.log("summa>oylqldq")
                    if(parseInt(oylik_qoldiq, 10)){
                        console.log("oylik qoldiq bosa - summa")
                        summa = summa - oylik_qoldiq
                        yopiladigan_muddat_soni = yopiladigan_muddat_soni + 1
                        oylik_qoldiq = 0
                    }
                    if(oraliq_muddat - yopiladigan_muddat_soni){
                        if(((oraliq_muddat - yopiladigan_muddat_soni) * oylik_tulov) >= summa){
                            if(summa >= oylik_tulov){
                                console.log("summa>=oylik_tolov")
                                yopiladigan_muddat_soni = yopiladigan_muddat_soni + Math.floor(summa/oylik_tulov)
                                summa%oylik_tulov ? oylik_qoldiq = oylik_tulov - summa%oylik_tulov : oylik_qoldiq = 0

                                    console.log("yopiladigan_muddat_soni", yopiladigan_muddat_soni)
                                for(let i=0; i<yopiladigan_muddat_soni; i++){
                                    muddat_uchun.push((1+ +muddat) - qolgan_muddat + i)
                                    console.log("in for loop", muddat_uchun)
                                }
                                qolgan_muddat = qolgan_muddat - yopiladigan_muddat_soni
                                if(oylik_qoldiq) {
                                    muddat_uchun.push((1+ +muddat) - qolgan_muddat)
                                }

                                muddat_uchun = muddat_uchun.filter((item, index)=> muddat_uchun.indexOf(item) === index)
                                summa = ((qolgan_muddat - yopiladigan_muddat_soni) * oylik_tulov) - summa
                            }else{
                                if(yopiladigan_muddat_soni){
                                    muddat_uchun.push((1+ +muddat) - qolgan_muddat)
                                    qolgan_muddat = qolgan_muddat - yopiladigan_muddat_soni
                                }
                                console.log("summa<oylik_tolov (ELSE)")
                                oylik_qoldiq = oylik_tulov - summa
                                summa = 0
                                muddat_uchun.push((1+ +muddat) - qolgan_muddat)
                            }
                        }
                    }
                }
            }

            /////////////////////////MUDDAT TOLOVLARI /////////////////////////////////////////

            if(parseInt(oxirgi_tulov, 10) && (summa > 0)){
                if(qolgan_muddat == 1){
                    console.log("OXIRGI TULOV")
                    muddat_uchun.push(muddat)
                    if(parseInt(oxirgi_tulov, 10) === summa){
                        oxirgi_tulov = 0
                    }else{
                        oxirgi_tulov = oxirgi_tulov - summa
                        oylik_qoldiq = oxirgi_tulov
                    }
                }
            }

            muddat_uchun = muddat_uchun.join()

            ////******************************************************/////

            const {rows} = await pg.query(`INSERT INTO payments
            (user_id, sdelka_id, pay_summa, payed_summa, qolgan_summa, muddat_uchun, info, pay_date)
             VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`, [parseInt(user_id, 10), sdelka_id,oylik_tulov,summaIn,oylik_qoldiq, muddat_uchun, info, pay_date])

            if(rows[0]){
                // console.log(rows[0])
                const updatedSdelka = await pg.query(`UPDATE deals SET qolgan_muddat=$2, qolgan_summa=$3, oylik_qoldiq=$4, birinchi_tulov=$5, oraliq_tulov = $6, oxirgi_tulov = $7  WHERE id=$1 RETURNING *`, [sdelka_id, qolgan_muddat, qolgan_summa, oylik_qoldiq, birinchi_tulov, oraliq_tulov, oxirgi_tulov])
                // console.log("AFTER UPDATE",updatedSdelka.rows[0])
                if(updatedSdelka.rows[0].qolgan_summa == 0){
                    await pg.query(`UPDATE deals SET status = $2  WHERE id=$1 RETURNING *`, [sdelka_id, 'T'])
                }
            }

            return res.json({res: 0, data:rows, message: "Тулов муваффакиятли кушилди!"})
        }catch (e) {
            console.log(e)
        }finally {

        }
    }

    async getUserSdelkaPayments(req, res){
        try {
            const {rows} = await pg.query(`SELECT *, to_char(pay_date, 'DD-MM-YYYY') as pay_d FROM payments WHERE sdelka_id = $1`, [req.params.id])
            // console.log("getUserSdelkaPayments",rows)
            return res.json(rows)
        }catch (e) {
            console.log(e)
        }finally {

        }
    }

}

module.exports = new Payments()