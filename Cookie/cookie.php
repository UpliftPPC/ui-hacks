<?php
    function set_user_cookie($fn='',$ln='',$e='',$cty='',$ctry='',$opt_e=false,$opt_t=false){
        $user_info=array(
            'first_name' => $fn,
            'last_name' => $ln,
            'email' => $e,
            'county' => $cty,
            'country' => $ctry,
            'opt_in_email' => $opt_e,
            'opt_in_terms' => $opt_t
        );
        setcookie('user_info', json_encode($user_info));
    }
    function read_user_cookie(){
        $cookie = $_COOKIE['user_info'];
        $cookie = stripslashes($cookie);
        $user_info = json_decode($cookie, true);
        return $user_info;
    }
    set_user_cookie("","");
?>