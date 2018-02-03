console.log('in header.js');


$('#myHeader').load('header.html', function () {
    //当页面加载进来之后 向服务器端请求isLogin.php
    $.get("../server/routes/isLogin.php")
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
        $.get("../server/routes/logout.php")
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

    $('#login').click(() => {
        console.log('登录按钮被点击了');
        $('#myContent').load('login.html', () => {
            $.getScript("js/login.js");
        })

    })
    $('#register').click(() => {
        console.log('注册按钮被点击了');
        $('#myContent').load('register.html', () => {
            $.getScript("js/register.js")
        });

    })
});

