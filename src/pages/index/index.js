import "css/common.css"
import "./index.css"

import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'

import { InfiniteScroll } from 'mint-ui'
Vue.use(InfiniteScroll);

let app = new Vue({
    el: "#app",
    data:{
        lists: null,
        pageNum: 1,
        pageSize: 6,
        loading: false,
        allLoaded: false

    },
    created() {
        this.getLists()
    },
    methods:{
        getLists(){ 
            if (this.allLoaded) return;
            this.loading = true;
            axios.get(url.hotLists,{
                pageNum: this.pageNum,
                pageSize: 6
            }).then(res =>{
                let curLists = res.data.lists;
                //判断所有数据是否加载完毕
                if(curLists.length<this.pageSize){
                    this.allLoaded = true;
                }
                if(this.lists){
                    this.lists = this.lists.concat(curLists)
                }else{
                    this.lists = curLists
                }
                this.loading = false;
                this.pageNum++;
            })
        }
    }
})