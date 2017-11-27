<?php
class song{
    function __construct()
    {
        $this->mysql = '';
        $obj = new db();
        $this->mysql = $obj->mysql;
    }
    /////////歌曲管理///////////
    function index()
    {
        $title = '歌曲管理';
        include 'APP/views/song.html';
    }
    function  insert(){
        $data=$_POST;

        $keys=array_keys($data);
        $str='(';
        for($i=0;$i<count($keys);$i++){
            $str.=$keys[$i].',';
        }
        $str=substr($str,0,-1);
        $str.=') values  (';
        foreach ($data as $v){
            $str.="'{$v}',";
        }
        $str=substr($str,0,-1);
        $str.=')';

        $sql="insert into song $str";
        echo $sql;
        exit();
        $this->mysql->query($sql);
        if($this->mysql->affected_rows){
            echo 'ok';
        }else{
            echo 'error';
        }
    }
    function  show(){
        $sql="select * from song";
        $data=$this->mysql->query($sql)->fetch_all(MYSQL_ASSOC);
        $result=json_encode($data);
        echo $result;
    }
    function upload(){
//          var_dump($_FILES['file'])
        if(is_uploaded_file($_FILES['file']['tmp_name'])){
            if(!file_exists('public/upload')) {
                mkdir('public/upload');
            }
            $data=date('y-m-d');
            if(!file_exists('public/upload/'.$data)){
                mkdir('public/upload/'.$data);
            }
            $path='public/upload/'.$data.'/'.$_FILES['file']['name'];
            if(move_uploaded_file($_FILES['file']['tmp_name'],$path)){
                echo '/ktv/'.$path;
            }
        }
    }

    function uploadmusic(){
        /*if(is_uploaded_file($_FILES['file']['tmp_name'])){
            if(!file_exists('public/upload')) {
                mkdir('public/upload');
            }
            $data=date('y-m-d');
            if(!file_exists('public/upload/'.$data)){
               mkdir('public/upload/'.$data);}

                $type=explode('/',$_FILES['file']['type'])[1];
            $path='public/upload/'.$data.'/'.$_FILES['file'].'/'.time().rand(1,100).".".$type;
            if(move_uploaded_file($_FILES['file']['tmp_name'],$path)){
                echo '/ktv/'.$path;
            }
        }*/
        if(is_uploaded_file($_FILES['file']['tmp_name'])){
            $type = explode('/',$_FILES['file']['type'])[1];
            if(!file_exists('Public/music')){
                mkdir('Public/music');
            }
            $data = date('y-m-d');
            if(!file_exists('Public/music/'.$data)){
                mkdir('Public/music/'.$data);
            }
            /*$type = substr($_FILES['file']['name'],-1,3);*/
            $path = 'Public/music/'.$data.'/'.time().rand(1,100).".".$type;
            if(move_uploaded_file($_FILES['file']['tmp_name'],$path)){
                echo '/ktv/'.$path;
            }
        }
    }

    function del(){
        $id=$_GET['id'];
        $sql="delete from song where id=$id";
        var_dump($sql);
        $this->mysql->query($sql);
        if($this->mysql->affected_rows){
            echo 'ok';
        }else{
            echo 'error';
        }
    }
    function update(){
        $id=$_REQUEST['id'];
        $type=$_REQUEST['type'];
        $value=$_REQUEST['value'];
        $sql="update song set {$type}='{$value}' where id=$id";
        var_dump($sql);
        $this->mysql->query($sql);
        if ($this->mysql->affected_rows){
            echo 'ok1';
        }else{
            echo 'error';
        }
    }
///////////歌手管理////////
}