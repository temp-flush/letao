$(function () {
    $('form').bootstrapValidator({
        fields: {
            username: {
                validators: {
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                    stringLength: {
                        min: 2,
                        max: 6,
                        message: '用户名必须为2-6位'
                    },
                    callback:{
                        message: '用户名不存在'
                    }
                }
            },
            password: {
                validators: {
                    notEmpty: {
                        message: '密码不能为空'
                    },
                    stringLength: {
                        min: 6,
                        max: 12,
                        message: '密码必须为6-12位'
                    },
                    callback:{
                        message: '密码错误'
                    }
                }
            }
        },
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        }
    });

    $("#form").on('success.form.bv', function (e) {
        e.preventDefault();
        var validator = $("#form").data('bootstrapValidator');
        $.ajax({
            url:'/employee/employeeLogin',
            data:$('#form').serialize(),
            dataType:'json',
            type:'post',
            success:function(info){
                console.log(info);
                if(info.success){
                    location.href='index.html'
                }
                if(info.error==1000) {
                    validator.updateStatus('username','INVALID', 'callback')
                }
                if(info.error==1001) {
                    validator.updateStatus('password','INVALID', 'callback')
                }
            }
        })
    });
    $('[type="reset"]').click(function(){
        var validator = $("#form").data('bootstrapValidator');
        validator.resetForm();
    })
})
