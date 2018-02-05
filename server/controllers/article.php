<?php

    require_once('../init.php');
    //创建一篇新的博客
    function addArticle(){
        global $db;
        session_start();
        @$title = $_REQUEST['title'];
        @$content = $_REQUEST['content'];

         if($title && $content){
            @$uid = $_SESSION['uid'];
            $user = $db->users->findOne(["_id"=>$uid]);
            //向集合中插入文档
            $db->articles->insert([
                "title"=>$title,
                "content"=>$content,
                "date"=>time()*1000,
                "author"=>$user["uname"]
            ]);
            $result = $db->articles->find()->sort(["date"=>-1]);
            $article = $result->getNext();
            $id = $article['_id']->{'$id'};
            echo json_encode(["ok"=>1,"id"=>$id]);
         }
         else{
            echo json_encode(["ok"=>0,"msg"=>"请同时指定标题和正文"]);
         }

    }
     //获取博客文章的列表
     function listArticles(){
        global $db;
        $cursor = $db->articles->find();
        $output = [];
        while($cursor->hasNext()){
            //取值
            $output[] = $cursor->getNext();
        }
        echo json_encode($output);
     }

    //查看某篇文章，需要有一个参数id
     function viewArticle(){
        global $db;
        @$id = $_REQUEST['id'];
        if($id){
            // 根据id创建ObjectId类型的变量
            // new MongoId($id)
            //查找
            $article = $db->articles->findOne(["_id"=>new MongoId($id)]);
            if($article){
                echo json_encode(["ok"=>1,"result"=>$article]);
            }
            else
            {
                echo json_encode(["ok"=>0,"msg"=>"文章id有误"]);
            }

        }else{
            echo json_encode(["ok"=>0,"msg"=>"缺少参数"]);
        }
     }

    //删除一篇文章 根据id
     function removeArticle(){
            global $db;
            @$id = $_REQUEST['id'];
            if($id){
                $db->articles->remove(["_id"=>new MongoId($id)]);
                echo json_encode(["ok"=>1]);
            }
            else{
                echo json_encode(["ok"=>0]);
            }

     }

     //验证是否是作者
     function isAuthor(){
        global $db;
        session_start();
        @$uname = $_REQUEST['uname'];
        if($uname){
                if(!empty($_SESSION)){
                    if($_SESSION['uname'] == $uname)
                    {
                        echo json_encode(["ok"=>1]);
                     }
                     else{
                        echo json_encode(["ok"=>0,'msg'=>"非作者"]);
                     }
                }
                else{
                    echo json_encode(["ok"=>0,"msg"=>"用户未登录"]);
                }
        }else{
         echo json_encode(["ok"=>0,"msg"=>"没有传递参数"]);
        }

     }

     //编辑文章 参数title和content id
     function editArticle(){
        global $db;
        @$id = $_REQUEST['id'];
        @$title = $_REQUEST['title'];
        @$content = $_REQUEST['content'];
        //如果没有传文章的编号，结束
        if(!$id){
            echo json_encode(["ok"=>0]);
            return;
        }

        if($title && $content){
            //update
            $article =
            $db->articles->findOne(["_id"=>new MongoId($id)]);
            $article["title"]=$title;
            $article["content"]=$content;
            $db->articles->save($article);
            echo json_encode(["ok"=>1,'msg'=>"修改成功"]);
        }
        else{
            echo json_encode(
            ["ok"=>0,'msg'=>"请传递修改后的文章标题和正文"]);
        }
     }


?>