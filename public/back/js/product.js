$(function () {
    var currentPage = 1;
    var pageSize = 2;
    var picbox = [];
    render();
    function render() {
        $.ajax({
            type: 'get',
            url: '/product/queryProductDetailList',
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            dataType: 'json',
            success: function (info) {
                console.log(info);
                var htmlstr = template('proTpl', info);
                $('tbody').html(htmlstr);
                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    currentPage: currentPage,
                    totalPages: Math.ceil(info.total / info.size),
                    onPageClicked: function (a, b, c, page) {
                        currentPage = page,
                            render();
                    }
                })
            }
        })
    }
    $('.branchTpl').on('click', 'a', function () {
        $('.title').text($(this).text());
        $('[name="brandId"]').val($(this).data('id'))
        $("#form").data('bootstrapValidator').updateStatus('brandId', 'valid');
    })
    $('.addshop').click(function () {
        $('#addModal').modal('show');
    })
    $.ajax({
        type: 'get',
        url: '/category/querySecondCategoryPaging',
        data: {
            page: 1,
            pageSize: 100
        },
        dataType: 'json',
        success: function (info) {
            console.log(info)
            var branchstr = template('branchTpl', info);
            $('.branchTpl').html(branchstr)
        }
    });
    $("#fileupload").fileupload({
        dataType: "json",
        //e：事件对象
        //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
        done: function (e, data) {
            var picObj=data.result;
            var picAddr=picObj.picAddr;
            if (picbox.length > 2) {
                $('.imgbox img:last-of-type').remove();
                picbox.pop();
            }
            picbox.unshift(data.result);
            $('.imgbox').prepend("<img src=" + data.result.picAddr + ">");
            console.log(picbox.length)
            if (picbox.length == 3) {
                $("#form").data('bootstrapValidator').updateStatus('picstatus', 'VALID');
            }
        }
    });



    $('#form').bootstrapValidator({
        excluded: [],
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            brandId: {
                validators: {
                    notEmpty: {
                        message: '请选择二级分类'
                    }
                }
            },
            proName: {
                validators: {
                    notEmpty: {
                        message: '请输入商品名称'
                    }
                }
            },
            proDesc: {
                validators: {
                    notEmpty: {
                        message: '请输入商品描述'
                    }
                }
            },
            num: {
                validators: {
                    notEmpty: {
                        message: '请输入商品库存'
                    },
                    regexp: {
                        regexp: /^[1-9]\d*$/,
                        message: '商品库存格式, 必须是非零开头的数字'
                    }
                }
            },
            size: {
                validators: {
                    notEmpty: {
                        message: '请输入商品尺码'
                    },
                    regexp: {
                        regexp: /\d{2}-\d{2}/,
                        message: '尺码格式, 必须是 32-40'
                    }
                }
            },

            oldPrice: {
                validators: {
                    notEmpty: {
                        message: '请输入商品原价'
                    }
                }
            },

            price: {
                validators: {
                    notEmpty: {
                        message: '请输入商品价格'
                    }
                }
            },



            picstatus: {
                validators: {
                    notEmpty: {
                        message: '请上传三张图片'
                    }
                }
            }



        }

    })

    $('#form').on('success.form.bv', function (e) {
        e.preventDefault();
        var params = $('#form').serialize();
        params += "&picName1=" + picbox[0].picName + "&picName1=" + picbox[0].picAddr;
        params += "&picName2=" + picbox[1].picName + "&picName2=" + picbox[1].picAddr;
        params += "&picName3=" + picbox[2].picName + "&picName3=" + picbox[2].picAddr;
        $.ajax({
            type: 'post',
            url: '/product/addProduct',
            data: params,
            dataType: 'json',
            success: function (info) {
                console.log(info);
                currentPage=1;
                render();
                $("#form").data('bootstrapValidator').resetForm(true);
                $('.title').text('请选择二级分类');
                picbox=[];
                $('.imgbox img').remove();
                $('#addModal').modal('hide');
            }
        })
    })

})