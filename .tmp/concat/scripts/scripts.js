'use strict';

/**
 * @ngdoc overview
 * @name DrivenApp
 * @description
 * # DrivenApp
 *
 * Main module of the application.
 */


  (function () {
    'use strict';

    angular
      .module('DrivenApp', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch'
      ])
      .config(config)
      .run(run);

    config.$inject = ['$routeProvider', '$locationProvider'];

    function config($routeProvider, $locationProvider) {
      $routeProvider
        .when('/', {
          templateUrl: 'app/views/home.html',
          controller: 'HomeCtrl',
          controllerAs: 'home'
        })
        .when('/about', {
          templateUrl: 'app/views/about.html',
          controller: 'AboutCtrl',
          controllerAs: 'about'
        })
        .when('/faq', {
          templateUrl: 'app/views/faq.html',
          controller: 'FaqCtrl',
          controllerAs: 'faq'
        })
        .when('/login', {
          templateUrl: 'app/views/login.html',
          controller: 'LoginCtrl',
          controllerAs: 'login'
        })
        .when('/register', {
          templateUrl: 'app/views/register.html',
          controller: 'RegisterCtrl',
          controllerAs: 'register'
        })
        .when('/booking', {
          templateUrl: 'app/views/booking.html',
          controller: 'BookingCtrl',
          controllerAs: 'booking'
        })
        .when('/fare', {
          templateUrl: 'app/views/fare.html',
          controller: 'FareCtrl',
          controllerAs: 'fare'
        })
        .otherwise({
          redirectTo: '/login'
        });
    }

    run.$inject = ['$rootScope', '$location', '$cookieStore', '$http'];

    function run($rootScope, $location, $cookieStore, $http) {
      //keep user logged in after page refresh

      $rootScope.globals = $cookieStore.get('globals') || {};
      if($rootScope.globals.currentUser) {
        $http.defaults.headers.common['Authorization'] = 'Basic' + $rootScope.globals.currentUser.authdata;
      }

      $rootScope.$on('$locationChangeStart', function (event, next, current) {
        //redirect to login page if not logged in and trying to access a restricted page
        var restrictedPage = $.inArray($location.path(), ['/login', '/register', '/home', '/faq', '/booking', '/fare', '/contact']) === -1;
        var loggedIn = $rootScope.globals.currentUser;

       /* if(restrictedPage && !loggedIn) {
          $location.path('/login');
        }*/
      });

    }


  }) ();

'use strict';

/**
 * @ngdoc function
 * @name DrivenApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the DrivenApp
 */
angular.module('DrivenApp')
  .controller('MainCtrl', function () {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });

'use strict';

/**
 * @ngdoc function
 * @name DrivenApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the DrivenApp
 */
angular.module('DrivenApp')
  .controller('AboutCtrl', function () {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });

( function () {

	'use strict';

	angular
		.module('DrivenApp')
		.factory('AuthenticationService', AuthenticationService);


	AuthenticationService.$inject = ['$http', '$cookieStore', '$rootScope', '$timeout', 'UserService'];

	function AuthenticationService($http, $cookieStore, $rootScope, $timeout, UserService) {
		var service = {};

		service.Login = Login;
		service.SetCredentials = SetCredentials;
		service.ClearCredentials = ClearCredentials;

		return service;

		function Login(number, password, callback) {
			$http.post('driverr-app.herokuapp.com/api/login', {number: number, password: password})
				.success(function(response) {
					callback(response);
				});
		}


		function SetCredentials(number, password) {
			var authdata = Base64.encode(number + ":" + password);

			$rootScope.globals = {
				currentUser: {
					number: number,
					authdata: authdata
				} 
			};

			$http.defaults.headers.common['Authorization'] = 'Basic' + authdata;
			$cookieStore.put('globals', $rootScope.globals);
		}

		function ClearCredentials() {
			$rootScope.globals = {};
			$cookieStore.remove('globals');
			$http.defaults.headers.common.Authorization = 'Basic';
		}
	}

//base64 encoding service used by AuthenticationService - copy pasted, high risk code
	var Base64 = {
 
        keyStr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
 
        encode: function (input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;
 
            do {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);
 
                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;
 
                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }
 
                output = output +
                    this.keyStr.charAt(enc1) +
                    this.keyStr.charAt(enc2) +
                    this.keyStr.charAt(enc3) +
                    this.keyStr.charAt(enc4);
                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";
            } while (i < input.length);
 
            return output;
        },
 
        decode: function (input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;
 
            // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
            var base64test = /[^A-Za-z0-9\+\/\=]/g;
            if (base64test.exec(input)) {
                window.alert("There were invalid base64 characters in the input text.\n" +
                    "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
                    "Expect errors in decoding.");
            }
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
 
            do {
                enc1 = this.keyStr.indexOf(input.charAt(i++));
                enc2 = this.keyStr.indexOf(input.charAt(i++));
                enc3 = this.keyStr.indexOf(input.charAt(i++));
                enc4 = this.keyStr.indexOf(input.charAt(i++));
 
                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;
 
                output = output + String.fromCharCode(chr1);
 
                if (enc3 != 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 != 64) {
                    output = output + String.fromCharCode(chr3);
                }
 
                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";
 
            } while (i < input.length);
 
            return output;
        }
    };

}) ();
(function () {
	
	'use strict';

	angular
		.module('DrivenApp')
		.controller('LoginCtrl', LoginCtrl)

	LoginCtrl.$inject = ['$location', 'AuthenticationService', 'FlashService'];
	
	function LoginCtrl($location, AuthenticationService, FlashService) {
		var vm = this;

		vm.login = login;

		( function initController() {
			//reset login status
			AuthenticationService.ClearCredentials();
		}) ();

		function login() {
			vm.dataLoading = true;

			AuthenticationService.Login(vm.number, vm.password, function(response) {
				if(response.success) {
					AuthenticationService.SetCredentials(vm.number, vm.password);
					$location.path('/');
				}
				else {
					FlashService.Error(response.message);
					vm.dataLoading = false;
				}
			});
		};
	}	


}) ();


