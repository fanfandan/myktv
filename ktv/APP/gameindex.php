<?php
class gameindex{
    function __construct()
    {
        $this->mysql='';
         $obj=new db();
         $this->mysql=$obj->mysql;
    }

    function index(){
        include 'APP/views/gameindex.html';
    }
    function select(){
        $type=$_GET['type'];
        $data1=$this->mysql->query("select * from game where type=$type limit 0,4 ")->fetch_all(MYSQL_ASSOC);
        include 'APP/views/gamelist.html';
    }
    function page(){
        $type=$_GET['type'];
        $page=$_GET['page'];
        $offset=($page-1)*4;
        $sql="select * from game where type=$type limit $offset,4";
        $data=$this->mysql->query($sql)->fetch_all(MYSQLI_ASSOC);
        $result=json_encode($data);
        echo $result;
    }
}