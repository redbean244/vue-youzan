import "./cart_base.css"
import "./cart_trade.css"
import "./cart.css"

import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'


let app = new Vue({
    el: ".container",
    data:{
        lists:null,
        total:0,
        editingShop: null,
        editingShopIndex: -1
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
        },
        selectLists(){
            let arr = [];
            let total = 0;
            if(this.lists&&this.lists.length){
                this.lists.forEach(shop=>{
                    shop.goodsList.forEach(good=>{
                        if(good.checked){
                            arr.push(good);
                            total+=good.price*good.number;
                        }
                    })
                })
            }
            this.total = total;
            return arr;
        }
    },
    methods:{
        getList(){
            axios.get(url.cartLists).then(res=>{
                let lists=res.data.cartList;
                lists.forEach(shop=>{
                    shop.checked = true;
                    shop.removeChecked = false;
                    shop.editing = false;
                    shop.editingMsg = '编辑';
                    shop.goodsList.forEach(good=>{
                        good.checked = true;
                        good.removeChecked = false;
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
        },
        edit(shop,shopIndex){
            shop.editing =!shop.editing;
            shop.editingMsg = shop.editing ? '完成' : '编辑';
            this.lists.forEach((item,i)=>{
                if(shopIndex !== i){
                    item.editing = false;
                    item.editingMsg = shop.editing ? '' : '编辑'
                }
            })
            this.editingShop = shop.editing ? 'shop.editing' : null;
            this.editingShopIndex = shop.editing ? 'shopIndex' : -1;
        }
    }
})