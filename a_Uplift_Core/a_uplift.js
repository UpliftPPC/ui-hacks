/**
 * Created by Adam on 25/02/2015.
 */

(function(w, $){
    w.$up = (function($$){
        var $ = $$,
            us = "Uplift",

            // _user object [CookieMGMT, Display Hooks]
            _user = (function(){
                var UserInfo = function(){
                        var cookieName = "rememberme",
                            info = {},
                            updateInfo = function(userInfoObj){
                                var update = function(name){
                                    if (userInfoObj.hasOwnProperty(name)){
                                        info[name] = userInfoObj[name];
                                    }
                                };
                                update("First name");
                                update("Last name");
                                update("Country");
                                update("County");
                                update("Email address");
                            };

                        this.writeCookie = function(userInfoObj){
                            updateInfo(userInfoObj);
                            var userString = JSON.stringify(info),//encodeURIComponent(JSON.stringify(info)),
                                expDate = (function(){
                                    var date = new Date();
                                    date.setFullYear(date.getFullYear()+1);
                                    return date.toUTCString();
                                })(),
                                cookieString = cookieName + "="
                                    + userString
                                    + "; path=/; secure=true; expires="+expDate;
                            document.cookie = cookieString;
                        };
                        this.readCookie = function(){
                            //TODO: Steal cookie script from gamify
                            var str = "",
                                cookie = cookieName + "=";

                            document.cookie.split(";").map(function(a){
                                var c = a.split("=");
                                if (c[0].trim() == cookieName)str=c[1].trim();
                            });

                            if (str!=""){
                                cookieExists = true;
                                info = JSON.parse(str);
                                return info;
                            }
                            return false;
                        };
                        this.deleteCookie = function(){
                            document.cookie = cookieName + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/; secure=true;";
                            cookieExists = false;
                        };
                        this.autoFill = function(form){

                            var copy = function(name){
                                if (form.elements.hasOwnProperty(name)){
                                    form.elements[name].value = info[name];
                                }
                            };
                            copy("First name");
                            copy("Last name");
                            copy("County");
                            copy("Country");
                            copy("Email address");

                            var ops = form.elements['Opt in'];
                            ops[0].checked = ops[1].checked = true;
                        };
                        this.getName = function(){
                            return info["First name"];
                        };
                    },
                    cookieExists = false,
                    $ui = new UserInfo(),

                    //Hook into the rememberMe option in a form
                    $remember = function(form){
                        var f={};
                        Array.prototype.map.call(form.elements, function(e){
                            f[e.name] = e.value;return null
                        });
                        $ui.writeCookie(f);
                    },

                    // TODO: Hook into the $join modal
                    // Something like a welcome back message. TODO: not you?
                    welcomeHead = function(){
                        var $t = $(".js-joinStart");
                        $t.hide().after(
                            "<div class='col-md-12'><p class='signed-in'>Welcome back "+$ui.getName()
                            + ". <a href='#'>Not "+$ui.getName()+"?</a></p></div>");

                    },

                    // TODO: Hook into the $unsubscribe form
                    // delete cookie
                    $deleteAndReload = function(){
                        $ui.deleteCookie();
                        location.reload();
                    },

                    // TODO: Hook into Actions
                    // Something like a hide and append
                    oneClickSubmit = function(target){
                        if (!cookieExists)return false;
                        var $t = $(target);
                        $ui.autoFill(target);
                        $t.find('.petition-contact, .optin').hide();
                        $t.find('button[name=submit]').text('Sign now');
                        $t.append("<p class='signed-in'>Signed in as "+$ui.getName()+". <a href='#'>Not you?</a></p>");
                    },
                    $ifKnownSequence = function(){
                        if ($ui.readCookie()){
                            welcomeHead();
                            var t = $('article .petition.js-petition')[0];
                            var $u = $('.unsubscribe > .petition.js-petition');
                            if (t !== undefined){
                                oneClickSubmit(t);
                            }
                            if ($u[0] !== undefined){
                                $u.find('button.petition-submit').on(
                                    'click',
                                    function(){
                                        // May be better to hook from actual unsub function
                                        // - would have better separation of concerns
                                        $ui.deleteCookie();
                                    });
                            }
                            $('.welcome-back>a, .signed-in>a').on('click',
                                function(){$deleteAndReload();});
                        }
                        else{
                            var $ps = $('.petition.js-petition');
                            if ($ps !== []){
                                $ps.each(function(){
                                    var $a = $(this);
                                    $(this).find('submit.petition-submit').on('click',function(){
                                        $ui.rememberMe($a[0]);
                                    })
                                });
                            }
                        }
                    };

                return {
                    rememberMe: $remember,
                    forgetMe: $deleteAndReload,
                    ifKnown : $ifKnownSequence
                }
            })();

        // _user object [CookieMGMT, Display Hooks]
        var _action = (function(){
            var _petition = function(target){
                var $pcs = $('article .js-petition .petition-counter');

                $pcs.forEach(function(){
                    var $bar = $pc.find('.bar'),
                        c = parseInt($bar.text().replace(',',''),10);

                    $pc.find('.petition-counter--title').text('Target '+target+' signatures');

                    $pc.find('.petition-counter--start').text('0');
                    $pc.find('.petition-counter--middle').text(Math.round(target/2));
                    $pc.find('.petition-counter--target').text(target);

                    $bar.css({
                        'max-width': '100%',
                        'min-width': '7%',
                        'width': Math.floor((c/target)*100) + '%'
                    });
                });

            };

            return {
                petitionCount : _petition
            }
        })();

        return {
            user: _user,
            action: _action
        }
    })($);
})(window, jQuery);
