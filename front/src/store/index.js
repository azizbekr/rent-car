import Vue from 'vue'
import Vuex from 'vuex'
import Cookie from 'js-cookie'
const baseUrl = 'https://arenda.reyd.uz'
// const baseUrl = '192.168.2.99'
Vue.use(Vuex)

export default new Vuex.Store({
    actions:{
        async kursValyut(ctx){
            const res = await fetch(`${baseUrl}/api/kurs`,)
            const kurs = await res.json()
            if(kurs){
                ctx.commit('kurs', kurs)
                return kurs
            }else{
                return {res: 1}
            }
        },
        async loginUser(ctx, data){
            if(Cookie.get('bra')){
                Cookie.remove('bra')
            }
            const res = await fetch(`${baseUrl}/api/login`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            const user = await res.json()
            if(!user.res){
                Cookie.set('bra', user.data)
                // document.cookie = 'bra='+user.data
                ctx.commit('login', true)
                return {res: 0}
            }else{
                return {res: 1}
            }
        },
        async getCarModels(ctx){
            const res = await fetch(`${baseUrl}/api/cars_models`)
            const cars = await res.json()
            ctx.commit('carModelList', cars)
        },
        async getUserCars(ctx){
            let bra = Cookie.get('bra')
            const res = await fetch(`${baseUrl}/api/cars`,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': bra
                }
            })
            const cars = await res.json()
            ctx.commit('updateCars', cars)
        },
        async getUserClients(ctx){
            let bra = Cookie.get('bra')
            const res = await fetch(`${baseUrl}/api/clients`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': bra
                }
            })
            const clients = await res.json()
            ctx.commit('updateClients', clients)
        },
        async getUserMonitoring(ctx){
            let bra = Cookie.get('bra')
            const res = await fetch(`${baseUrl}/api/deals`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': bra
                }
            })
            const cars = await res.json()
            ctx.commit('updateMonitoring', cars)
        },
        async addNewCar(ctx, carData){
            let bra = Cookie.get('bra')
            const res = await fetch(`${baseUrl}/api/add_car`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': bra
                },
                body: JSON.stringify(carData)
            })
            const resp = await res.json()
            ctx.commit('httpResponse', resp)
        },
        async addNewClient(ctx, clientData){
            let bra = Cookie.get('bra')
            const res = await fetch(`${baseUrl}/api/add_client`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': bra
                },
                body: JSON.stringify(clientData)
            })
            const resp = await res.json()
            ctx.commit('httpResponse', resp)
        },
        async addNewDeal(ctx, dealData){
            let bra = Cookie.get('bra')
            const res = await fetch(`${baseUrl}/api/add_deal`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': bra
                },
                body: JSON.stringify(dealData)
            })
            const resp =  await res.json()
            ctx.commit('httpResponse', resp)
        },
        async UpdateCar(ctx, carData){
            let bra = Cookie.get('bra')
            const res = await fetch(`${baseUrl}/api/car`,{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': bra
                },
                body: JSON.stringify(carData)
            })
            const cars = await res.json()
            ctx.commit('updateResponse', cars)
        },
        async deleteCar(ctx, id){
            const res = await fetch(`${baseUrl}/api/car/${id}`,{
                method: 'DELETE'
            })
            const cars = await res.json()
            ctx.commit('updateResponse', cars)
        },
        async UpdateClient(ctx, getData){
            let bra = Cookie.get('bra')
            const res = await fetch(`${baseUrl}/api/client`,{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': bra
                },
                body: JSON.stringify(getData)
            })
            const cars = await res.json()
            ctx.commit('updateResponse', cars)
        },
        async UpdateDeal(ctx, getData){
            let bra = Cookie.get('bra')
            const res = await fetch(`${baseUrl}/api/deal`,{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': bra
                },
                body: JSON.stringify(getData)
            })
            const cars = await res.json()
            ctx.commit('updateResponse', cars)
        },
        async deleteClient(ctx, id){
            const res = await fetch(`${baseUrl}/api/client/${id}`,{
                method: 'DELETE'
            })
            const cars = await res.json()
            ctx.commit('updateResponse', cars)
        },
        async deleteOneDeal(ctx, id){
            const res = await fetch(`${baseUrl}/api/deal/${id}`,{
                method: 'DELETE'
            })
            const cars = await res.json()
            ctx.commit('updateResponse', cars)
        },
        async getUserOlishList(ctx){
            let bra = Cookie.get('bra')
            const res = await fetch(`${baseUrl}/api/deal/olish`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': bra
                }
            })
            const cars = await res.json()
            ctx.commit('olishList', cars)
        },
        async getUserSotishList(ctx){
            let bra = Cookie.get('bra')
            const res = await fetch(`${baseUrl}/api/deal/sotish`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': bra
                }
            })
            const cars = await res.json()
            ctx.commit('sotishList', cars)
        },
        async getSdelkaPayments(ctx, id){
            const res = await fetch(`${baseUrl}/api/payment/${id}`)
            const payments = await res.json()
            ctx.commit('sdelkaPayments', payments)
        },
        async addSdelkaPayment(ctx, paymentData){
            let bra = Cookie.get('bra')
            const res = await fetch(`${baseUrl}/api/payment/add_payment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': bra
                },
                body: JSON.stringify(paymentData)
            })
            const resp =  await res.json()
            ctx.commit('httpResponse', resp)
        },
        async choosenSdelka(ctx, id){
            const res = await fetch(`${baseUrl}/api/oneDeal/${id}`)
            const resp = await res.json()
            ctx.commit('choosenDeal', resp)
        },
        async getUserStats(ctx){
            let bra = Cookie.get('bra')
            const res = await fetch(`${baseUrl}/api/stats`,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': bra
                }
            })
            const stats = await res.json()
            ctx.commit('updateStates', stats)
        },
        async clientDeals(ctx, id){
            const res = await fetch(`${baseUrl}/api/clientDeals/${id}`)
            const resp = await res.json()
            return resp
        },
    },
    mutations:{
        mijozType: (state, payload) => state.mijozType = payload,
        updateStates: (state, payload) => state.stats = payload,
        login: (state, payload) => state.login = payload,
        kurs: (state, payload) => state.kurs = payload,
        showCurrentDeal: (state) => state.currentDeal = true,
        hideCurrentDeal: (state) => state.currentDeal = false,
        carModelList: (state, payload) => state.carModelList = payload,
        choosenDeal: (state, payload) => state.choosenDeal = payload,
        sdelkaId: (state, payload) => state.sdelkaId = payload,
        sdelkaEditId: (state, payload) => state.sdelkaEditId = payload,
        sdelkaPayments: (state, payload) => state.sdelkaPayments = payload,
        olishList: (state, payload) => state.monitoringListOlish = payload,
        sotishList: (state, payload) => state.monitoringListSotish = payload,
        editCarDialog: state => state.editCarDialog,
        updateCars(state, cars){
            state.cars = cars
        },
        updateClients(state, clients){
            state.clients = clients
        },
        updateMonitoring(state, cars){
            state.monitoringList = cars
        },
        httpResponse(state, resp){
            state.httpRes = resp
        },
        updateResponse: (state, payload)=> state.updateResponse = payload,
        showSuccessDialog: (state) => state.successDialog = true,
        showSuccessUpdateDialog: (state) => state.successUpdateDialog = true,
        showSuccessDeleteDialog: (state) => state.successDeleteDialog = true,
        hideSuccessDialog: (state) => state.successDialog = false,
        hideSuccessUpdateDialog: (state) => state.successUpdateDialog = false,
        hideSuccessDeleteDialog: (state) => state.successDeleteDialog = false,
        showCurrentCarInfoDialog: (state) => state.currentCarDialog = true,
        hideCurrentCarInfoDialog: (state) => state.currentCarDialog = false,
        showEditCarInfoDialog: (state) => state.editCarDialog = true,
        hideEditCarInfoDialog: (state) => state.editCarDialog = false,
        showDeleteCarInfoDialog: (state) => state.deleteCarDialog = true,
        hideDeleteCarInfoDialog: (state) => state.deleteCarDialog = false,
        showCurrentClientInfoDialog: (state) => state.currentClientDialog = true,
        hideCurrentClientInfoDialog: (state) => state.currentClientDialog = false,
        showEditClientInfoDialog: (state) => state.editClientDialog = true,
        hideEditClientInfoDialog: (state) => state.editClientDialog = false,
        showDeleteClientInfoDialog: (state) => state.deleteClientDialog = true,
        hideDeleteClientInfoDialog: (state) => state.deleteClientDialog = false,
        showDeleteDealInfoDialog: (state) => state.deleteDealDialog = true,
        hideDeleteDealInfoDialog: (state) => state.deleteDealDialog = false,
        showEditDealInfoDialog: state => state.EditDealDialog = true,
        hideEditDealInfoDialog: state => state.EditDealDialog = false,
        showOneCarInfo(state, id){
            state.currentCar = id
        },
        editOneCar: (state, payload) => state.editCarId = payload,
        editOneClient: (state, payload) => state.editClientId = payload,
        deleteOneCar: (state, payload) => state.deleteCarId = payload,
        deleteOneDeal: (state, payload) => state.deleteDealId = payload,
        currentClient: (state, payload) => state.currentClientId = payload
    },
    state:{
        mijozType: '',
        EditDealDialog: false,
        sdelkaEditId: null,
        stats: [],
        currentDeal: false,
        kurs: [],
        choosenDeal: [{model:null, muddat: null, narxi: null, boshlangich_tulov: null, oylik_tulov:null, qolgan_summa: null, qolgan_muddat:null}],
        sdelkaId: null,
        sdelkaPayments: [],
        updateResponse: {message: ""},
        httpRes: {message: ""},
        cars:[],
        clients:[],
        carModelList:[],
        carColorList:[
            {text:"Оқ", value:"oq"},
            {text:"Қаймоқ ранг", value:"qaymoq"},
            {text:"Делфин", value:"delfin"},
            {text:"Мокрий асфалт", value:"mokriy"},
            {text:"Қора", value:"qora"},
            {text:"Кумуш ранг", value:"kumush"},
            {text:"Сахара (қум ранг)", value:"saxara"},
            {text:"Садаф-жигарранг", value:"sadaf-jigarrang"},
            {text:"Сариқ-яшил ранг", value:"sariq-yashil"},
            {text:"Кўк-хаворанг", value:"kok-xavorang"},
            {text:"Олча", value:"olcha"},
            {text:"Кўк", value:"kok"},
            {text:"Қизил", value:"qizil"},
            {text:"Кулранг", value:"kulrang"},
            {text:"Бронза", value:"bronza"},
            {text:"Хамелеон", value:"xameleon"},
            {text:"Феруза", value:"feruza"},
            {text:"Жигарранг", value:"jigarrang"},
            {text:"Тўқ қизил", value:"tuq-qizil"},
            {text:"Мовий", value:"moviy"},
            {text:"Сариқ", value:"sariq"},
            {text:"Яшил", value:"yashil"},
            {text:"Оч бинафша ранг", value:"och-binafsha"},
            {text:"Олтин ранг", value:"oltin"},
            {text:"Тўқ сариқ", value:"tuz-sariq"},
            {text:"Пушти ранг", value:"pushti"},
            {text:"Бинафша ранг", value:"binafsha"}
        ],
        sostoyanieCar:[
            {text: "Янги", val: "new"},
            {text: "Яхши", val: "good"},
            {text: "Ортача", val: "normal"},
            {text: "Ёмон", val: "bad"},
        ],
        rules: [
            value => !!value || '*',
            value => (value && value.length >= 1) || 'Min 1 characters',
        ],
        monitoringList:[],
        successDialog: false,
        successUpdateDialog: false,
        successDeleteDialog: false,
        currentCar: null,
        editCarId: null,
        editClientId: null,
        deleteCarId: null,
        deleteDealId: null,
        currentClientId: null,
        currentCarDialog: false,
        editCarDialog: false,
        deleteCarDialog: false,
        currentClientDialog: false,
        deleteClientDialog: false,
        deleteDealDialog: false,
        editClientDialog: false,
        monitoringListOlish: [],
        monitoringListSotish: [],
        login: Cookie.get('bra') || false
    },
    getters:{
        mijozType: state => state.mijozType,
        EditDealDialog: state => state.EditDealDialog,
        getUserStats: state => state.stats,
        kurs: state => state.kurs,
        login: state => state.login,
        currentDeal: state => state.currentDeal,
        choosen: state => state.choosenDeal,
        sdelkaId: state => state.sdelkaId,
        sdelkaEditId: state => state.sdelkaEditId,
        sdelkaPayments: state => state.sdelkaPayments,
        updateResponse: state => state.updateResponse,
        rules: state => state.rules,
        EditCarDialog: state => state.editCarDialog,
        DeleteCarDialog: state => state.deleteCarDialog,
        currentCarDialog: state => state.currentCarDialog,
        EditClientDialog: state => state.editClientDialog,
        DeleteClientDialog: state => state.deleteClientDialog,
        DeleteDealDialog: state => state.deleteDealDialog,
        currentClientDialog: state => state.currentClientDialog,
        editCarInfo: state => state.cars.filter(car=>car.id === state.editCarId),
        editClientInfo: state => state.clients.filter(client=>client.id === state.editClientId),
        editDealInfo: state => state.monitoringList.filter(c=>c.id === state.sdelkaEditId),
        deleteCarInfo: state => state.cars.filter(car=>car.id === state.deleteCarId),
        deleteDealInfo: state => state.monitoringList.filter(car=>car.id === state.deleteDealId),
        currentClientInfo: state => state.clients.filter(client=>client.id === state.currentClientId),
        currentCar: state => {
            const car = state.cars.filter(car=>car.id === state.currentCar)
            return car[0]
        },

        successDialog: state => state.successDialog,
        successUpdateDialog: state => state.successUpdateDialog,
        successDeleteDialog: state => state.successDeleteDialog,
        httpRes: (state)=> state.httpRes,
        myCars: (state)=> state.cars.sort((a,b)=>parseInt(b.id,10)-parseInt(a.id,10)),
        myClients: (state)=>state.clients.sort((a,b)=>parseInt(b.id,10)-parseInt(a.id,10)),
        myMonitoringList: (state)=>state.monitoringList.sort((a,b)=>parseInt(b.id,10)-parseInt(a.id,10)),
        myMonitoringListOlish: (state)=>state.monitoringListOlish,
        myMonitoringListSotish: (state)=>state.monitoringListSotish,
        perekupList(state){
            const out = []
            state.clients.forEach(t=>{
                const {id, full_name, passport, phone, address} = t
                out.push({id, full_name, passport, phone, address})
            })
            return out
        },
        myCarList(state){
            state.cars.forEach(t=>{
                t.name = t.model+' '+t.gos_nomer
            })
            let cars = state.cars.filter(t=>t.status === 'G')
            return cars
        },
        carsList: (state)=>state.carModelList,
        carsColor: (state)=>state.carColorList,
        sostoyanieCar: (state)=>state.sostoyanieCar
    }
})