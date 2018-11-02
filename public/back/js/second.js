var currentPage = 1;
var pageSize = 5;
render();
function render() {
    $.ajax({
        type: 'get',
        url: '/category/querySecondCategoryPaging',
        data: {
            page: currentPage,
            pageSize: pageSize
        },
        dataType: 'json',
        success: function (info) {
            console.log(info);
            var htmlstr = template('secondTpl', info);
            $('tbody').html(htmlstr);
            $('#paginator').bootstrapPaginator({
                bootstrapMajorVersion: 3,
                currentPage: currentPage,
                totalPages: Math.ceil(info.total / pageSize),
                onPageClicked: function (a, b, c, page) {
                    currentPage = page;
                    render();
                }
            })
        }
    })

}

$.ajax({
    type: 'get',
    url: '/category/queryTopCategoryPaging',
    data: {
        page: 1,
        pageSize: 100
    },
    dataType: 'json',
    success: function (info) {
        console.log(info)
        var firststr = template('firstTpl', info);
        $('.firstTpl').html(firststr);
    }
})

$(function () {
    $('.addcategory').click(function () {
        $('#addModal').modal('show');
    });
    $('.firstTpl').on('click', 'a', function () {
        $('#dropdownMenu1 .title').text($(this).text());
        $('[name="categoryId"]').val($(this).data('id'));
        $('#form').data("bootstrapValidator").updateStatus("categoryId", "VALID")
    })
    $('#fileupload').fileupload({
        dataType: 'json',
        done: function (e, data) {
            console.log(data);
            $('.imgbox img').attr('src', data.result.picAddr);
            $('[name="brandLogo"]').val(data.result.picAddr);
            $('#form').data("bootstrapValidator").updateStatus("brandLogo", "VALID");
        }
    })
    $('#form').bootstrapValidator({
        excluded: [],
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            categoryId: {
                validators: {
                    notEmpty: {
                        message: '请选择一级分类'
                    }
                }
            },
            brandName: {
                validators: {
                    notEmpty: {
                        message: '请输入二级分类名称'
                    }
                }
            },
            brandLogo: {
                validators: {
                    notEmpty: {
                        message: '请上传图片'
                    }
                }
            }
        }
    })

    $("#form").on('success.form.bv', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/category/addSecondCategory',
            data: $('#form').serialize(),
            dataType: 'json',
            success: function (info) {
                $('#addModal').modal('hide');
                render();
                $('#form').data('bootstrapValidator').resetForm(true);
                $('.title').html('请选择一级分类');
                $('.imgbox img').attr('src', 'images/none.png');
            }
        })
    });
})





