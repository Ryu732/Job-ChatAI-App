(function(){"use strict";var e={102:function(e,c,n){var t=n(751),o=n(641),a=n(953),r=n(33);const i={class:"form-check form-switch"},s={class:"form-check-label",for:"flexSwitchCheckDefault"};var u={__name:"check_button",props:["checkText","ischeck"],setup(e){const c=e,n=(0,a.KR)(c.ischeck);return(c,a)=>((0,o.uX)(),(0,o.CE)("div",i,[(0,o.bo)((0,o.Lk)("input",{type:"checkbox","onUpdate:modelValue":a[0]||(a[0]=e=>n.value=e),onChange:a[1]||(a[1]=e=>c.$emit("changeCheck")),class:"form-check-input"},null,544),[[t.lH,n.value]]),(0,o.Lk)("label",s,(0,r.v_)(e.checkText),1)]))}},l=n(262);const h=(0,l.A)(u,[["__scopeId","data-v-04502c4a"]]);var d=h;const k=e=>((0,o.Qi)("data-v-84d92a7e"),e=e(),(0,o.jt)(),e),v=k((()=>(0,o.Lk)("h2",{class:"checkAreaHead"},"聞きたいことを選ぶ",-1)));var f={__name:"Check_area",setup(e){const c=(0,a.KR)([{id:1,checkText:"企業概要",ischeck:!1},{id:2,checkText:"社長挨拶",ischeck:!0},{id:3,checkText:"主な事業",ischeck:!1},{id:4,checkText:"業界内での立ち位置と競合他社",ischeck:!1}]);function n(e){const n=c.value.find((c=>c.id===e));n&&(n.ischeck=!n.ischeck)}return(e,t)=>((0,o.uX)(),(0,o.CE)(o.FK,null,[v,((0,o.uX)(!0),(0,o.CE)(o.FK,null,(0,o.pI)(c.value,(e=>((0,o.uX)(),(0,o.Wv)(d,{key:e.id,checkText:e.checkText,ischeck:e.ischeck,onChangeCheck:c=>n(e.id),class:"checkAreaList"},null,8,["checkText","ischeck","onChangeCheck"])))),128))],64))}};const p=(0,l.A)(f,[["__scopeId","data-v-84d92a7e"]]);var b=p;const m={class:"chat-container"},x={class:"chat-out"},C={class:"form-control"};var _={__name:"Chat_main",setup(e){const c=(0,a.KR)(""),n=(0,a.KR)([{id:1,gptText:"いちですそんあこんな\nだうえいふぁい"},{id:2,gptText:"にーです"},{id:3,gptText:"いちです"}]);function i(){c.value=""}return(e,a)=>((0,o.uX)(),(0,o.CE)("div",m,[(0,o.Lk)("div",x,[((0,o.uX)(!0),(0,o.CE)(o.FK,null,(0,o.pI)(n.value,(e=>((0,o.uX)(),(0,o.CE)("div",{key:e.id,class:"chat-message"},(0,r.v_)(e.gptText),1)))),128))]),(0,o.Lk)("div",C,[(0,o.bo)((0,o.Lk)("input",{type:"text","onUpdate:modelValue":a[0]||(a[0]=e=>c.value=e),onKeydown:(0,t.jR)(i,["enter"]),placeholder:"企業の名前を入力",class:"col-md-11"},null,544),[[t.Jo,c.value]]),(0,o.Lk)("button",{onClick:i,class:"btn btn-secondary col-md-1"},"送信")])]))}};const g=(0,l.A)(_,[["__scopeId","data-v-08e1d828"]]);var T=g;const y={class:"container"},L={class:"row"},w={class:"col-md-3"},O={class:"col-md-7"},E=(0,o.Lk)("div",{class:"col-md-1"},[(0,o.Lk)("p",null,"ログインアイコン予定")],-1);var j={__name:"App",setup(e){return(e,c)=>((0,o.uX)(),(0,o.CE)("div",y,[(0,o.Lk)("div",L,[(0,o.Lk)("div",w,[(0,o.bF)(b)]),(0,o.Lk)("div",O,[(0,o.bF)(T)]),E])]))}};const K=j;var X=K;const A=(0,t.Ef)(X);A.mount("#app")}},c={};function n(t){var o=c[t];if(void 0!==o)return o.exports;var a=c[t]={exports:{}};return e[t](a,a.exports,n),a.exports}n.m=e,function(){var e=[];n.O=function(c,t,o,a){if(!t){var r=1/0;for(l=0;l<e.length;l++){t=e[l][0],o=e[l][1],a=e[l][2];for(var i=!0,s=0;s<t.length;s++)(!1&a||r>=a)&&Object.keys(n.O).every((function(e){return n.O[e](t[s])}))?t.splice(s--,1):(i=!1,a<r&&(r=a));if(i){e.splice(l--,1);var u=o();void 0!==u&&(c=u)}}return c}a=a||0;for(var l=e.length;l>0&&e[l-1][2]>a;l--)e[l]=e[l-1];e[l]=[t,o,a]}}(),function(){n.d=function(e,c){for(var t in c)n.o(c,t)&&!n.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:c[t]})}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){n.o=function(e,c){return Object.prototype.hasOwnProperty.call(e,c)}}(),function(){var e={524:0};n.O.j=function(c){return 0===e[c]};var c=function(c,t){var o,a,r=t[0],i=t[1],s=t[2],u=0;if(r.some((function(c){return 0!==e[c]}))){for(o in i)n.o(i,o)&&(n.m[o]=i[o]);if(s)var l=s(n)}for(c&&c(t);u<r.length;u++)a=r[u],n.o(e,a)&&e[a]&&e[a][0](),e[a]=0;return n.O(l)},t=self["webpackChunkfrontend"]=self["webpackChunkfrontend"]||[];t.forEach(c.bind(null,0)),t.push=c.bind(null,t.push.bind(t))}();var t=n.O(void 0,[504],(function(){return n(102)}));t=n.O(t)})();
//# sourceMappingURL=app.a867e4ce.js.map