import url from './api.js'
import fetch from './fetch.js'

class Address{
    static lists(){
        return fetch(url.addressLists,'','get')
    }

    static add(data){
        return fetch(url.addressAdd,data)
    }

    static remove(id){
        return fetch(url.addressRemove,id)
    }

    static update(data){
        return fetch(url.addressUpdate,data)
    }

    static setDefault(id){
        return fetch(url.addressSetDefault,id)
    }
}

export default Address