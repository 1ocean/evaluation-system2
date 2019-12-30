import axios from 'axios';
import router from '../router'
const baseUrl = 'http://114.55.94.73:8888';
// const baseUrl = 'http://10.0.0.80:8077';
// const baseUrl = 'http://localhost:8080';
const request = axios.create( {
    baseURL: baseUrl, // api的base_url
    // headers:{
    //   Cookie:"token=76cd7b7b-e0fc-4a36-89bb-2b517aca5182;"
    // },
    timeout: 5000000, // 请求超时时间
    withCredentials: true
} );
request.interceptors.request.use( config => {
    if ( config.method === 'post' ) {
        // config.data = Qs.stringify(config.data)
    }
    return config
}, error => {
    Promise.reject( error )
} );
request.interceptors.response.use(
    response => {  //成功请求到数据
        //这里根据后端提供的数据进行对应的处理
        if ( response.data.code == '1101' ) {
            console.log(response.data.message);
            router.push( '/' );
            return
        }
        if(response.data.code == '1103' ){
            console.log(response.data.message)
        }
        return Promise.resolve( response )
    },
    error => {  //响应错误处理

        return Promise.reject( error )
    }
);
export default { request, baseUrl };
