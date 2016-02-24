/*!
 * jquery.okayNav.js 2.0.1 (https://github.com/VPenkov/okayNav)
 * Author: Vergil Penkov (http://vergilpenkov.com/)
 * MIT license: https://opensource.org/licenses/MIT
 */
!function(n,i,e,t){function a(t,a){self=this,this.options=n.extend({},s,a),_options=this.options,$navigation=n(t),$document=n(e),$window=n(i),""==this.options.parent?this.options.parent=$navigation.parent():"",_nav_visible=!1,_nav_full_width=0,_parent_full_width=0,radCoef=180/Math.PI,_sTouch={x:0,y:0},_cTouch={x:0,y:0},_sTime=0,_nav_position=0,_percent_open=0,_nav_moving=!1,self.init()}var o="okayNav",s={parent:"",toggle_icon_class:"okayNav__menu-toggle",toggle_icon_content:"<span /><span /><span />",align_right:!0,swipe_enabled:!0,threshold:50,beforeOpen:function(){},afterOpen:function(){},beforeClose:function(){},afterClose:function(){},itemHidden:function(){},itemDisplayed:function(){}};a.prototype={init:function(){n("body").addClass("okayNav-loaded"),$navigation.addClass("okayNav loaded").children("ul").addClass("okayNav__nav--visible"),self.options.align_right?$navigation.append('<ul class="okayNav__nav--invisible transition-enabled nav-right" />').append('<a href="#" class="'+_options.toggle_icon_class+' okay-invisible">'+_options.toggle_icon_content+"</a>"):$navigation.prepend('<ul class="okayNav__nav--invisible transition-enabled nav-left" />').prepend('<a href="#" class="'+_options.toggle_icon_class+' okay-invisible">'+_options.toggle_icon_content+"</a>"),$nav_visible=$navigation.children(".okayNav__nav--visible"),$nav_invisible=$navigation.children(".okayNav__nav--invisible"),$nav_toggle_icon=$navigation.children("."+_options.toggle_icon_class),_toggle_icon_width=$nav_toggle_icon.outerWidth(!0),_nav_default_width=self.getChildrenWidth($navigation),_parent_full_width=n(_options.parent).outerWidth(!0),_last_visible_child_width=0,self.initEvents(),1==_options.swipe_enabled&&self.initSwipeEvents()},initEvents:function(){$document.on("click.okayNav",function(i){var e=n(i.target);_nav_visible===!0&&0==e.closest(".okayNav").length&&self.closeInvisibleNav(),e.hasClass(_options.toggle_icon_class)&&(i.preventDefault(),self.toggleInvisibleNav())}),$window.on("load.okayNav resize.okayNav",function(n){self.recalcNav()})},initSwipeEvents:function(){$document.on("touchstart.okayNav",function(i){if($nav_invisible.removeClass("transition-enabled"),1==i.originalEvent.touches.length){var e=i.originalEvent.touches[0];(e.pageX<25&&0==self.options.align_right||e.pageX>n(_options.parent).outerWidth(!0)-25&&1==self.options.align_right||_nav_visible===!0)&&(_sTouch.x=_cTouch.x=e.pageX,_sTouch.y=_cTouch.y=e.pageY,_sTime=Date.now())}}).on("touchmove.okayNav",function(n){var i=n.originalEvent.touches[0];self._triggerMove(i.pageX,i.pageY),_nav_moving=!0}).on("touchend.okayNav",function(n){_sTouch={x:0,y:0},_cTouch={x:0,y:0},_sTime=0,_percent_open>100-self.options.threshold?(_nav_position=0,self.closeInvisibleNav()):1==_nav_moving&&(_nav_position=$nav_invisible.width(),self.openInvisibleNav()),_nav_moving=!1,$nav_invisible.addClass("transition-enabled")})},_getDirection:function(n){return self.options.align_right?n>0?-1:1:0>n?-1:1},_triggerMove:function(n,i){_cTouch.x=n,_cTouch.y=i;var e=Date.now(),t=_cTouch.x-_sTouch.x,a=_cTouch.y-_sTouch.y,o=a*a,s=Math.sqrt(t*t+o),l=Math.sqrt(o),_=Math.asin(Math.sin(l/s))*radCoef;s/(e-_sTime);if(_sTouch.x=n,_sTouch.y=i,20>_){var v=self._getDirection(t),c=_nav_position+v*s,r=$nav_invisible.width(),d=0;0>c?d=-c:c>r&&(d=r-c);var p=r-(_nav_position+v*s+d),g=p/r*100;_nav_position+=v*s+d,_percent_open=g,$nav_invisible.css("transform","translateX("+(self.options.align_right?1:-1)*g+"%)")}},getParent:function(){return _options.parent},getVisibleNav:function(){return $nav_visible},getInvisibleNav:function(){return $nav_invisible},getNavToggleIcon:function(){return $nav_toggle_icon},openInvisibleNav:function(){_options.enable_swipe?"":_options.beforeOpen.call(),$nav_toggle_icon.addClass("icon--active"),$nav_invisible.addClass("nav-open"),_nav_visible=!0,$nav_invisible.css({"-webkit-transform":"translateX(0%)",transform:"translateX(0%)"}),_options.afterOpen.call()},closeInvisibleNav:function(){_options.enable_swipe?"":_options.beforeClose.call(),$nav_toggle_icon.removeClass("icon--active"),$nav_invisible.removeClass("nav-open"),self.options.align_right?$nav_invisible.css({"-webkit-transform":"translateX(100%)",transform:"translateX(100%)"}):$nav_invisible.css({"-webkit-transform":"translateX(-100%)",transform:"translateX(-100%)"}),_nav_visible=!1,_options.afterClose.call()},toggleInvisibleNav:function(){_nav_visible?self.closeInvisibleNav():self.openInvisibleNav()},getChildrenWidth:function(i){for(var e=0,t=n(i).children(),a=0;a<t.length;a++)e+=n(t[a]).outerWidth(!0);return e},getVisibleItemCount:function(){return n("li",$nav_visible).length},getHiddenItemCount:function(){return n("li",$nav_invisible).length},recalcNav:function(){var i=n(_options.parent).outerWidth(!0),e=self.getChildrenWidth(_options.parent),t=$navigation.outerWidth(!0),a=self.getVisibleItemCount(),o=$nav_visible.outerWidth(!0)+_toggle_icon_width,s=e+_last_visible_child_width+_toggle_icon_width,l=e-t+_nav_default_width;return i>l?(self._expandAllItems(),void $nav_toggle_icon.addClass("okay-invisible")):(a>0&&o>=t&&s>=i&&self._collapseNavItem(),i>s+2*_toggle_icon_width&&self._expandNavItem(),void(0==self.getHiddenItemCount()?$nav_toggle_icon.addClass("okay-invisible"):$nav_toggle_icon.removeClass("okay-invisible")))},_collapseNavItem:function(){var i=n("li:last-child",$nav_visible);_last_visible_child_width=i.outerWidth(!0),$document.trigger("okayNav:collapseItem",i),i.detach().prependTo($nav_invisible),_options.itemHidden.call(),self.recalcNav()},_expandNavItem:function(){var i=n("li:first-child",$nav_invisible);$document.trigger("okayNav:expandItem",i),i.detach().appendTo($nav_visible),_options.itemDisplayed.call()},_expandAllItems:function(){n("li",$nav_invisible).detach().appendTo($nav_visible),_options.itemDisplayed.call()},_collapseAllItems:function(){n("li",$nav_visible).detach().appendTo($nav_invisible),_options.itemHidden.call()},destroy:function(){n("li",$nav_invisible).appendTo($nav_visible),$nav_invisible.remove(),$nav_visible.removeClass("okayNav__nav--visible"),$nav_toggle_icon.remove(),$document.unbind(".okayNav"),$window.unbind(".okayNav")}},n.fn[o]=function(i){var e=arguments;if(i===t||"object"==typeof i)return this.each(function(){n.data(this,"plugin_"+o)||n.data(this,"plugin_"+o,new a(this,i))});if("string"==typeof i&&"_"!==i[0]&&"init"!==i){var s;return this.each(function(){var t=n.data(this,"plugin_"+o);t instanceof a&&"function"==typeof t[i]&&(s=t[i].apply(t,Array.prototype.slice.call(e,1))),"destroy"===i&&n.data(this,"plugin_"+o,null)}),s!==t?s:this}}}(jQuery,window,document);