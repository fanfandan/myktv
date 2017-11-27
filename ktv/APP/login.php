<?php
class login{
    function index(){
        include "APP/views/login.html";

    }
    function check(){
        $user=$_REQUEST['user'];
        $pass=$_REQUEST['pass'];

         $this->mysql=new mysqli("sqld.duapp.com",'237d7b1cbbf94315ba84ac907ae09bf8','3096aec557e94f7dafcdfb353d9d1d22','ZEYevbOEtcsalZinBjRj',4050);
        $data=$mysql->query("select * from admin1 where user='{$user}' ")->fetch_all(1);

        for($i=0;$i<count($data);$i++){
            if($data[$i]['pass']==$pass){
                echo 'ok';
                exit;
            }
        }
        echo 'error';
    }
}
