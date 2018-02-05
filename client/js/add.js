// $('#myAddForm').submit((e) => {
//     e.preventDefault();
//     var result = $('#myAddForm').serialize();
//     console.log(result);
//     $.get('../server/routes/addArticle.php?' + result)
//         .then((result) => {
//             console.log(result);
//             if (result.ok == 1) {
//                 if (confirm('创建成功,是否返回首页？')) {
//                     showArticles();
//                 }
//             }
//             else {
//                 alert(result.msg)
//             }
//         })
// })

/**
 * Created by web-01 on 2018/2/4.
 */

console.log('处理和添加相关的业务逻辑');
var isFirstClick  = true;
var id = '';
$('#btnAddArticle').click(()=>{
    //获取标题和正文
    if(isFirstClick){
        add();
        isFirstClick = false;
    }
    else{
        console.log("add article id is "+id);
        if(id.length > 0){
            edit(id);
        }
        
    }
})

function add(){
    var title = document.getElementById('title').value
    var content = document.getElementById('content').value;
    var args = "title="+title+"&content="+content;
    console.log(args);
    //发给服务器 addArticle.php title content
    $.post('../server/routes/addArticle.php?'+args)
        .then((result)=>{
            if(result.ok == 1){
                //提交成功？？？
                if(confirm('是否继续修改')){
                    //edit(result.id);
                        id = result.id;
                }
                else
                {
                    $.getScript("js/init.js");
                }
            }
            else{
                alert(result.msg);
            }
        })
}


function edit(id){
     //获取文章标题和正文
     var title = document.getElementById('title').value
     var content = document.getElementById('content').value;
     var args = "title="+title+"&content="+content;
     args += "&id="+id;
     //发给服务器
     $.post('../server/routes/editArticle.php?'+args)
         .then((result)=>{
         if(result.ok == 1){
             if(!confirm('修改成功，继续修改？')){
                showArticles();
             }
         }
    })
}