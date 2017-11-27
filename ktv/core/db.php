<?php
class db{
    public $mysql;

    function __construct(){
        $this->confirm();
    }
    function confirm(){
        $this->mysql=new mysqli("sqld.duapp.com",'237d7b1cbbf94315ba84ac907ae09bf8','3096aec557e94f7dafcdfb353d9d1d22','ZEYevbOEtcsalZinBjRj',4050);
        $this->mysql->query("set names utf8");
    }
}

