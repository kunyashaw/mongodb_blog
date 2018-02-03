
$.get('../server/routes/viewArticle.php?id=' + id)
    .then((data) => {
        if (data.ok == 1) {
            var result = data.result;
            $('#myTitle')[0].value = result.title;
            $('#content').text(result.content);
        }
    })

$('#myEdit').submit((event) => {
    event.preventDefault();
    var result = $('#myEdit').serialize();
    result = result + '&id=' + id;
    $.get('../server/routes/editArticle.php?' + result)
        .then((result) => {
            console.log(result);
            if (result.ok == 1) {
                if(!confirm('修改成功,继续修改?')){
                    $('#myContent').load('viewArticle.html',()=>{
                        $.getScript('js/detail.js')
                    })
                }
            }
            else {
                alert('修改失败:' + result.msg);
            }
        })
})