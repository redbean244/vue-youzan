import "./goods_common.css"
import "./goods_custom.css"
import "./goods.css"
import "./goods_theme.css"
import "./goods_mars.css"
import "./goods_sku.css"
import "./goods_transition.css"

import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'
import qs from 'qs'
import swipe from 'components/Swipe'

let {id} = qs.parse(location.search.substr(1))

let detailTab = ['商品详情','本店成交']

new Vue({
    el: '#app',
    data(){
        return{
            details: null,
            dealList: null,
            detailTab,
            tabIndex: 0,
            bannerLists: null,
            skuType: 1,
            showSku: false,
            skuNum: 1
        }
    },
    created(){
        this.getDeatials()
    },
    components:{
        swipe
    },
    methods:{
        getDeatials(){
            axios.get(url.details,{id}).then(res=> {
                this.details = res.data.data;
                this.bannerLists = [];
                this.details.imgs.forEach(item=>{
                    this.bannerLists.push({
                        clickUrl: '',
                        img: item
                    })
                })
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
        chooseSku(type){
            this.skuType = type;
            this.showSku = true
        },
        changeSkuNum(num){
            if(num<0 && this.skuNum===1){
                return
            }
            this.skuNum += num;
        }
    },
    watch:{
        showSku(val,oldVal){
            document.body.style.overflow = val? 'hidden': 'auto'
            document.querySelector('html').style.overflow = val? 'hidden': 'auto'
            document.body.style.height = val? '100%': 'auto'
            document.querySelector('html').style.height = val? '100%': 'auto'
        }
    }
})