"use strict";(self.webpackChunkapp_frontend=self.webpackChunkapp_frontend||[]).push([[955],{7210:(e,i,t)=>{t.d(i,{A:()=>n});const n=t(2141).Ay.div`
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
`},4136:(e,i,t)=>{t.d(i,{A:()=>n});const n=t(2141).Ay.div`
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
`},4955:(e,i,t)=>{t.r(i),t.d(i,{default:()=>h});var n=t(9191),o=(t(9950),t(2074)),a=t(6847),d=t(8016),c=t(7210),r=t(4136),l=t(4414);const h=()=>(0,l.jsx)(r.A,{children:(0,l.jsx)(c.A,{children:(0,l.jsx)(a.A,{children:(0,l.jsxs)("div",{className:"exception",children:[(0,l.jsx)("div",{className:"imgBlock",children:(0,l.jsx)("div",{className:"imgEle",style:{backgroundImage:"url(/images/500.svg)"}})}),(0,l.jsxs)("div",{className:"content",children:[(0,l.jsx)("h1",{children:"500"}),(0,l.jsx)("div",{className:"desc",children:(0,d.Ru)("errors.500")}),(0,l.jsx)("div",{className:"actions",children:(0,l.jsx)(o.N_,{to:"/",children:(0,l.jsx)(n.Ay,{type:"primary",children:(0,d.Ru)("errors.backToHome")})})})]})]})})})})},6847:(e,i,t)=>{t.d(i,{A:()=>n});const n=t(2141).Ay.div`
  .exception {
    display: flex;
    align-items: center;
    height: 80%;
    min-height: 40vh;
    text-align: center;
    flex-direction: column;

    .imgBlock {
      flex: 0 0 10%;
      width: 100%;
      padding-right: 32px;
      margin: 0 auto 24px;
      zoom: 1;
      &:before,
      &:after {
        content: ' ';
        display: table;
      }
      &:after {
        clear: both;
        visibility: hidden;
        font-size: 0;
        height: 0;
      }
    }

    .imgEle {
      height: 360px;
      width: 100%;
      max-width: 430px;
      float: right;
      background-repeat: no-repeat;
      background-position: 50% 50%;
      background-size: contain;
    }

    .content {
      flex: auto;

      h1 {
        color: #434e59;
        font-size: 72px;
        font-weight: 600;
        line-height: 72px;
        margin-bottom: 24px;
      }

      .desc {
        font-size: 20px;
        line-height: 28px;
        margin-bottom: 16px;
      }

      .actions {
        button:not(:last-child) {
          margin-right: 8px;
        }
      }
    }
  }

  @media screen and (max-width: 1200px) {
    .exception {
      .imgBlock {
        padding-right: 88px;
      }
    }
  }

  @media screen and (max-width: 767.98px) {
    .exception {
      display: block;
      text-align: center;
      .imgBlock {
        padding-right: 0;
        margin: 0 auto 24px;
      }
    }
  }

  @media screen and (max-width: 575.98px) {
    .exception {
      .imgBlock {
        margin-bottom: -24px;
        overflow: hidden;
      }
    }
  }
`}}]);