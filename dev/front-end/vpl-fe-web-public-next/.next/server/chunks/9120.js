"use strict";exports.id=9120,exports.ids=[9120],exports.modules={69120:(e,t,s)=>{s.r(t),s.d(t,{default:()=>__WEBPACK_DEFAULT_EXPORT__});var r=s(20997),n=s(25689),i=s(24386),a=s(78046),d=s(34904),h=s.n(d),l=s(55695),x=s.n(l),c=s(6339),o=s.n(c),m=s(81573),j=s.n(m),u=s(15419),p=s.n(u),g=s(37963),v=s.n(g),_=s(39536),b=s.n(_),y=s(78316),f=s.n(y),$=s(72265),E=s.n($),B=s(9285),F=s(80043),T=s(39332);let __WEBPACK_DEFAULT_EXPORT__=({vehicle:e,year:t,priceReference:s,modelId:d,brandId:l})=>{let c=(0,T.useRouter)();return r.jsx(x(),{sx:{height:"100%"},children:r.jsx(o(),{sx:{height:"100%"},onClick:()=>{t&&s?c.push(`/priceReference/${s}/year/${t}/vehicle/details/${e?.id}`):l&&d?c.push(`/brands/${l}/models/${d}/vehicle/details/${e?.id}`):c.push(`/vehicle/details/${e?.id}`)},children:r.jsx(j(),{sx:{height:"100%"},children:r.jsx(p(),{children:(0,r.jsxs)(v(),{children:[r.jsx(b(),{children:r.jsx(f(),{sx:{width:80,height:80,mr:3},children:r.jsx(()=>{switch(e?.type){case F.F.Car:return r.jsx(n.Z,{style:{fontSize:48}});case F.F.Moto:return r.jsx(i.Z,{style:{fontSize:48}});default:return r.jsx(h(),{variant:"h4",children:e?.name?e.name[0]:""})}},{})})}),r.jsx(E(),{disableTypography:!0,primary:r.jsx(h(),{gutterBottom:!0,variant:"h6",component:"div",children:e?.name}),secondary:(0,r.jsxs)(r.Fragment,{children:[r.jsx(h(),{gutterBottom:!0,variant:"subtitle2",component:"div"}),(0,r.jsxs)(B.Z,{sx:{display:"flex",alignItems:"center"},children:[r.jsx(f(),{src:e?.brandLogo,alt:e?.brandName,sx:{width:24,height:24,mr:1},children:r.jsx(h(),{variant:"h4",children:e?.brandName?e.brandName[0]:""})}),r.jsx(h(),{gutterBottom:!0,variant:"subtitle2",component:"div",sx:{mb:0},children:e?.brandName})]})]})}),r.jsx(a.Z,{sx:{fontSize:48,color:"grey.400"}})]})})})})})}}};