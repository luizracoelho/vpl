(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[185],{89594:function(e,t,n){Promise.resolve().then(n.bind(n,39368))},39368:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return default_layout}});var s=n(57437),o=n(88938),r=n(69115),a=n(11171),i=n(40851),l=n(6093),c=n(85269),d=n(39227),u=n(53741),h=n(49600),m=n(55883),x=n(46103),use_list_menu_all=()=>{let e=(0,m.sJ)(x.T);return e};let f=(0,m.cn)({key:"themeModeState",default:"dark"});var use_set_theme_mode=()=>{let e=(0,m.sJ)(f),t=(0,m.Zl)(f);return()=>{"light"===e?t("dark"):t("light")}},use_theme_mode=()=>{let e=(0,m.sJ)(f);return e},v=n(61396),p=n.n(v),header=()=>{let e=use_theme_mode(),t=use_set_theme_mode(),n=use_list_menu_all();return(0,s.jsx)(i.Z,{component:"header",children:(0,s.jsxs)(l.Z,{component:"nav",children:[(0,s.jsx)(c.Z,{variant:"h6",component:"div",sx:{flexGrow:1},children:"VPL"}),(0,s.jsxs)(d.Z,{children:[(0,s.jsx)(u.Z,{title:"dark"===e?"Ativar tema claro":"Ativar tema escuro",children:(0,s.jsxs)(h.Z,{sx:{color:"#fff"},onClick:t,children:["dark"===e&&(0,s.jsx)(r.Z,{}),"light"===e&&(0,s.jsx)(a.Z,{})]})}),n.map(e=>(0,s.jsx)(p(),{legacyBehavior:!0,href:e.route,children:(0,s.jsx)(h.Z,{sx:{color:"#fff"},children:e.text})},e.route.toString()))]})]})})},_=n(2265),j=n(5924),Z=n(55684),k=n(36953),w=n(65673),b=n(16778),g=n(3857),custom_theme=e=>{let{children:t}=e,n={MuiCard:{styleOverrides:{root:{borderRadius:"2rem"}}}},o=(0,b.Z)({palette:{mode:"light"},components:n}),r=(0,b.Z)({palette:{mode:"dark"},components:n}),a=use_theme_mode();return(0,s.jsxs)(w.a,{theme:"dark"===a?r:o,children:[(0,s.jsx)(g.ZP,{}),t]})},default_layout=e=>{let{children:t}=e,[n,r]=(0,_.useState)(!0),[a,i]=(0,_.useState)(),{enqueueSnackbar:l}=(0,k.Ds)();return(0,_.useEffect)(()=>{let e=new j.s().withUrl("".concat("https://vpl-notifications.vuptechx.ddns.net","/hubs/evaluations")).withAutomaticReconnect().build();i(e)},[]),(0,_.useEffect)(()=>{(null==a?void 0:a.state)==Z.A.Disconnected&&a.start().then(e=>{a.on("EvaluationCreated",e=>{l(e,{variant:"info"})}),a.on("EvaluationUpdated",e=>{l(e,{variant:"info"})}),a.onclose(()=>{r(!0)}),a.onreconnected(()=>{r(!1)}),r(!1)}).catch(e=>alert("N\xe3o foi poss\xedvel se conectar ao servidor."))},[a]),(0,s.jsx)(k.wT,{children:(0,s.jsx)(m.Wh,{children:(0,s.jsxs)(custom_theme,{children:[(0,s.jsx)(header,{}),(0,s.jsx)(o.Z,{component:"main",sx:{mt:10},children:t})]})})})}},11319:function(e,t,n){"use strict";n.d(t,{v:function(){return Menu}});let Menu=class Menu{constructor(e,t,n,s=!1){this.text=e,this.description=t,this.route=n,this.onlyMenu=s}}},46103:function(e,t,n){"use strict";n.d(t,{T:function(){return r}});var s=n(55883),o=n(11319);let r=(0,s.cn)({key:"menuState",default:[new o.v("Home","P\xe1gina inicial da aplica\xe7\xe3o","/",!0),new o.v("Sobre","P\xe1gina sobre a aplica\xe7\xe3o","/about",!0),new o.v("Marcas","Consulte todas as marcas dispon\xedveis em nosso app","/brands"),new o.v("Modelos","Consulte todas os modelos dispon\xedveis em nosso app","/models"),new o.v("Ve\xedculos","Consulte todas os ve\xedculos dispon\xedveis em nosso app","/vehicles")]})}},function(e){e.O(0,[691,243,625,341,971,472,744],function(){return e(e.s=89594)}),_N_E=e.O()}]);