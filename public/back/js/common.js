$(document).ajaxStart(function () {
  NProgress.start();
});

$(document).ajaxStop(function () {
  setTimeout(function () {
    NProgress.done();
  }, 1000);
});


// 头部公共部分-两个按钮

$('.arror_le').click(function () {
  $('.lt_aside').toggleClass('active');
  $('.lt_main').toggleClass('active');
  $('.lt_main .lt_top').toggleClass('active');
})

$('.modal #logout').click(function () {
  $.ajax({
    type: 'get',
    url: '/employee/employeeLogout',
    dataType: 'json',
    success: function (info) {
      if (info.success) {
        location.href = 'login.html';
      }
    }
  })
})

$('.category').click(function(){
  $(this).next().slideToggle();
})
