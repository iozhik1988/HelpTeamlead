// ==UserScript==
// @name         HelpTeamlead
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        *bitrix24.team/services/openlines/bx_stat.php*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=bitrix24.team
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js
// @grant        none
// ==/UserScript==
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}
function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}
function SaveChat(){
    var UserList='';
    for (var i = 0; i < document.getElementById('queue_list').getElementsByClassName('bx-details').length; i++)
    {
        var UserId = document.getElementById('queue_list').getElementsByClassName('bx-details')[i].dataset.op;
        var objchats=document.getElementById('x-handled-'+UserId).getElementsByTagName('a');
        var ChatList='';
        for (var ii = 0; ii < objchats.length; ii++) {
            var ID=document.getElementById('x-handled-'+UserId).getElementsByTagName('a')[ii].text;
            if (ChatList=='')
            {
                ChatList=ID;
            }
            else{
                ChatList=ChatList+","+ID;
            }
        }
        // Сохраняем в cookies чаты пользователя
        document.cookie = "user_"+UserId+"="+ChatList+"; max-age=86400";
        if (UserList=='')
        {
            UserList=UserId;
        }
        else{
            UserList=UserList+","+UserId;
        }
    }
    document.cookie = "UserList="+UserList+"; max-age=86400";
}
function lightchat()
{
    if (getCookie("UserList")==undefined){
        SaveChat();
    }
    let UserList=getCookie("UserList").split(',');
    //let UsersId=UserList.split(',');
    for (var i = 0; i < UserList.length; i++){
        let UserChats=getCookie('user_'+UserList[i]).split(',');
        for (var ii = 0; ii < UserChats.length; ii++)
        {
            if (document.querySelectorAll('a[href*="'+UserChats[ii]+'"]')[0]!==undefined)
            {
                document.querySelectorAll('a[href*="'+UserChats[ii]+'"]')[0].style.backgroundColor='red';
            }
        }
    }
}
function blocktabchat(){
    if($('#blocktabchat')[0].textContent=='🔓'){
        $('#blocktabchat')[0].textContent='🔐';
    }
}

addGlobalStyle('.lightchat {cursor:pointer;background: green; color:white;border: none;color: white;padding: 4px 7px;}.bx-buttons {display: flex;flex-direction: row-reverse;}#todofirst::placeholder {color:#fff}');
addGlobalStyle('.blocktabchat {cursor:pointer;background: blue; color:white;border: none;color: white;padding: 4px 7px;}.bx-buttons {display: flex;flex-direction: row-reverse;}#todofirst::placeholder {color:#fff}');
$(document).ready(function(){
    $('.bx-buttons').append('<div class="lightchat"><i>💡</i></div>');
    $('.lightchat').bind( 'click', lightchat );
    SaveChat();

    $('.bx-buttons').append('<div class="blocktabchat"><i id="blocktabchat">🔓</i></div>');
    $('.blocktabchat').bind( 'click', blocktabchat );



    $(window).on("beforeunload", function() {
        if($('#blocktabchat')[0].textContent=='🔐'){
            return "Вы уверены, что хотите покинуть страницу1?";
        }
    });

    $(document).on("submit", "form", function(event) {
        if($('#blocktabchat')[0].textContent=='🔐'){
            $(window).off("beforeunload");
        }
    });


    // для функции пометки чатов.
    function lightchat()
    {
        if (getCookie("UserList")==undefined){
            SaveChat();
        }
        let UserList=getCookie("UserList").split(',');
        //let UsersId=UserList.split(',');
        for (var i = 0; i < UserList.length; i++){
            let UserChats=getCookie('user_'+UserList[i]).split(',');
            for (var ii = 0; ii < UserChats.length; ii++)
            {
                if (document.querySelectorAll('a[href*="'+UserChats[ii]+'"]')[0]!==undefined)
                {
                    document.querySelectorAll('a[href*="'+UserChats[ii]+'"]')[0].style.backgroundColor='red';
                }
            }
        }
    }
})
