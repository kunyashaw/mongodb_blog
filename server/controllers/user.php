<?php
    require_once('../init.php');
    //注册
    function register(){
         global $db;
        //获取用户所输入的用户名和密码
        @$uname = $_REQUEST['uname'];
        @$upwd = $_REQUEST['upwd'];
        if($uname && $upwd){
            $db->users->insert(["uname"=>$uname,"upwd"=>$upwd]);
            echo json_encode(["ok"=>1,"msg"=>"注册成功！"]);
        }
        else{
            echo json_encode(["ok"=>0,"msg"=>"注册失败！"]);
        }
    }

    //验证在注册的时候用户名，是否被占用
    function validName(){
        global $db;
        @$uname = $_REQUEST['uname'];
        if($uname){
           //从集合users中查询所有文档的用户名是否包含$uname
            $user = $db->users->findOne(["uname"=>$uname]);
            if($user){
                echo json_encode(["ok"=>0,
                "msg"=>"用户名已被占用"]);
            }
            else{
                echo json_encode(["ok"=>1]);
            }
        }
        else{
            echo json_encode(["ok"=>0]);
        }
    }

    //退出登录
    function logout(){
        session_start();
        session_unset();
        session_destroy();
        echo json_encode(["ok"=>1]);
    }

    //判断当前是否处于登录状态
    function isLogin(){
        global $db;
        session_start();
        //通过session判断用户是否登录
        @$uid = $_SESSION['uid'];
        if($uid){
            //说明用户处于登录状态
            $user = $db->users->findOne(["_id"=>$uid]);
            echo json_encode(["ok"=>1,"uname"=>$user['uname']]);
        }
        else{
            echo json_encode(["ok"=>0]);
        }
    }

    //登录
    function login(){
        global $db;
        //获取用户所输入的用户名和密码
        @$uname = $_REQUEST['uname'];
        @$upwd = $_REQUEST['upwd'];

        if($uname && $upwd){
            //查询用户名和密码是否有效
            //db.users.findOne({name:"zhangsan",pwd:'123'})
            $user =
            $db->users->findOne(["uname"=>$uname,"upwd"=>$upwd]);
            if($user){
                session_start();
                $_SESSION['uid'] = $user["_id"];
                $_SESSION['uname'] = $user["uname"];
                echo json_encode(["ok"=>1]);
            }
            else{
                echo json_encode(["ok"=>0,"msg"=>"用户名或者密码错误"]);
            }
        }
        else{
            echo json_encode(["ok"=>0]);
        }
    }

?>