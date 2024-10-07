"use strict";(self.webpackChunkapp_frontend=self.webpackChunkapp_frontend||[]).push([[424],{5394:(e,l,a)=>{a.d(l,{G:()=>t,j:()=>r});var n=a(2569);const r=n.wA,t=n.d4},5056:(e,l,a)=>{a.d(l,{A:()=>o});var n=a(9714),r=a(8016),t=a(9051),i=a.n(t);const o={generic:e=>n.gl().label(e),string(e,l){l=l||{};let a=n.Yj().transform(((e,l)=>""===l?null:e)).nullable().trim().label(e);return l.required&&(a=a.required()),(l.min||0===l.min)&&(a=a.min(l.min)),l.max&&(a=a.max(l.max)),l.matches&&(a=a.matches(l.matches)),a},boolean:(e,l)=>n.lc().default(!1).label(e),relationToOne(e,l){l=l||{};let a=n.gl().nullable().label(e).transform(((e,l)=>l?l.id:null));return l.required&&(a=a.required()),a},stringArray(e,l){l=l||{};let a=n.YO().compact().ensure().of(n.Yj().transform(((e,l)=>""===l?null:e)).trim()).label(e);return l.required&&(a=a.required()),l.min||0===l.min?a=a.min(l.min):l.required&&(a=a.min(1)),l.max&&(a=a.max(l.max)),a},relationToMany(e,l){l=l||{};let a=n.YO().nullable().label(e).transform(((e,l)=>l&&l.length?l.map((e=>e.id)):[]));return l.required&&(a=a.required()),l.min||0===l.min?a=a.min(l.min):l.required&&(a=a.min(1)),l.max&&(a=a.max(l.max)),a},integer(e,l){l=l||{};let a=n.ai().transform(((e,l)=>""===l?null:e)).integer().nullable().label(e);return l.required&&(a=a.required()),(l.min||0===l.min)&&(a=a.min(l.min)),l.max&&(a=a.max(l.max)),a},images(e,l){l=l||{};let a=n.YO().nullable().label(e);return(l.required||l.min)&&(a=a.required()),l.min||0===l.min?a=a.min(l.min):l.required&&(a=a.min(1)),l.max&&(a=a.max(l.max)),a},files(e,l){l=l||{};let a=n.YO().compact().ensure().nullable().label(e);return(l.required||l.min)&&(a=a.required()),l.min||0===l.min?a=a.min(l.min):l.required&&(a=a.min(1)),l.max&&(a=a.max(l.max)),a},enumerator(e,l){l=l||{};let a=n.Yj().transform(((e,l)=>""===l?null:e)).label(e).nullable().oneOf([null,...l.options||[]]);return l.required&&(a=a.required((0,r.Ru)("validation.string.selected"))),a},email(e,l){l=l||{};let a=n.Yj().transform(((e,l)=>""===l?null:e)).nullable().trim().label(e).email();return l.required&&(a=a.required()),(l.min||0===l.min)&&(a=a.min(l.min)),l.max&&(a=a.max(l.max)),l.matches&&(a=a.matches(l.matches)),a},decimal(e,l){l=l||{};let a=n.ai().transform(((e,l)=>""===l?null:e)).nullable().label(e);return l.required&&(a=a.required()),(l.min||0===l.min)&&(a=a.min(l.min)),l.max&&(a=a.max(l.max)),a},datetime(e,l){l=l||{};let a=n.gl().nullable().label(e).transform(((e,l)=>e?i()(l,"YYYY-MM-DD HH:mm").toISOString():null));return l.required&&(a=a.required()),a},date(e,l){l=l||{};let a=n.gl().nullable().label(e).test("is-date",(0,r.Ru)("validation.mixed.default"),(e=>!e||i()(e,"YYYY-MM-DD").isValid())).transform((e=>e?i()(e).format("YYYY-MM-DD"):null));return l.required&&(a=a.required()),a}}},7210:(e,l,a)=>{a.d(l,{A:()=>n});const n=a(2141).Ay.div`
  width: 500px;
  height: 750px;
  min-height: 650px;
  overflow-y: auto;
  z-index: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 16px 20px;
  position: relative;
  background-color: white;
  color: black;
  margin-top:-15px;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: black;
  }

  .ant-checkbox-wrapper {
    color: black;
  }

  @media only screen and (max-width: 767px) {
    width: 100%;
  }
`},4136:(e,l,a)=>{a.d(l,{A:()=>n});const n=a(2141).Ay.div`
  width: 100%;
  min-height: 100vh;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background-size: cover;
  padding-top: 0vh;
  padding-bottom: 0vh;
  
  &:before {
    content: '';
    width: 100%;
    height: 100%;
    display: flex;
    background-color: #F1F2F1;
    position: absolute;
  }
`},1424:(e,l,a)=>{a.r(l),a.d(l,{default:()=>J});var n=a(4283),r=a(9950),t=a(5394),i=a(8534),o=a(925),s=a(4136),d=a(3114),u=a(3025),m=a(4883),c=a(365),h=a(3767),p=a(631),x=a(9243),g=a(591),v=a(9191),b=a(7094),y=a(1988),f=a(3072),A=a(9449),j=a(8016),q=a(5913);const w=e=>e.payment.form,C=(0,q.Mz)([w],(e=>e.record)),k={selectInitLoading:(0,q.Mz)([w],(e=>Boolean(e.initLoading))),selectSaveLoading:(0,q.Mz)([w],(e=>Boolean(e.saveLoading))),selectRecord:C,selectRaw:w};var N=a(1064),z=a(5056),R=a(2048);const S=a(2141).Ay.div`
  padding-top: 0;
  padding-bottom: 0;

  .ant-form-item-label {
    white-space: normal;
  }

  .ant-form-item-with-help {
    margin-bottom: 24px;
  }

  .form-buttons {
    .ant-btn {
      margin-top: 8px;
      margin-right: 8px;
    }
  }
`,Y={labelCol:{xs:{span:24},sm:{span:24},md:{span:24},lg:{span:24}},wrapperCol:{xs:{span:24},sm:{span:24},md:{span:24},lg:{span:24}}},M=S;var B=a(9714),F=a(6473),L=a(7210),I=a(4414);const{Text:D,Title:O}=c.A,T=e=>{const{value:l}=e;return(0,I.jsxs)(b.A,{style:{margin:0,padding:0},children:[(0,I.jsx)(y.A,{span:6,children:(0,I.jsx)(o.A,{src:"/images/logo.png",size:90})}),(0,I.jsxs)(y.A,{span:18,children:[(0,I.jsx)(O,{style:{color:"#3f3f3f"},level:2,children:"Besopay Checkout"}),(0,I.jsx)(D,{strong:!0,style:{color:"#01be63"},children:null===l||void 0===l?void 0:l.name})]})]})};var V=a(5598),E=a(1735);const G=e=>{const{label:l,name:a,hint:n,layout:t,options:i,required:s,externalErrorMessage:d}=e,{register:u,formState:{errors:m,touchedFields:c,isSubmitted:h},setValue:p,watch:g}=(0,A.xW)(),v=E.A.errorMessage(a,m,c,h,d);return(0,r.useEffect)((()=>{u(a),p(a,"1",{shouldValidate:!0,shouldDirty:!0})}),[u,p,a]),(0,I.jsx)(V.A.Item,{...t,label:l,labelAlign:"left",requiredMark:s,validateStatus:v?"error":"success",required:s,help:v||n,children:(0,I.jsx)(x.A.Group,{name:a,onChange:l=>{p(a,l,{shouldValidate:!0,shouldDirty:!0}),e.onChange&&e.onChange([])},style:{width:"100%"},defaultValue:"1",value:g(a),children:(0,I.jsx)(b.A,{children:i.map(((e,l)=>(0,I.jsx)(y.A,{span:8,children:(0,I.jsx)(x.A,{title:null===e||void 0===e?void 0:e.label,avatar:(0,I.jsx)(o.A,{size:32,shape:"square",src:"/images/"+e.icon}),value:null===e||void 0===e?void 0:e.id,style:{width:142,height:68}})})))})})})};G.defaultProps={layout:null,required:!1};const W=G;var P=a(277),$=a(8461);const{Text:H}=c.A,_=B.Ik().shape({payment:z.A.relationToOne((0,j.Ru)("user.fields.payment"),{}),phoneNumber:z.A.string((0,j.Ru)("user.fields.phoneNumber"),{matches:/^[0-9]/,max:24,min:9,required:!0}),fullName:z.A.string((0,j.Ru)("user.fields.fullName"),{}),cardNumber:z.A.string((0,j.Ru)("user.fields.cardNumber"),{matches:/^[0-9]/,max:16}),expiration:z.A.string((0,j.Ru)("user.fields.expiration"),{matches:/^[0-9]/,max:4}),cvc:z.A.string((0,j.Ru)("user.fields.cvc"),{matches:/^[0-9]/,max:3}),accountName:z.A.string((0,j.Ru)("user.fields.accountName"),{}),accountNumber:z.A.string((0,j.Ru)("user.fields.accountNumber"),{matches:/^[0-9]/,max:16})}),K=e=>{const l=(0,t.j)(),a=(0,t.G)(k.selectSaveLoading),{payment:n,method:i,record:o,tenant:s}=e,[d]=(0,r.useState)((()=>({payment:null,phoneNumber:null}))),u=(0,A.mN)({resolver:(0,F.t)(_),mode:"all",defaultValues:d}),m=o.payment.find((e=>e.id===u.watch("payment"))),c=e=>{const a={...e,tenant:s,paymentMethod:m,payment:n};l(N.A.doPay(a,null===n||void 0===n?void 0:n.callbackUrl))};r.useEffect((()=>{"International Cards"===(null===m||void 0===m?void 0:m.name)&&h()}),[m]);const h=async()=>{const e=await(async e=>{try{return await P.A.createSession(e)}catch(l){$.A.error(l)}})(n);window.Checkout?(window.Checkout.configure({session:{id:e}}),window.Checkout.showEmbeddedPage("#embed-target")):console.log("window checkout is not found")};return(0,I.jsxs)(L.A,{children:[(0,I.jsx)(T,{value:s}),(0,I.jsx)(f.A,{variant:"dashed",style:{borderColor:"#01be63"},dashed:!0}),(0,I.jsx)(H,{style:{marginTop:-10,marginBottom:10},children:"We empower you to effectively serve both international and local customers by providing access to secure digital payment solutions."}),(0,I.jsx)(M,{children:(0,I.jsx)(A.Op,{...u,children:(0,I.jsxs)("form",{onSubmit:u.handleSubmit(c),children:[(0,I.jsx)(W,{name:"payment",options:o.payment.map((e=>({...e,value:null===e||void 0===e?void 0:e.id,label:null===e||void 0===e?void 0:e.name}))),required:!1,layout:Y}),"Wallet"===i.name?(0,I.jsxs)(I.Fragment,{children:[(0,I.jsx)(R.A,{name:"phoneNumber",label:(0,j.Ru)("user.fields.phoneNumber"),placeholder:null===m||void 0===m?void 0:m.placeholder,autoComplete:"phoneNumber",size:"large",layout:Y}),(0,I.jsxs)(v.Ay,{loading:a,type:"primary",onClick:u.handleSubmit(c),style:{height:50},block:!0,size:"large",children:[(0,j.Ru)("common.pay")," ",null===n||void 0===n?void 0:n.amount,"  ",`(${null===n||void 0===n?void 0:n.currency})`]})]}):"Card"===i.name?"International Cards"===(null===m||void 0===m?void 0:m.name)?(0,I.jsx)(I.Fragment,{children:(0,I.jsx)("div",{id:"embed-target"})}):(0,I.jsxs)(I.Fragment,{children:[(0,I.jsxs)(b.A,{children:[(0,I.jsx)(y.A,{span:24,children:(0,I.jsx)(R.A,{name:"fullName",label:(0,j.Ru)("user.fields.fullName"),placeholder:null===m||void 0===m?void 0:m.placeholder,autoComplete:"fullName",size:"large",layout:Y})}),(0,I.jsx)(y.A,{span:24,children:(0,I.jsx)(R.A,{name:"cardNumber",label:(0,j.Ru)("user.fields.cardNumber"),placeholder:null===m||void 0===m?void 0:m.placeholder,autoComplete:"cardNumber",maxLength:16,size:"large",layout:Y})}),(0,I.jsx)(y.A,{span:11,children:(0,I.jsx)(R.A,{name:"expiration",label:(0,j.Ru)("user.fields.expiration"),placeholder:null===m||void 0===m?void 0:m.placeholder,autoComplete:"expiration",maxLength:4,size:"large",layout:Y})}),(0,I.jsx)(y.A,{span:2}),(0,I.jsx)(y.A,{span:11,children:(0,I.jsx)(R.A,{name:"cvc",label:(0,j.Ru)("user.fields.cvc"),placeholder:null===m||void 0===m?void 0:m.placeholder,autoComplete:"cvc",maxLength:16,size:"large",layout:Y})})]}),(0,I.jsxs)(v.Ay,{loading:a,type:"primary",onClick:u.handleSubmit(c),style:{height:50},block:!0,size:"large",children:[(0,j.Ru)("common.pay")," ",null===n||void 0===n?void 0:n.amount,"  ",`(${null===n||void 0===n?void 0:n.currency})`]})]}):"Bank"===i.name?(0,I.jsxs)(I.Fragment,{children:[(0,I.jsxs)(b.A,{children:[(0,I.jsx)(y.A,{span:24,children:(0,I.jsx)(R.A,{name:"accountName",label:(0,j.Ru)("user.fields.accountName"),placeholder:null===m||void 0===m?void 0:m.placeholder,autoComplete:"accountName",size:"large",layout:Y})}),(0,I.jsx)(y.A,{span:24,children:(0,I.jsx)(R.A,{name:"accountNumber",label:(0,j.Ru)("user.fields.accountNumber"),placeholder:null===m||void 0===m?void 0:m.placeholder,autoComplete:"accountNumber",size:"large",layout:Y})})]}),(0,I.jsxs)(v.Ay,{loading:a,type:"primary",onClick:u.handleSubmit(c),style:{height:50},block:!0,size:"large",children:[(0,j.Ru)("common.pay")," ",null===n||void 0===n?void 0:n.amount,"  ",`(${null===n||void 0===n?void 0:n.currency})`]})]}):void 0]})})}),(0,I.jsx)("br",{}),(0,I.jsx)("br",{}),(0,I.jsx)("br",{}),(0,I.jsxs)(f.A,{variant:"dashed",style:{borderColor:"#959b92"},dashed:!0,children:[" ",(0,I.jsx)(g.A,{})]}),(0,I.jsx)(H,{type:"secondary",style:{textAlign:"center"},children:"Secured By Besopay"})]})},{Text:U}=c.A;const J=function(){var e,l;const a=(0,t.j)(),c=(0,m.zy)(),g=(0,t.G)(h.A.selectRows),v=(0,t.G)(u.A.selectLoading),b=n.A.parse(c.search).token,[y,f]=r.useState("1");return(0,r.useEffect)((()=>{a(p.A.doFetch(b))}),[a,b]),v?(0,I.jsx)(s.A,{children:(0,I.jsx)(L.A,{children:(0,I.jsx)(d.A,{})})}):(0,I.jsx)(s.A,{children:(0,I.jsx)(i.A,{onChange:e=>{f(e)},activeKey:y,tabBarStyle:{padding:1},tabBarGutter:4,size:"large",items:null===g||void 0===g||null===(e=g.config)||void 0===e||null===(l=e.paymentMethods)||void 0===l?void 0:l.map(((e,l)=>{const a=String(l+1);return{label:(0,I.jsx)(x.A,{title:null===e||void 0===e?void 0:e.name,size:"small",avatar:(0,I.jsx)(o.A,{size:32,shape:"square",src:"images/"+(null===e||void 0===e?void 0:e.logo)}),description:(0,I.jsx)(U,{style:{fontSize:10,fontWeight:"lighter"},children:null===e||void 0===e?void 0:e.description}),bordered:!1,checked:y===a,style:{width:163.5,marginBottom:-15},onChange:()=>f(a)}),key:a,children:(0,I.jsx)(K,{payment:g,method:e,record:e,tenant:null===g||void 0===g?void 0:g.tenant})}}))})})}},3114:(e,l,a)=>{a.d(l,{A:()=>t});var n=a(5376),r=(a(9950),a(4414));const t=e=>(0,r.jsx)("div",{style:{width:"100%",marginTop:"24px",marginBottom:"24px",display:"flex",justifyContent:"center",alignContent:"center",alignItems:"center"},children:(0,r.jsx)(n.A,{})})},1735:(e,l,a)=>{a.d(l,{A:()=>n});class n{static errorMessage(e,l,a,n){var r;let t=arguments.length>4&&void 0!==arguments[4]?arguments[4]:null;if(t)return t;if(!n&&!a[e])return null;const i=l[e];return(null===i||void 0===i||null===(r=i[0])||void 0===r?void 0:r.message)||(null===i||void 0===i?void 0:i.message)||i||null}}},2048:(e,l,a)=>{a.d(l,{A:()=>u});var n=a(5598),r=a(7864),t=a(9449),i=a(9950),o=a(1735),s=a(4414);const d=e=>{const{label:l,name:a,id:d,hint:u,layout:m,size:c,type:h,placeholder:p,autoFocus:x,autoComplete:g,prefix:v,externalErrorMessage:b,required:y,maxLength:f,addonAfter:A,tabIndex:j}=e,{setValue:q,watch:w,register:C,formState:{errors:k,touchedFields:N,isSubmitted:z}}=(0,t.xW)();(0,i.useEffect)((()=>{C(a)}),[C,a]);const R=o.A.errorMessage(a,k,N,z,b);return(0,s.jsx)(n.A.Item,{...m,label:l,required:y,labelAlign:"left",requiredMark:y,validateStatus:R?"error":"success",help:R||u,children:(0,s.jsx)(r.A,{id:d||a,name:a,type:h,tabIndex:j||void 0,value:w(a),onChange:l=>{q(a,l.target.value,{shouldValidate:!0,shouldDirty:!0}),e.onChange&&e.onChange(l.target.value)},onBlur:l=>{e.onBlur&&e.onBlur(l)},maxLength:f||void 0,size:c||void 0,placeholder:p||void 0,autoFocus:x||!1,autoComplete:g||void 0,prefix:v||void 0,addonAfter:A||void 0})})};d.defaultProps={layout:null,type:"text",required:!1};const u=d}}]);