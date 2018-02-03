$('#myAddForm').submit((e) => {
    e.preventDefault();
    var result = $('#myAddForm').serialize();
    console.log(result);
    $.get('../server/routes/addArticle.php?' + result)
        .then((result) => {
            console.log(result);
            if (result.ok == 1) {
                if (confirm('创建成功,是否返回首页？')) {
                    showArticles();
                }
            }
            else {
                alert(result.msg)
            }
        })
})