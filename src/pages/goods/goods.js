import "./goods_common.css"
import "./goods_custom.css"
import "./goods.css"
import "./goods_theme.css"
import "./goods_mars.css"
import "./goods_sku.css"

import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'
import qs from 'qs'

let {id} = qs.parse(location.search.substr(1))

let detailTab = ['商品详情','本店成交']

new Vue({
    el: '#app',
    data(){
        return{
            details: null,
            dealList: null,
            detailTab,
            tabIndex: 0
        }
    },
    created(){
        this.getDeatials()
    },
    methods:{
        getDeatials(){
            axios.get(url.details,{id}).then(res=> {
                this.details = res.data.data;
            })
        },
        changeTab(index){
            this.tabIndex = index;
            if(index){
                this.getDeal();
            }
        },
        getDeal(){
            axios.get(url.deal,{id}).then(res=> {
                this.dealList = res.data.data.lists;
            })
        },
    }
})