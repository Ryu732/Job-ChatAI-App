(function(){"use strict";var e={3242:function(e,l,a){var t=a(5130),u=a(6768),n=(a(4114),a(4232)),o=a(144),c=a(5234);function s(e){const l=`; ${document.cookie}`,a=l.split(`; ${e}=`);return 2===a.length?a.pop().split(";").shift():null}const d=(0,c.nY)("auth",{state:()=>({userId:s("userId")}),actions:{login(e){this.userId=e},logout(){this.userId=null,document.cookie="userId=; Max-Age=0; path=/;"}},getters:{isAuth:e=>!!e.userId}});var i=a(1387),r=a(4373),v=a(3367),f=a(8332),p=a(6990),h=a(2807),k=a(2729),b=a(1606),m=a(697),_=a(3745),g=a(1772),F=a(1560),y=a(1720),L=a(9669),C=a(4605),w=a(4718),V=a(373),x=a(3948);const A=e=>((0,u.Qi)("data-v-36c5049d"),e=e(),(0,u.jt)(),e),W={key:2},I=A((()=>(0,u.Lk)("span",{class:"headline"},"ログイン",-1))),R={class:"errorMsg"},T=A((()=>(0,u.Lk)("span",{class:"headline"},"アカウント作成",-1))),K={class:"errorMsg"},E=A((()=>(0,u.Lk)("span",{class:"headline"},"ログアウト",-1))),O=A((()=>(0,u.Lk)("p",null,"本当にログアウトしてもよろしいですか？",-1)));var S={__name:"MainAppbar",setup(e){const l=d(),a=(0,i.rd)(),c=(0,i.lq)(),s=(0,o.KR)();(0,u.wB)(c,(e=>{switch(e.name){case"home":s.value="ホーム";break;case"com_question":s.value="会社検索";break;case"es":s.value="ES作成";break;default:s.value="就活アプリ";break}}),{immediate:!0});const A=(0,u.EW)((()=>l.isAuth)),S=(0,u.EW)((()=>l.userId)),j=(0,o.KR)(!1),D=(0,o.KR)(!1),X=(0,o.KR)(!1),$=(0,o.KR)(!1),U=(0,o.KR)(""),B=(0,o.KR)(""),M=(0,o.KR)(!0),P=(0,o.KR)(""),N=(0,o.KR)(!1),Q="http://localhost:3000",q=`${Q}/users`;function H(){U.value="",B.value="",P.value=""}async function J(){N.value=!0,await r.A.post(`${q}/login`,{id:U.value,password:B.value}).then((e=>{e.data.success?(alert(e.data.message),l.login(e.data.userId),j.value=!1,H()):P.value=e.data.message})).catch((e=>{P.value=e,console.log("ログインデータ取得失敗",e)})),N.value=!1}async function Y(){N.value=!0,await r.A.post(`${q}/signup`,{id:U.value,password:B.value}).then((e=>{e.data.success?(alert(e.data.message),l.login(e.data.userId),j.value=!1,H()):P.value=e.data.message})).catch((e=>{P.value=e,console.log("アカウントデータ取得失敗",e)})),N.value=!1}async function z(){await r.A.get(`${q}/logout`).then((e=>{alert(e.data.message)})).catch((e=>{P.value=e,console.log("ログアウト失敗",e)})),await l.logout(),window.location.reload()}return(e,l)=>((0,u.uX)(),(0,u.CE)(u.FK,null,[(0,u.bF)(v.z,{color:"primary"},{append:(0,u.k6)((()=>[A.value?(0,u.Q3)("",!0):((0,u.uX)(),(0,u.Wv)(h.D,{key:0,onClick:l[0]||(l[0]=e=>D.value=!0),class:"account-btn"},{default:(0,u.k6)((()=>[(0,u.bF)(L.w,{left:"",large:""},{default:(0,u.k6)((()=>[(0,u.eW)("mdi-account-plus")])),_:1}),(0,u.eW)(" アカウント作成 ")])),_:1})),A.value?(0,u.Q3)("",!0):((0,u.uX)(),(0,u.Wv)(h.D,{key:1,onClick:l[1]||(l[1]=e=>j.value=!0),class:"account-btn"},{default:(0,u.k6)((()=>[(0,u.bF)(L.w,{left:"",large:""},{default:(0,u.k6)((()=>[(0,u.eW)("mdi-login")])),_:1}),(0,u.eW)(" ログイン ")])),_:1})),A.value?((0,u.uX)(),(0,u.CE)("div",W,(0,n.v_)(S.value)+"さん ",1)):(0,u.Q3)("",!0),A.value?((0,u.uX)(),(0,u.Wv)(h.D,{key:3,onClick:l[2]||(l[2]=e=>X.value=!0),class:"account-btn"},{default:(0,u.k6)((()=>[(0,u.bF)(L.w,{left:"",large:""},{default:(0,u.k6)((()=>[(0,u.eW)("mdi-logout")])),_:1}),(0,u.eW)(" ログアウト ")])),_:1})):(0,u.Q3)("",!0),(0,u.bF)(h.D,{to:{name:"home"}},{default:(0,u.k6)((()=>[(0,u.bF)(L.w,{left:""},{default:(0,u.k6)((()=>[(0,u.eW)(" mdi-home ")])),_:1})])),_:1})])),prepend:(0,u.k6)((()=>[(0,u.bF)(f.Z,{onClick:l[3]||(l[3]=(0,t.D$)((e=>$.value=!$.value),["stop"]))})])),default:(0,u.k6)((()=>[(0,u.bF)(p.l,null,{default:(0,u.k6)((()=>[(0,u.eW)((0,n.v_)(s.value),1)])),_:1})])),_:1}),(0,u.bF)(V.e,{modelValue:$.value,"onUpdate:modelValue":l[7]||(l[7]=e=>$.value=e)},{default:(0,u.k6)((()=>[(0,u.bF)(C.x8,null,{default:(0,u.k6)((()=>[(0,u.bF)(w.g,{title:"Homeに戻る",onClick:l[4]||(l[4]=e=>{(0,o.R1)(a).push("/"),$.value=!1})}),(0,u.bF)(w.g,{title:"会社検索",onClick:l[5]||(l[5]=e=>{(0,o.R1)(a).push("/com_question"),$.value=!1})}),(0,u.bF)(w.g,{title:"ES作成",onClick:l[6]||(l[6]=e=>{(0,o.R1)(a).push("/es"),$.value=!1})})])),_:1})])),_:1},8,["modelValue"]),(0,u.bF)(g.p,{modelValue:j.value,"onUpdate:modelValue":l[12]||(l[12]=e=>j.value=e),persistent:"","max-width":"30em"},{default:(0,u.k6)((()=>[(0,u.bF)(k.J,null,{default:(0,u.k6)((()=>[(0,u.bF)(b.r,null,{default:(0,u.k6)((()=>[I])),_:1}),(0,u.bF)(m.O,null,{default:(0,u.k6)((()=>[(0,u.bF)(F.n,{onSubmit:(0,t.D$)(J,["prevent"])},{default:(0,u.k6)((()=>[(0,u.bF)(x.W,{modelValue:U.value,"onUpdate:modelValue":l[8]||(l[8]=e=>U.value=e),label:"ID",disabled:N.value,class:"text-input",clearable:""},null,8,["modelValue","disabled"]),(0,u.bF)(x.W,{modelValue:B.value,"onUpdate:modelValue":l[9]||(l[9]=e=>B.value=e),label:"PassWord",disabled:N.value,class:"text-input",clearable:"","append-inner-icon":M.value?"mdi-eye":"mdi-eye-off",type:M.value?"password":"text","onClick:appendInner":l[10]||(l[10]=e=>M.value=!M.value)},null,8,["modelValue","disabled","append-inner-icon","type"]),(0,u.bF)(h.D,{type:"submit",loading:N.value,rounded:"lg"},{default:(0,u.k6)((()=>[(0,u.eW)("送信")])),_:1},8,["loading"])])),_:1})])),_:1}),(0,u.bF)(_.S,null,{default:(0,u.k6)((()=>[(0,u.bF)(y.h,null,{default:(0,u.k6)((()=>[(0,u.Lk)("div",R,(0,n.v_)(P.value),1)])),_:1}),(0,u.bF)(h.D,{onClick:l[11]||(l[11]=e=>{j.value=!1,H()}),disabled:N.value,color:"primary"},{default:(0,u.k6)((()=>[(0,u.eW)("閉じる")])),_:1},8,["disabled"])])),_:1})])),_:1})])),_:1},8,["modelValue"]),(0,u.bF)(g.p,{modelValue:D.value,"onUpdate:modelValue":l[17]||(l[17]=e=>D.value=e),persistent:"","max-width":"30em"},{default:(0,u.k6)((()=>[(0,u.bF)(k.J,{class:"signup-sheet"},{default:(0,u.k6)((()=>[(0,u.bF)(b.r,null,{default:(0,u.k6)((()=>[T])),_:1}),(0,u.bF)(m.O,null,{default:(0,u.k6)((()=>[(0,u.bF)(F.n,{onSubmit:(0,t.D$)(Y,["prevent"])},{default:(0,u.k6)((()=>[(0,u.bF)(x.W,{modelValue:U.value,"onUpdate:modelValue":l[13]||(l[13]=e=>U.value=e),label:"ID",disabled:N.value,class:"text-input",clearable:""},null,8,["modelValue","disabled"]),(0,u.bF)(x.W,{modelValue:B.value,"onUpdate:modelValue":l[14]||(l[14]=e=>B.value=e),label:"PassWord",disabled:N.value,class:"text-input",clearable:"","append-inner-icon":M.value?"mdi-eye":"mdi-eye-off",type:M.value?"password":"text","onClick:appendInner":l[15]||(l[15]=e=>M.value=!M.value)},null,8,["modelValue","disabled","append-inner-icon","type"]),(0,u.bF)(h.D,{type:"submit",loading:N.value,rounded:"lg",class:"signup-sheet"},{default:(0,u.k6)((()=>[(0,u.eW)("送信")])),_:1},8,["loading"])])),_:1})])),_:1}),(0,u.bF)(_.S,null,{default:(0,u.k6)((()=>[(0,u.bF)(y.h,null,{default:(0,u.k6)((()=>[(0,u.Lk)("div",K,(0,n.v_)(P.value),1)])),_:1}),(0,u.bF)(h.D,{onClick:l[16]||(l[16]=e=>{D.value=!1,H()}),disabled:N.value,color:"primary"},{default:(0,u.k6)((()=>[(0,u.eW)("閉じる")])),_:1},8,["disabled"])])),_:1})])),_:1})])),_:1},8,["modelValue"]),(0,u.bF)(g.p,{modelValue:X.value,"onUpdate:modelValue":l[20]||(l[20]=e=>X.value=e),persistent:"","max-width":"30em"},{default:(0,u.k6)((()=>[(0,u.bF)(k.J,{class:"signup-sheet"},{default:(0,u.k6)((()=>[(0,u.bF)(b.r,{class:"logout-card"},{default:(0,u.k6)((()=>[E])),_:1}),(0,u.bF)(m.O,{class:"logout-card"},{default:(0,u.k6)((()=>[(0,u.Lk)("p",null,(0,n.v_)(S.value)+" さん",1),O])),_:1}),(0,u.bF)(_.S,{style:{"justify-content":"space-between"},class:"logout-card"},{default:(0,u.k6)((()=>[(0,u.bF)(h.D,{onClick:l[18]||(l[18]=e=>{X.value=!1,z()}),style:{"background-color":"red",color:"white"}},{default:(0,u.k6)((()=>[(0,u.eW)("ログアウト")])),_:1}),(0,u.bF)(h.D,{onClick:l[19]||(l[19]=e=>X.value=!1),color:"primary"},{default:(0,u.k6)((()=>[(0,u.eW)("閉じる")])),_:1})])),_:1})])),_:1})])),_:1},8,["modelValue"])],64))}},j=a(1241);const D=(0,j.A)(S,[["__scopeId","data-v-36c5049d"]]);var X=D,$=a(6450),U={__name:"App",setup(e){return(e,l)=>{const a=(0,u.g2)("RouterView");return(0,u.uX)(),(0,u.Wv)($.E,null,{default:(0,u.k6)((()=>[(0,u.bF)(X),(0,u.bF)(a)])),_:1})}}};const B=U;var M=B,P=(a(5524),a(5790)),N=(0,P.$N)();async function Q(){const e=await a.e(53).then(a.t.bind(a,8874,23));e.load({google:{families:["Roboto:100,300,400,500,700,900&display=swap"]}})}var q=a(3813),H=a(6756),J=a(5526),Y=a(8477);const z=e=>((0,u.Qi)("data-v-31f8b6c8"),e=e(),(0,u.jt)(),e),Z=z((()=>(0,u.Lk)("div",{class:"home_title"},[(0,u.Lk)("h1",null,"就活支援アプリへようこそ"),(0,u.Lk)("p",null,"このサイトでは、以下の機能が使えます")],-1))),G=z((()=>(0,u.Lk)("h3",null,"会社質問",-1))),ee=z((()=>(0,u.Lk)("p",null,"会社情報の検索をAIがサポートしてくれます",-1))),le=z((()=>(0,u.Lk)("p",null," AIに質問してみよう!",-1))),ae=z((()=>(0,u.Lk)("p",null,"例: 〇〇社の主な事業を教えて",-1))),te=z((()=>(0,u.Lk)("h3",null,"エントリーシート作成",-1))),ue=z((()=>(0,u.Lk)("p",null,"ESの作成をAIがサポートしてくれます",-1))),ne=z((()=>(0,u.Lk)("p",null,"AIと会話するだけで、ESが作成できちゃう",-1))),oe=z((()=>(0,u.Lk)("p",null,"ガクチカや自分の強みなどを、作ろう！",-1))),ce=z((()=>(0,u.Lk)("h3",null,"メモ",-1))),se=z((()=>(0,u.Lk)("p",null,"就活イベントのメモを作ろう!",-1)));var de={__name:"AppHome",setup(e){const l=(0,i.rd)();return(e,a)=>((0,u.uX)(),(0,u.Wv)(Y.Y,null,{default:(0,u.k6)((()=>[(0,u.bF)(q.I,null,{default:(0,u.k6)((()=>[(0,u.bF)(H.L,{justify:"center"},{default:(0,u.k6)((()=>[Z])),_:1}),(0,u.bF)(H.L,null,{default:(0,u.k6)((()=>[(0,u.bF)(J.B,null,{default:(0,u.k6)((()=>[(0,u.bF)(k.J,{onClick:a[0]||(a[0]=e=>(0,o.R1)(l).push("/com_question")),class:"functionList"},{default:(0,u.k6)((()=>[(0,u.bF)(b.r,null,{default:(0,u.k6)((()=>[G])),_:1}),(0,u.bF)(m.O,null,{default:(0,u.k6)((()=>[ee,le,ae])),_:1})])),_:1})])),_:1}),(0,u.bF)(J.B,null,{default:(0,u.k6)((()=>[(0,u.bF)(k.J,{onClick:a[1]||(a[1]=e=>(0,o.R1)(l).push("/es")),class:"functionList"},{default:(0,u.k6)((()=>[(0,u.bF)(b.r,null,{default:(0,u.k6)((()=>[te])),_:1}),(0,u.bF)(m.O,null,{default:(0,u.k6)((()=>[ue,ne,oe])),_:1})])),_:1})])),_:1}),(0,u.bF)(J.B,null,{default:(0,u.k6)((()=>[(0,u.bF)(k.J,{class:"functionList"},{default:(0,u.k6)((()=>[(0,u.bF)(b.r,null,{default:(0,u.k6)((()=>[ce])),_:1}),(0,u.bF)(m.O,null,{default:(0,u.k6)((()=>[se])),_:1})])),_:1})])),_:1})])),_:1})])),_:1})])),_:1}))}};const ie=(0,j.A)(de,[["__scopeId","data-v-31f8b6c8"]]);var re=ie,ve=a(594),fe={__name:"check_button",props:["checkText","ischeck"],setup(e){const l=e,a=(0,o.KR)(l.ischeck);return(l,t)=>((0,u.uX)(),(0,u.Wv)(ve.N,{modelValue:a.value,"onUpdate:modelValue":t[0]||(t[0]=e=>a.value=e),onChange:t[1]||(t[1]=e=>l.$emit("changeCheck")),label:e.checkText,color:"primary"},null,8,["modelValue","label"]))}};const pe=(0,j.A)(fe,[["__scopeId","data-v-ebc3ded8"]]);var he=pe;const ke=e=>((0,u.Qi)("data-v-34c3d37b"),e=e(),(0,u.jt)(),e),be=ke((()=>(0,u.Lk)("h2",{class:"checkAreaHead"},"聞きたいことを選ぶ",-1)));var me={__name:"Check_area",emits:["send-data"],setup(e,{emit:l}){const a=l,t=(0,o.KR)([{id:1,checkText:"企業概要",ischeck:!1},{id:2,checkText:"事業拠点",ischeck:!1},{id:3,checkText:"主な事業",ischeck:!0},{id:4,checkText:"関連企業",ischeck:!1},{id:5,checkText:"上場市場",ischeck:!0},{id:6,checkText:"子会社とその事業",ischeck:!1},{id:7,checkText:"競合他社",ischeck:!1}]);function n(){const e=t.value.filter((e=>e.ischeck)).map((e=>e.checkText));a("send-data",e)}function c(e){const l=t.value.find((l=>l.id===e));l&&(l.ischeck=!l.ischeck)}return(0,u.sV)((()=>{n()})),(0,u.wB)((()=>t.value),n,{deep:!0}),(e,l)=>((0,u.uX)(),(0,u.CE)("div",null,[be,((0,u.uX)(!0),(0,u.CE)(u.FK,null,(0,u.pI)(t.value,(e=>((0,u.uX)(),(0,u.Wv)(he,{key:e.id,checkText:e.checkText,ischeck:e.ischeck,onChangeCheck:l=>c(e.id),class:"checkAreaList"},null,8,["checkText","ischeck","onChangeCheck"])))),128))]))}};const _e=(0,j.A)(me,[["__scopeId","data-v-34c3d37b"]]);var ge=_e,Fe=a(418),ye=a(5272),Le=a(2162),Ce=a(2421);const we={class:"chat-container"},Ve={class:"chat-out"},xe=["innerHTML"];var Ae={__name:"Chat_main",props:{trueCheckList:Array},setup(e){const l=d(),a=(0,u.EW)((()=>l.isAuth)),c=e,s=(0,o.KR)(""),i=(0,o.KR)([{id:1,CompanyName:"AIの入力がここに記述されます",choiceCheckList:"左の項目から選んで、会社名を送信してください",AIRestext:""}]),v=(0,o.KR)([0]),f="http://localhost:3000",p=`${f}/gemini`,k=`${f}/getpastdb`,b=(0,o.KR)(!1);async function m(){if(""===s.value.trim())return void alert("企業名が入力されていません");b.value=!0;const e={inputText:s.value,checkList:c.trueCheckList};await r.A.post(p,e).then((async e=>{i.value.push({id:i.value.length+1,CompanyName:s.value,choiceCheckList:e.data.checkText,AIRestext:e.data.resultText}),v.value.push(i.value.length-1),await(0,u.dY)(),_()})).catch((e=>{alert("データの取得に失敗しました。再度お試しください",e)})),b.value=!1,s.value=""}function _(){const e=document.querySelector(".chat-out");e.scrollTop=e.scrollHeight}async function g(){a.value&&await r.A.get(k).then((async e=>{for(const l of e.data)i.value.push({id:i.value.length+1,CompanyName:l.CompanyName,choiceCheckList:l.choiceCheckList,AIRestext:l.AIRestext});for(let l=i.value.length-5;l<i.value.length;l++)v.value.push(l);await(0,u.dY)(),_()})).catch((e=>{console.log("DBのデータ取得失敗",e)}))}return(0,u.sV)((()=>g())),(0,u.wB)(a,(()=>g())),(e,l)=>((0,u.uX)(),(0,u.CE)("div",we,[(0,u.Lk)("div",Ve,[(0,u.bF)(Fe.$,{modelValue:v.value,"onUpdate:modelValue":l[0]||(l[0]=e=>v.value=e),multiple:""},{default:(0,u.k6)((()=>[((0,u.uX)(!0),(0,u.CE)(u.FK,null,(0,u.pI)(i.value,(e=>((0,u.uX)(),(0,u.Wv)(ye.c,{key:e.id,class:"chat-message"},{default:(0,u.k6)((()=>[(0,u.bF)(Le.w,null,{default:(0,u.k6)((()=>[(0,u.Lk)("h1",null,(0,n.v_)(e.CompanyName),1)])),_:2},1024),(0,u.bF)(Ce.T,null,{default:(0,u.k6)((()=>[(0,u.Lk)("div",{innerHTML:e.AIRestext},null,8,xe)])),_:2},1024)])),_:2},1024)))),128))])),_:1},8,["modelValue"])]),(0,u.bF)(F.n,{onSubmit:(0,t.D$)(m,["prevent"]),class:"input-form"},{default:(0,u.k6)((()=>[(0,u.bF)(x.W,{modelValue:s.value,"onUpdate:modelValue":l[1]||(l[1]=e=>s.value=e),label:"企業の名前を入力",disabled:b.value,class:"text-input",clearable:""},null,8,["modelValue","disabled"]),(0,u.bF)(h.D,{onClick:m,loading:b.value,rounded:"lg",class:"send-btn"},{default:(0,u.k6)((()=>[(0,u.eW)("送信")])),_:1},8,["loading"])])),_:1})]))}};const We=(0,j.A)(Ae,[["__scopeId","data-v-3fa6e36c"]]);var Ie=We,Re={__name:"ChatComQuestionApp",setup(e){const l=(0,o.KR)([]);function a(e){l.value=e}return(e,t)=>((0,u.uX)(),(0,u.Wv)(Y.Y,null,{default:(0,u.k6)((()=>[(0,u.bF)(q.I,{fluid:"","fill-height":"",class:"main-content"},{default:(0,u.k6)((()=>[(0,u.bF)(H.L,{class:"fill-height"},{default:(0,u.k6)((()=>[(0,u.bF)(J.B,{cols:"12",md:"3",class:"fill-height"},{default:(0,u.k6)((()=>[(0,u.bF)(ge,{onSendData:a})])),_:1}),(0,u.bF)(J.B,{cols:"12",md:"9",class:"fill-height"},{default:(0,u.k6)((()=>[(0,u.bF)(Ie,{trueCheckList:l.value},null,8,["trueCheckList"])])),_:1})])),_:1})])),_:1})])),_:1}))}};const Te=(0,j.A)(Re,[["__scopeId","data-v-65b5333b"]]);var Ke=Te,Ee=a(7792),Oe=a(3740);const Se=e=>((0,u.Qi)("data-v-d1d63e40"),e=e(),(0,u.jt)(),e),je={class:"fill-height"},De={class:"esSettings"},Xe=Se((()=>(0,u.Lk)("p",null," エントリーシートの内容 *",-1))),$e={class:"esSettings"},Ue=Se((()=>(0,u.Lk)("p",null,"文字数 *",-1))),Be={class:"esSettings"},Me=Se((()=>(0,u.Lk)("p",null,"会社名",-1))),Pe={class:"esSettings"},Ne=Se((()=>(0,u.Lk)("p",null,"会社からの質問内容",-1))),Qe={class:"chat-container"},qe={class:"chat-out"},He=["innerHTML"];var Je={__name:"ES_create",setup(e){const l=(0,o.KR)(["学生時代頑張ったこと","自己PR","長所、短所について"]),a=(0,o.KR)(null),c=(0,o.KR)(null),s=(0,o.KR)(null),d=(0,o.KR)(null),i=(0,o.KR)(!1),v=(0,o.KR)(""),f=(0,o.KR)([{id:1,chatText:"こんにちは<br>一緒にエントリーシートを考えましょう<br>左側の欄を入力して、送信ボタンを押してください",sender:"AI"},{id:2,chatText:"ES作りたい!",sender:"human"},{id:3,chatText:"了解しました。<br>どのようなエントリーシートをご希望でしょうか？",sender:"AI"}]),p="http://localhost:3000",k=`${p}/escreate`,b=(0,o.KR)(!1);async function m(){if(null==a.value)return void alert("左側で、どんなエントリーシートを書くか選択してください");if(null==c.value)return void alert("文字数を入力してください");i.value=!0;const e={esMode:a.value,esLength:c.value,esCompany:s.value,esQuestion:d.value};await r.A.post(`${k}/setting`,e).then((async e=>{f.value.push({id:f.value.length+1,chatText:e.data.chatText,sender:"AI"})})).catch((e=>{alert("データの取得に失敗しました。再度ESの設定を送信してください",e)}))}async function _(){""!==v.value.trim()?(b.value=!0,await r.A.post().then((async e=>{f.value.push({id:f.value.length+1,chatText:e.data.chatText,sender:"AI"}),await(0,u.dY)(),g()})).catch((e=>{alert("データの取得に失敗しました。再度同じ文章を入力してください。",e)})),b.value=!1,v.value=""):alert("テキストが入力されていません")}function g(){const e=document.querySelector(".chat-out");e.scrollTop=e.scrollHeight}return(e,o)=>((0,u.uX)(),(0,u.Wv)(Y.Y,null,{default:(0,u.k6)((()=>[(0,u.bF)(q.I,{fluid:"","fill-height":"",class:"main-content"},{default:(0,u.k6)((()=>[(0,u.bF)(H.L,{class:"fill-height"},{default:(0,u.k6)((()=>[(0,u.bF)(J.B,{cols:"12",md:"2",class:"modeChoice"},{default:(0,u.k6)((()=>[(0,u.Lk)("div",je,[(0,u.Lk)("div",De,[Xe,(0,u.bF)(Ee.d4,{items:l.value,modelValue:a.value,"onUpdate:modelValue":o[0]||(o[0]=e=>a.value=e),disabled:i.value},null,8,["items","modelValue","disabled"])]),(0,u.Lk)("div",$e,[Ue,(0,u.bF)(x.W,{modelValue:c.value,"onUpdate:modelValue":o[1]||(o[1]=e=>c.value=e),type:"number",disabled:i.value},null,8,["modelValue","disabled"])]),(0,u.Lk)("div",Be,[Me,(0,u.bF)(x.W,{"persistent-placeholder":"",placeholder:"〇〇株式会社 なくてもOK",modelValue:s.value,"onUpdate:modelValue":o[2]||(o[2]=e=>s.value=e),disabled:i.value},null,8,["modelValue","disabled"])]),(0,u.Lk)("div",Pe,[Ne,(0,u.bF)(x.W,{"persistent-placeholder":"",placeholder:"コピペしてね！ なくてもOK",modelValue:d.value,"onUpdate:modelValue":o[3]||(o[3]=e=>d.value=e),disabled:i.value},null,8,["modelValue","disabled"])]),(0,u.bF)(h.D,{onClick:m},{default:(0,u.k6)((()=>[(0,u.eW)("ESの設定をAIに読み込む")])),_:1})]),(0,u.bF)(h.D,{class:"historyBtn"},{default:(0,u.k6)((()=>[(0,u.eW)("過去の履歴")])),_:1})])),_:1}),(0,u.bF)(J.B,{cols:"12",md:"10",class:"fill-height"},{default:(0,u.k6)((()=>[(0,u.Lk)("div",Qe,[(0,u.Lk)("div",qe,[((0,u.uX)(!0),(0,u.CE)(u.FK,null,(0,u.pI)(f.value,(e=>((0,u.uX)(),(0,u.CE)("div",{key:e.id,class:(0,n.C4)(["chat-message",{user_hilight:"human"===e.sender}])},["AI"===e.sender?((0,u.uX)(),(0,u.Wv)(L.w,{key:0},{default:(0,u.k6)((()=>[(0,u.eW)("mdi-robot")])),_:1})):((0,u.uX)(),(0,u.Wv)(L.w,{key:1},{default:(0,u.k6)((()=>[(0,u.eW)("mdi-account-circle")])),_:1})),(0,u.Lk)("p",{innerHTML:e.chatText},null,8,He)],2)))),128))]),(0,u.bF)(F.n,{onSubmit:(0,t.D$)(_,["prevent"]),class:"input-form"},{default:(0,u.k6)((()=>[(0,u.bF)(Oe.J,{modelValue:v.value,"onUpdate:modelValue":o[4]||(o[4]=e=>v.value=e),disabled:b.value,clearable:"","auto-grow":"",rows:"1",class:"text-input"},null,8,["modelValue","disabled"]),(0,u.bF)(h.D,{onClick:_,loading:b.value,rounded:"lg",class:"send-btn"},{default:(0,u.k6)((()=>[(0,u.eW)("送信")])),_:1},8,["loading"])])),_:1})])])),_:1})])),_:1})])),_:1})])),_:1}))}};const Ye=(0,j.A)(Je,[["__scopeId","data-v-d1d63e40"]]);var ze=Ye;const Ze=[{path:"/",name:"home",component:re},{path:"/com_question",name:"com_question",component:Ke},{path:"/es",name:"es",component:ze}],Ge=(0,i.aE)({history:(0,i.LA)(),routes:Ze});var el=Ge;Q();const ll=(0,c.Ey)();(0,t.Ef)(M).use(N).use(ll).use(el).mount("#app")}},l={};function a(t){var u=l[t];if(void 0!==u)return u.exports;var n=l[t]={exports:{}};return e[t].call(n.exports,n,n.exports,a),n.exports}a.m=e,function(){var e=[];a.O=function(l,t,u,n){if(!t){var o=1/0;for(i=0;i<e.length;i++){t=e[i][0],u=e[i][1],n=e[i][2];for(var c=!0,s=0;s<t.length;s++)(!1&n||o>=n)&&Object.keys(a.O).every((function(e){return a.O[e](t[s])}))?t.splice(s--,1):(c=!1,n<o&&(o=n));if(c){e.splice(i--,1);var d=u();void 0!==d&&(l=d)}}return l}n=n||0;for(var i=e.length;i>0&&e[i-1][2]>n;i--)e[i]=e[i-1];e[i]=[t,u,n]}}(),function(){a.n=function(e){var l=e&&e.__esModule?function(){return e["default"]}:function(){return e};return a.d(l,{a:l}),l}}(),function(){var e,l=Object.getPrototypeOf?function(e){return Object.getPrototypeOf(e)}:function(e){return e.__proto__};a.t=function(t,u){if(1&u&&(t=this(t)),8&u)return t;if("object"===typeof t&&t){if(4&u&&t.__esModule)return t;if(16&u&&"function"===typeof t.then)return t}var n=Object.create(null);a.r(n);var o={};e=e||[null,l({}),l([]),l(l)];for(var c=2&u&&t;"object"==typeof c&&!~e.indexOf(c);c=l(c))Object.getOwnPropertyNames(c).forEach((function(e){o[e]=function(){return t[e]}}));return o["default"]=function(){return t},a.d(n,o),n}}(),function(){a.d=function(e,l){for(var t in l)a.o(l,t)&&!a.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:l[t]})}}(),function(){a.f={},a.e=function(e){return Promise.all(Object.keys(a.f).reduce((function(l,t){return a.f[t](e,l),l}),[]))}}(),function(){a.u=function(e){return"js/webfontloader.605caf38.js"}}(),function(){a.miniCssF=function(e){}}(),function(){a.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){a.o=function(e,l){return Object.prototype.hasOwnProperty.call(e,l)}}(),function(){var e={},l="client:";a.l=function(t,u,n,o){if(e[t])e[t].push(u);else{var c,s;if(void 0!==n)for(var d=document.getElementsByTagName("script"),i=0;i<d.length;i++){var r=d[i];if(r.getAttribute("src")==t||r.getAttribute("data-webpack")==l+n){c=r;break}}c||(s=!0,c=document.createElement("script"),c.charset="utf-8",c.timeout=120,a.nc&&c.setAttribute("nonce",a.nc),c.setAttribute("data-webpack",l+n),c.src=t),e[t]=[u];var v=function(l,a){c.onerror=c.onload=null,clearTimeout(f);var u=e[t];if(delete e[t],c.parentNode&&c.parentNode.removeChild(c),u&&u.forEach((function(e){return e(a)})),l)return l(a)},f=setTimeout(v.bind(null,void 0,{type:"timeout",target:c}),12e4);c.onerror=v.bind(null,c.onerror),c.onload=v.bind(null,c.onload),s&&document.head.appendChild(c)}}}(),function(){a.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){a.p="/"}(),function(){var e={524:0};a.f.j=function(l,t){var u=a.o(e,l)?e[l]:void 0;if(0!==u)if(u)t.push(u[2]);else{var n=new Promise((function(a,t){u=e[l]=[a,t]}));t.push(u[2]=n);var o=a.p+a.u(l),c=new Error,s=function(t){if(a.o(e,l)&&(u=e[l],0!==u&&(e[l]=void 0),u)){var n=t&&("load"===t.type?"missing":t.type),o=t&&t.target&&t.target.src;c.message="Loading chunk "+l+" failed.\n("+n+": "+o+")",c.name="ChunkLoadError",c.type=n,c.request=o,u[1](c)}};a.l(o,s,"chunk-"+l,l)}},a.O.j=function(l){return 0===e[l]};var l=function(l,t){var u,n,o=t[0],c=t[1],s=t[2],d=0;if(o.some((function(l){return 0!==e[l]}))){for(u in c)a.o(c,u)&&(a.m[u]=c[u]);if(s)var i=s(a)}for(l&&l(t);d<o.length;d++)n=o[d],a.o(e,n)&&e[n]&&e[n][0](),e[n]=0;return a.O(i)},t=self["webpackChunkclient"]=self["webpackChunkclient"]||[];t.forEach(l.bind(null,0)),t.push=l.bind(null,t.push.bind(t))}();var t=a.O(void 0,[504],(function(){return a(3242)}));t=a.O(t)})();
//# sourceMappingURL=app.e827cfde.js.map