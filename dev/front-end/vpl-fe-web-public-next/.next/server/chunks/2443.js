exports.id=2443,exports.ids=[2443],exports.modules={79798:(e,t,s)=>{Promise.resolve().then(s.t.bind(s,13724,23)),Promise.resolve().then(s.t.bind(s,35365,23)),Promise.resolve().then(s.t.bind(s,44900,23)),Promise.resolve().then(s.t.bind(s,44714,23)),Promise.resolve().then(s.t.bind(s,45392,23)),Promise.resolve().then(s.t.bind(s,8898,23))},97845:(e,t,s)=>{Promise.resolve().then(s.bind(s,82921))},82921:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>default_layout});var o=s(30784),n=s(39966),r=s.n(n),a=s(7374),l=s(40439),i=s(79536),d=s.n(i),c=s(74147),u=s.n(c),h=s(33987),m=s.n(h),x=s(43872),v=s(11666),p=s.n(v),f=s(16614),j=s.n(f),_=s(97366),b=s(47205);let use_list_menu_all=()=>{let e=(0,_.sJ)(b.T);return e},y=(0,_.cn)({key:"themeModeState",default:"dark"}),use_set_theme_mode=()=>{let e=(0,_.sJ)(y),t=(0,_.Zl)(y);return()=>{"light"===e?t("dark"):t("light")}},use_theme_mode=()=>{let e=(0,_.sJ)(y);return e};var w=s(11440),P=s.n(w);let header=()=>{let e=use_theme_mode(),t=use_set_theme_mode(),s=use_list_menu_all();return o.jsx(d(),{component:"header",children:(0,o.jsxs)(u(),{component:"nav",children:[o.jsx(m(),{variant:"h6",component:"div",sx:{flexGrow:1},children:"VPL"}),(0,o.jsxs)(x.Z,{children:[o.jsx(p(),{title:"dark"===e?"Ativar tema claro":"Ativar tema escuro",children:(0,o.jsxs)(j(),{sx:{color:"#fff"},onClick:t,children:["dark"===e&&o.jsx(a.Z,{}),"light"===e&&o.jsx(l.Z,{})]})}),s.map(e=>o.jsx(P(),{legacyBehavior:!0,href:e.route,children:o.jsx(j(),{sx:{color:"#fff"},children:e.text})},e.route.toString()))]})]})})};var g=s(9885),k=s(31688),M=s(15579),S=s(79185),C=s(7904),R=s(82050),T=s(98331);let custom_theme=({children:e})=>{let t={MuiCard:{styleOverrides:{root:{borderRadius:"2rem"}}}},s=(0,R.createTheme)({palette:{mode:"light"},components:t}),n=(0,R.createTheme)({palette:{mode:"dark"},components:t}),r=use_theme_mode();return(0,o.jsxs)(C.a,{theme:"dark"===r?n:s,children:[o.jsx(T.Z,{}),e]})},default_layout=({children:e})=>{let[t,s]=(0,g.useState)(!0),[n,a]=(0,g.useState)(),{enqueueSnackbar:l}=(0,S.Ds)();return(0,g.useEffect)(()=>{let e=new k.s().withUrl("https://vpl-notifications.vuptechx.ddns.net/hubs/evaluations").withAutomaticReconnect().build();a(e)},[]),(0,g.useEffect)(()=>{n?.state==M.A.Disconnected&&n.start().then(e=>{n.on("EvaluationCreated",e=>{l(e,{variant:"info"})}),n.on("EvaluationUpdated",e=>{l(e,{variant:"info"})}),n.onclose(()=>{s(!0)}),n.onreconnected(()=>{s(!1)}),s(!1)}).catch(e=>alert("N\xe3o foi poss\xedvel se conectar ao servidor."))},[n]),o.jsx(S.wT,{children:o.jsx(_.Wh,{children:(0,o.jsxs)(custom_theme,{children:[o.jsx(header,{}),o.jsx(r(),{component:"main",sx:{mt:10},children:e})]})})})}},2860:(e,t,s)=>{"use strict";s.d(t,{v:()=>Menu});let Menu=class Menu{constructor(e,t,s,o=!1){this.text=e,this.description=t,this.route=s,this.onlyMenu=o}}},47205:(e,t,s)=>{"use strict";s.d(t,{T:()=>r});var o=s(97366),n=s(2860);let r=(0,o.cn)({key:"menuState",default:[new n.v("Home","P\xe1gina inicial da aplica\xe7\xe3o","/",!0),new n.v("Sobre","P\xe1gina sobre a aplica\xe7\xe3o","/about",!0),new n.v("Marcas","Consulte todas as marcas dispon\xedveis em nosso app","/brands"),new n.v("Modelos","Consulte todas os modelos dispon\xedveis em nosso app","/models"),new n.v("Ve\xedculos","Consulte todas os ve\xedculos dispon\xedveis em nosso app","/vehicles")]})},91738:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>RootLayout,metadata:()=>d});var o=s(4656),n=s(95153);let r=(0,n.createProxy)(String.raw`/Users/luizcoelho/Projects/vpl/dev/front-end/vpl-fe-web-public-next/src/layouts/default-layout/index.tsx`),{__esModule:a,$$typeof:l}=r,i=r.default,d={title:"Next.js",description:"Generated by Next.js"};function RootLayout({children:e}){return o.jsx("html",{lang:"pt-BR",children:o.jsx("body",{children:o.jsx(i,{children:e})})})}}};