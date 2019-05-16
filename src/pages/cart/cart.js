import "./cart_base.css"
import "./cart_trade.css"
import "./cart.css"

import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'
import Volecity from 'velocity-animate'

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
            this.removeData = {shop,shopIndex,good,goodIndex};
            this.removeMsg = '确定删除该商品?';
            this.removeConfirm();

        },
        removeList(){
            this.removeMsg = `确定删除${this.removeLists.length}件商品`;
            this.removeConfirm();
        },
        removeConfirm(){
            if(this.removeMsg === "确定删除该商品?"){
                MessageBox.confirm(this.removeMsg).then(action => {
                    let {shop,shopIndex,good,goodIndex} = this.removeData;
                    axios.post(url.cartRemove,{
                        id:good.id
                    }).then(res=>{
                        shop.goodsList.splice(goodIndex,1);
                        if(!shop.goodsList.length){
                            this.lists.splice(shopIndex,1);
                            this.removeShop();
                        }
                    })
                }).catch(err=>{

                });
            }else{
                MessageBox.confirm(this.removeMsg).then(action => {
                    let ids =[];
                    this.removeLists.forEach(good=>{
                        ids.push(good.id);
                    })
                    axios.post(url.cartMremove,{
                        ids:ids
                    }).then(res=>{
                        let arr = [];
                        this.editingShop.goodsList.forEach(good=>{
                            let index = this.removeLists.findIndex(item=>{
                                return item.id == good.id;
                            })
                            if(index === -1){
                                arr.push(good);
                            }
                        })
                        if(arr.length){
                            this.editingShop.goodsList = arr;
                        }else{
                            this.lists.splice(this.editingShopIndex,1);
                            this.removeShop();
                        }
                    })
                }).catch(err=>{
                    
                });
            }
        },
        start(e,good){
            good.startX = e.changedTouches[0].clientX;
        },
        end(e,shopIndex,good,goodIndex){
            let endX = e.changedTouches[0].clientX;
            let left = '0';
            if(good.startX - endX > 100){
                left = '-60px';
            }
            if(endX - good.startX > 100){
                left = '0px';
            }
            Volecity(this.$refs[`good-${shopIndex}-${goodIndex}`],{
                left
            })
        }
    }
})