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
    computed:{
        allSelect:{
            get(){
                if(this.lists&&this.lists.length){
                    return this.lists.every(shop=>{
                        return shop.checked;
                    })
                }
                return false;
            },
            set(newVal){
                this.lists.forEach(shop=>{
                    shop.checked = newVal;
                    shop.goodsList.forEach(good=>{
                        good.checked = newVal;
                    })
                })
            }
        }
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
        selectGood(shop,good){
            good.checked = !good.checked;
            shop.checked = shop.goodsList.every(good => {
                return good.checked;
            })
        },
        selectShop(shop){
            shop.checked = !shop.checked;
            shop.goodsList.forEach(good=>{
                good.checked = shop.checked;
            })
        },
        selectAll(){
            this.allSelect = !this.allSelect;
        }
    }
})