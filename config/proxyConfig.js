module.exports = {
    proxy: {
          '/base': {    //将www.exaple.com印射为/base
              target: 'http://localhost:8083/wms',  // 接口域名
              secure: false,  // 如果是https接口，需要配置这个参数
              changeOrigin: true,  //是否跨域
              pathRewrite: {
                  '^/base': ''   //需要rewrite的。这里理解成用‘/base’代替target里面的地址，后面组件中我们掉接口时直接用base代替 比如我要调用'http://40.00.100.100:3002/user/add'，直接写‘/base/user/add’即可        
              }              
          }
    }
}