import Address from 'js/addressService.js'
import { MessageBox } from 'mint-ui';

export default{
    data(){
        return {
            address: "",
            cityName: "",
            cityValue: -1,
            districtValue: -1,
            districtName: "",
            id: '',
            isDefault: true,
            name: "",
            provinceValue: -1,
            provinceName: "",
            tel: '',
            type: '',
            instance: '',
            addressData: require('js/address.json'),
            cityLists: null,
            districtLists: null
        }
    },
    computed: {
        lists(){
            return this.$store.state.lists;
        }
    },
    created(){
        let query = this.$route.query;
        this.type =query.type;
        this.instance = query.instance;
        if(this.type === 'edit'){
            this.provinceValue = parseInt(this.instance.provinceValue)
            this.name = this.instance.name
            this.tel = this.instance.tel
            this.address = this.instance.address
            this.id = this.instance.id
        }
    },
    methods:{
        add(){
            //需要做非空和合法字符校验
            let {name,tel,cityValue,provinceValue,districtValue,address} = this;
            let data = {name,tel,cityValue,provinceValue,districtValue,address};
            if(this.type === "add"){
                // Address.add(data).then(res=>{
                //     this.$router.go(-1);
                // })
                this.$store.dispatch('addAction',data)
            }
            if(this.type === "edit"){
                data.id = this.id;
                // Address.update(data).then(res=>{
                //     this.$router.go(-1);
                // })
                this.$store.dispatch('updateAction',data)
            }
        },
        remove(){
            MessageBox.confirm("确定删除").then(action => {
                // Address.remove(this.id).then(res=>{
                //     this.$router.go(-1);
                // })
                this.$store.dispatch('removeAction',this.id)
            }).catch(err=>{

            });
        },
        setDefault(){
            // Address.setDefault(this.id).then(res=>{
            //     this.$router.go(-1);
            // })
            this.$store.dispatch('setDefaultAction',this.id)
        }
    },
    watch:{
        provinceValue(val){
            if (val === -1) return;
            let lists = this.addressData.list;
            let index =lists.findIndex(item=>{
                return item.value === val;
            })
            this.cityLists = lists[index].children;
            this.cityValue = -1;
            this.districtValue = -1;
            if(this.type === 'edit'){
                this.cityValue = parseInt(this.instance.cityValue)
            }
        },
        cityValue(val){
            if (val === -1) return;
            let lists = this.cityLists;
            let index =lists.findIndex(item=>{
                return item.value === val;
            })
            this.districtLists = lists[index].children;
            this.districtValue = -1;
            if(this.type === 'edit'){
                this.districtValue = parseInt(this.instance.districtValue)
            }
        },
        lists:{
            handler(){
                this.$router.go(-1);
            },
            deep:true
        }
    }
}