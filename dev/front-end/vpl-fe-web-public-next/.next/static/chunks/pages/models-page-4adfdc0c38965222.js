(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[150],{78046:function(e,t,s){"use strict";var r=s(88169),n=s(85893);t.Z=(0,r.Z)((0,n.jsx)("path",{d:"M10 6 8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"}),"ChevronRight")},25689:function(e,t,s){"use strict";var r=s(88169),n=s(85893);t.Z=(0,r.Z)((0,n.jsx)("path",{d:"M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"}),"DirectionsCar")},24386:function(e,t,s){"use strict";var r=s(88169),n=s(85893);t.Z=(0,r.Z)((0,n.jsx)("path",{d:"M20 11c-.18 0-.36.03-.53.05L17.41 9H20V6l-3.72 1.86L13.41 5H9v2h3.59l2 2H11l-4 2-2-2H0v2h4c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4l2 2h3l3.49-6.1 1.01 1.01c-.91.73-1.5 1.84-1.5 3.09 0 2.21 1.79 4 4 4s4-1.79 4-4-1.79-4-4-4zM4 17c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm16 0c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"}),"TwoWheeler")},99226:function(e,t,s){"use strict";var r=s(61354),n=s(37078),a=s(21265),i=s(10606);let o=(0,a.Z)(),c=(0,r.Z)({themeId:i.Z,defaultTheme:o,defaultClassName:"MuiBox-root",generateClassName:n.Z.generate});t.Z=c},18377:function(e,t,s){"use strict";var r=s(61354);let n=(0,r.Z)();t.Z=n},61354:function(e,t,s){"use strict";s.d(t,{Z:function(){return createBox}});var r=s(87462),n=s(63366),a=s(67294),i=s(90512),o=s(49731),c=s(86523),l=s(39707),d=s(79718),u=s(85893);let h=["className","component"];function createBox(e={}){let{themeId:t,defaultTheme:s,defaultClassName:v="MuiBox-root",generateClassName:x}=e,m=(0,o.ZP)("div",{shouldForwardProp:e=>"theme"!==e&&"sx"!==e&&"as"!==e})(c.Z),p=a.forwardRef(function(e,a){let o=(0,d.Z)(s),c=(0,l.Z)(e),{className:p,component:f="div"}=c,g=(0,n.Z)(c,h);return(0,u.jsx)(m,(0,r.Z)({as:f,ref:a,className:(0,i.Z)(p,x?x(v):v),theme:t&&o[t]||o},g))});return p}},20713:function(e,t,s){(window.__NEXT_P=window.__NEXT_P||[]).push(["/models-page",function(){return s(1261)}])},66188:function(e,t,s){"use strict";var r=s(85893),n=s(9008),a=s.n(n);t.Z=e=>{let{title:t,description:s,keywords:n}=e;return(0,r.jsxs)(a(),{children:[(0,r.jsxs)("title",{children:[t," | VPL"]}),(0,r.jsx)("meta",{name:"description",content:s}),(0,r.jsx)("meta",{name:"keywords",content:n}),(0,r.jsx)("meta",{property:"og:title",content:t}),(0,r.jsx)("meta",{property:"og:description",content:s}),(0,r.jsx)("meta",{name:"twitter:title",content:t}),(0,r.jsx)("meta",{name:"twitter:description",content:s})]})}},18557:function(e,t,s){"use strict";var r=s(74864),n=s(57174);t.Z=()=>async e=>{try{let t=await n.Z.instance.find(e);return r.f.success(t)}catch(e){var t,s,a;return r.f.error(null!==(a=null===(s=e.response)||void 0===s?void 0:null===(t=s.data)||void 0===t?void 0:t.Message)&&void 0!==a?a:e.message)}}},3595:function(e,t,s){"use strict";s.d(t,{Z:function(){return AppHttp}});var r=s(6154);let AppHttp=class AppHttp{static get instance(){var e;return null!==(e=AppHttp.myInstance)&&void 0!==e?e:AppHttp.myInstance=r.default.create({baseURL:"https://vpl-api.vuptechx.ddns.net"})}}},74864:function(e,t,s){"use strict";var r,n;s.d(t,{f:function(){return ApiResult},w:function(){return r}}),(n=r||(r={}))[n.none=0]="none",n[n.loading=1]="loading",n[n.success=2]="success",n[n.error=3]="error";let ApiResult=class ApiResult{get status(){return!this._isLoading||this._data||this._errorMessage?!this._isLoading&&this._isSuccess&&this._data?2:this._isLoading||this._isSuccess||!this._errorMessage?0:3:1}get data(){return this._data}get errorMessage(){return this._errorMessage}static start(){let e=new ApiResult;return e._isLoading=!0,e}static success(e){let t=new ApiResult;return t._isSuccess=!0,t._data=e,t}static error(e){let t=new ApiResult;return t._isSuccess=!1,t._errorMessage=e,t}static setNone(){return new ApiResult}constructor(){this._data=null,this._errorMessage=null}}},65805:function(e,t,s){"use strict";var r,n;s.d(t,{F:function(){return r}}),(n=r||(r={}))[n.Car=1]="Car",n[n.Moto=2]="Moto",n[n.Bus=3]="Bus",n[n.Truck=4]="Truck",n[n.Van=5]="Van"},1261:function(e,t,s){"use strict";s.r(t),s.d(t,{default:function(){return models_page}});var r=s(85893),n=s(15861),a=s(69661),i=s(18377),o=s(67294),c=s(18557),l=s(74864),d=s(29204),u=s(3595);let ModelsService=class ModelsService{static get instance(){var e;return null!==(e=ModelsService.myInstance)&&void 0!==e?e:ModelsService.myInstance=new ModelsService}async list(){let e=await u.Z.instance.get("/vehicles/models");if(e.status===d.WE.Ok)return e.data;throw Error(e.data)}async listByBrandId(e){let t=await u.Z.instance.get("/vehicles/models/brand/".concat(e));if(t.status===d.WE.Ok)return t.data;throw Error(t.data)}async find(e){let t=await u.Z.instance.get("/vehicles/models/".concat(e));if(t.status===d.WE.Ok)return t.data;throw Error(t.data)}};ModelsService.myInstance=null;var use_list_models=()=>async()=>{try{let e=await ModelsService.instance.list();return l.f.success(e)}catch(r){var e,t,s;return l.f.error(null!==(s=null===(t=r.response)||void 0===t?void 0:null===(e=t.data)||void 0===e?void 0:e.Message)&&void 0!==s?s:r.message)}},use_list_models_by_brand_id=()=>async e=>{try{let t=await ModelsService.instance.listByBrandId(e);return l.f.success(t)}catch(e){var t,s,r;return l.f.error(null!==(r=null===(s=e.response)||void 0===s?void 0:null===(t=s.data)||void 0===t?void 0:t.Message)&&void 0!==r?r:e.message)}},h=s(16211),v=s(66188),x=s(39332),models_page=()=>{let[e,t]=(0,o.useState)(l.f.start()),[s,d]=(0,o.useState)(l.f.start()),u=(0,x.useSearchParams)(),m=null==u?void 0:u.get("brandId"),p=use_list_models(),f=use_list_models_by_brand_id(),g=(0,c.Z)(),fetchData=async()=>{m?(d(await g(parseInt(m))),t(await f(parseInt(m)))):t(await p())};if((0,o.useEffect)(()=>{e.status===l.w.loading&&fetchData()}),!m)return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(v.Z,{title:"Modelos",description:"Confira a rela\xe7\xe3o de modelos que controlamos o valor de mercado",keywords:"ford, volkswagen, chevrolet, carro, pre\xe7o, vender, comprar, ve\xedculo"}),(0,r.jsxs)(i.Z,{sx:{mb:5},children:[(0,r.jsx)(n.Z,{variant:"h1",component:"h1",children:"Modelos"}),(0,r.jsxs)(n.Z,{variant:"h6",component:"p",children:["Encontre o modelo do seu novo ve\xedculo,",(0,r.jsx)("br",{}),"clique sobre ele para ver todos os ve\xedculo dispon\xedveis."]})]}),(0,r.jsx)(h.default,{modelsResult:e})]});{let t="",o="";return e.status===l.w.success&&e.data.length>0?(t=e.data[0].brandName,o=e.data[0].brandLogo):s.status===l.w.success&&(t=s.data.name,o=s.data.logo),(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(v.Z,{title:"Modelos",description:"Confira a rela\xe7\xe3o de modelos que controlamos o valor de mercado",keywords:"ford, volkswagen, chevrolet, carro, pre\xe7o, vender, comprar, ve\xedculo"}),(0,r.jsxs)(i.Z,{sx:{width:"100%",display:"flex",justifyContent:"between",alignItems:"center",mb:5},children:[(0,r.jsxs)(i.Z,{sx:{flexGrow:1},children:[(0,r.jsx)(n.Z,{variant:"h1",component:"h1",children:"Modelos"}),(0,r.jsxs)(n.Z,{variant:"h6",component:"p",children:["Encontre o modelo do seu novo ve\xedculo da marca ",(0,r.jsx)("strong",{children:t}),",",(0,r.jsx)("br",{}),"clique sobre ele para ver todos os ve\xedculo dispon\xedveis."]})]}),(0,r.jsx)(a.Z,{src:o,alt:t,sx:{width:120,height:120},children:(0,r.jsx)(n.Z,{variant:"h4",children:t[0]})})]}),(0,r.jsx)(h.default,{modelsResult:e})]})}}},62116:function(e,t,s){"use strict";s.r(t);var r=s(85893),n=s(25689),a=s(24386),i=s(78046),o=s(15861),c=s(66242),l=s(9974),d=s(44267),u=s(78462),h=s(97212),v=s(18987),x=s(69661),m=s(79953),p=s(99226),f=s(65805),g=s(39332);t.default=e=>{let{id:t,brandId:s,brandName:Z,brandLogo:j,name:w,description:_,type:y}=e,M=(0,g.useRouter)();return(0,r.jsx)(c.Z,{sx:{height:"100%"},children:(0,r.jsx)(l.Z,{sx:{height:"100%"},onClick:()=>{M.push("/brands/".concat(s,"/models/").concat(t,"/vehicles"))},children:(0,r.jsx)(d.Z,{sx:{height:"100%"},children:(0,r.jsx)(u.Z,{children:(0,r.jsxs)(h.ZP,{children:[(0,r.jsx)(v.Z,{children:(0,r.jsx)(x.Z,{sx:{width:80,height:80,mr:3},children:(0,r.jsx)(()=>{switch(y){case f.F.Car:return(0,r.jsx)(n.Z,{style:{fontSize:48}});case f.F.Moto:return(0,r.jsx)(a.Z,{style:{fontSize:48}});default:return(0,r.jsx)(o.Z,{component:"span",variant:"h4",children:w?w[0]:""})}},{})})}),(0,r.jsx)(m.Z,{disableTypography:!0,primary:(0,r.jsx)(o.Z,{gutterBottom:!0,variant:"h6",component:"div",children:w}),secondary:(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(o.Z,{gutterBottom:!0,variant:"subtitle2",component:"div",children:_}),(0,r.jsxs)(p.Z,{sx:{display:"flex",alignItems:"center"},children:[(0,r.jsx)(x.Z,{src:j,alt:Z,sx:{width:24,height:24,mr:1},children:(0,r.jsx)(o.Z,{variant:"h4",children:Z?Z[0]:""})}),(0,r.jsx)(o.Z,{gutterBottom:!0,variant:"subtitle2",component:"div",sx:{mb:0},children:Z})]})]})}),(0,r.jsx)(i.Z,{sx:{fontSize:48,color:"grey.400"}})]})})})})})}},16211:function(e,t,s){"use strict";s.r(t);var r=s(85893),n=s(86886),a=s(74864),i=s(62116);t.default=e=>{let{modelsResult:t}=e;return(0,r.jsxs)(r.Fragment,{children:[(null==t?void 0:t.status)===a.w.loading&&(0,r.jsx)("p",{children:"Carregando..."}),(null==t?void 0:t.status)===a.w.error&&(0,r.jsxs)("p",{children:["Erro: ",t.errorMessage]}),(null==t?void 0:t.status)===a.w.success&&t.data.length>0&&(0,r.jsx)(n.ZP,{container:!0,spacing:1,sx:{my:3},children:t.data.map(e=>(0,r.jsx)(n.ZP,{item:!0,xs:12,lg:6,children:(0,r.jsx)(i.default,{...e})},e.id))}),(null==t?void 0:t.status)===a.w.success&&0===t.data.length&&(0,r.jsx)("p",{children:":( Nenhum Registro Encontrado"})]})}},57174:function(e,t,s){"use strict";s.d(t,{Z:function(){return BrandsService}});var r=s(29204),n=s(3595);let BrandsService=class BrandsService{static get instance(){var e;return null!==(e=BrandsService.myInstance)&&void 0!==e?e:BrandsService.myInstance=new BrandsService}async list(){let e=await n.Z.instance.get("/vehicles/brands");if(e.status===r.WE.Ok)return e.data;throw Error(e.data)}async find(e){let t=await n.Z.instance.get("/vehicles/brands/".concat(e));if(t.status===r.WE.Ok)return t.data;throw Error(t.data)}};BrandsService.myInstance=null},9008:function(e,t,s){e.exports=s(90046)}},function(e){e.O(0,[774,20,412,738,797,886,204,888,179],function(){return e(e.s=20713)}),_N_E=e.O()}]);