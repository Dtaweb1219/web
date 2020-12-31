$.ajaxPrefilter(function (options) {
  // 在 AJAX 请求之前，统一拼接请求的根路径
  options.url = "http://ajax.frontend.itheima.net" + options.url;
  // 为有权限的接口设置 headers 请求头
  if (options.url.includes("/my/")) {
    options.headers = {
      Authorization: localStorage.getItem("token") || "",
    };
  }
});
