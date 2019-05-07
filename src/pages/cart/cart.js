import "./cart_base.css"
import "./cart_trade.css"
import "./cart.css"

import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'


import Foot from 'components/Foot.vue'
import Swipe from 'components/Swipe.vue'

let app = new Vue({
    el: ".container",
    data:{
        lists:null
    },
    created(){
        this.getList();
    },
    methods:{
        getList(){
            axios.get(url.cartLists).then(res=>{
                let lists=res.data.cartList;
                lists.forEach(shop=>{
                    shop.checked = true;
                    shop.goodsList.forEach(good=>{
                        good.checked = true;
                    })
                })
                this.lists = lists;
            })
        },
        selectGood(good){
            good.checked = !good.checked;
        }
    }
})