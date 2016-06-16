window.matchMedia||(window.matchMedia=function(){"use strict";var t=window.styleMedia||window.media;if(!t){var e=document.createElement("style"),a=document.getElementsByTagName("script")[0],i=null;e.type="text/css",e.id="matchmediajs-test",a.parentNode.insertBefore(e,a),i="getComputedStyle"in window&&window.getComputedStyle(e,null)||e.currentStyle,t={matchMedium:function(t){var a="@media "+t+"{ #matchmediajs-test { width: 1px; } }";return e.styleSheet?e.styleSheet.cssText=a:e.textContent=a,"1px"===i.width}}}return function(e){return{matches:t.matchMedium(e||"all"),media:e||"all"}}}()),function(){if(window.matchMedia&&window.matchMedia("all").addListener)return!1;var t=window.matchMedia,e=t("only all").matches,a=!1,i=0,n=[],r=function(e){clearTimeout(i),i=setTimeout(function(){for(var e=0,a=n.length;a>e;e++){var i=n[e].mql,r=n[e].listeners||[],o=t(i.media).matches;if(o!==i.matches){i.matches=o;for(var s=0,c=r.length;c>s;s++)r[s].call(window,i)}}},30)};window.matchMedia=function(i){var o=t(i),s=[],c=0;return o.addListener=function(t){e&&(a||(a=!0,window.addEventListener("resize",r,!0)),0===c&&(c=n.push({mql:o,listeners:s})),s.push(t))},o.removeListener=function(t){for(var e=0,a=s.length;a>e;e++)s[e]===t&&s.splice(e,1)},o}}(),function(t){var e=-1,a=-1,i=function(t){return parseFloat(t)||0},n=function(e){var a=null,n=[];return t(e).each(function(){var e=t(this),r=e.offset().top-i(e.css("margin-top")),o=0<n.length?n[n.length-1]:null;null===o?n.push(e):1>=Math.floor(Math.abs(a-r))?n[n.length-1]=o.add(e):n.push(e),a=r}),n},r=function(e){var a={byRow:!0,property:"height",target:null,remove:!1};return"object"==typeof e?t.extend(a,e):("boolean"==typeof e?a.byRow=e:"remove"===e&&(a.remove=!0),a)},o=t.fn.matchHeight=function(e){if(e=r(e),e.remove){var a=this;return this.css(e.property,""),t.each(o._groups,function(t,e){e.elements=e.elements.not(a)}),this}return 1>=this.length&&!e.target?this:(o._groups.push({elements:this,options:e}),o._apply(this,e),this)};o._groups=[],o._throttle=80,o._maintainScroll=!1,o._beforeUpdate=null,o._afterUpdate=null,o._apply=function(e,a){var s=r(a),c=t(e),l=[c],d=t(window).scrollTop(),h=t("html").outerHeight(!0),u=c.parents().filter(":hidden");return u.each(function(){var e=t(this);e.data("style-cache",e.attr("style"))}),u.css("display","block"),s.byRow&&!s.target&&(c.each(function(){var e=t(this),a=e.css("display");"inline-block"!==a&&"inline-flex"!==a&&(a="block"),e.data("style-cache",e.attr("style")),e.css({display:a,"padding-top":"0","padding-bottom":"0","margin-top":"0","margin-bottom":"0","border-top-width":"0","border-bottom-width":"0",height:"100px"})}),l=n(c),c.each(function(){var e=t(this);e.attr("style",e.data("style-cache")||"")})),t.each(l,function(e,a){var n=t(a),r=0;if(s.target)r=s.target.outerHeight(!1);else{if(s.byRow&&1>=n.length)return void n.css(s.property,"");n.each(function(){var e=t(this),a=e.css("display");"inline-block"!==a&&"inline-flex"!==a&&(a="block"),a={display:a},a[s.property]="",e.css(a),e.outerHeight(!1)>r&&(r=e.outerHeight(!1)),e.css("display","")})}n.each(function(){var e=t(this),a=0;s.target&&e.is(s.target)||("border-box"!==e.css("box-sizing")&&(a+=i(e.css("border-top-width"))+i(e.css("border-bottom-width")),a+=i(e.css("padding-top"))+i(e.css("padding-bottom"))),e.css(s.property,r-a+"px"))})}),u.each(function(){var e=t(this);e.attr("style",e.data("style-cache")||null)}),o._maintainScroll&&t(window).scrollTop(d/h*t("html").outerHeight(!0)),this},o._applyDataApi=function(){var e={};t("[data-match-height], [data-mh]").each(function(){var a=t(this),i=a.attr("data-mh")||a.attr("data-match-height");e[i]=i in e?e[i].add(a):a}),t.each(e,function(){this.matchHeight(!0)})};var s=function(e){o._beforeUpdate&&o._beforeUpdate(e,o._groups),t.each(o._groups,function(){o._apply(this.elements,this.options)}),o._afterUpdate&&o._afterUpdate(e,o._groups)};o._update=function(i,n){if(n&&"resize"===n.type){var r=t(window).width();if(r===e)return;e=r}i?-1===a&&(a=setTimeout(function(){s(n),a=-1},o._throttle)):s(n)},t(o._applyDataApi),t(window).bind("load",function(t){o._update(!1,t)}),t(window).bind("resize orientationchange",function(t){o._update(!0,t)})}(jQuery),function(t,e){t("body").addClass("js-active");var a=t("a[rel='external']");a.attr("target","_blank");var i=/constructor/i.test(window.HTMLElement);i&&t("html").addClass("safari");var n=!!navigator.userAgent.match(/firefox/i);n&&t("html").addClass("firefox")}(jQuery);