(function () {
	'use strict';

	angular
		.module('DrivenApp')
		.controller('RegisterCtrl', RegisterCtrl);

	RegisterCtrl.$inject = ['UserService', '$location', '$rootScope', 'FlashService'];

	function RegisterCtrl(UserService, $location, $rootScope, FlashService) {
		var vm = this;

		vm.register = register;

		function register() {
			vm.dataLoading = true;
			UserService.Create(vm.user)
			.then(function (response) {
				if (response.success) {
					FlashService.Success('Registration successful', true);
					$location.path('/login');
				}
				else {
					FlashService.Error(response.message);
					vm.dataLoading = false;
				}
			});
		}
	}


}) ();
( function () {

	'use strict';

	angular
		.module('DrivenApp')
		.factory('UserService', UserService);

	UserService.$inject = ['$http'];

	function UserService($http) {
		var service = {};

		service.GetAll = GetAll;
		service.GetById = GetById;
		service.GetByUsername = GetByUsername;
		service.Create = Create;
		service.Update = Update;
		service.Delete = Delete;

		return service;
	
		function GetAll() {
			return $http.get('/api/users').then(handleSuccess, handleError('Error getting all users'));
		}

		function GetById() {
			return $http.get('/api/users/' + id).then(handleSuccess, handleError('Error getting user by Id'));
		}


		function GetByUsername() {
			return $http.get('/api/users/' + username).then(handleSuccess, handleError('Error getting user by Id'));
		}

		function Create(user) {
			return $http.post('driverr-app.herokuapp.com/api/register', user).then(handleSuccess, handleError('Error creating user'));
		}

		function Update(user) {
			return $http.put('/api/users/' + user.id, user).then(handleSuccess, handleError('Error updating user'));
		}

		function Delete(id) {
			return $http.delete('/api/users/' + id).then(handleSuccess, handleError('Error deleting user'));
		}


		//private functions

		function handleSuccess(res) {
			return res.data;
		}

		function handleError(error) {
			return function () {
				return { success: false, message: error };
			};
		}


	}


}) ();
/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Uses the built in easing capabilities added In jQuery 1.1
 * to offer multiple easing options
 *
 * TERMS OF USE - EASING EQUATIONS
 * 
 * Open source under the BSD License. 
 * 
 * Copyright Ã‚Â© 2001 Robert Penner
 * All rights reserved.
 *
 * TERMS OF USE - jQuery Easing
 * 
 * Open source under the BSD License. 
 * 
 * Copyright Ã‚Â© 2008 George McGinley Smith
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
*/
jQuery.easing.jswing=jQuery.easing.swing;jQuery.extend(jQuery.easing,{def:"easeOutQuad",swing:function(e,f,a,h,g){return jQuery.easing[jQuery.easing.def](e,f,a,h,g)},easeInQuad:function(e,f,a,h,g){return h*(f/=g)*f+a},easeOutQuad:function(e,f,a,h,g){return -h*(f/=g)*(f-2)+a},easeInOutQuad:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f+a}return -h/2*((--f)*(f-2)-1)+a},easeInCubic:function(e,f,a,h,g){return h*(f/=g)*f*f+a},easeOutCubic:function(e,f,a,h,g){return h*((f=f/g-1)*f*f+1)+a},easeInOutCubic:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f*f+a}return h/2*((f-=2)*f*f+2)+a},easeInQuart:function(e,f,a,h,g){return h*(f/=g)*f*f*f+a},easeOutQuart:function(e,f,a,h,g){return -h*((f=f/g-1)*f*f*f-1)+a},easeInOutQuart:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f*f*f+a}return -h/2*((f-=2)*f*f*f-2)+a},easeInQuint:function(e,f,a,h,g){return h*(f/=g)*f*f*f*f+a},easeOutQuint:function(e,f,a,h,g){return h*((f=f/g-1)*f*f*f*f+1)+a},easeInOutQuint:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f*f*f*f+a}return h/2*((f-=2)*f*f*f*f+2)+a},easeInSine:function(e,f,a,h,g){return -h*Math.cos(f/g*(Math.PI/2))+h+a},easeOutSine:function(e,f,a,h,g){return h*Math.sin(f/g*(Math.PI/2))+a},easeInOutSine:function(e,f,a,h,g){return -h/2*(Math.cos(Math.PI*f/g)-1)+a},easeInExpo:function(e,f,a,h,g){return(f==0)?a:h*Math.pow(2,10*(f/g-1))+a},easeOutExpo:function(e,f,a,h,g){return(f==g)?a+h:h*(-Math.pow(2,-10*f/g)+1)+a},easeInOutExpo:function(e,f,a,h,g){if(f==0){return a}if(f==g){return a+h}if((f/=g/2)<1){return h/2*Math.pow(2,10*(f-1))+a}return h/2*(-Math.pow(2,-10*--f)+2)+a},easeInCirc:function(e,f,a,h,g){return -h*(Math.sqrt(1-(f/=g)*f)-1)+a},easeOutCirc:function(e,f,a,h,g){return h*Math.sqrt(1-(f=f/g-1)*f)+a},easeInOutCirc:function(e,f,a,h,g){if((f/=g/2)<1){return -h/2*(Math.sqrt(1-f*f)-1)+a}return h/2*(Math.sqrt(1-(f-=2)*f)+1)+a},easeInElastic:function(f,h,e,l,k){var i=1.70158;var j=0;var g=l;if(h==0){return e}if((h/=k)==1){return e+l}if(!j){j=k*0.3}if(g<Math.abs(l)){g=l;var i=j/4}else{var i=j/(2*Math.PI)*Math.asin(l/g)}return -(g*Math.pow(2,10*(h-=1))*Math.sin((h*k-i)*(2*Math.PI)/j))+e},easeOutElastic:function(f,h,e,l,k){var i=1.70158;var j=0;var g=l;if(h==0){return e}if((h/=k)==1){return e+l}if(!j){j=k*0.3}if(g<Math.abs(l)){g=l;var i=j/4}else{var i=j/(2*Math.PI)*Math.asin(l/g)}return g*Math.pow(2,-10*h)*Math.sin((h*k-i)*(2*Math.PI)/j)+l+e},easeInOutElastic:function(f,h,e,l,k){var i=1.70158;var j=0;var g=l;if(h==0){return e}if((h/=k/2)==2){return e+l}if(!j){j=k*(0.3*1.5)}if(g<Math.abs(l)){g=l;var i=j/4}else{var i=j/(2*Math.PI)*Math.asin(l/g)}if(h<1){return -0.5*(g*Math.pow(2,10*(h-=1))*Math.sin((h*k-i)*(2*Math.PI)/j))+e}return g*Math.pow(2,-10*(h-=1))*Math.sin((h*k-i)*(2*Math.PI)/j)*0.5+l+e},easeInBack:function(e,f,a,i,h,g){if(g==undefined){g=1.70158}return i*(f/=h)*f*((g+1)*f-g)+a},easeOutBack:function(e,f,a,i,h,g){if(g==undefined){g=1.70158}return i*((f=f/h-1)*f*((g+1)*f+g)+1)+a},easeInOutBack:function(e,f,a,i,h,g){if(g==undefined){g=1.70158}if((f/=h/2)<1){return i/2*(f*f*(((g*=(1.525))+1)*f-g))+a}return i/2*((f-=2)*f*(((g*=(1.525))+1)*f+g)+2)+a},easeInBounce:function(e,f,a,h,g){return h-jQuery.easing.easeOutBounce(e,g-f,0,h,g)+a},easeOutBounce:function(e,f,a,h,g){if((f/=g)<(1/2.75)){return h*(7.5625*f*f)+a}else{if(f<(2/2.75)){return h*(7.5625*(f-=(1.5/2.75))*f+0.75)+a}else{if(f<(2.5/2.75)){return h*(7.5625*(f-=(2.25/2.75))*f+0.9375)+a}else{return h*(7.5625*(f-=(2.625/2.75))*f+0.984375)+a}}}},easeInOutBounce:function(e,f,a,h,g){if(f<g/2){return jQuery.easing.easeInBounce(e,f*2,0,h,g)*0.5+a}return jQuery.easing.easeOutBounce(e,f*2-g,0,h,g)*0.5+h*0.5+a}});
/*global jQuery */
/*!
* FitText.js 1.2
*
* Copyright 2011, Dave Rupert http://daverupert.com
* Released under the WTFPL license
* http://sam.zoy.org/wtfpl/
*
* Date: Thu May 05 14:23:00 2011 -0600
*/

