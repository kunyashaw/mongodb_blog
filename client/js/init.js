function showArticles() {
    console.log('in showArticles');
    $('#myContent').load('listArticles.html', function () {
        $('#add').click(() => {
            $.get("../server/routes/isLogin.php")
                .then((result) => {
                    console.log(result);
                    //如果ok是1，认为用户已登录
                    if (result.ok == 1) {
                        $('#myContent').load("addArticle.html", () => {
                            $.getScript("js/add.js")
                        });
                    }
                    else {
                        if (confirm('当前未登录，去登录？')) {
                            $('#myContent').load('login.html', () => {
                                $.getScript("js/login.js");
                            })
                        }
                    }
                })
            //location = "addArticle.html"

        })
    });
    $.get("../server/routes/listArticles.php")
        .then((result) => {
            console.log(result);
            if (result) {

                var List = $('#articleList')
                for (var i = 0; i < result.length; i++) {
                    var content = `
                    <a href="#" id="${result[i]._id.$id}" onClick="loadDetail(this.id)">
                        <h3>${result[i].title}</h3>
                     </a>
                     <p>${result[i].content}</p>
                    `
                    var item = $('<li></li>').html(content)
                    List.append(item);
                }
            }
        })

}

function loadDetail(articleId) {
    $('#myContent').load('viewArticle.html', () => {
        id = articleId;
        $.getScript('js/detail.js')
    })

}