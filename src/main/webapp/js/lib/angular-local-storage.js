(function() {/*jshint globalstrict:true*/
	'use strict';

	var isDefined = angular.isDefined,
		isUndefined = angular.isUndefined,
		isNumber = angular.isNumber,
		isObject = angular.isObject,
		isArray = angular.isArray,
		extend = angular.extend,
		toJson = angular.toJson,
		fromJson = angular.fromJson;


	// Test if string is only contains numbers
	// e.g '1' => true, "'1'" => true
	function isStringNumber(num) {
		return  /^-?\d+\.?\d*$/.test(num.replace(/["']/g, ''));
	}

	var angularLocalStorage=angular.module("LocalStorageModule",[]);angularLocalStorage.provider("localStorageService",function(){this.prefix="ls";this.storageType="localStorage";this.cookie={expiry:30,path:"/"};this.notify={setItem:true,removeItem:false};this.setPrefix=function(e){this.prefix=e;return this};this.setStorageType=function(e){this.storageType=e;return this};this.setStorageCookie=function(e,t){this.cookie={expiry:e,path:t};return this};this.setStorageCookieDomain=function(e){this.cookie.domain=e;return this};this.setNotify=function(e,t){this.notify={setItem:e,removeItem:t};return this};this.$get=["$rootScope","$window","$document","$parse",function(e,t,n,r){var i=this;var s=i.prefix;var o=i.cookie;var u=i.notify;var a=i.storageType;var f;if(!n){n=document}else if(n[0]){n=n[0]}if(s.substr(-1)!=="."){s=!!s?s+".":""}var l=function(e){return s+e};var c=function(){try{var n=a in t&&t[a]!==null;var r=l("__"+Math.round(Math.random()*1e7));if(n){f=t[a];f.setItem(r,"");f.removeItem(r)}return n}catch(i){a="cookie";e.$broadcast("LocalStorageModule.notification.error",i.message);return false}}();var h=function(t,n){if(isUndefined(n)){n=null}else if(isObject(n)||isArray(n)||isNumber(+n||n)){n=toJson(n)}if(!c||i.storageType==="cookie"){if(!c){e.$broadcast("LocalStorageModule.notification.warning","LOCAL_STORAGE_NOT_SUPPORTED")}if(u.setItem){e.$broadcast("LocalStorageModule.notification.setitem",{key:t,newvalue:n,storageType:"cookie"})}return y(t,n)}try{if(isObject(n)||isArray(n)){n=toJson(n)}if(f){f.setItem(l(t),n)}if(u.setItem){e.$broadcast("LocalStorageModule.notification.setitem",{key:t,newvalue:n,storageType:i.storageType})}}catch(r){e.$broadcast("LocalStorageModule.notification.error",r.message);return y(t,n)}return true};var p=function(t){if(!c||i.storageType==="cookie"){if(!c){e.$broadcast("LocalStorageModule.notification.warning","LOCAL_STORAGE_NOT_SUPPORTED")}return b(t)}var n=f?f.getItem(l(t)):null;if(!n||n==="null"){return null}if(n.charAt(0)==="{"||n.charAt(0)==="["||isStringNumber(n)){return fromJson(n)}return n};var d=function(t){if(!c||i.storageType==="cookie"){if(!c){e.$broadcast("LocalStorageModule.notification.warning","LOCAL_STORAGE_NOT_SUPPORTED")}if(u.removeItem){e.$broadcast("LocalStorageModule.notification.removeitem",{key:t,storageType:"cookie"})}return w(t)}try{f.removeItem(l(t));if(u.removeItem){e.$broadcast("LocalStorageModule.notification.removeitem",{key:t,storageType:i.storageType})}}catch(n){e.$broadcast("LocalStorageModule.notification.error",n.message);return w(t)}return true};var v=function(){if(!c){e.$broadcast("LocalStorageModule.notification.warning","LOCAL_STORAGE_NOT_SUPPORTED");return false}var t=s.length;var n=[];for(var r in f){if(r.substr(0,t)===s){try{n.push(r.substr(t))}catch(i){e.$broadcast("LocalStorageModule.notification.error",i.Description);return[]}}}return n};var m=function(t){t=t||"";var n=s.slice(0,-1);var r=new RegExp(n+"."+t);if(!c||i.storageType==="cookie"){if(!c){e.$broadcast("LocalStorageModule.notification.warning","LOCAL_STORAGE_NOT_SUPPORTED")}return E()}var o=s.length;for(var u in f){if(r.test(u)){try{d(u.substr(o))}catch(a){e.$broadcast("LocalStorageModule.notification.error",a.message);return E()}}}return true};var g=function(){try{return t.navigator.cookieEnabled||"cookie"in n&&(n.cookie.length>0||(n.cookie="test").indexOf.call(n.cookie,"test")>-1)}catch(r){e.$broadcast("LocalStorageModule.notification.error",r.message);return false}}();var y=function(t,r){if(isUndefined(r)){return false}else if(isArray(r)||isObject(r)){r=toJson(r)}if(!g){e.$broadcast("LocalStorageModule.notification.error","COOKIES_NOT_SUPPORTED");return false}try{var i="",s=new Date,u="";if(r===null){s.setTime(s.getTime()+ -1*24*60*60*1e3);i="; expires="+s.toGMTString();r=""}else if(o.expiry!==0){s.setTime(s.getTime()+o.expiry*24*60*60*1e3);i="; expires="+s.toGMTString()}if(!!t){var a="; path="+o.path;if(o.domain){u="; domain="+o.domain}n.cookie=l(t)+"="+encodeURIComponent(r)+i+a+u}}catch(f){e.$broadcast("LocalStorageModule.notification.error",f.message);return false}return true};var b=function(t){if(!g){e.$broadcast("LocalStorageModule.notification.error","COOKIES_NOT_SUPPORTED");return false}var r=n.cookie&&n.cookie.split(";")||[];for(var i=0;i<r.length;i++){var o=r[i];while(o.charAt(0)===" "){o=o.substring(1,o.length)}if(o.indexOf(l(t)+"=")===0){var u=decodeURIComponent(o.substring(s.length+t.length+1,o.length));try{var a=JSON.parse(u);return fromJson(a)}catch(f){return u}}}return null};var w=function(e){y(e,null)};var E=function(){var e=null,t=null;var r=s.length;var i=n.cookie.split(";");for(var o=0;o<i.length;o++){e=i[o];while(e.charAt(0)===" "){e=e.substring(1,e.length)}var u=e.substring(r,e.indexOf("="));w(u)}};var S=function(){return a};var x=function(e,t,n,i){i=i||t;var s=p(i);if(s===null&&isDefined(n)){s=n}else if(isObject(s)&&isObject(n)){s=extend(n,s)}r(t).assign(e,s);return e.$watch(t,function(e){h(i,e)},isObject(e[t]))};var T=function(){var e=0;var n=t[a];for(var r=0;r<n.length;r++){if(n.key(r).indexOf(s)===0){e++}}return e};return{isSupported:c,getStorageType:S,set:h,add:h,get:p,keys:v,remove:d,clearAll:m,bind:x,deriveKey:l,length:T,cookie:{isSupported:g,set:y,add:y,get:b,remove:w,clearAll:E}}}]});

})();