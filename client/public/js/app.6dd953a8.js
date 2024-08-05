(function(){"use strict";var e={2986:function(e,t,c){var n=c(3751),a=c(641),o=c(953),i=c(33);const s={class:"form-check form-switch"},l={class:"form-check-label",for:"flexSwitchCheckDefault"};var r={__name:"check_button",props:["checkText","ischeck"],setup(e){const t=e,c=(0,o.KR)(t.ischeck);return(t,o)=>((0,a.uX)(),(0,a.CE)("div",s,[(0,a.bo)((0,a.Lk)("input",{type:"checkbox","onUpdate:modelValue":o[0]||(o[0]=e=>c.value=e),onChange:o[1]||(o[1]=e=>t.$emit("changeCheck")),class:"form-check-input"},null,544),[[n.lH,c.value]]),(0,a.Lk)("label",l,(0,i.v_)(e.checkText),1)]))}},u=c(6262);const h=(0,u.A)(r,[["__scopeId","data-v-04502c4a"]]);var d=h;const v=e=>((0,a.Qi)("data-v-76913d8b"),e=e(),(0,a.jt)(),e),k=v((()=>(0,a.Lk)("h2",{class:"checkAreaHead"},"聞きたいことを選ぶ",-1)));var f={__name:"Check_area",emits:["send-data"],setup(e,{emit:t}){const c=t,n=(0,o.KR)([{id:1,checkText:"企業概要",ischeck:!1},{id:2,checkText:"従業員数",ischeck:!0},{id:3,checkText:"主な事業",ischeck:!1},{id:4,checkText:"関連企業",ischeck:!1},{id:5,checkText:"上場市場",ischeck:!1},{id:6,checkText:"社長挨拶",ischeck:!1},{id:7,checkText:"業界内での立ち位置と競合他社",ischeck:!1}]);function i(){const e=n.value.filter((e=>e.ischeck));c("send-data",e)}function s(e){const t=n.value.find((t=>t.id===e));t&&(t.ischeck=!t.ischeck)}return(0,a.sV)((()=>{i()})),(0,a.wB)((()=>n.value),i,{deep:!0}),(e,t)=>((0,a.uX)(),(0,a.CE)(a.FK,null,[k,((0,a.uX)(!0),(0,a.CE)(a.FK,null,(0,a.pI)(n.value,(e=>((0,a.uX)(),(0,a.Wv)(d,{key:e.id,checkText:e.checkText,ischeck:e.ischeck,onChangeCheck:t=>s(e.id),class:"checkAreaList"},null,8,["checkText","ischeck","onChangeCheck"])))),128))],64))}};const p=(0,u.A)(f,[["__scopeId","data-v-76913d8b"]]);var m=p,b=(c(4114),c(4335));const C=e=>((0,a.Qi)("data-v-6ef410d0"),e=e(),(0,a.jt)(),e),x={class:"chat-container"},y={class:"chat-out"},L=C((()=>(0,a.Lk)("br",null,null,-1))),g=C((()=>(0,a.Lk)("br",null,null,-1))),_=["disabled"],T=["disabled"],A="http://localhost:3000/gemini",w="http://localhost:3000/getpastdb";var O={__name:"Chat_main",props:{trueCheckList:Array},setup(e){const t=e,c=(0,o.KR)(""),s=(0,o.KR)([{id:1,CompanyName:"AIの入力がここに記述されます",choiceCheckList:"左の項目から選んで、会社名を送信してください",AIRestext:""}]),l=(0,o.KR)(!1);async function r(){if(""===c.value.trim())return void alert("企業名が入力されていません");l.value=!0;const e={inputText:c.value,checkList:t.trueCheckList};await b.A.post(A,e).then((e=>{s.value.push({id:s.value.length+1,CompanyName:c.value,choiceCheckList:e.data.checkText,AIRestext:e.data.resultText})})).catch((e=>{alert("データの取得に失敗しました。再度お試しください",e)})),l.value=!1,c.value=""}return(0,a.sV)((async()=>{await b.A.get(w).then((e=>{for(const t of e.data)s.value.push({id:s.value.length+1,CompanyName:t.CompanyName,choiceCheckList:t.choiceCheckList,AIRestext:t.AIRestext})})).catch((e=>{console.log("DBのデータ取得失敗",e)}))})),(e,t)=>((0,a.uX)(),(0,a.CE)("div",x,[(0,a.Lk)("div",y,[((0,a.uX)(!0),(0,a.CE)(a.FK,null,(0,a.pI)(s.value,(e=>((0,a.uX)(),(0,a.CE)("div",{key:e.id,class:"chat-message"},[(0,a.eW)((0,i.v_)(e.CompanyName),1),L,(0,a.eW)(" "+(0,i.v_)(e.choiceCheckList),1),g,(0,a.eW)(" "+(0,i.v_)(e.AIRestext),1)])))),128))]),(0,a.Lk)("form",{class:"form-control",onSubmit:(0,n.D$)(r,["prevent"])},[(0,a.bo)((0,a.Lk)("input",{type:"text","onUpdate:modelValue":t[0]||(t[0]=e=>c.value=e),placeholder:"企業の名前を入力",class:"col-md-11",disabled:l.value},null,8,_),[[n.Jo,c.value]]),(0,a.Lk)("button",{type:"submit",class:"btn btn-secondary col-md-1",disabled:l.value},"送信",8,T)],32)]))}};const I=(0,u.A)(O,[["__scopeId","data-v-6ef410d0"]]);var R=I;const j={class:"container"},E={class:"row"},K={class:"col-md-3"},S={class:"col-md-7"},X=(0,a.Lk)("div",{class:"col-md-1"},[(0,a.Lk)("p",null,"ログインアイコン予定")],-1);var F={__name:"App",setup(e){const t=(0,o.KR)([]);function c(e){t.value=e}return(e,n)=>((0,a.uX)(),(0,a.CE)("div",j,[(0,a.Lk)("div",E,[(0,a.Lk)("div",K,[(0,a.bF)(m,{onSendData:c})]),(0,a.Lk)("div",S,[(0,a.bF)(R,{trueCheckList:t.value},null,8,["trueCheckList"])]),X])]))}};const N=F;var D=N;const P=(0,n.Ef)(D);P.mount("#app")}},t={};function c(n){var a=t[n];if(void 0!==a)return a.exports;var o=t[n]={exports:{}};return e[n].call(o.exports,o,o.exports,c),o.exports}c.m=e,function(){var e=[];c.O=function(t,n,a,o){if(!n){var i=1/0;for(u=0;u<e.length;u++){n=e[u][0],a=e[u][1],o=e[u][2];for(var s=!0,l=0;l<n.length;l++)(!1&o||i>=o)&&Object.keys(c.O).every((function(e){return c.O[e](n[l])}))?n.splice(l--,1):(s=!1,o<i&&(i=o));if(s){e.splice(u--,1);var r=a();void 0!==r&&(t=r)}}return t}o=o||0;for(var u=e.length;u>0&&e[u-1][2]>o;u--)e[u]=e[u-1];e[u]=[n,a,o]}}(),function(){c.d=function(e,t){for(var n in t)c.o(t,n)&&!c.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}}(),function(){c.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){c.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){var e={524:0};c.O.j=function(t){return 0===e[t]};var t=function(t,n){var a,o,i=n[0],s=n[1],l=n[2],r=0;if(i.some((function(t){return 0!==e[t]}))){for(a in s)c.o(s,a)&&(c.m[a]=s[a]);if(l)var u=l(c)}for(t&&t(n);r<i.length;r++)o=i[r],c.o(e,o)&&e[o]&&e[o][0](),e[o]=0;return c.O(u)},n=self["webpackChunkfrontend"]=self["webpackChunkfrontend"]||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))}();var n=c.O(void 0,[504],(function(){return c(2986)}));n=c.O(n)})();
//# sourceMappingURL=app.6dd953a8.js.map