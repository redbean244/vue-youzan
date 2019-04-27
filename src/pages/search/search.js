import "css/common.css"
import "./search.css"

import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'
import qs from 'qs'
import Velocity from 'velocity-animate'
import { InfiniteScroll } from 'mint-ui'
Vue.use(InfiniteScroll);

let {keyword,id} = qs.parse(location.href.substr(1))

new Vue({
    el: '.container',
    data:{
        searchList: null,
        isShow: false,
        pageNum: 1,
        pageSize: 6,
        loading: false,
        allLoaded: false
    },
    created(){
        this.getSearchList();
    },
    methods:{
        getSearchList(){
            if (this.allLoaded) return;
            this.loading = true;
            axios.get(url.searchList,{
                keyword: keyword,
                id: id,
                pageNum: this.pageNum,
                pageSize: this.pageSize
            }).then(res=>{
                let curLists = res.data.lists;
                //判断所有数据是否加载完毕
                if(curLists.length<this.pageSize){
                    this.allLoaded = true;
                }
                if(this.searchList){
                    this.searchList = this.searchList.concat(curLists)
                }else{
                    this.searchList = curLists
                }
                this.pageNum++;               
            })
            this.loading = false;
        },
        move(){
            if (document.documentElement.scrollTop > 100){
                this.isShow = true
            }else{
                this.isShow = false
            }
        },
        toTop(){
            Velocity(document.body,'scroll',{
                duration:1000
            })
            this.isShow = false
        }
    }
})