import url from './api.js'
import fetch from './fetch.js'

class  Cart{
    static add(good){
        return fetch(url.cartAdd,{
            id:good.id,
            number:1
        })
    }

    static reduce(good){
        return fetch(url.cartReduce,{
            id:good.id,
            number:1
        })
    }

    static cartRemove(good){
        return fetch(url.cartRemove,{
            id:good.id
        })
    }

    static cartMremove(ids){
        return fetch(url.cartMremove,{
            ids:ids
        })
    }
}

export default Cart