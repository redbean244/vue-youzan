<template>
    <div class="swiper-container">
        <div class="swiper-wrapper">
            <div class="swp-page swiper-slide" v-for="(list,index) in lists" :key = "index">
                <a class="js-no-follow" :href="list.clickUrl">
                    <img class="goods-main-photo fadeIn" :src="list.img">
                </a>
            </div>            
        </div>
        <div class="swiper-pagination"></div>
    </div>
</template>

<script>
   import Swiper from 'swiper'
   import 'swiper/dist/css/swiper.css'
   export default {
       name: 'swipe',
       props: {
           lists: {
               type: Array,
            //    required: true
           },
           name:{}
       },
       mounted() {
           new Swiper(".swiper-container",{
               loop: true,
               autoplay: true,
               pagination: {
                    el: '.swiper-pagination',
               }
           })
       },
   }
</script>
<style  scoped>
.swiper-slide img{
    height: 100%;
    width: 100% 
}
</style>