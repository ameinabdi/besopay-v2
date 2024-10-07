"use strict";(self.webpackChunkapp_frontend=self.webpackChunkapp_frontend||[]).push([[307],{5394:(e,r,l)=>{l.d(r,{G:()=>a,j:()=>t});var i=l(2569);const t=i.wA,a=i.d4},5056:(e,r,l)=>{l.d(r,{A:()=>o});var i=l(9714),t=l(8016),a=l(9051),n=l.n(a);const o={generic:e=>i.gl().label(e),string(e,r){r=r||{};let l=i.Yj().transform(((e,r)=>""===r?null:e)).nullable().trim().label(e);return r.required&&(l=l.required()),(r.min||0===r.min)&&(l=l.min(r.min)),r.max&&(l=l.max(r.max)),r.matches&&(l=l.matches(r.matches)),l},boolean:(e,r)=>i.lc().default(!1).label(e),relationToOne(e,r){r=r||{};let l=i.gl().nullable().label(e).transform(((e,r)=>r?r.id:null));return r.required&&(l=l.required()),l},stringArray(e,r){r=r||{};let l=i.YO().compact().ensure().of(i.Yj().transform(((e,r)=>""===r?null:e)).trim()).label(e);return r.required&&(l=l.required()),r.min||0===r.min?l=l.min(r.min):r.required&&(l=l.min(1)),r.max&&(l=l.max(r.max)),l},relationToMany(e,r){r=r||{};let l=i.YO().nullable().label(e).transform(((e,r)=>r&&r.length?r.map((e=>e.id)):[]));return r.required&&(l=l.required()),r.min||0===r.min?l=l.min(r.min):r.required&&(l=l.min(1)),r.max&&(l=l.max(r.max)),l},integer(e,r){r=r||{};let l=i.ai().transform(((e,r)=>""===r?null:e)).integer().nullable().label(e);return r.required&&(l=l.required()),(r.min||0===r.min)&&(l=l.min(r.min)),r.max&&(l=l.max(r.max)),l},images(e,r){r=r||{};let l=i.YO().nullable().label(e);return(r.required||r.min)&&(l=l.required()),r.min||0===r.min?l=l.min(r.min):r.required&&(l=l.min(1)),r.max&&(l=l.max(r.max)),l},files(e,r){r=r||{};let l=i.YO().compact().ensure().nullable().label(e);return(r.required||r.min)&&(l=l.required()),r.min||0===r.min?l=l.min(r.min):r.required&&(l=l.min(1)),r.max&&(l=l.max(r.max)),l},enumerator(e,r){r=r||{};let l=i.Yj().transform(((e,r)=>""===r?null:e)).label(e).nullable().oneOf([null,...r.options||[]]);return r.required&&(l=l.required((0,t.Ru)("validation.string.selected"))),l},email(e,r){r=r||{};let l=i.Yj().transform(((e,r)=>""===r?null:e)).nullable().trim().label(e).email();return r.required&&(l=l.required()),(r.min||0===r.min)&&(l=l.min(r.min)),r.max&&(l=l.max(r.max)),r.matches&&(l=l.matches(r.matches)),l},decimal(e,r){r=r||{};let l=i.ai().transform(((e,r)=>""===r?null:e)).nullable().label(e);return r.required&&(l=l.required()),(r.min||0===r.min)&&(l=l.min(r.min)),r.max&&(l=l.max(r.max)),l},datetime(e,r){r=r||{};let l=i.gl().nullable().label(e).transform(((e,r)=>e?n()(r,"YYYY-MM-DD HH:mm").toISOString():null));return r.required&&(l=l.required()),l},date(e,r){r=r||{};let l=i.gl().nullable().label(e).test("is-date",(0,t.Ru)("validation.mixed.default"),(e=>!e||n()(e,"YYYY-MM-DD").isValid())).transform((e=>e?n()(e).format("YYYY-MM-DD"):null));return r.required&&(l=l.required()),l}}},688:(e,r,l)=>{l.r(r),l.d(r,{default:()=>A});var i=l(9191),t=l(9449),a=l(5395),n=l(6096),o=l(8016),m=l(9950),u=l(5394),d=l(2074),s=l(7210),c=l(4136),h=l(2141);const x=h.Ay.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 48px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  color: white;

  h1 {
    margin-bottom: 0;
  }
`,g=h.Ay.div`
  margin-top: 36px;
  text-align: center;
`;var p=l(2048),b=l(5056),f=l(9714),v=l(6473),q=l(4414);const y=f.Ik().shape({email:b.A.string((0,o.Ru)("user.fields.email"),{required:!0,max:255})}),A=e=>{const r=(0,u.j)(),l=(0,u.G)(n.A.selectLoadingPasswordResetEmail),h=(0,u.G)(n.A.selectBackgroundImageUrl),b=(0,u.G)(n.A.selectLogoUrl),[f]=(0,m.useState)((()=>({email:""}))),A=(0,t.mN)({resolver:(0,v.t)(y),mode:"onSubmit",defaultValues:f});return(0,q.jsx)(c.A,{style:{backgroundImage:`url(${h||"/images/forgotPassword.jpg"})`},children:(0,q.jsxs)(s.A,{children:[(0,q.jsx)(x,{children:b?(0,q.jsx)("img",{src:b,width:"240px",alt:(0,o.Ru)("app.title")}):(0,q.jsx)("h1",{children:(0,o.Ru)("app.title")})}),(0,q.jsx)(t.Op,{...A,children:(0,q.jsxs)("form",{onSubmit:A.handleSubmit((e=>{let{email:l}=e;r(a.A.doSendPasswordResetEmail(l)),Object.keys(f).forEach((e=>{A.setValue(e,f[e])}))})),children:[(0,q.jsx)(p.A,{name:"email",size:"large",placeholder:(0,o.Ru)("user.fields.email"),autoComplete:"email",layout:null,autoFocus:!0}),(0,q.jsx)(i.Ay,{type:"primary",size:"large",block:!0,htmlType:"submit",loading:l,children:(0,o.Ru)("auth.passwordResetEmail.message")}),(0,q.jsx)(g,{children:(0,q.jsx)(d.N_,{to:"/auth/signin",children:(0,o.Ru)("common.cancel")})})]})})]})})}},7210:(e,r,l)=>{l.d(r,{A:()=>i});const i=l(2141).Ay.div`
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
`},4136:(e,r,l)=>{l.d(r,{A:()=>i});const i=l(2141).Ay.div`
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
`},1735:(e,r,l)=>{l.d(r,{A:()=>i});class i{static errorMessage(e,r,l,i){var t;let a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:null;if(a)return a;if(!i&&!l[e])return null;const n=r[e];return(null===n||void 0===n||null===(t=n[0])||void 0===t?void 0:t.message)||(null===n||void 0===n?void 0:n.message)||n||null}}},2048:(e,r,l)=>{l.d(r,{A:()=>d});var i=l(5598),t=l(7864),a=l(9449),n=l(9950),o=l(1735),m=l(4414);const u=e=>{const{label:r,name:l,id:u,hint:d,layout:s,size:c,type:h,placeholder:x,autoFocus:g,autoComplete:p,prefix:b,externalErrorMessage:f,required:v,maxLength:q,addonAfter:y,tabIndex:A}=e,{setValue:j,watch:Y,register:w,formState:{errors:k,touchedFields:M,isSubmitted:R}}=(0,a.xW)();(0,n.useEffect)((()=>{w(l)}),[w,l]);const S=o.A.errorMessage(l,k,M,R,f);return(0,m.jsx)(i.A.Item,{...s,label:r,required:v,labelAlign:"left",requiredMark:v,validateStatus:S?"error":"success",help:S||d,children:(0,m.jsx)(t.A,{id:u||l,name:l,type:h,tabIndex:A||void 0,value:Y(l),onChange:r=>{j(l,r.target.value,{shouldValidate:!0,shouldDirty:!0}),e.onChange&&e.onChange(r.target.value)},onBlur:r=>{e.onBlur&&e.onBlur(r)},maxLength:q||void 0,size:c||void 0,placeholder:x||void 0,autoFocus:g||!1,autoComplete:p||void 0,prefix:b||void 0,addonAfter:y||void 0})})};u.defaultProps={layout:null,type:"text",required:!1};const d=u}}]);