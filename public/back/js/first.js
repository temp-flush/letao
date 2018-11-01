var currentPage = 1;
var pageSize = 5;
render();
function render() {
    $.ajax({
        type: 'get',
        url: '/category/queryTopCategoryPaging',
        data: {
            page: currentPage,
            pageSize: pageSize
        },
        dataType: 'json',
        success: function (info) {
            console.log(info)
            var htmlstr = template('categoryTpl', info);
            $('tbody').html(htmlstr);
            $('#paginator').bootstrapPaginator({
                bootstrapMajorVersion: 3,
                currentPage: currentPage,
                totalPages: Math.ceil(info.total / pageSize),
                onPageClicked: function (a, b, c, page) {
                    currentPage = page,
                        render();
                }
            })
        }
    })
}

$(function () {
    $('.addcategory').click(function () {
        $('#addModal').modal('show');
    })
    $('#form').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            categoryName: {
                validators: {
                    notEmpty: {
                        message: '用户名不能为空'
                    }
                }
            }
        }
    })
    $('#form').on('success.form.bv', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/category/addTopCategory',
            data: $('#form').serialize(),
            dataType: 'json',
            success: function (info) {
                $('#addModal').modal('hide');
                currentPage = 1;
                render();
                $('#form').data('bootstrapValidator').resetForm(true);
            }
        })
    })
})
