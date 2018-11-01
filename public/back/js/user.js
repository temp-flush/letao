var currentPage = 1;
var pageSize = 5;
// 获取数据，动态渲染
render();
function render() {
    $.ajax({
        type: 'get',
        url: '/user/queryUser',
        dataType: 'json',
        data: {
            page: currentPage,
            pageSize: pageSize
        },
        success: function (info) {
            var htmlstr = template('tmp', info);
            $('tbody').html(htmlstr);
            // 分页插件
            console.log(info.total)
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

$('tbody').on('click', '.btn', function () {
    $('#updateTpl').modal('show');
    var id = $(this).parent().data('id');
    var isDelete= $(this).hasClass('btn-danger')? 0:1;
    $('#confirm').click(function () {
        console.log(id);
        console.log(isDelete);
        $.ajax({
            type: 'post',
            url: '/user/updateUser',
            data: {
                id:id,
                isDelete:isDelete
            },
            dataType:'json',
            success:function(info){
                $('#updateTpl').modal('hide');
                render();
            }
        })
    })

})