(function( $ ){

  $.fn.fitText = function( kompressor, options ) {

    // Setup options
    var compressor = kompressor || 1,
        settings = $.extend({
          'minFontSize' : Number.NEGATIVE_INFINITY,
          'maxFontSize' : Number.POSITIVE_INFINITY
        }, options);

    return this.each(function(){

      // Store the object
      var $this = $(this);

      // Resizer() resizes items based on the object width divided by the compressor * 10
      var resizer = function () {
        $this.css('font-size', Math.max(Math.min($this.width() / (compressor*10), parseFloat(settings.maxFontSize)), parseFloat(settings.minFontSize)));
      };

      // Call once to set.
      resizer();

      // Call on resize. Opera debounces their resize by default.
      $(window).on('resize.fittext orientationchange.fittext', resizer);

    });

  };

})( jQuery );

/*! WOW - v1.1.2 - 2015-04-07
* Copyright (c) 2015 Matthieu Aussaguel; Licensed MIT */(function(){var a,b,c,d,e,f=function(a,b){return function(){return a.apply(b,arguments)}},g=[].indexOf||function(a){for(var b=0,c=this.length;c>b;b++)if(b in this&&this[b]===a)return b;return-1};b=function(){function a(){}return a.prototype.extend=function(a,b){var c,d;for(c in b)d=b[c],null==a[c]&&(a[c]=d);return a},a.prototype.isMobile=function(a){return/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(a)},a.prototype.createEvent=function(a,b,c,d){var e;return null==b&&(b=!1),null==c&&(c=!1),null==d&&(d=null),null!=document.createEvent?(e=document.createEvent("CustomEvent"),e.initCustomEvent(a,b,c,d)):null!=document.createEventObject?(e=document.createEventObject(),e.eventType=a):e.eventName=a,e},a.prototype.emitEvent=function(a,b){return null!=a.dispatchEvent?a.dispatchEvent(b):b in(null!=a)?a[b]():"on"+b in(null!=a)?a["on"+b]():void 0},a.prototype.addEvent=function(a,b,c){return null!=a.addEventListener?a.addEventListener(b,c,!1):null!=a.attachEvent?a.attachEvent("on"+b,c):a[b]=c},a.prototype.removeEvent=function(a,b,c){return null!=a.removeEventListener?a.removeEventListener(b,c,!1):null!=a.detachEvent?a.detachEvent("on"+b,c):delete a[b]},a.prototype.innerHeight=function(){return"innerHeight"in window?window.innerHeight:document.documentElement.clientHeight},a}(),c=this.WeakMap||this.MozWeakMap||(c=function(){function a(){this.keys=[],this.values=[]}return a.prototype.get=function(a){var b,c,d,e,f;for(f=this.keys,b=d=0,e=f.length;e>d;b=++d)if(c=f[b],c===a)return this.values[b]},a.prototype.set=function(a,b){var c,d,e,f,g;for(g=this.keys,c=e=0,f=g.length;f>e;c=++e)if(d=g[c],d===a)return void(this.values[c]=b);return this.keys.push(a),this.values.push(b)},a}()),a=this.MutationObserver||this.WebkitMutationObserver||this.MozMutationObserver||(a=function(){function a(){"undefined"!=typeof console&&null!==console&&console.warn("MutationObserver is not supported by your browser."),"undefined"!=typeof console&&null!==console&&console.warn("WOW.js cannot detect dom mutations, please call .sync() after loading new content.")}return a.notSupported=!0,a.prototype.observe=function(){},a}()),d=this.getComputedStyle||function(a){return this.getPropertyValue=function(b){var c;return"float"===b&&(b="styleFloat"),e.test(b)&&b.replace(e,function(a,b){return b.toUpperCase()}),(null!=(c=a.currentStyle)?c[b]:void 0)||null},this},e=/(\-([a-z]){1})/g,this.WOW=function(){function e(a){null==a&&(a={}),this.scrollCallback=f(this.scrollCallback,this),this.scrollHandler=f(this.scrollHandler,this),this.resetAnimation=f(this.resetAnimation,this),this.start=f(this.start,this),this.scrolled=!0,this.config=this.util().extend(a,this.defaults),this.animationNameCache=new c,this.wowEvent=this.util().createEvent(this.config.boxClass)}return e.prototype.defaults={boxClass:"wow",animateClass:"animated",offset:0,mobile:!0,live:!0,callback:null},e.prototype.init=function(){var a;return this.element=window.document.documentElement,"interactive"===(a=document.readyState)||"complete"===a?this.start():this.util().addEvent(document,"DOMContentLoaded",this.start),this.finished=[]},e.prototype.start=function(){var b,c,d,e;if(this.stopped=!1,this.boxes=function(){var a,c,d,e;for(d=this.element.querySelectorAll("."+this.config.boxClass),e=[],a=0,c=d.length;c>a;a++)b=d[a],e.push(b);return e}.call(this),this.all=function(){var a,c,d,e;for(d=this.boxes,e=[],a=0,c=d.length;c>a;a++)b=d[a],e.push(b);return e}.call(this),this.boxes.length)if(this.disabled())this.resetStyle();else for(e=this.boxes,c=0,d=e.length;d>c;c++)b=e[c],this.applyStyle(b,!0);return this.disabled()||(this.util().addEvent(window,"scroll",this.scrollHandler),this.util().addEvent(window,"resize",this.scrollHandler),this.interval=setInterval(this.scrollCallback,50)),this.config.live?new a(function(a){return function(b){var c,d,e,f,g;for(g=[],c=0,d=b.length;d>c;c++)f=b[c],g.push(function(){var a,b,c,d;for(c=f.addedNodes||[],d=[],a=0,b=c.length;b>a;a++)e=c[a],d.push(this.doSync(e));return d}.call(a));return g}}(this)).observe(document.body,{childList:!0,subtree:!0}):void 0},e.prototype.stop=function(){return this.stopped=!0,this.util().removeEvent(window,"scroll",this.scrollHandler),this.util().removeEvent(window,"resize",this.scrollHandler),null!=this.interval?clearInterval(this.interval):void 0},e.prototype.sync=function(){return a.notSupported?this.doSync(this.element):void 0},e.prototype.doSync=function(a){var b,c,d,e,f;if(null==a&&(a=this.element),1===a.nodeType){for(a=a.parentNode||a,e=a.querySelectorAll("."+this.config.boxClass),f=[],c=0,d=e.length;d>c;c++)b=e[c],g.call(this.all,b)<0?(this.boxes.push(b),this.all.push(b),this.stopped||this.disabled()?this.resetStyle():this.applyStyle(b,!0),f.push(this.scrolled=!0)):f.push(void 0);return f}},e.prototype.show=function(a){return this.applyStyle(a),a.className=a.className+" "+this.config.animateClass,null!=this.config.callback&&this.config.callback(a),this.util().emitEvent(a,this.wowEvent),this.util().addEvent(a,"animationend",this.resetAnimation),this.util().addEvent(a,"oanimationend",this.resetAnimation),this.util().addEvent(a,"webkitAnimationEnd",this.resetAnimation),this.util().addEvent(a,"MSAnimationEnd",this.resetAnimation),a},e.prototype.applyStyle=function(a,b){var c,d,e;return d=a.getAttribute("data-wow-duration"),c=a.getAttribute("data-wow-delay"),e=a.getAttribute("data-wow-iteration"),this.animate(function(f){return function(){return f.customStyle(a,b,d,c,e)}}(this))},e.prototype.animate=function(){return"requestAnimationFrame"in window?function(a){return window.requestAnimationFrame(a)}:function(a){return a()}}(),e.prototype.resetStyle=function(){var a,b,c,d,e;for(d=this.boxes,e=[],b=0,c=d.length;c>b;b++)a=d[b],e.push(a.style.visibility="visible");return e},e.prototype.resetAnimation=function(a){var b;return a.type.toLowerCase().indexOf("animationend")>=0?(b=a.target||a.srcElement,b.className=b.className.replace(this.config.animateClass,"").trim()):void 0},e.prototype.customStyle=function(a,b,c,d,e){return b&&this.cacheAnimationName(a),a.style.visibility=b?"hidden":"visible",c&&this.vendorSet(a.style,{animationDuration:c}),d&&this.vendorSet(a.style,{animationDelay:d}),e&&this.vendorSet(a.style,{animationIterationCount:e}),this.vendorSet(a.style,{animationName:b?"none":this.cachedAnimationName(a)}),a},e.prototype.vendors=["moz","webkit"],e.prototype.vendorSet=function(a,b){var c,d,e,f;d=[];for(c in b)e=b[c],a[""+c]=e,d.push(function(){var b,d,g,h;for(g=this.vendors,h=[],b=0,d=g.length;d>b;b++)f=g[b],h.push(a[""+f+c.charAt(0).toUpperCase()+c.substr(1)]=e);return h}.call(this));return d},e.prototype.vendorCSS=function(a,b){var c,e,f,g,h,i;for(h=d(a),g=h.getPropertyCSSValue(b),f=this.vendors,c=0,e=f.length;e>c;c++)i=f[c],g=g||h.getPropertyCSSValue("-"+i+"-"+b);return g},e.prototype.animationName=function(a){var b;try{b=this.vendorCSS(a,"animation-name").cssText}catch(c){b=d(a).getPropertyValue("animation-name")}return"none"===b?"":b},e.prototype.cacheAnimationName=function(a){return this.animationNameCache.set(a,this.animationName(a))},e.prototype.cachedAnimationName=function(a){return this.animationNameCache.get(a)},e.prototype.scrollHandler=function(){return this.scrolled=!0},e.prototype.scrollCallback=function(){var a;return!this.scrolled||(this.scrolled=!1,this.boxes=function(){var b,c,d,e;for(d=this.boxes,e=[],b=0,c=d.length;c>b;b++)a=d[b],a&&(this.isVisible(a)?this.show(a):e.push(a));return e}.call(this),this.boxes.length||this.config.live)?void 0:this.stop()},e.prototype.offsetTop=function(a){for(var b;void 0===a.offsetTop;)a=a.parentNode;for(b=a.offsetTop;a=a.offsetParent;)b+=a.offsetTop;return b},e.prototype.isVisible=function(a){var b,c,d,e,f;return c=a.getAttribute("data-wow-offset")||this.config.offset,f=window.pageYOffset,e=f+Math.min(this.element.clientHeight,this.util().innerHeight())-c,d=this.offsetTop(a),b=d+a.clientHeight,e>=d&&b>=f},e.prototype.util=function(){return null!=this._util?this._util:this._util=new b},e.prototype.disabled=function(){return!this.config.mobile&&this.util().isMobile(navigator.userAgent)},e}()}).call(this);
/*!
 * Start Bootstrap - Creative Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 */

