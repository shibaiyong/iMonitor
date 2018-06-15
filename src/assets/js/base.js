exports.install = function (Vue, options) {
  Vue.prototype.getRandomColor = function () {
    var rgb = 'rgb(' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ')';
    return rgb;
  };

  Vue.prototype.rzl_handleNumber = function (num) {

    var result;
    var reg = /^[0-9]+.?[0-9]*$/;
    if (reg.test(num)) {
      result = num;

    } else {

    }
  }


  //剪切省事名字
  Vue.prototype.cutProvinceName = function (name) {
    var newName = name;
    if (name.indexOf('省') > 0) {
      newName = name.substring(0, name.indexOf('省'))
    } else if (name.indexOf('市') > 0) {
      newName = name.substring(0, name.indexOf('市'))
    }
    return newName
  },

    // Vue.prototype.baseUrl = 'http://10.50.1.196:8075';//测试环境
    // Vue.prototype.baseUrl = 'http://10.50.1.191:8076/imonitor';//测试正式环境
    Vue.prototype.baseUrl = 'http://124.207.149.160:8076/imonitor';//线上苏州台正式环境
    // Vue.prototype.baseUrl = 'http://124.207.149.160:8073/imonitor';//线上SMG正式环境


  // 对Date的扩展，将 Date 转化为指定格式的String
  // 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
  // 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
  Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
      "M+": this.getMonth() + 1, //月份
      "d+": this.getDate(), //日
      "h+": this.getHours(), //小时
      "m+": this.getMinutes(), //分
      "s+": this.getSeconds(), //秒
      "q+": Math.floor((this.getMonth() + 3) / 3), //季度
      "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
  }

};
