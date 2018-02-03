$('#btnRegister').click(() => {
    $('#myContent').load('register.html',()=>{
        $.getScript('js/register.js');
    });
    
})
$('#myLoginForm').submit((e) => {
    console.log('触发表单提交事件了！');
    e.preventDefault();
})
$('#btnLogin').click(() => {
    //将用户名和密码发给服务器，验证是否匹配
    var result = $('#myLoginForm').serialize();
    $.post("../server/routes/login.php", result)
        .then((data) => {
            console.log(data);
            if (data.ok == 1) {
                // 直接修改location
                $.getScript('js/header.js');
                showArticles();
            }
            else {
                alert(data.msg);
            }
        })
})