<template>
  <div class="container " style="min-height: 597px;">
    <div class="block-list address-list section section-first js-no-webview-block" v-if = "lists&&lists.length">
      <a class="block-item js-address-item address-item "
         v-for = "list in lists"
         :key = list.id
         :class= "{'address-item-default':list.isDefault}"
         @click=toEdit(list)>
        <div class="address-title">{{list.name}} {{list.tel}}</div>
        <p>{{list.provinceName}}{{list.cityName}}{{list.districtName}}{{list.address}}</p>
        <p class= "address-edit">修改</p>
      </a>
    </div>
    <div v-if = "lists&& !lists.length">
        没有地址请添加
    </div>
    <div class="block stick-bottom-row center">
        <router-link class="btn btn-blue js-no-webview-block js-add-address-btn" :to="{name:'form',query:{type:'add'}}">
            新增地址
        </router-link>
    </div>
  </div>
</template>

<script>
    import Address from 'js/addressService.js'
    import url from 'js/api.js'
    import axios from 'axios'
    export default {
       name: '',
       data(){
           return {
               lists: null
           }
       },
       created(){
           Address.lists().then(res=>{
               this.lists = res.data.lists;
           })
       },
       methods:{
           toEdit(list){
               this.$router.push({name:'form',query:{
                   type: 'edit',
                   instance :list
               }})
           }
       }
    }
</script>
<style  scoped>

    @import './address_base.css';
    @import './address.css';
</style>