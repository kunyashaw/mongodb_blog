console.log('in base.js');
$('#myHeader').load('header.html', function () {
    //当页面加载进来之后 向服务器端请求isLogin.php
    $.get("http://localhost/mongoProject/server/routes/isLogin.php")
        .then((result) => {
            console.log(result);
            //如果ok是1，认为用户已登录
            if (result.ok == 1) {
                $('#p_login').hide();
                $('#uname').text(result.uname);
            }
            else {
                $('#p_welcome').hide();
            }
        })


    $('#logout').click(() => {
        //请求退出
        $.get("http://localhost/mongoProject/server/routes/logout.php")
            .then((result) => {
                if (result.ok == 1) {
                    $('#p_login').show();
                    $('#p_welcome').hide();
                }
            })
    })
    $('#showIndex').click(() => {
        console.log('返回首页的超链接被点击了');
        showArticles();
    })
});
function showArticles() {
    console.log('in showArticles');
    $('#section').load('listArticles.html', function () {
        $('#add').click(() => {
            //location = "addArticle.html"
            $('#section').load("addArticle.html");
        })
    });
    $.get("http://localhost/mongoProject/server/routes/listArticles.php")
        .then((result) => {
            console.log(result);
            if (result) {

                var List = $('#articleList')
                for (var i = 0; i < result.length; i++) {
                    var content = `
                    <a href=${"viewArticle.html?id=" + result[i]._id.$id}>
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
