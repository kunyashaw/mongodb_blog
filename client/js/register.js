$('#btnLogin').hide();
$('#btnLogin').click(() => {
    location = "login.html"
})
$('#myRegister').submit((e) => {
    e.preventDefault();

    var name = document.getElementsByName('uname')[0].value;

    //将用户名和密码发给服务器，验证用户名是否被占用
    $.get('../server/routes/validName.php?uname=' + name)
        .then((result) => {
            console.log(result);
            if (result.ok == 0) {
                alert(result.msg)
            }
            else {
                register();
            }
        })
})

function register() {
    var result = $('#myRegister').serialize();
    $.get("../server/routes/register.php?" + result)
        .then((data) => {
            console.log(data);
            if (data.ok == 1) {
                $('#btnRegister').hide();

                count = 5;
                $('#btnLogin').text(count + 's自动跳转到登录页');
                $('#btnLogin').show();
                myInterval = setInterval(() => {
                    $('#btnLogin').text(count + 's自动跳转到登录页');
                    count--;
                    if (count < 0) {
                        clearInterval(myInterval);
                        //加载登录页面
                        $('#myContent').load('login.html',()=>{
                            $.getScript("js/login.js");
                        })
                    }

                }, 1000)
            }
            else {
                alert(data.msg);
            }
        })
}