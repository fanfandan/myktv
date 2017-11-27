<?php
class game{
    function index(){
        $title='游戏管理';
        include 'views/game.html';
    }
    function show(){
        header('Content-type:text/html;charset=utf8');
        $this->mysql=new mysqli("sqld.duapp.com",'237d7b1cbbf94315ba84ac907ae09bf8','3096aec557e94f7dafcdfb353d9d1d22','ZEYevbOEtcsalZinBjRj',4050);
        $mysql->query('set names utf8');
        $sql="select * from game";
        $result=$mysql->query($sql)->fetch_all(1);
        $data=json_encode($result);
        echo $data ;
    }
    function insert(){
        $game=$_REQUEST['game'];
        $type=$_REQUEST['ids'];
        header('Content-type:text/html;charset=utf8');
         $this->mysql=new mysqli("sqld.duapp.com",'237d7b1cbbf94315ba84ac907ae09bf8','3096aec557e94f7dafcdfb353d9d1d22','ZEYevbOEtcsalZinBjRj',4050);
        $mysql->query('set names utf8');
        $sql="insert into game (game,type) VALUES ('{$game}',{$type})";
        $mysql->query($sql);
        if($mysql->affected_rows){
            echo 'ok';
        }else{
            echo 'error';
        }
    }
    function delete(){
        $gid=$_REQUEST['id'];
        header('Content-type:text/html;charset=utf8');
        $this->mysql=new mysqli("sqld.duapp.com",'237d7b1cbbf94315ba84ac907ae09bf8','3096aec557e94f7dafcdfb353d9d1d22','ZEYevbOEtcsalZinBjRj',4050);
        $mysql->query('set names utf8');
        $sql="delete from game where gid=$gid";
        $mysql->query($sql);
        if($mysql->affected_rows){
            echo 'ok';
        }else{
            echo 'error';
        }
    }
    function update(){
        $gid=$_REQUEST['id'];
        $type=$_REQUEST['type'];
        $game=$_REQUEST['value'];
        header('Content-type:text/html;charset=utf8');
        $this->mysql=new mysqli("sqld.duapp.com",'237d7b1cbbf94315ba84ac907ae09bf8','3096aec557e94f7dafcdfb353d9d1d22','ZEYevbOEtcsalZinBjRj',4050);
        $sql="update game set {$type} = '{$game}' where gid=$gid";
        $mysql->query($sql);
        if ($mysql->affected_rows){
            echo 'ok';
        }else{
            echo 'error';
        }
    }
    function typeCate(){
        header('Content-type:text/html;charset=utf8');
         $this->mysql=new mysqli("sqld.duapp.com",'237d7b1cbbf94315ba84ac907ae09bf8','3096aec557e94f7dafcdfb353d9d1d22','ZEYevbOEtcsalZinBjRj',4050);
        $mysql->query('set names utf8');
        $sql="select * from gametype";
        $result=$mysql->query($sql)->fetch_all(1);
        $data=json_encode($result);
        echo $data;
    }
}