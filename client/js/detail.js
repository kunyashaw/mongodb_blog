//根据文章id获取文章详情

$.get('../server/routes/viewArticle.php?id=' + id)
    .then((data) => {
        if (data.ok == 1) {
            var result = data.result;
            $('#article').html(
                `
               <h5>${"标题：" + result.title}</h5>
               <h6>${"作者：" + result.author}</h6>
                <p>${"正文：" + result.content}</p>
           `
            )
        }
        valid(result.author);
    })

//验证当前用户是本文章作者
function valid(uname) {
    console.log("uname is " + uname);
    $.get("../server/routes/isAuthor.php?uname=" + uname)
        .then((result) => {
            console.log(result);
            if (result.ok == 0) {
                $('#edit').hide();
            }
            else {
                $('#edit').show();
            }
        })
}

$('#btnDelete').click(() => {
    if (confirm('确认删除文章吗')) {

        $.get("../server/routes/removeArticle.php?id=" + id)
            .then((result) => {
                if (result.ok == 1) {
                    if (confirm('删除成功')) {
                        showArticles();
                    };
                }
                else {
                    alert('删除失败')
                }
            })

    }
})

//编辑文章
$('#btnEdit').click(() => {
    $('#myContent').load('edit.html',()=>{
        $.getScript('js/edit.js')
    })
})