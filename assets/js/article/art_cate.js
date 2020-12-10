$(function() {
    var layer = layui.layer
    var form = layui.form
    initArtCateList()

    // 获取文章分类的列表
    function initArtCateList() {
        // $.ajax({
        //   method: 'GET',
        //   url: '/my/article/cates',
        //   success: function(res) {
        //     var htmlStr = template('tpl-table', res)
        //     $('tbody').html(htmlStr)
        //   }
        // })
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                var htmlstr = template('tpl-table', res)
                $('tbody').html(htmlstr)
            }
        })
    }

    // 为添加类别按钮绑定点击事件

    $('#btnAddCate').on('click', function() {
        layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#dialog-add').html()
        })
    })

    // 通过代理的形式，为 form-add 表单绑定 submit 事件
    // $('body').on('submit', '#form-add', function(e) {
    //     e.preventDefault()
    //     $.ajax({
    //         method: 'POST',
    //         url: '/my/article/addcates',
    //         data: $(this).serialize(),
    //         success: function(res) {
    //             if (res.status !== 0) {
    //                 return layer.msg('新增分类失败！')
    //             }
    //             initArtCateList()
    //             layer.msg('新增分类成功！')
    //                 // 根据索引，关闭对应的弹出层
    //             layer.close(indexAdd)
    //         }
    //     })
    // })
    $('body').on('submit', '#form-add', function(e) {
            e.preventDefault()
            $.ajax({
                method: 'POST',
                url: '/my/article/addcates',
                data: $(this).serialize(),
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg('新增分类失败')
                    }
                    initArtCateList()
                    layer.msg('新增分类成功')
                    layer.closeAll();
                }
            })
        })
        // 事件代理编辑按钮
    $('tbody').on('click', '.btn-edit', function(e) {
            e.preventDefault()
            layer.open({
                    type: 1,
                    area: ['500px', '250px'],
                    title: '修改文章',
                    content: $('#dialog-edit').html()
                })
                // 通过代理的形式为修改按钮添加submit提交事件
            var id = $(this).attr('data-id')
            $.ajax({
                method: 'GET',
                url: '/my/article/cates/' + id,
                success: function(res) {
                    form.val('form-edit', res.data)
                }
            })

        })
        //进行事件委托 对文本内容进行修改
    $('body').on('submit', '#form-edit', function(e) {
            e.preventDefault()
            $.ajax({
                method: 'POST',
                url: '/my/article/updatecate',
                data: $(this).serialize(),
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg('修改失败')
                    }
                    layer.msg('修改成功')
                    layer.closeAll()
                    initArtCateList()
                }
            })
        })
        //进行事件委托  给删除按钮添加事件 删除文本
    $('tbody').on('click', '#remove', function() {
        var id = $(this).attr('data-id')
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function() {
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + id,
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg('删除失败')
                    }
                    layer.msg('删除成功')
                    layer.closeAll()
                    initArtCateList()

                }
            })


        });
    })


})