(function($) {
    "use strict"; // Start of use strict

    // jQuery for page scrolling feature - requires jQuery Easing plugin
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: ($($anchor.attr('href')).offset().top - 50)
        }, 1250, 'easeInOutExpo');
        event.preventDefault();
    });

    // Highlight the top nav as scrolling occurs
    $('body').scrollspy({
        target: '.navbar-fixed-top',
        offset: 51
    })

    // Closes the Responsive Menu on Menu Item Click
    $('.navbar-collapse ul li a').click(function() {
        $('.navbar-toggle:visible').click();
    });

    // Fit Text Plugin for Main Header
    $("h1").fitText(
        1.2, {
            minFontSize: '35px',
            maxFontSize: '65px'
        }
    );

    // Offset for Main Navigation
    $('#mainNav').affix({
        offset: {
            top: 100
        }
    })

    // Initialize WOW.js Scrolling Animations
    new WOW().init();

})(jQuery); // End of use strict

angular.module('DrivenApp').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('views/about.html',
    "<p>This is the about view.</p>"
  );


  $templateCache.put('views/booking.html',
    "<!-- index.html --><!DOCTYPE html> <html> <head> <!-- CSS ===================== --> <!-- load bootstrap --> <link rel=\"stylesheet\" href=\"http://netdna.bootstrapcdn.com/bootstrap/3.0.3/css/bootstrap.min.css\"> <style>body    { padding-top:30px; }</style> <!-- JS ===================== --> <!-- load angular --> <script src=\"http://code.angularjs.org/1.2.6/angular.js\"></script> <script src=\"app.js\"></script> </head> <!-- apply angular app and controller to our body --> <body ng-app=\"validationApp\" ng-controller=\"mainController\"> <div class=\"container\"> <div class=\"col-sm-8 col-sm-offset-2\"> <!-- PAGE HEADER --> <div class=\"page-header\"><h1>Form</h1></div> <!-- FORM --> <!-- pass in the variable if our form is valid or invalid --> <form name=\"userForm\" ng-submit=\"submitForm(userForm.$valid)\" novalidate> <!-- novalidate prevents HTML5 validation since we will be validating ourselves --> <!-- NAME --> <div class=\"form-group\"> <label>Name</label> <input type=\"text\" name=\"name\" class=\"form-control\" ng-model=\"name\" required> </div> <!-- NUMBER --> <div class=\"form-group\"> <label>Number</label> <input type=\"number\" name=\"number\" class=\"form-control\" ng-model=\"user.number\" ng-minlength=\"10\" ng-maxlength=\"10\"> </div> <!-- EMAIL --> <div class=\"form-group\"> <label>Email</label> <input type=\"email\" name=\"email\" class=\"form-control\" ng-model=\"email\"> </div> <!-- PICKUP LOCATION --> <div class=\"form-group\"> <label>Location</label> <input type=\"location\" name=\"location\" class=\"form-control\" ng-model=\"email\"> </div> <!-- PICKUP DATE/TIME --> <div class=\"form-group\"> <label>Date-time</label> <input type=\"date-time\" name=\"datetime\" class=\"form-control\" ng-model=\"email\"> </div> <!-- SUBMIT BUTTON --> <button type=\"submit\" class=\"btn btn-primary\">Submit</button> </form> </div><!-- col-sm-8 --> </div><!-- /container --> </body> </html>"
  );


  $templateCache.put('views/faq.html',
    "<div> <h1>A couple of questions to better explain what we're all about:</h1> <h2>What does Driven do?</h2> <p>We solve a major problem for everyone with a car in urban India - driving. We provide verified, reliable and trained drivers at hourly rates.</p> <h2>Great, I see how that helps! So how do I book a driver?</h2> <p>Its easy! Head over to the Bookings page or download our app from the Play Store. Then sign up with your email and number, select your pick up location, date and time, and there you go! Easy as pie!</p> <h2>Hey you guys don't seem to be in my locality! How many places are you operational in?</h2> <p>Sorry if we aren't servicing your area yet. We promise to be there soon! As of yet we service the whole of Mumbai, up to cetain parts of Navi Mumbai and Thane. But we're expanding fast and before you know it we'll be at your doorstep too.</p> <h2>This seems fantastic! But how do you ensure your drivers are verified and trustworthy?</h2> <p>All our drivers undergo a rigorous 3 step verification process, including a police verification, a background check by a professional agency and our very own ultra strict personality tests. We have high standards for each round and only the best drivers are finally selected.</p> <h2>How do I pay the driver? Do you guys have any credit card/e-wallet facilities?</h2> <p>Right now you can pay the driver in cash, but we're in the process of integrating support for cards as well as mobile wallets!</p> <h2>What happens in case of any mishaps?</h2> <p>Answer here. </p> <h2>Do you guys have any other special offers?</h2> <p>We just launched a Pair Booking feature aimed at office commuters. With this, we provide a driver to pick you up in the morning to drop you till your office. In the evening, you get another driver to pick you from office and drop you back home. So sit back and travel in the comfort of your own car without having to worry about navigating rush hour traffic!</p> <h2>Wow that's fantastic! How much does it cost?</h2> <p>We are giving an introductory price of Rs. 400 only, for one Pair Booking (to and fro included). You can check our normal pricing structure in the fare chart <a href=\"#/fare\">here</a>.</p> <h2>Do you servcie special requests like daily/weekly bookings or outstation drivers?</h2> <p>Yes we do, but on a case-by-case basis. It depends on the availability of our drivers. Please get in touch with one of our executives by calling any of our numbers, listed <a href=\"#/contact\">here</a>.</p> </div>"
  );


  $templateCache.put('views/fare.html',
    "<div>Our fare chart:</div> <h1>Hourly bookings:</h1> <p>Base fare (up to 1 hour): Rs. 200/-</p> <p>Rate per hour (from 2nd hour onwards): Rs. 100/-</p> <h1>Pair Bookings:</h1> <p>Rs. 400/- flat fee for a morning ride and an evening ride.</p> <p>Each ride can be of a maximum of 2 hours, following which we will charge Rs. 50 per hour, per ride.</p> <p>Pair bookings can only be from point A to B and back to A (home to office and back to home) and cannot be used to take the driver to any other places. Extra charges will be applicable, as per our normal hourly rates, in any such scenario.</p>"
  );


  $templateCache.put('views/home.html',
    "<body> <header> <div class=\"header-content\"> <div class=\"header-content-inner\"> <h1>Be Driven. Sit back and enjoy the ride.</h1> <hr> <p>Book a driver at the tap of a button and leave the rest to us. Be assured in the comfort of your own car!</p> <a href=\"#about\" class=\"btn btn-primary btn-xl page-scroll\">Find Out More</a> </div> </div> </header> <section class=\"bg-primary\" id=\"about\"> <div class=\"container\"> <div class=\"row\"> <div class=\"col-lg-8 col-lg-offset-2 text-center\"> <h2 class=\"section-heading\">We've got what you need!</h2> <hr class=\"light\"> <p class=\"text-faded\">Driven takes care of all your driving hassles - without removing the most integral part of it: your personal car. Forget worrying about finding a driver or hailing a cab. The future is here.</p> <a href=\"#/login\" class=\"btn btn-default btn-xl\">Get Started!</a> </div> </div> </div> </section> <section id=\"services\"> <div class=\"container\"> <div class=\"row\"> <div class=\"col-lg-12 text-center\"> <h2 class=\"section-heading\">At Your Service</h2> <hr class=\"primary\"> </div> </div> </div> <div class=\"container\"> <div class=\"row\"> <div class=\"col-lg-3 col-md-6 text-center\"> <div class=\"service-box\"> <i class=\"fa fa-4x fa-diamond wow bounceIn text-primary\"></i> <h3>Trained Drivers</h3> <p class=\"text-muted\">Our drivers are highly experienced and well trained. </p> </div> </div> <div class=\"col-lg-3 col-md-6 text-center\"> <div class=\"service-box\"> <i class=\"fa fa-4x fa-paper-plane wow bounceIn text-primary\" data-wow-delay=\".1s\"></i> <h3>Total safety</h3> <p class=\"text-muted\">Our drivers have rigorous background checks done and are trained for all kinds of situations.</p> </div> </div> <div class=\"col-lg-3 col-md-6 text-center\"> <div class=\"service-box\"> <i class=\"fa fa-4x fa-newspaper-o wow bounceIn text-primary\" data-wow-delay=\".2s\"></i> <h3>Office trips made easy</h3> <p class=\"text-muted\">We solve your office travel hassles by providing a driver in the morning and again in the evening, to drive you to and fro work.</p> </div> </div> <div class=\"col-lg-3 col-md-6 text-center\"> <div class=\"service-box\"> <i class=\"fa fa-4x fa-heart wow bounceIn text-primary\" data-wow-delay=\".3s\"></i> <h3>Made with Love</h3> <p class=\"text-muted\">We don't fuck around.</p> </div> </div> </div> </div> </section> <section class=\"no-padding\" id=\"portfolio\"> <div class=\"container-fluid\"> <div class=\"row no-gutter\"> <div class=\"col-lg-4 col-sm-6\"> <a href=\"#\" class=\"portfolio-box\"> <img src=\"img/portfolio/1.jpg\" class=\"img-responsive\" alt=\"\"> <div class=\"portfolio-box-caption\"> <div class=\"portfolio-box-caption-content\"> <div class=\"project-category text-faded\"> Category </div> <div class=\"project-name\"> Project Name </div> </div> </div> </a> </div> <div class=\"col-lg-4 col-sm-6\"> <a href=\"#\" class=\"portfolio-box\"> <img src=\"img/portfolio/2.jpg\" class=\"img-responsive\" alt=\"\"> <div class=\"portfolio-box-caption\"> <div class=\"portfolio-box-caption-content\"> <div class=\"project-category text-faded\"> Category </div> <div class=\"project-name\"> Project Name </div> </div> </div> </a> </div> <div class=\"col-lg-4 col-sm-6\"> <a href=\"#\" class=\"portfolio-box\"> <img src=\"img/portfolio/3.jpg\" class=\"img-responsive\" alt=\"\"> <div class=\"portfolio-box-caption\"> <div class=\"portfolio-box-caption-content\"> <div class=\"project-category text-faded\"> Category </div> <div class=\"project-name\"> Project Name </div> </div> </div> </a> </div> <div class=\"col-lg-4 col-sm-6\"> <a href=\"#\" class=\"portfolio-box\"> <img src=\"img/portfolio/4.jpg\" class=\"img-responsive\" alt=\"\"> <div class=\"portfolio-box-caption\"> <div class=\"portfolio-box-caption-content\"> <div class=\"project-category text-faded\"> Category </div> <div class=\"project-name\"> Project Name </div> </div> </div> </a> </div> <div class=\"col-lg-4 col-sm-6\"> <a href=\"#\" class=\"portfolio-box\"> <img src=\"img/portfolio/5.jpg\" class=\"img-responsive\" alt=\"\"> <div class=\"portfolio-box-caption\"> <div class=\"portfolio-box-caption-content\"> <div class=\"project-category text-faded\"> Category </div> <div class=\"project-name\"> Project Name </div> </div> </div> </a> </div> <div class=\"col-lg-4 col-sm-6\"> <a href=\"#\" class=\"portfolio-box\"> <img src=\"img/portfolio/6.jpg\" class=\"img-responsive\" alt=\"\"> <div class=\"portfolio-box-caption\"> <div class=\"portfolio-box-caption-content\"> <div class=\"project-category text-faded\"> Category </div> <div class=\"project-name\"> Project Name </div> </div> </div> </a> </div> </div> </div> </section> <aside class=\"bg-dark\"> <div class=\"container text-center\"> <div class=\"call-to-action\"> <h2>Free Download on the Google Play Store!</h2> <a href=\"https://play.google.com/store/apps/details?id=com.urbtranz.driven\" class=\"btn btn-default btn-xl wow tada\">Download Now!</a> </div> </div> </aside> <section id=\"contact\"> <div class=\"container\"> <div class=\"row\"> <div class=\"col-lg-8 col-lg-offset-2 text-center\"> <h2 class=\"section-heading\">Let's Get In Touch!</h2> <hr class=\"primary\"> <p>Want to talk to us? We'd love to hear back from you! Do check out the FAQs for some quick answers.</p> </div> <div class=\"col-lg-4 col-lg-offset-2 text-center\"> <i class=\"fa fa-phone fa-3x wow bounceIn\"></i> <p>123-456-6789</p> </div> <div class=\"col-lg-4 text-center\"> <i class=\"fa fa-envelope-o fa-3x wow bounceIn\" data-wow-delay=\".1s\"></i> <p><a href=\"mailto:support@getdriverr.com\">suport@getdriverr.com</a></p> </div> </div> </div> </section> <!-- \n" +
    "    <script src=\"//code.jquery.com/jquery-2.0.3.min.js\"></script>\n" +
    "    <script src=\"//code.angularjs.org/1.2.20/angular.js\"></script>\n" +
    "    <script src=\"//code.angularjs.org/1.2.20/angular-route.js\"></script>\n" +
    "    <script src=\"//code.angularjs.org/1.2.13/angular-cookies.js\"></script>\n" +
    "\n" +
    "    <script src=\"app.js\"></script>\n" +
    "    <script src=\"app-services/authentication.service.js\"></script>\n" +
    "    <script src=\"app-services/flash.service.js\"></script> --> <!-- Real user service that uses an api --> <!-- <script src=\"app-services/user.service.js\"></script> --> <!-- Fake user service for demo that uses local storage --> <!--<script src=\"app-services/user.service.local-storage.js\"></script>\n" +
    "\n" +
    "    <script src=\"home/home.controller.js\"></script>\n" +
    "    <script src=\"login/login.controller.js\"></script>\n" +
    "    <script src=\"register/register.controller.js\"></script>--> </body> "
  );


  $templateCache.put('views/login.html',
    "<style>body    { padding-top:30px; }</style> <div class=\"col-md-6 col-md-offset-3\"> <h2>Login</h2> <!-- <div ng-show=\"vm.error\" class=\"alert alert-danger\"> {{vm.error}} </div> --> <!-- <form name=\"LoginForm\" ng-submit=\"vm.login()\" role=\"form\" ></form> --> <!-- apply angular app and controller to our body --> <div class=\"form-group\" ng-class=\"{ 'has-error': form.username.$dirty && form.username.$error.required }\"> <label for=\"username\">Username</label> <input type=\"text\" name=\"username\" id=\"username\" class=\"form-control\" ng-model=\"vm.username\" required> <span ng-show=\"LoginForm.username.$dirty && LoginForn.username.$error.required\" class=\"help-block\"> Username is required</span> </div> <div class=\"form-group\" ng-class=\"{ 'has-error': form.password.$dirty && form.password.$error.required }\"> <label for=\"password\">Password</label> <input type=\"password\" name=\"password\" id=\"password\" class=\"form-control\" ng-model=\"vm.password\" required> <span ng-show=\"LoginForm.password.$dirty && LoginForn.password.$error.required\" class=\"help-block\"> Password is required</span> </div> <div class=\"form-actions\"> <button type=\"submit\" ng-disabled=\"form.$invalid || vm.dataLoading\" class=\"btn btn-primary\">Login</button> <img ng-if=\"vm.dataLoading\" src=\"data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==\"> <a href=\"#/register\" class=\"btn btn-link\"> Register</a> </div>  </div>"
  );


  $templateCache.put('views/main.html',
    "<div class=\"jumbotron\"> <h1>'Allo, 'Allo!</h1> <p class=\"lead\"> <img src=\"images/yeoman.png\" alt=\"I'm Yeoman\"><br> Always a pleasure scaffolding your apps. </p> <p><a class=\"btn btn-lg btn-success\" ng-href=\"#/\">Splendid!<span class=\"glyphicon glyphicon-ok\"></span></a></p> </div> <div class=\"row marketing\"> <h4>HTML5 Boilerplate</h4> <p> HTML5 Boilerplate is a professional front-end template for building fast, robust, and adaptable web apps or sites. </p> <h4>Angular</h4> <p> AngularJS is a toolset for building the framework most suited to your application development. </p> <h4>Karma</h4> <p>Spectacular Test Runner for JavaScript.</p> </div>"
  );


  $templateCache.put('views/register.html',
    "<style>body    { padding-top:30px; }</style> <div class=\"col-md-6 col-md-offset-3\"> <h2>Register</h2> <!--  <div ng-show=\"vm.error\" class=\"alert alert-danger\">{{vm.error}}</div> --> <form name=\"RegisterForm\" ng-submit=\"vm.register()\" role=\"form\"> <div class=\"form-group\" ng-class=\"{ 'has-error': RegisterForm.firstName.$dirty && RegisterForm.firstName.$error.required }\"> <label for=\"firstname\">First Name</label> <input type=\"text\" name=\"firstName\" id=\"firstName\" class=\"form-control\" ng-model=\"vm.user.cust_name\" required> <span ng-show=\"RegisterForm.firstName.$dirty && RegisterForm.firstName.$error.required\" class=\"help-block\">First name is required</span> </div> <div class=\"form-group\" ng-class=\"{ 'has-error': RegisterForm.lastName.$dirty && RegisterForm.lastName.$error.required }\"> <label for=\"lastname\">Last Name</label> <input type=\"text\" name=\"lastName\" id=\"lastName\" class=\"form-control\" ng-model=\"vm.user.lastName\" required> <span ng-show=\"RegisterForm.lastName.$dirty && RegisterForm.lastName.$error.required\" class=\"help-block\">First name is required</span> </div> <div class=\"form-group\" ng-class=\"{ 'has-error': RegisterForm.emailId.$dirty && RegisterForm.emailId.$error.required }\"> <label for=\"emailid\">Email ID</label> <input type=\"text\" name=\"emailId\" id=\"Text1\" class=\"form-control\" ng-model=\"vm.user.cust_email\" required> <span ng-show=\"RegisterForm.emailId.$dirty && RegisterForm.emailId.$error.required\" class=\"help-block\">Last name is required</span> </div> <div class=\"form-group\" ng-class=\"{ 'has-error': RegisterForm.number.$dirty && RegisterForm.number.$error.required }\"> <label for=\"number\">Number</label> <input type=\"text\" name=\"number\" id=\"number\" class=\"form-control\" ng-model=\"vm.user.cust_number\" required> <span ng-show=\"RegisterForm.number.$dirty && RegisterForm.number.$error.required\" class=\"help-block\">Username is required</span> </div> <div class=\"form-group\" ng-class=\"{ 'has-error': RegisterForm.password.$dirty && RegisterForm.password.$error.required }\"> <label for=\"password\">Password</label> <input type=\"password\" name=\"password\" id=\"password\" class=\"form-control\" ng-model=\"vm.user.cust_pass\" required> <span ng-show=\"RegisterForm.password.$dirty && RegisterForm.password.$error.required\" class=\"help-block\">Password is required</span> </div> <div class=\"form-actions\"> <button type=\"submit\" ng-disabled=\"RegisterForm.$invalid || vm.dataLoading\" class=\"btn btn-primary\">Register</button> <img ng-if=\"vm.dataLoading\" src=\"data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==\"> <a href=\"#/login\" class=\"btn btn-link\">Cancel</a> </div> </form> </div>"
  );

}]);
