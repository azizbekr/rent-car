export default {
    actions:{
        async getUserClients(ctx, id){
            const res = await fetch(`http://192.168.2.99:80/api/clients/${id}`)
            const clients = await res.json()
            ctx.commit('updateClients', clients)
        }
    },
    mutations:{
        updateClients(state, clients){
            state.clients = clients
        }
    },
    state:{
        clients:[],
        clients_header:[
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
        myClients(state){
            return state.clients
        },
        // myCarsHeader(state){
        //     return state.cars_header
        // }
    }
}