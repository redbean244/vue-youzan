import "css/common.css"
import "./category.css"

import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'

import Foot from 'components/Foot.vue'

let app = new Vue({
    el: "#app",
    data:{
        topLists: null,
        topIndex: 0,
        subData: null,
        rankData: null
    },
    components:{
        Foot
    },
    methods:{
        getTopLists(){
            axios.get(url.topLists).then(res => {
                this.topLists = res.data.lists;
            })
        },
        getSubList(index,id){
            this.topIndex = index;
            if (index == 0){
                this.getRank()
            }else{
                axios.get(url.subLists,{id}).then(res => {
                    this.subData = res.data.data;
                    console.log(this.subData);
                })
            }
        },
        getRank(){
            axios.get(url.rank).then(res => {
                this.rankData = res.data.data;
            })
        },
        toSearch(list){
            location.href = `search.html?keyword=${list.name}&id=${list.id}`
        }
    },
    created(){
        this.getTopLists()
        this.getSubList(0,0)
    },
})