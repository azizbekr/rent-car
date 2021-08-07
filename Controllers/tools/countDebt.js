class CountDebt {
    constructor(deal) {
        this.deal = deal
    }

    countDifference(created_at){
        try {
            let now_month = new Date().getMonth()
            let created_month = new Date(created_at).getMonth()
            let now_year = new Date().getFullYear()
            let created_year = new Date(created_at).getFullYear()
            if (created_year < now_year) {
                now_month = now_month + 12
            }
            return now_month - created_month
        }catch (e) {
            console.log(e)
        }
    }

    calcMonths(){
        try {
            let difference = this.countDifference(this.deal.created_at)
            let paidMonthsCount = this.deal.muddat - this.deal.qolgan_muddat
            return difference - paidMonthsCount
        }catch (e) {
            console.log(e)
        }
    }

    debt(){
        try {
            let dealDebt = this.calcMonths()
            console.log("dealDebt", dealDebt)
            let currentMonth = this.countDifference(this.deal.created_at)
            if(dealDebt===0 && !parseInt(this.deal.oylik_qoldiq, 10)){ //qarzi yoq
                return {res:0, type:"ok"}
            }else if(dealDebt>0){ //qarzi bor
                currentMonth = currentMonth +1
                let m = []
                for(let i=1; i<=dealDebt; i++){
                    m.push(currentMonth-i)
                }
                m.sort()
                let debtAmount = this.deal.oylik_tulov*dealDebt
                if(parseInt(this.deal.oylik_qoldiq, 10)) debtAmount = debtAmount - (this.deal.oylik_tulov - this.deal.oylik_qoldiq)
                return {res:0, type:"debt", months:m.join('-'), amount: debtAmount}
            }else { //oldindan tolagan oy uchun
                console.log("---", dealDebt)
                dealDebt = Math.abs(dealDebt)
                let forwardAmount = this.deal.oylik_tulov*dealDebt



                if(dealDebt && parseInt(this.deal.oylik_qoldiq ,10)) {
                    dealDebt = dealDebt +1
                }
                console.log("-+", dealDebt)
                let m = []
                for(let i=1; i<=dealDebt; i++){
                    m.push(currentMonth+i)
                }
                if(!dealDebt && parseInt(this.deal.oylik_qoldiq ,10)){
                    m.push(currentMonth+1)
                }
                m.sort()
                console.log(m)
                console.log(forwardAmount)
                if(parseInt(this.deal.oylik_qoldiq, 10)) forwardAmount = forwardAmount + (parseInt(this.deal.oylik_tulov, 10)-this.deal.oylik_qoldiq)
                console.log(forwardAmount)
                return {res:0, type:"forward", months:m.join('-'), amount: forwardAmount}
            }
        }catch (e) {
            console.log(e)
        }
    }
}

module.exports = CountDebt