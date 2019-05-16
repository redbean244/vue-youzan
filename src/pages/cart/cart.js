import "./cart_base.css"
import "./cart_trade.css"
import "./cart.css"

import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'

import { MessageBox } from 'mint-ui';

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
        allRemoveSelect:{
            get(){
                if(this.editingShop){
                    return this.editingShop.removeChecked;
                }
                return false;
            },
            set(newVal){
                if(this.editingShop){
                    this.editingShop.removeChecked = newVal;
                    this.editingShop.goodsList.forEach(good=>{
                        good.removeChecked = newVal;
                    })
                }
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
        },
        removeLists(){
            let arr=[];
            if(this.editingShop){
                this.editingShop.goodsList.forEach(good=>{
                    if(good.removeChecked){
                        arr.push(good)
                    }
                })
                return arr;
            }
            return [];
        }
    },
    methods:{
        getList(){
            axios.get(url.cartLists).then(res=>{
                let lists=res.data.cartList;
                lists.forEach(shop=>{
                    shop.checked = false;
                    shop.removeChecked = false;
                    shop.editing = false;
                    shop.editingMsg = '编辑';
                    shop.goodsList.forEach(good=>{
                        good.checked = false;
                        good.removeChecked = false;
                    })
                })
                this.lists = lists;
            })
        },
        selectGood(shop,good){
            let attr = this.editingShop ? 'removeChecked' : 'checked';
            good[attr] = !good[attr];
            shop[attr] = shop.goodsList.every(good => {
                return good[attr];
            })
        },
        selectShop(shop){
            let attr = this.editingShop ? 'removeChecked' : 'checked';
            shop[attr] = !shop[attr];
            shop.goodsList.forEach(good=>{
                good[attr] = shop[attr];
            })
        },
        selectAll(){
            let attr = this.editingShop ? 'allRemoveSelect' : 'allSelect';
            this[attr] = !this[attr];
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
            this.editingShop = shop.editing ? shop : null;
            this.editingShopIndex = shop.editing ? shopIndex : -1;
        },
        add(good){
            axios.post(url.cartAdd,{
                id:good.id,
                number:1
            }).then(res=>{
                good.number++;
            })
        },
        reduce(good){
            if(good.number ===1) return;
            axios.post(url.cartReduce,{
                id:good.id,
                number:1
            }).then(res=>{
                good.number--;
            })
        },
        removeShop(){
            this.editingShop = null;
            this.editingShopIndex = -1;
            this.lists.forEach((shop)=>{
                shop.editing = false;
                shop.editingMsg = '编辑'
            })
        },
        remove(shop,shopIndex,good,goodIndex){
            MessageBox.confirm('确定删除该商品?').then(action => {
                axios.post(url.cartRemove,{
                    id:good.id
                }).then(res=>{
                    shop.goodsList.splice(goodIndex,1);
                    if(!shop.goodsList.length){
                        this.lists.splice(shopIndex,1);
                        this.removeShop();
                    }
                })
            });
        }
    }
})