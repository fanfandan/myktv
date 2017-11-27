<?php
 class paihang{
     function __construct()
     {
         $this->mysql = '';
         $obj = new db();
         $this->mysql = $obj->mysql;
     }
     function index(){
         $paihang=$_REQUEST['paihang'];
         $sql="select song.* , nav.* from song,nav where song.paihang='{$paihang}'";
         echo $sql;
         exit;
         $data=$this->mysql->query($sql)->fetch_all(MYSQL_ASSOC);
         include 'APP/views/paihang.html';
     }
 }