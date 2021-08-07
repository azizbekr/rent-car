export default {
    actions:{
        async getUserCars(ctx, id){
            const res = await fetch(`http://192.168.2.99:80/api/cars/${id}`)
            const cars = await res.json()
            ctx.commit('updateCars', cars)
        }
    },
    mutations:{
        updateCars(state, cars){
            state.cars = cars
        }
    },
    state:{
        cars:[],
        cars_header:[
            { text: 'ID', value: 'id', align: 'start', sortable: true,},
            { text: 'Автомобиль', value: 'model' },
            { text: 'Давлат раками', value: 'gos_nomer' },
            { text: 'Кушилган санаси', value: 'added_date' },
            { text: 'Клиент', value: 'client_id' },
            { text: 'Ранги', value: 'color' },
            { text: 'Нархи', value: 'price' },
            { text: 'Йили', value: 'year' },
            { text: 'Пробеги', value: 'probeg' },
            { text: 'Холати', value: 'sostoyaniya' },
            { text: 'Харажати', value: 'xarajat' },
            { text: 'user_id', value: 'user_id' },
            { text: 'Статус', value: 'status' },
            { text: 'Позиция', value: 'position' },
            { text: 'Краска', value: 'kraska' },
            { text: 'Коробка', value: 'korobka' },
            { text: 'Маълумот', value: 'info' }
        ]
    },
    getters:{
        myCars(state){
            return state.cars
        },
        myCarsHeader(state){
            return state.cars_header
        }
    }
}