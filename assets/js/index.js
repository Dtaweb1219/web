$(function () {
  getUserInfo();
  var layer = layui.layer;
  $("#btnLogout").on("click", function () {
    layer.confirm(
      "确定退出登录？",
      {
        icon: 3,
        title: "提示",
      },
      function (index) {
        // 1. 清空本地 token
        localStorage.removeItem("token");
        // 2. 跳转到登录页
        location.href = "/login.html";
        // 3. 关闭确认框
        layer.close(index);
      }
    );
  });
});
function getUserInfo() {
  $.ajax({
    methid: "GET",
    url: "/my/userinfo",
    success: function (res) {
      if (res.status !== 0) {
        return layui.layer.msg("获取用户信息失败！");
      }
      renderAvatar(res.data);
    },
  });
}
function renderAvatar(user) {
  // 优先 nickname
  // 1. 获取用户名称
  var name = user.nickname || user.username;
  // 2. 设置欢迎文本
  $("#welcome").html("欢迎&nbsp;" + name);
  // 3. 按需渲染用户头像
  if (user.user_pic !== null) {
    // 3.1 渲染图片
    $(".layui-nav-img").attr("src", user.user_pic).show();
    $(".text-avatar").hide();
  } else {
    // 3.2 渲染文本
    $(".layui-nav-img").hide();
    var first = name[0].toUpperCase();
    $(".text-avatar").html(first).show();
  }
}
