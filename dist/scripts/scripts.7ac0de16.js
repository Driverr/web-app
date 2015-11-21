"use strict";!function(){function a(a,b){a.when("/",{templateUrl:"/home.html",controller:"HomeCtrl",controllerAs:"home"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl",controllerAs:"about"}).when("/faq",{templateUrl:"views/faq.html",controller:"FaqCtrl",controllerAs:"faq"}).when("/login",{templateUrl:"views/login.html",controller:"LoginCtrl",controllerAs:"login"}).when("/register",{templateUrl:"views/register.html",controller:"RegisterCtrl",controllerAs:"register"}).when("/booking",{templateUrl:"views/booking.html",controller:"BookingCtrl",controllerAs:"booking"}).when("/fare",{templateUrl:"views/fare.html",controller:"FareCtrl",controllerAs:"fare"}).otherwise({redirectTo:"/login"})}function b(a,b,c,d){a.globals=c.get("globals")||{},a.globals.currentUser&&(d.defaults.headers.common.Authorization="Basic"+a.globals.currentUser.authdata),a.$on("$locationChangeStart",function(c,d,e){-1===$.inArray(b.path(),["/login","/register","/home","/faq","/booking","/fare","/contact"]),a.globals.currentUser})}angular.module("DrivenApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch"]).config(a).run(b),a.$inject=["$routeProvider","$locationProvider"],b.$inject=["$rootScope","$location","$cookieStore","$http"]}(),angular.module("DrivenApp").controller("MainCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("DrivenApp").controller("AboutCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),function(){function a(a,c,d,e,f){function g(b,c,d){a.post("driverr-app.herokuapp.com/api/login",{number:b,password:c}).success(function(a){d(a)})}function h(e,f){var g=b.encode(e+":"+f);d.globals={currentUser:{number:e,authdata:g}},a.defaults.headers.common.Authorization="Basic"+g,c.put("globals",d.globals)}function i(){d.globals={},c.remove("globals"),a.defaults.headers.common.Authorization="Basic"}var j={};return j.Login=g,j.SetCredentials=h,j.ClearCredentials=i,j}angular.module("DrivenApp").factory("AuthenticationService",a),a.$inject=["$http","$cookieStore","$rootScope","$timeout","UserService"];var b={keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(a){var b,c,d,e,f,g="",h="",i="",j=0;do b=a.charCodeAt(j++),c=a.charCodeAt(j++),h=a.charCodeAt(j++),d=b>>2,e=(3&b)<<4|c>>4,f=(15&c)<<2|h>>6,i=63&h,isNaN(c)?f=i=64:isNaN(h)&&(i=64),g=g+this.keyStr.charAt(d)+this.keyStr.charAt(e)+this.keyStr.charAt(f)+this.keyStr.charAt(i),b=c=h="",d=e=f=i="";while(j<a.length);return g},decode:function(a){var b,c,d,e,f,g="",h="",i="",j=0,k=/[^A-Za-z0-9\+\/\=]/g;k.exec(a)&&window.alert("There were invalid base64 characters in the input text.\nValid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\nExpect errors in decoding."),a=a.replace(/[^A-Za-z0-9\+\/\=]/g,"");do d=this.keyStr.indexOf(a.charAt(j++)),e=this.keyStr.indexOf(a.charAt(j++)),f=this.keyStr.indexOf(a.charAt(j++)),i=this.keyStr.indexOf(a.charAt(j++)),b=d<<2|e>>4,c=(15&e)<<4|f>>2,h=(3&f)<<6|i,g+=String.fromCharCode(b),64!=f&&(g+=String.fromCharCode(c)),64!=i&&(g+=String.fromCharCode(h)),b=c=h="",d=e=f=i="";while(j<a.length);return g}}}(),function(){function a(a,b,c){function d(){e.dataLoading=!0,b.Login(e.number,e.password,function(d){d.success?(b.SetCredentials(e.number,e.password),a.path("/")):(c.Error(d.message),e.dataLoading=!1)})}var e=this;e.login=d,function(){b.ClearCredentials()}()}angular.module("DrivenApp").controller("LoginCtrl",a),a.$inject=["$location","AuthenticationService","FlashService"]}(),function(){function a(a,b,c,d){function e(){f.dataLoading=!0,a.Create(f.user).then(function(a){a.success?(d.Success("Registration successful",!0),b.path("/login")):(d.Error(a.message),f.dataLoading=!1)})}var f=this;f.register=e}angular.module("DrivenApp").controller("RegisterCtrl",a),a.$inject=["UserService","$location","$rootScope","FlashService"]}(),function(){function a(a){function b(){return a.get("/api/users").then(h,i("Error getting all users"))}function c(){return a.get("/api/users/"+id).then(h,i("Error getting user by Id"))}function d(){return a.get("/api/users/"+username).then(h,i("Error getting user by Id"))}function e(b){return a.post("driverr-app.herokuapp.com/api/register",b).then(h,i("Error creating user"))}function f(b){return a.put("/api/users/"+b.id,b).then(h,i("Error updating user"))}function g(b){return a["delete"]("/api/users/"+b).then(h,i("Error deleting user"))}function h(a){return a.data}function i(a){return function(){return{success:!1,message:a}}}var j={};return j.GetAll=b,j.GetById=c,j.GetByUsername=d,j.Create=e,j.Update=f,j.Delete=g,j}angular.module("DrivenApp").factory("UserService",a),a.$inject=["$http"]}(),jQuery.easing.jswing=jQuery.easing.swing,jQuery.extend(jQuery.easing,{def:"easeOutQuad",swing:function(a,b,c,d,e){return jQuery.easing[jQuery.easing.def](a,b,c,d,e)},easeInQuad:function(a,b,c,d,e){return d*(b/=e)*b+c},easeOutQuad:function(a,b,c,d,e){return-d*(b/=e)*(b-2)+c},easeInOutQuad:function(a,b,c,d,e){return(b/=e/2)<1?d/2*b*b+c:-d/2*(--b*(b-2)-1)+c},easeInCubic:function(a,b,c,d,e){return d*(b/=e)*b*b+c},easeOutCubic:function(a,b,c,d,e){return d*((b=b/e-1)*b*b+1)+c},easeInOutCubic:function(a,b,c,d,e){return(b/=e/2)<1?d/2*b*b*b+c:d/2*((b-=2)*b*b+2)+c},easeInQuart:function(a,b,c,d,e){return d*(b/=e)*b*b*b+c},easeOutQuart:function(a,b,c,d,e){return-d*((b=b/e-1)*b*b*b-1)+c},easeInOutQuart:function(a,b,c,d,e){return(b/=e/2)<1?d/2*b*b*b*b+c:-d/2*((b-=2)*b*b*b-2)+c},easeInQuint:function(a,b,c,d,e){return d*(b/=e)*b*b*b*b+c},easeOutQuint:function(a,b,c,d,e){return d*((b=b/e-1)*b*b*b*b+1)+c},easeInOutQuint:function(a,b,c,d,e){return(b/=e/2)<1?d/2*b*b*b*b*b+c:d/2*((b-=2)*b*b*b*b+2)+c},easeInSine:function(a,b,c,d,e){return-d*Math.cos(b/e*(Math.PI/2))+d+c},easeOutSine:function(a,b,c,d,e){return d*Math.sin(b/e*(Math.PI/2))+c},easeInOutSine:function(a,b,c,d,e){return-d/2*(Math.cos(Math.PI*b/e)-1)+c},easeInExpo:function(a,b,c,d,e){return 0==b?c:d*Math.pow(2,10*(b/e-1))+c},easeOutExpo:function(a,b,c,d,e){return b==e?c+d:d*(-Math.pow(2,-10*b/e)+1)+c},easeInOutExpo:function(a,b,c,d,e){return 0==b?c:b==e?c+d:(b/=e/2)<1?d/2*Math.pow(2,10*(b-1))+c:d/2*(-Math.pow(2,-10*--b)+2)+c},easeInCirc:function(a,b,c,d,e){return-d*(Math.sqrt(1-(b/=e)*b)-1)+c},easeOutCirc:function(a,b,c,d,e){return d*Math.sqrt(1-(b=b/e-1)*b)+c},easeInOutCirc:function(a,b,c,d,e){return(b/=e/2)<1?-d/2*(Math.sqrt(1-b*b)-1)+c:d/2*(Math.sqrt(1-(b-=2)*b)+1)+c},easeInElastic:function(a,b,c,d,e){var f=1.70158,g=0,h=d;if(0==b)return c;if(1==(b/=e))return c+d;if(g||(g=.3*e),h<Math.abs(d)){h=d;var f=g/4}else var f=g/(2*Math.PI)*Math.asin(d/h);return-(h*Math.pow(2,10*(b-=1))*Math.sin((b*e-f)*(2*Math.PI)/g))+c},easeOutElastic:function(a,b,c,d,e){var f=1.70158,g=0,h=d;if(0==b)return c;if(1==(b/=e))return c+d;if(g||(g=.3*e),h<Math.abs(d)){h=d;var f=g/4}else var f=g/(2*Math.PI)*Math.asin(d/h);return h*Math.pow(2,-10*b)*Math.sin((b*e-f)*(2*Math.PI)/g)+d+c},easeInOutElastic:function(a,b,c,d,e){var f=1.70158,g=0,h=d;if(0==b)return c;if(2==(b/=e/2))return c+d;if(g||(g=e*(.3*1.5)),h<Math.abs(d)){h=d;var f=g/4}else var f=g/(2*Math.PI)*Math.asin(d/h);return 1>b?-.5*(h*Math.pow(2,10*(b-=1))*Math.sin((b*e-f)*(2*Math.PI)/g))+c:h*Math.pow(2,-10*(b-=1))*Math.sin((b*e-f)*(2*Math.PI)/g)*.5+d+c},easeInBack:function(a,b,c,d,e,f){return void 0==f&&(f=1.70158),d*(b/=e)*b*((f+1)*b-f)+c},easeOutBack:function(a,b,c,d,e,f){return void 0==f&&(f=1.70158),d*((b=b/e-1)*b*((f+1)*b+f)+1)+c},easeInOutBack:function(a,b,c,d,e,f){return void 0==f&&(f=1.70158),(b/=e/2)<1?d/2*(b*b*(((f*=1.525)+1)*b-f))+c:d/2*((b-=2)*b*(((f*=1.525)+1)*b+f)+2)+c},easeInBounce:function(a,b,c,d,e){return d-jQuery.easing.easeOutBounce(a,e-b,0,d,e)+c},easeOutBounce:function(a,b,c,d,e){return(b/=e)<1/2.75?d*(7.5625*b*b)+c:2/2.75>b?d*(7.5625*(b-=1.5/2.75)*b+.75)+c:2.5/2.75>b?d*(7.5625*(b-=2.25/2.75)*b+.9375)+c:d*(7.5625*(b-=2.625/2.75)*b+.984375)+c},easeInOutBounce:function(a,b,c,d,e){return e/2>b?.5*jQuery.easing.easeInBounce(a,2*b,0,d,e)+c:.5*jQuery.easing.easeOutBounce(a,2*b-e,0,d,e)+.5*d+c}}),function(a){a.fn.fitText=function(b,c){var d=b||1,e=a.extend({minFontSize:Number.NEGATIVE_INFINITY,maxFontSize:Number.POSITIVE_INFINITY},c);return this.each(function(){var b=a(this),c=function(){b.css("font-size",Math.max(Math.min(b.width()/(10*d),parseFloat(e.maxFontSize)),parseFloat(e.minFontSize)))};c(),a(window).on("resize.fittext orientationchange.fittext",c)})}}(jQuery),function(){var a,b,c,d,e,f=function(a,b){return function(){return a.apply(b,arguments)}},g=[].indexOf||function(a){for(var b=0,c=this.length;c>b;b++)if(b in this&&this[b]===a)return b;return-1};b=function(){function a(){}return a.prototype.extend=function(a,b){var c,d;for(c in b)d=b[c],null==a[c]&&(a[c]=d);return a},a.prototype.isMobile=function(a){return/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(a)},a.prototype.createEvent=function(a,b,c,d){var e;return null==b&&(b=!1),null==c&&(c=!1),null==d&&(d=null),null!=document.createEvent?(e=document.createEvent("CustomEvent"),e.initCustomEvent(a,b,c,d)):null!=document.createEventObject?(e=document.createEventObject(),e.eventType=a):e.eventName=a,e},a.prototype.emitEvent=function(a,b){return null!=a.dispatchEvent?a.dispatchEvent(b):b in(null!=a)?a[b]():"on"+b in(null!=a)?a["on"+b]():void 0},a.prototype.addEvent=function(a,b,c){return null!=a.addEventListener?a.addEventListener(b,c,!1):null!=a.attachEvent?a.attachEvent("on"+b,c):a[b]=c},a.prototype.removeEvent=function(a,b,c){return null!=a.removeEventListener?a.removeEventListener(b,c,!1):null!=a.detachEvent?a.detachEvent("on"+b,c):delete a[b]},a.prototype.innerHeight=function(){return"innerHeight"in window?window.innerHeight:document.documentElement.clientHeight},a}(),c=this.WeakMap||this.MozWeakMap||(c=function(){function a(){this.keys=[],this.values=[]}return a.prototype.get=function(a){var b,c,d,e,f;for(f=this.keys,b=d=0,e=f.length;e>d;b=++d)if(c=f[b],c===a)return this.values[b]},a.prototype.set=function(a,b){var c,d,e,f,g;for(g=this.keys,c=e=0,f=g.length;f>e;c=++e)if(d=g[c],d===a)return void(this.values[c]=b);return this.keys.push(a),this.values.push(b)},a}()),a=this.MutationObserver||this.WebkitMutationObserver||this.MozMutationObserver||(a=function(){function a(){"undefined"!=typeof console&&null!==console&&console.warn("MutationObserver is not supported by your browser."),"undefined"!=typeof console&&null!==console&&console.warn("WOW.js cannot detect dom mutations, please call .sync() after loading new content.")}return a.notSupported=!0,a.prototype.observe=function(){},a}()),d=this.getComputedStyle||function(a){return this.getPropertyValue=function(b){var c;return"float"===b&&(b="styleFloat"),e.test(b)&&b.replace(e,function(a,b){return b.toUpperCase()}),(null!=(c=a.currentStyle)?c[b]:void 0)||null},this},e=/(\-([a-z]){1})/g,this.WOW=function(){function e(a){null==a&&(a={}),this.scrollCallback=f(this.scrollCallback,this),this.scrollHandler=f(this.scrollHandler,this),this.resetAnimation=f(this.resetAnimation,this),this.start=f(this.start,this),this.scrolled=!0,this.config=this.util().extend(a,this.defaults),this.animationNameCache=new c,this.wowEvent=this.util().createEvent(this.config.boxClass)}return e.prototype.defaults={boxClass:"wow",animateClass:"animated",offset:0,mobile:!0,live:!0,callback:null},e.prototype.init=function(){var a;return this.element=window.document.documentElement,"interactive"===(a=document.readyState)||"complete"===a?this.start():this.util().addEvent(document,"DOMContentLoaded",this.start),this.finished=[]},e.prototype.start=function(){var b,c,d,e;if(this.stopped=!1,this.boxes=function(){var a,c,d,e;for(d=this.element.querySelectorAll("."+this.config.boxClass),e=[],a=0,c=d.length;c>a;a++)b=d[a],e.push(b);return e}.call(this),this.all=function(){var a,c,d,e;for(d=this.boxes,e=[],a=0,c=d.length;c>a;a++)b=d[a],e.push(b);return e}.call(this),this.boxes.length)if(this.disabled())this.resetStyle();else for(e=this.boxes,c=0,d=e.length;d>c;c++)b=e[c],this.applyStyle(b,!0);return this.disabled()||(this.util().addEvent(window,"scroll",this.scrollHandler),this.util().addEvent(window,"resize",this.scrollHandler),this.interval=setInterval(this.scrollCallback,50)),this.config.live?new a(function(a){return function(b){var c,d,e,f,g;for(g=[],c=0,d=b.length;d>c;c++)f=b[c],g.push(function(){var a,b,c,d;for(c=f.addedNodes||[],d=[],a=0,b=c.length;b>a;a++)e=c[a],d.push(this.doSync(e));return d}.call(a));return g}}(this)).observe(document.body,{childList:!0,subtree:!0}):void 0},e.prototype.stop=function(){return this.stopped=!0,this.util().removeEvent(window,"scroll",this.scrollHandler),this.util().removeEvent(window,"resize",this.scrollHandler),null!=this.interval?clearInterval(this.interval):void 0},e.prototype.sync=function(){return a.notSupported?this.doSync(this.element):void 0},e.prototype.doSync=function(a){var b,c,d,e,f;if(null==a&&(a=this.element),1===a.nodeType){for(a=a.parentNode||a,e=a.querySelectorAll("."+this.config.boxClass),f=[],c=0,d=e.length;d>c;c++)b=e[c],g.call(this.all,b)<0?(this.boxes.push(b),this.all.push(b),this.stopped||this.disabled()?this.resetStyle():this.applyStyle(b,!0),f.push(this.scrolled=!0)):f.push(void 0);return f}},e.prototype.show=function(a){return this.applyStyle(a),a.className=a.className+" "+this.config.animateClass,null!=this.config.callback&&this.config.callback(a),this.util().emitEvent(a,this.wowEvent),this.util().addEvent(a,"animationend",this.resetAnimation),this.util().addEvent(a,"oanimationend",this.resetAnimation),this.util().addEvent(a,"webkitAnimationEnd",this.resetAnimation),this.util().addEvent(a,"MSAnimationEnd",this.resetAnimation),a},e.prototype.applyStyle=function(a,b){var c,d,e;return d=a.getAttribute("data-wow-duration"),c=a.getAttribute("data-wow-delay"),e=a.getAttribute("data-wow-iteration"),this.animate(function(f){return function(){return f.customStyle(a,b,d,c,e)}}(this))},e.prototype.animate=function(){return"requestAnimationFrame"in window?function(a){return window.requestAnimationFrame(a)}:function(a){return a()}}(),e.prototype.resetStyle=function(){var a,b,c,d,e;for(d=this.boxes,e=[],b=0,c=d.length;c>b;b++)a=d[b],e.push(a.style.visibility="visible");return e},e.prototype.resetAnimation=function(a){var b;return a.type.toLowerCase().indexOf("animationend")>=0?(b=a.target||a.srcElement,b.className=b.className.replace(this.config.animateClass,"").trim()):void 0},e.prototype.customStyle=function(a,b,c,d,e){return b&&this.cacheAnimationName(a),a.style.visibility=b?"hidden":"visible",c&&this.vendorSet(a.style,{animationDuration:c}),d&&this.vendorSet(a.style,{animationDelay:d}),e&&this.vendorSet(a.style,{animationIterationCount:e}),this.vendorSet(a.style,{animationName:b?"none":this.cachedAnimationName(a)}),a},e.prototype.vendors=["moz","webkit"],e.prototype.vendorSet=function(a,b){var c,d,e,f;d=[];for(c in b)e=b[c],a[""+c]=e,d.push(function(){var b,d,g,h;for(g=this.vendors,h=[],b=0,d=g.length;d>b;b++)f=g[b],h.push(a[""+f+c.charAt(0).toUpperCase()+c.substr(1)]=e);return h}.call(this));return d},e.prototype.vendorCSS=function(a,b){var c,e,f,g,h,i;for(h=d(a),g=h.getPropertyCSSValue(b),f=this.vendors,c=0,e=f.length;e>c;c++)i=f[c],g=g||h.getPropertyCSSValue("-"+i+"-"+b);return g},e.prototype.animationName=function(a){var b;try{b=this.vendorCSS(a,"animation-name").cssText}catch(c){b=d(a).getPropertyValue("animation-name")}return"none"===b?"":b},e.prototype.cacheAnimationName=function(a){return this.animationNameCache.set(a,this.animationName(a))},e.prototype.cachedAnimationName=function(a){return this.animationNameCache.get(a)},e.prototype.scrollHandler=function(){return this.scrolled=!0},e.prototype.scrollCallback=function(){var a;return!this.scrolled||(this.scrolled=!1,this.boxes=function(){var b,c,d,e;for(d=this.boxes,e=[],b=0,c=d.length;c>b;b++)a=d[b],a&&(this.isVisible(a)?this.show(a):e.push(a));return e}.call(this),this.boxes.length||this.config.live)?void 0:this.stop()},e.prototype.offsetTop=function(a){for(var b;void 0===a.offsetTop;)a=a.parentNode;for(b=a.offsetTop;a=a.offsetParent;)b+=a.offsetTop;return b},e.prototype.isVisible=function(a){var b,c,d,e,f;return c=a.getAttribute("data-wow-offset")||this.config.offset,f=window.pageYOffset,e=f+Math.min(this.element.clientHeight,this.util().innerHeight())-c,d=this.offsetTop(a),b=d+a.clientHeight,e>=d&&b>=f},e.prototype.util=function(){return null!=this._util?this._util:this._util=new b},e.prototype.disabled=function(){return!this.config.mobile&&this.util().isMobile(navigator.userAgent)},e}()}.call(this),function(a){a("a.page-scroll").bind("click",function(b){var c=a(this);a("html, body").stop().animate({scrollTop:a(c.attr("href")).offset().top-50},1250,"easeInOutExpo"),b.preventDefault()}),a("body").scrollspy({target:".navbar-fixed-top",offset:51}),a(".navbar-collapse ul li a").click(function(){a(".navbar-toggle:visible").click()}),a("h1").fitText(1.2,{minFontSize:"35px",maxFontSize:"65px"}),a("#mainNav").affix({offset:{top:100}}),(new WOW).init()}(jQuery),angular.module("DrivenApp").run(["$templateCache",function(a){a.put("views/about.html","<p>This is the about view.</p>"),a.put("views/booking.html",'<!-- index.html --><!DOCTYPE html> <html> <head> <!-- CSS ===================== --> <!-- load bootstrap --> <link rel="stylesheet" href="http://netdna.bootstrapcdn.com/bootstrap/3.0.3/css/bootstrap.min.css"> <style>body    { padding-top:30px; }</style> <!-- JS ===================== --> <!-- load angular --> <script src="http://code.angularjs.org/1.2.6/angular.js"></script> <script src="app.js"></script> </head> <!-- apply angular app and controller to our body --> <body ng-app="validationApp" ng-controller="mainController"> <div class="container"> <div class="col-sm-8 col-sm-offset-2"> <!-- PAGE HEADER --> <div class="page-header"><h1>Form</h1></div> <!-- FORM --> <!-- pass in the variable if our form is valid or invalid --> <form name="userForm" ng-submit="submitForm(userForm.$valid)" novalidate> <!-- novalidate prevents HTML5 validation since we will be validating ourselves --> <!-- NAME --> <div class="form-group"> <label>Name</label> <input type="text" name="name" class="form-control" ng-model="name" required> </div> <!-- NUMBER --> <div class="form-group"> <label>Number</label> <input type="number" name="number" class="form-control" ng-model="user.number" ng-minlength="10" ng-maxlength="10"> </div> <!-- EMAIL --> <div class="form-group"> <label>Email</label> <input type="email" name="email" class="form-control" ng-model="email"> </div> <!-- PICKUP LOCATION --> <div class="form-group"> <label>Location</label> <input type="location" name="location" class="form-control" ng-model="email"> </div> <!-- PICKUP DATE/TIME --> <div class="form-group"> <label>Date-time</label> <input type="date-time" name="datetime" class="form-control" ng-model="email"> </div> <!-- SUBMIT BUTTON --> <button type="submit" class="btn btn-primary">Submit</button> </form> </div><!-- col-sm-8 --> </div><!-- /container --> </body> </html>'),a.put("views/faq.html","<div> <h1>A couple of questions to better explain what we're all about:</h1> <h2>What does Driven do?</h2> <p>We solve a major problem for everyone with a car in urban India - driving. We provide verified, reliable and trained drivers at hourly rates.</p> <h2>Great, I see how that helps! So how do I book a driver?</h2> <p>Its easy! Head over to the Bookings page or download our app from the Play Store. Then sign up with your email and number, select your pick up location, date and time, and there you go! Easy as pie!</p> <h2>Hey you guys don't seem to be in my locality! How many places are you operational in?</h2> <p>Sorry if we aren't servicing your area yet. We promise to be there soon! As of yet we service the whole of Mumbai, up to cetain parts of Navi Mumbai and Thane. But we're expanding fast and before you know it we'll be at your doorstep too.</p> <h2>This seems fantastic! But how do you ensure your drivers are verified and trustworthy?</h2> <p>All our drivers undergo a rigorous 3 step verification process, including a police verification, a background check by a professional agency and our very own ultra strict personality tests. We have high standards for each round and only the best drivers are finally selected.</p> <h2>How do I pay the driver? Do you guys have any credit card/e-wallet facilities?</h2> <p>Right now you can pay the driver in cash, but we're in the process of integrating support for cards as well as mobile wallets!</p> <h2>What happens in case of any mishaps?</h2> <p>Answer here. </p> <h2>Do you guys have any other special offers?</h2> <p>We just launched a Pair Booking feature aimed at office commuters. With this, we provide a driver to pick you up in the morning to drop you till your office. In the evening, you get another driver to pick you from office and drop you back home. So sit back and travel in the comfort of your own car without having to worry about navigating rush hour traffic!</p> <h2>Wow that's fantastic! How much does it cost?</h2> <p>We are giving an introductory price of Rs. 400 only, for one Pair Booking (to and fro included). You can check our normal pricing structure in the fare chart <a href=\"#/fare\">here</a>.</p> <h2>Do you servcie special requests like daily/weekly bookings or outstation drivers?</h2> <p>Yes we do, but on a case-by-case basis. It depends on the availability of our drivers. Please get in touch with one of our executives by calling any of our numbers, listed <a href=\"#/contact\">here</a>.</p> </div>"),a.put("views/fare.html","<div>Our fare chart:</div> <h1>Hourly bookings:</h1> <p>Base fare (up to 1 hour): Rs. 200/-</p> <p>Rate per hour (from 2nd hour onwards): Rs. 100/-</p> <h1>Pair Bookings:</h1> <p>Rs. 400/- flat fee for a morning ride and an evening ride.</p> <p>Each ride can be of a maximum of 2 hours, following which we will charge Rs. 50 per hour, per ride.</p> <p>Pair bookings can only be from point A to B and back to A (home to office and back to home) and cannot be used to take the driver to any other places. Extra charges will be applicable, as per our normal hourly rates, in any such scenario.</p>"),a.put("views/home.html",'<body> <header> <div class="header-content"> <div class="header-content-inner"> <h1>Be Driven. Sit back and enjoy the ride.</h1> <hr> <p>Book a driver at the tap of a button and leave the rest to us. Be assured in the comfort of your own car!</p> <a href="#about" class="btn btn-primary btn-xl page-scroll">Find Out More</a> </div> </div> </header> <section class="bg-primary" id="about"> <div class="container"> <div class="row"> <div class="col-lg-8 col-lg-offset-2 text-center"> <h2 class="section-heading">We\'ve got what you need!</h2> <hr class="light"> <p class="text-faded">Driven takes care of all your driving hassles - without removing the most integral part of it: your personal car. Forget worrying about finding a driver or hailing a cab. The future is here.</p> <a href="#/login" class="btn btn-default btn-xl">Get Started!</a> </div> </div> </div> </section> <section id="services"> <div class="container"> <div class="row"> <div class="col-lg-12 text-center"> <h2 class="section-heading">At Your Service</h2> <hr class="primary"> </div> </div> </div> <div class="container"> <div class="row"> <div class="col-lg-3 col-md-6 text-center"> <div class="service-box"> <i class="fa fa-4x fa-diamond wow bounceIn text-primary"></i> <h3>Trained Drivers</h3> <p class="text-muted">Our drivers are highly experienced and well trained. </p> </div> </div> <div class="col-lg-3 col-md-6 text-center"> <div class="service-box"> <i class="fa fa-4x fa-paper-plane wow bounceIn text-primary" data-wow-delay=".1s"></i> <h3>Total safety</h3> <p class="text-muted">Our drivers have rigorous background checks done and are trained for all kinds of situations.</p> </div> </div> <div class="col-lg-3 col-md-6 text-center"> <div class="service-box"> <i class="fa fa-4x fa-newspaper-o wow bounceIn text-primary" data-wow-delay=".2s"></i> <h3>Office trips made easy</h3> <p class="text-muted">We solve your office travel hassles by providing a driver in the morning and again in the evening, to drive you to and fro work.</p> </div> </div> <div class="col-lg-3 col-md-6 text-center"> <div class="service-box"> <i class="fa fa-4x fa-heart wow bounceIn text-primary" data-wow-delay=".3s"></i> <h3>Made with Love</h3> <p class="text-muted">We don\'t fuck around.</p> </div> </div> </div> </div> </section> <section class="no-padding" id="portfolio"> <div class="container-fluid"> <div class="row no-gutter"> <div class="col-lg-4 col-sm-6"> <a href="#" class="portfolio-box"> <img src="img/portfolio/1.jpg" class="img-responsive" alt=""> <div class="portfolio-box-caption"> <div class="portfolio-box-caption-content"> <div class="project-category text-faded"> Category </div> <div class="project-name"> Project Name </div> </div> </div> </a> </div> <div class="col-lg-4 col-sm-6"> <a href="#" class="portfolio-box"> <img src="img/portfolio/2.jpg" class="img-responsive" alt=""> <div class="portfolio-box-caption"> <div class="portfolio-box-caption-content"> <div class="project-category text-faded"> Category </div> <div class="project-name"> Project Name </div> </div> </div> </a> </div> <div class="col-lg-4 col-sm-6"> <a href="#" class="portfolio-box"> <img src="img/portfolio/3.jpg" class="img-responsive" alt=""> <div class="portfolio-box-caption"> <div class="portfolio-box-caption-content"> <div class="project-category text-faded"> Category </div> <div class="project-name"> Project Name </div> </div> </div> </a> </div> <div class="col-lg-4 col-sm-6"> <a href="#" class="portfolio-box"> <img src="img/portfolio/4.jpg" class="img-responsive" alt=""> <div class="portfolio-box-caption"> <div class="portfolio-box-caption-content"> <div class="project-category text-faded"> Category </div> <div class="project-name"> Project Name </div> </div> </div> </a> </div> <div class="col-lg-4 col-sm-6"> <a href="#" class="portfolio-box"> <img src="img/portfolio/5.jpg" class="img-responsive" alt=""> <div class="portfolio-box-caption"> <div class="portfolio-box-caption-content"> <div class="project-category text-faded"> Category </div> <div class="project-name"> Project Name </div> </div> </div> </a> </div> <div class="col-lg-4 col-sm-6"> <a href="#" class="portfolio-box"> <img src="img/portfolio/6.jpg" class="img-responsive" alt=""> <div class="portfolio-box-caption"> <div class="portfolio-box-caption-content"> <div class="project-category text-faded"> Category </div> <div class="project-name"> Project Name </div> </div> </div> </a> </div> </div> </div> </section> <aside class="bg-dark"> <div class="container text-center"> <div class="call-to-action"> <h2>Free Download on the Google Play Store!</h2> <a href="https://play.google.com/store/apps/details?id=com.urbtranz.driven" class="btn btn-default btn-xl wow tada">Download Now!</a> </div> </div> </aside> <section id="contact"> <div class="container"> <div class="row"> <div class="col-lg-8 col-lg-offset-2 text-center"> <h2 class="section-heading">Let\'s Get In Touch!</h2> <hr class="primary"> <p>Want to talk to us? We\'d love to hear back from you! Do check out the FAQs for some quick answers.</p> </div> <div class="col-lg-4 col-lg-offset-2 text-center"> <i class="fa fa-phone fa-3x wow bounceIn"></i> <p>123-456-6789</p> </div> <div class="col-lg-4 text-center"> <i class="fa fa-envelope-o fa-3x wow bounceIn" data-wow-delay=".1s"></i> <p><a href="mailto:support@getdriverr.com">suport@getdriverr.com</a></p> </div> </div> </div> </section> <!-- \n    <script src="//code.jquery.com/jquery-2.0.3.min.js"></script>\n    <script src="//code.angularjs.org/1.2.20/angular.js"></script>\n    <script src="//code.angularjs.org/1.2.20/angular-route.js"></script>\n    <script src="//code.angularjs.org/1.2.13/angular-cookies.js"></script>\n\n    <script src="app.js"></script>\n    <script src="app-services/authentication.service.js"></script>\n    <script src="app-services/flash.service.js"></script> --> <!-- Real user service that uses an api --> <!-- <script src="app-services/user.service.js"></script> --> <!-- Fake user service for demo that uses local storage --> <!--<script src="app-services/user.service.local-storage.js"></script>\n\n    <script src="home/home.controller.js"></script>\n    <script src="login/login.controller.js"></script>\n    <script src="register/register.controller.js"></script>--> </body> '),a.put("views/login.html",'<style>body    { padding-top:30px; }</style> <div class="col-md-6 col-md-offset-3"> <h2>Login</h2> <!-- <div ng-show="vm.error" class="alert alert-danger"> {{vm.error}} </div> --> <!-- <form name="LoginForm" ng-submit="vm.login()" role="form" ></form> --> <!-- apply angular app and controller to our body --> <div class="form-group" ng-class="{ \'has-error\': form.username.$dirty && form.username.$error.required }"> <label for="username">Username</label> <input type="text" name="username" id="username" class="form-control" ng-model="vm.username" required> <span ng-show="LoginForm.username.$dirty && LoginForn.username.$error.required" class="help-block"> Username is required</span> </div> <div class="form-group" ng-class="{ \'has-error\': form.password.$dirty && form.password.$error.required }"> <label for="password">Password</label> <input type="password" name="password" id="password" class="form-control" ng-model="vm.password" required> <span ng-show="LoginForm.password.$dirty && LoginForn.password.$error.required" class="help-block"> Password is required</span> </div> <div class="form-actions"> <button type="submit" ng-disabled="form.$invalid || vm.dataLoading" class="btn btn-primary">Login</button> <img ng-if="vm.dataLoading" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="> <a href="#/register" class="btn btn-link"> Register</a> </div>  </div>'),a.put("views/main.html",'<div class="jumbotron"> <h1>\'Allo, \'Allo!</h1> <p class="lead"> <img src="images/yeoman.8cb970fb.png" alt="I\'m Yeoman"><br> Always a pleasure scaffolding your apps. </p> <p><a class="btn btn-lg btn-success" ng-href="#/">Splendid!<span class="glyphicon glyphicon-ok"></span></a></p> </div> <div class="row marketing"> <h4>HTML5 Boilerplate</h4> <p> HTML5 Boilerplate is a professional front-end template for building fast, robust, and adaptable web apps or sites. </p> <h4>Angular</h4> <p> AngularJS is a toolset for building the framework most suited to your application development. </p> <h4>Karma</h4> <p>Spectacular Test Runner for JavaScript.</p> </div>'),a.put("views/register.html",'<style>body    { padding-top:30px; }</style> <div class="col-md-6 col-md-offset-3"> <h2>Register</h2> <!--  <div ng-show="vm.error" class="alert alert-danger">{{vm.error}}</div> --> <form name="RegisterForm" ng-submit="vm.register()" role="form"> <div class="form-group" ng-class="{ \'has-error\': RegisterForm.firstName.$dirty && RegisterForm.firstName.$error.required }"> <label for="firstname">First Name</label> <input type="text" name="firstName" id="firstName" class="form-control" ng-model="vm.user.cust_name" required> <span ng-show="RegisterForm.firstName.$dirty && RegisterForm.firstName.$error.required" class="help-block">First name is required</span> </div> <div class="form-group" ng-class="{ \'has-error\': RegisterForm.lastName.$dirty && RegisterForm.lastName.$error.required }"> <label for="lastname">Last Name</label> <input type="text" name="lastName" id="lastName" class="form-control" ng-model="vm.user.lastName" required> <span ng-show="RegisterForm.lastName.$dirty && RegisterForm.lastName.$error.required" class="help-block">First name is required</span> </div> <div class="form-group" ng-class="{ \'has-error\': RegisterForm.emailId.$dirty && RegisterForm.emailId.$error.required }"> <label for="emailid">Email ID</label> <input type="text" name="emailId" id="Text1" class="form-control" ng-model="vm.user.cust_email" required> <span ng-show="RegisterForm.emailId.$dirty && RegisterForm.emailId.$error.required" class="help-block">Last name is required</span> </div> <div class="form-group" ng-class="{ \'has-error\': RegisterForm.number.$dirty && RegisterForm.number.$error.required }"> <label for="number">Number</label> <input type="text" name="number" id="number" class="form-control" ng-model="vm.user.cust_number" required> <span ng-show="RegisterForm.number.$dirty && RegisterForm.number.$error.required" class="help-block">Username is required</span> </div> <div class="form-group" ng-class="{ \'has-error\': RegisterForm.password.$dirty && RegisterForm.password.$error.required }"> <label for="password">Password</label> <input type="password" name="password" id="password" class="form-control" ng-model="vm.user.cust_pass" required> <span ng-show="RegisterForm.password.$dirty && RegisterForm.password.$error.required" class="help-block">Password is required</span> </div> <div class="form-actions"> <button type="submit" ng-disabled="RegisterForm.$invalid || vm.dataLoading" class="btn btn-primary">Register</button> <img ng-if="vm.dataLoading" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="> <a href="#/login" class="btn btn-link">Cancel</a> </div> </form> </div>');
}]);