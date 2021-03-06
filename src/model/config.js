//config
import Qs from 'qs'
export default{
  // 基础url前缀
  baseURL: window.location.host,
  transformRequest: [function (data) {
  // 这里可以在发送请求之前对请求数据做处理，比如form-data格式化等，这里可以使用开头引入的Qs（这个模块在安装axios的时候就已经安装了，不需要另外安装）
}],

  transformResponse: [function (data) {
  // 这里提前处理返回的数据

  return data;
}],

  // 请求头信息
  headers: {'X-Requested-With': 'XMLHttpRequest'},

  //parameter参数
  params: {

  },

  //post参数，使用axios.post(url,{},config);如果没有额外的也必须要用一个空对象，否则会报错
  data: {

  },

  //设置超时时间
  timeout: 5000
    //返回数据类型
    // responseType: 'json', // default


}
