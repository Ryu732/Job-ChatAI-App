(function(){"use strict";var e={4952:function(e,t,c){var n=c(3751),a=c(641),o=c(953),i=c(33);const r={class:"form-check form-switch"},l={class:"form-check-label",for:"flexSwitchCheckDefault"};var s={__name:"check_button",props:["checkText","ischeck"],setup(e){const t=e,c=(0,o.KR)(t.ischeck);return(t,o)=>((0,a.uX)(),(0,a.CE)("div",r,[(0,a.bo)((0,a.Lk)("input",{type:"checkbox","onUpdate:modelValue":o[0]||(o[0]=e=>c.value=e),onChange:o[1]||(o[1]=e=>t.$emit("changeCheck")),class:"form-check-input"},null,544),[[n.lH,c.value]]),(0,a.Lk)("label",l,(0,i.v_)(e.checkText),1)]))}},u=c(6262);const h=(0,u.A)(s,[["__scopeId","data-v-04502c4a"]]);var d=h;const v=e=>((0,a.Qi)("data-v-329589ce"),e=e(),(0,a.jt)(),e),f=v((()=>(0,a.Lk)("h2",{class:"checkAreaHead"},"聞きたいことを選ぶ",-1)));var k={__name:"Check_area",emits:["send-data"],setup(e,{emit:t}){const c=t,n=(0,o.KR)([{id:1,checkText:"企業概要",ischeck:!1},{id:2,checkText:"社長挨拶",ischeck:!0},{id:3,checkText:"主な事業",ischeck:!1},{id:4,checkText:"業界内での立ち位置と競合他社",ischeck:!1}]);function i(){const e=n.value.filter((e=>e.ischeck));c("send-data",e)}function r(e){const t=n.value.find((t=>t.id===e));t&&(t.ischeck=!t.ischeck)}return(0,a.wB)((()=>n.value),i,{deep:!0}),(e,t)=>((0,a.uX)(),(0,a.CE)(a.FK,null,[f,((0,a.uX)(!0),(0,a.CE)(a.FK,null,(0,a.pI)(n.value,(e=>((0,a.uX)(),(0,a.Wv)(d,{key:e.id,checkText:e.checkText,ischeck:e.ischeck,onChangeCheck:t=>r(e.id),class:"checkAreaList"},null,8,["checkText","ischeck","onChangeCheck"])))),128))],64))}};const p=(0,u.A)(k,[["__scopeId","data-v-329589ce"]]);var m=p,b=(c(4114),c(4335));const C=e=>((0,a.Qi)("data-v-a91ec2f4"),e=e(),(0,a.jt)(),e),y={class:"chat-container"},x={class:"chat-out"},L=C((()=>(0,a.Lk)("br",null,null,-1))),_=C((()=>(0,a.Lk)("br",null,null,-1))),g=["disabled"],T=["disabled"],w="http://localhost:3000/gemini";var O={__name:"Chat_main",props:{trueCheckList:Array},setup(e){const t=e,c=(0,o.KR)(""),r=(0,o.KR)([{id:1,CompanyName:"AIの入力がここに記述されます",choiceCheckList:"左の項目から選んで、会社名を送信してください",AIRestext:""}]),l=(0,o.KR)(!1);async function s(){if(""===c.value.trim())return void alert("企業名が入力されていません");l.value=!0;const e={inputText:c.value,checkList:t.trueCheckList};await b.A.post(w,e).then((e=>{r.value.push({id:r.value.length+1,CompanyName:c.value,choiceCheckList:e.data.checkText,AIRestext:e.data.resultText})})).catch((e=>{alert("データの取得に失敗しました",e)})),l.value=!1,c.value=""}return(e,t)=>((0,a.uX)(),(0,a.CE)("div",y,[(0,a.Lk)("div",x,[((0,a.uX)(!0),(0,a.CE)(a.FK,null,(0,a.pI)(r.value,(e=>((0,a.uX)(),(0,a.CE)("div",{key:e.id,class:"chat-message"},[(0,a.eW)((0,i.v_)(e.CompanyName),1),L,(0,a.eW)(" "+(0,i.v_)(e.choiceCheckList),1),_,(0,a.eW)(" "+(0,i.v_)(e.AIRestext),1)])))),128))]),(0,a.Lk)("form",{class:"form-control",onSubmit:(0,n.D$)(s,["prevent"])},[(0,a.bo)((0,a.Lk)("input",{type:"text","onUpdate:modelValue":t[0]||(t[0]=e=>c.value=e),placeholder:"企業の名前を入力",class:"col-md-11",disabled:l.value},null,8,g),[[n.Jo,c.value]]),(0,a.Lk)("button",{type:"submit",class:"btn btn-secondary col-md-1",disabled:l.value},"送信",8,T)],32)]))}};const A=(0,u.A)(O,[["__scopeId","data-v-a91ec2f4"]]);var j=A;const E={class:"container"},I={class:"row"},K={class:"col-md-3"},R={class:"col-md-7"},S=(0,a.Lk)("div",{class:"col-md-1"},[(0,a.Lk)("p",null,"ログインアイコン予定")],-1);var X={__name:"App",setup(e){const t=(0,o.KR)([]);function c(e){t.value=e}return(e,n)=>((0,a.uX)(),(0,a.CE)("div",E,[(0,a.Lk)("div",I,[(0,a.Lk)("div",K,[(0,a.bF)(m,{onSendData:c})]),(0,a.Lk)("div",R,[(0,a.bF)(j,{trueCheckList:t.value},null,8,["trueCheckList"])]),S])]))}};const F=X;var P=F;const W=(0,n.Ef)(P);W.mount("#app")}},t={};function c(n){var a=t[n];if(void 0!==a)return a.exports;var o=t[n]={exports:{}};return e[n].call(o.exports,o,o.exports,c),o.exports}c.m=e,function(){var e=[];c.O=function(t,n,a,o){if(!n){var i=1/0;for(u=0;u<e.length;u++){n=e[u][0],a=e[u][1],o=e[u][2];for(var r=!0,l=0;l<n.length;l++)(!1&o||i>=o)&&Object.keys(c.O).every((function(e){return c.O[e](n[l])}))?n.splice(l--,1):(r=!1,o<i&&(i=o));if(r){e.splice(u--,1);var s=a();void 0!==s&&(t=s)}}return t}o=o||0;for(var u=e.length;u>0&&e[u-1][2]>o;u--)e[u]=e[u-1];e[u]=[n,a,o]}}(),function(){c.d=function(e,t){for(var n in t)c.o(t,n)&&!c.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}}(),function(){c.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){c.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){var e={524:0};c.O.j=function(t){return 0===e[t]};var t=function(t,n){var a,o,i=n[0],r=n[1],l=n[2],s=0;if(i.some((function(t){return 0!==e[t]}))){for(a in r)c.o(r,a)&&(c.m[a]=r[a]);if(l)var u=l(c)}for(t&&t(n);s<i.length;s++)o=i[s],c.o(e,o)&&e[o]&&e[o][0](),e[o]=0;return c.O(u)},n=self["webpackChunkfrontend"]=self["webpackChunkfrontend"]||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))}();var n=c.O(void 0,[504],(function(){return c(4952)}));n=c.O(n)})();
//# sourceMappingURL=app.dadf2b19.js.map