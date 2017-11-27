<?php
class singermanage
{
    function __construct()
    {
        $this->mysql = '';
        $obj = new db();
        $this->mysql = $obj->mysql;
    }
    function music()
    {
        $title = '歌曲分类';
        include 'APP/views/musicsort.html';
    }
    /////////歌手管理///////////
    function  finsert(){
        $data=$_POST;
        print_r($data);

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
        $sql="insert into music $str";
        var_dump($sql);
//        exit;
        echo($sql);
        $this->mysql->query($sql);
        if($this->mysql->affected_rows){
            echo 'ok';
        }else{
            echo 'error';
        }
    }
    function  fshow(){
        $sql="select * from music";
        $data=$this->mysql->query($sql)->fetch_all(MYSQL_ASSOC);

        $result=json_encode($data);
        echo $result;
    }
    function fupload(){
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
    function fdel(){
        $id=$_GET['id'];
        $sql="delete from music where id=$id";
        $this->mysql->query($sql);
        if($this->mysql->affected_rows){
            echo 'ok';
        }else{
            echo 'error';
        }
    }
    function fupdate(){
        $id=$_REQUEST['id'];
        $type=$_REQUEST['type'];
        $value=$_REQUEST['value'];
        $sql="update music set {$type}='{$value}' where id=$id";
        var_dump($sql);
        echo $sql;
        $this->mysql->query($sql);
        if ($this->mysql->affected_rows){
            echo 'ok';
        }else{
            echo 'error';
        }
    }
///////////歌手管理////////
/////////歌手管理///////////
    function index()
    {
        $title = '歌曲分类';
        include 'APP/views/singermanage.html';
    }
    function  insert(){
        $data=$_POST;
        print_r($data);

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
        $sql="insert into singer $str";
        var_dump($sql);
//        exit;
//        echo($sql);
        $this->mysql->query($sql);
        if($this->mysql->affected_rows){
            echo 'ok';
        }else{
            echo 'error';
        }
    }
    function  show(){
        $sql="select * from singer";
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


    function del(){
        $id=$_GET['id'];
        $sql="delete from singer where sid=$id";
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
        $sql="update singer set {$type}='{$value}' where sid=$id";
        var_dump($sql);
        echo $sql;
        $this->mysql->query($sql);
        if ($this->mysql->affected_rows){
            echo 'ok';
        }else{
            echo 'error';
        }
    }
///////////歌手管理////////



}