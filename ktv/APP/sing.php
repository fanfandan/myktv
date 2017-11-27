<?php
 class sing{
     function __construct()
     {
         $this->mysql = '';
         $obj = new db();
         $this->mysql = $obj->mysql;
     }
     function  geshou(){
         $sql="select * from music";
//         $sql="select music.* , nav.*  from music,nav limit 0,6";
         $data=$this->mysql->query($sql)->fetch_all(MYSQL_ASSOC);
         include "APP/views/singer.html";

     }
     function shownd(){
         $class=$_REQUEST['class'];
         $sql="select *  from singer where class='{$class}'";
         $data=$this->mysql->query($sql)->fetch_all(MYSQL_ASSOC);
         include "APP/views/ndsinger.html";
     }
     function music(){
         include "APP/views/singerdetail.html";
     }
     function gequ(){
         $arr=[];
         $sid=$_REQUEST['sid'];
         $sql="select song.* , singer.*   from  song ,singer where song.author=singer.name ";
         $data=$this->mysql->query($sql)->fetch_all(MYSQL_ASSOC);

         $sql1="select *  from singer where sid=${sid} ";
         $data1=$this->mysql->query($sql1)->fetch_all(MYSQL_ASSOC);

         array_push($arr,$data);
         array_push($arr,$data1);

         echo json_encode($arr);
//
     }
     function geci(){
         include "APP/views/geci.html";
     }
 }