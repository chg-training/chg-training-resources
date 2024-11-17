"use strict";(self.webpackChunkchg_training_resources=self.webpackChunkchg_training_resources||[]).push([[3662],{3905:(e,t,a)=>{a.d(t,{Zo:()=>m,kt:()=>f});var r=a(67294);function n(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function o(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function i(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?o(Object(a),!0).forEach((function(t){n(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):o(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function l(e,t){if(null==e)return{};var a,r,n=function(e,t){if(null==e)return{};var a,r,n={},o=Object.keys(e);for(r=0;r<o.length;r++)a=o[r],t.indexOf(a)>=0||(n[a]=e[a]);return n}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)a=o[r],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(n[a]=e[a])}return n}var s=r.createContext({}),c=function(e){var t=r.useContext(s),a=t;return e&&(a="function"==typeof e?e(t):i(i({},t),e)),a},m=function(e){var t=c(e.components);return r.createElement(s.Provider,{value:t},e.children)},u="mdxType",p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var a=e.components,n=e.mdxType,o=e.originalType,s=e.parentName,m=l(e,["components","mdxType","originalType","parentName"]),u=c(a),d=n,f=u["".concat(s,".").concat(d)]||u[d]||p[d]||o;return a?r.createElement(f,i(i({ref:t},m),{},{components:a})):r.createElement(f,i({ref:t},m))}));function f(e,t){var a=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var o=a.length,i=new Array(o);i[0]=d;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[u]="string"==typeof e?e:n,i[1]=l;for(var c=2;c<o;c++)i[c]=a[c];return r.createElement.apply(null,i)}return r.createElement.apply(null,a)}d.displayName="MDXCreateElement"},72360:(e,t,a)=>{a.d(t,{Z:()=>i});var r=a(67294),n=a(86010);const o={tabItem:"tabItem_OmH5"};function i(e){let{children:t,hidden:a,className:i}=e;return r.createElement("div",{role:"tabpanel",className:(0,n.Z)(o.tabItem,i),hidden:a},t)}},9877:(e,t,a)=>{a.d(t,{Z:()=>p});var r=a(87462),n=a(67294),o=a(72389),i=a(67392),l=a(7094),s=a(12466),c=a(86010);const m={tabList:"tabList_uSqn",tabItem:"tabItem_LplD"};function u(e){const{lazy:t,block:a,defaultValue:o,values:u,groupId:p,className:d}=e,f=n.Children.map(e.children,(e=>{if((0,n.isValidElement)(e)&&void 0!==e.props.value)return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)})),g=u??f.map((e=>{let{props:{value:t,label:a,attributes:r}}=e;return{value:t,label:a,attributes:r}})),h=(0,i.l)(g,((e,t)=>e.value===t.value));if(h.length>0)throw new Error(`Docusaurus error: Duplicate values "${h.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`);const b=null===o?o:o??f.find((e=>e.props.default))?.props.value??f[0]?.props.value;if(null!==b&&!g.some((e=>e.value===b)))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${b}" but none of its children has the corresponding value. Available values are: ${g.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);const{tabGroupChoices:v,setTabGroupChoices:y}=(0,l.U)(),[w,k]=(0,n.useState)(b),_=[],{blockElementScrollPositionUntilNextRender:N}=(0,s.o5)();if(null!=p){const e=v[p];null!=e&&e!==w&&g.some((t=>t.value===e))&&k(e)}const E=e=>{const t=e.currentTarget,a=_.indexOf(t),r=g[a].value;r!==w&&(N(t),k(r),null!=p&&y(p,r))},O=e=>{let t=null;switch(e.key){case"ArrowRight":{const a=_.indexOf(e.currentTarget)+1;t=_[a]||_[0];break}case"ArrowLeft":{const a=_.indexOf(e.currentTarget)-1;t=_[a]||_[_.length-1];break}}t?.focus()};return n.createElement("div",{className:(0,c.Z)("tabs-container",m.tabList)},n.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,c.Z)("tabs",{"tabs--block":a},d)},g.map((e=>{let{value:t,label:a,attributes:o}=e;return n.createElement("li",(0,r.Z)({role:"tab",tabIndex:w===t?0:-1,"aria-selected":w===t,key:t,ref:e=>_.push(e),onKeyDown:O,onFocus:E,onClick:E},o,{className:(0,c.Z)("tabs__item",m.tabItem,o?.className,{"tabs__item--active":w===t})}),a??t)}))),t?(0,n.cloneElement)(f.filter((e=>e.props.value===w))[0],{className:"margin-top--md"}):n.createElement("div",{className:"margin-top--md"},f.map(((e,t)=>(0,n.cloneElement)(e,{key:t,hidden:e.props.value!==w})))))}function p(e){const t=(0,o.Z)();return n.createElement(u,(0,r.Z)({key:String(t)},e))}},85736:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>s,contentTitle:()=>i,default:()=>p,frontMatter:()=>o,metadata:()=>l,toc:()=>c});var r=a(87462),n=(a(67294),a(3905));a(9877),a(72360);const o={sidebar_position:6},i="Writing a command-line program",l={unversionedId:"bioinformatics/a_command_line_program/README",id:"bioinformatics/a_command_line_program/README",title:"Writing a command-line program",description:"If you've followed the tutorials so far, you'll have an R or python 'gmsgff' package that can load data from GFF files (like those from Gencode).",source:"@site/docs/bioinformatics/a_command_line_program/README.md",sourceDirName:"bioinformatics/a_command_line_program",slug:"/bioinformatics/a_command_line_program/",permalink:"/chg-training-resources/bioinformatics/a_command_line_program/",draft:!1,editUrl:"https://github.com/chg-training/chg-training-resources/edit/main/docs/bioinformatics/a_command_line_program/README.md",tags:[],version:"current",sidebarPosition:6,frontMatter:{sidebar_position:6},sidebar:"sidebar2",previous:{title:"A fully-fledged R package",permalink:"/chg-training-resources/bioinformatics/making_an_R_package/fully_fledged"},next:{title:"A command-line program",permalink:"/chg-training-resources/bioinformatics/a_command_line_program/a_program"}},s={},c=[],m={toc:c},u="wrapper";function p(e){let{components:t,...a}=e;return(0,n.kt)(u,(0,r.Z)({},m,a,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("h1",{id:"writing-a-command-line-program"},"Writing a command-line program"),(0,n.kt)("p",null,"If you've followed the tutorials so far, you'll have an R or python 'gmsgff' package that can load data from GFF files (like those from ",(0,n.kt)("a",{parentName:"p",href:"https://www.gencodegenes.org"},"Gencode"),")."),(0,n.kt)("p",null,"Your R package (or python module) is already useful!  To demonstrate this, let's use it to write a ",(0,n.kt)("strong",{parentName:"p"},"command-line\nutility")," - a program you can run on the command-line to do something useful."),(0,n.kt)("p",null,"Specifically let's write a program to convert a GFF file to the ",(0,n.kt)("a",{parentName:"p",href:"https://www.sqlite.org"},"sqlite database")," format. "),(0,n.kt)("div",{className:"admonition admonition-tip alert alert--success"},(0,n.kt)("div",{parentName:"div",className:"admonition-heading"},(0,n.kt)("h5",{parentName:"div"},(0,n.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,n.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"},(0,n.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.5 0C3.48 0 1 2.19 1 5c0 .92.55 2.25 1 3 1.34 2.25 1.78 2.78 2 4v1h5v-1c.22-1.22.66-1.75 2-4 .45-.75 1-2.08 1-3 0-2.81-2.48-5-5.5-5zm3.64 7.48c-.25.44-.47.8-.67 1.11-.86 1.41-1.25 2.06-1.45 3.23-.02.05-.02.11-.02.17H5c0-.06 0-.13-.02-.17-.2-1.17-.59-1.83-1.45-3.23-.2-.31-.42-.67-.67-1.11C2.44 6.78 2 5.65 2 5c0-2.2 2.02-4 4.5-4 1.22 0 2.36.42 3.22 1.19C10.55 2.94 11 3.94 11 5c0 .66-.44 1.78-.86 2.48zM4 14h5c-.23 1.14-1.3 2-2.5 2s-2.27-.86-2.5-2z"}))),"Why sqlite?")),(0,n.kt)("div",{parentName:"div",className:"admonition-content"},(0,n.kt)("p",{parentName:"div"},"We're using sqlite as an example here.  But there are lots of reasons why you might want to do this.  One of them is that ",(0,n.kt)("inlineCode",{parentName:"p"},"sqlite")," will make it easy to load just the bits of data we want (such as just the gene records, say, or just the transcripts) without us having to write special code into ",(0,n.kt)("inlineCode",{parentName:"p"},"read_gff()")," function.  If we want to analyse lots of files at once, this will help to reduce memory use. "),(0,n.kt)("p",{parentName:"div"},"Another good reason is that sqlite is easilt readable from almost any language, so this will stop us having to rewrite ",(0,n.kt)("inlineCode",{parentName:"p"},"read_gff()")," in other languages."))),(0,n.kt)("p",null,"To get started, ",(0,n.kt)("a",{parentName:"p",href:"/chg-training-resources/bioinformatics/a_command_line_program/a_program"},"go here"),"."))}p.isMDXComponent=!0}}]);