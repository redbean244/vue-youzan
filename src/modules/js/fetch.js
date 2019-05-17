import axios from 'axios'

function fetch(url,data){
    return new Promise((resolve,reject) =>{
        axios.post(url,data).then(res=>{
            if (res.data.status === 200  || res.status === 200){
                resolve(res);
            }else if(res.data.status === 300){
                href.location = "index.html";
                resolve(res);
            }
            reject(res)
        }).catch(error=>{
            reject(error)
        })
    })
} 

export default fetch