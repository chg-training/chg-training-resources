"use strict";(self.webpackChunkchg_training_resources=self.webpackChunkchg_training_resources||[]).push([[1256],{3905:(e,t,a)=>{a.d(t,{Zo:()=>m,kt:()=>h});var n=a(67294);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function i(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function o(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?i(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):i(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function s(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},i=Object.keys(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var l=n.createContext({}),c=function(e){var t=n.useContext(l),a=t;return e&&(a="function"==typeof e?e(t):o(o({},t),e)),a},m=function(e){var t=c(e.components);return n.createElement(l.Provider,{value:t},e.children)},p="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var a=e.components,r=e.mdxType,i=e.originalType,l=e.parentName,m=s(e,["components","mdxType","originalType","parentName"]),p=c(a),d=r,h=p["".concat(l,".").concat(d)]||p[d]||u[d]||i;return a?n.createElement(h,o(o({ref:t},m),{},{components:a})):n.createElement(h,o({ref:t},m))}));function h(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=a.length,o=new Array(i);o[0]=d;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[p]="string"==typeof e?e:r,o[1]=s;for(var c=2;c<i;c++)o[c]=a[c];return n.createElement.apply(null,o)}return n.createElement.apply(null,a)}d.displayName="MDXCreateElement"},72360:(e,t,a)=>{a.d(t,{Z:()=>o});var n=a(67294),r=a(86010);const i={tabItem:"tabItem_OmH5"};function o(e){let{children:t,hidden:a,className:o}=e;return n.createElement("div",{role:"tabpanel",className:(0,r.Z)(i.tabItem,o),hidden:a},t)}},9877:(e,t,a)=>{a.d(t,{Z:()=>u});var n=a(87462),r=a(67294),i=a(72389),o=a(67392),s=a(7094),l=a(12466),c=a(86010);const m={tabList:"tabList_uSqn",tabItem:"tabItem_LplD"};function p(e){const{lazy:t,block:a,defaultValue:i,values:p,groupId:u,className:d}=e,h=r.Children.map(e.children,(e=>{if((0,r.isValidElement)(e)&&void 0!==e.props.value)return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)})),g=p??h.map((e=>{let{props:{value:t,label:a,attributes:n}}=e;return{value:t,label:a,attributes:n}})),v=(0,o.l)(g,((e,t)=>e.value===t.value));if(v.length>0)throw new Error(`Docusaurus error: Duplicate values "${v.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`);const f=null===i?i:i??h.find((e=>e.props.default))?.props.value??h[0]?.props.value;if(null!==f&&!g.some((e=>e.value===f)))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${f}" but none of its children has the corresponding value. Available values are: ${g.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);const{tabGroupChoices:b,setTabGroupChoices:k}=(0,s.U)(),[N,y]=(0,r.useState)(f),_=[],{blockElementScrollPositionUntilNextRender:w}=(0,l.o5)();if(null!=u){const e=b[u];null!=e&&e!==N&&g.some((t=>t.value===e))&&y(e)}const x=e=>{const t=e.currentTarget,a=_.indexOf(t),n=g[a].value;n!==N&&(w(t),y(n),null!=u&&k(u,n))},C=e=>{let t=null;switch(e.key){case"ArrowRight":{const a=_.indexOf(e.currentTarget)+1;t=_[a]||_[0];break}case"ArrowLeft":{const a=_.indexOf(e.currentTarget)-1;t=_[a]||_[_.length-1];break}}t?.focus()};return r.createElement("div",{className:(0,c.Z)("tabs-container",m.tabList)},r.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,c.Z)("tabs",{"tabs--block":a},d)},g.map((e=>{let{value:t,label:a,attributes:i}=e;return r.createElement("li",(0,n.Z)({role:"tab",tabIndex:N===t?0:-1,"aria-selected":N===t,key:t,ref:e=>_.push(e),onKeyDown:C,onFocus:x,onClick:x},i,{className:(0,c.Z)("tabs__item",m.tabItem,i?.className,{"tabs__item--active":N===t})}),a??t)}))),t?(0,r.cloneElement)(h.filter((e=>e.props.value===N))[0],{className:"margin-top--md"}):r.createElement("div",{className:"margin-top--md"},h.map(((e,t)=>(0,r.cloneElement)(e,{key:t,hidden:e.props.value!==N})))))}function u(e){const t=(0,i.Z)();return r.createElement(p,(0,n.Z)({key:String(t)},e))}},2178:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>m,contentTitle:()=>l,default:()=>h,frontMatter:()=>s,metadata:()=>c,toc:()=>p});var n=a(87462),r=(a(67294),a(3905)),i=a(9877),o=a(72360);const s={sidebar_position:4.5},l="Extracting more attributes",c={unversionedId:"bioinformatics/programming_with_gene_annotations3/004b_more_attributes",id:"bioinformatics/programming_with_gene_annotations3/004b_more_attributes",title:"Extracting more attributes",description:"If you followed the previous sections, you'll have a working read_gff() and you'll have run the test and seen the important message:",source:"@site/docs/bioinformatics/programming_with_gene_annotations3/004b_more_attributes.md",sourceDirName:"bioinformatics/programming_with_gene_annotations3",slug:"/bioinformatics/programming_with_gene_annotations3/004b_more_attributes",permalink:"/chg-training-resources/bioinformatics/programming_with_gene_annotations3/004b_more_attributes",draft:!1,editUrl:"https://github.com/chg-training/chg-training-resources/edit/main/docs/bioinformatics/programming_with_gene_annotations3/004b_more_attributes.md",tags:[],version:"current",sidebarPosition:4.5,frontMatter:{sidebar_position:4.5},sidebar:"sidebar2",previous:{title:"Extracting the ID and Parent attributes",permalink:"/chg-training-resources/bioinformatics/programming_with_gene_annotations3/extracting_attributes"},next:{title:"Testing it out",permalink:"/chg-training-resources/bioinformatics/programming_with_gene_annotations3/testing_it_out"}},m={},p=[{value:"Challenge 1: extract more attributes",id:"challenge-1-extract-more-attributes",level:2},{value:"Challenge 2: shrink <code>attributes</code>",id:"challenge-2-shrink-attributes",level:2},{value:"The finished product",id:"the-finished-product",level:2}],u={toc:p},d="wrapper";function h(e){let{components:t,...a}=e;return(0,r.kt)(d,(0,n.Z)({},u,a,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"extracting-more-attributes"},"Extracting more attributes"),(0,r.kt)("p",null,"If you followed the previous sections, you'll have a working ",(0,r.kt)("inlineCode",{parentName:"p"},"read_gff()")," and you'll have run the test and seen the important message:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"++ test_read_gff(): Congratulations, all tests passed!\n")),(0,r.kt)("p",null,"Congratulations!"),(0,r.kt)("p",null,"However - there's more important information in that ",(0,r.kt)("inlineCode",{parentName:"p"},"attributes")," column which we should get."),(0,r.kt)("p",null,"Here are a couple of challenge questions for you to try if you feel like it:"),(0,r.kt)("h2",{id:"challenge-1-extract-more-attributes"},"Challenge 1: extract more attributes"),(0,r.kt)("div",{className:"admonition admonition-tip alert alert--success"},(0,r.kt)("div",{parentName:"div",className:"admonition-heading"},(0,r.kt)("h5",{parentName:"div"},(0,r.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,r.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"},(0,r.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.5 0C3.48 0 1 2.19 1 5c0 .92.55 2.25 1 3 1.34 2.25 1.78 2.78 2 4v1h5v-1c.22-1.22.66-1.75 2-4 .45-.75 1-2.08 1-3 0-2.81-2.48-5-5.5-5zm3.64 7.48c-.25.44-.47.8-.67 1.11-.86 1.41-1.25 2.06-1.45 3.23-.02.05-.02.11-.02.17H5c0-.06 0-.13-.02-.17-.2-1.17-.59-1.83-1.45-3.23-.2-.31-.42-.67-.67-1.11C2.44 6.78 2 5.65 2 5c0-2.2 2.02-4 4.5-4 1.22 0 2.36.42 3.22 1.19C10.55 2.94 11 3.94 11 5c0 .66-.44 1.78-.86 2.48zM4 14h5c-.23 1.14-1.3 2-2.5 2s-2.27-.86-2.5-2z"}))),"Challenge: extract more attributes (easy version)")),(0,r.kt)("div",{parentName:"div",className:"admonition-content"},(0,r.kt)("p",{parentName:"div"},"In the GENCODE data, the ",(0,r.kt)("inlineCode",{parentName:"p"},"gene_type")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"gene_name")," columns are useful as well.\nUpdate your function so it extracts these attributes into new columns too."))),(0,r.kt)("div",{className:"admonition admonition-tip alert alert--success"},(0,r.kt)("div",{parentName:"div",className:"admonition-heading"},(0,r.kt)("h5",{parentName:"div"},(0,r.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,r.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"},(0,r.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.5 0C3.48 0 1 2.19 1 5c0 .92.55 2.25 1 3 1.34 2.25 1.78 2.78 2 4v1h5v-1c.22-1.22.66-1.75 2-4 .45-.75 1-2.08 1-3 0-2.81-2.48-5-5.5-5zm3.64 7.48c-.25.44-.47.8-.67 1.11-.86 1.41-1.25 2.06-1.45 3.23-.02.05-.02.11-.02.17H5c0-.06 0-.13-.02-.17-.2-1.17-.59-1.83-1.45-3.23-.2-.31-.42-.67-.67-1.11C2.44 6.78 2 5.65 2 5c0-2.2 2.02-4 4.5-4 1.22 0 2.36.42 3.22 1.19C10.55 2.94 11 3.94 11 5c0 .66-.44 1.78-.86 2.48zM4 14h5c-.23 1.14-1.3 2-2.5 2s-2.27-.86-2.5-2z"}))),"Challenge: extract more attributes (harder version)")),(0,r.kt)("div",{parentName:"div",className:"admonition-content"},(0,r.kt)("p",{parentName:"div"},"Update your function so it takes an extra argument called ",(0,r.kt)("inlineCode",{parentName:"p"},"extra_attributes"),", containing a\nlist of other attributes to extract.  You'd call it something like this:"),(0,r.kt)(i.Z,{groupId:"language",mdxType:"Tabs"},(0,r.kt)(o.Z,{value:"R",label:"In R",mdxType:"TabItem"},(0,r.kt)("pre",{parentName:"div"},(0,r.kt)("code",{parentName:"pre"},'X = read_gff(\n    "gencode.v41.annotation.head.gff3",\n    extra_attributes = c( "gene_type", "gene_name" )\n)\n'))),(0,r.kt)(o.Z,{value:"python",label:"In python",mdxType:"TabItem"},(0,r.kt)("pre",{parentName:"div"},(0,r.kt)("code",{parentName:"pre"},'X = read_gff(\n    "gencode.v41.annotation.head.gff3",\n    extra_attributes = [ "gene_type", "gene_name" ]\n)\n')))),(0,r.kt)("p",{parentName:"div"},"The function should extract these extra attributes into seperate columns as well."))),(0,r.kt)("h2",{id:"challenge-2-shrink-attributes"},"Challenge 2: shrink ",(0,r.kt)("inlineCode",{parentName:"h2"},"attributes")),(0,r.kt)("p",null,"Currently, ",(0,r.kt)("inlineCode",{parentName:"p"},"read_gff()")," extracts ",(0,r.kt)("inlineCode",{parentName:"p"},"ID")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"Parent")," (and, if you do challenge 1, other attributes too).\nBut it also leaves these fields in the ",(0,r.kt)("inlineCode",{parentName:"p"},"attributes")," column.  Since the files are so big, this can waste a lot of memory."),(0,r.kt)("div",{className:"admonition admonition-tip alert alert--success"},(0,r.kt)("div",{parentName:"div",className:"admonition-heading"},(0,r.kt)("h5",{parentName:"div"},(0,r.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,r.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"},(0,r.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.5 0C3.48 0 1 2.19 1 5c0 .92.55 2.25 1 3 1.34 2.25 1.78 2.78 2 4v1h5v-1c.22-1.22.66-1.75 2-4 .45-.75 1-2.08 1-3 0-2.81-2.48-5-5.5-5zm3.64 7.48c-.25.44-.47.8-.67 1.11-.86 1.41-1.25 2.06-1.45 3.23-.02.05-.02.11-.02.17H5c0-.06 0-.13-.02-.17-.2-1.17-.59-1.83-1.45-3.23-.2-.31-.42-.67-.67-1.11C2.44 6.78 2 5.65 2 5c0-2.2 2.02-4 4.5-4 1.22 0 2.36.42 3.22 1.19C10.55 2.94 11 3.94 11 5c0 .66-.44 1.78-.86 2.48zM4 14h5c-.23 1.14-1.3 2-2.5 2s-2.27-.86-2.5-2z"}))),"Challenge 2: shrink ",(0,r.kt)("inlineCode",{parentName:"h5"},"attributes"))),(0,r.kt)("div",{parentName:"div",className:"admonition-content"},(0,r.kt)("p",{parentName:"div"},"Find a way to remove the extracted fields from ",(0,r.kt)("inlineCode",{parentName:"p"},"attributes")," when you extract them.\n(Make sure to remove the semicolon too, if it's there!)"),(0,r.kt)("p",{parentName:"div"},"Here are some hints:"),(0,r.kt)("p",{parentName:"div"},(0,r.kt)("strong",{parentName:"p"},"Hint 1")," In R, the ",(0,r.kt)("a",{parentName:"p",href:"https://stringr.tidyverse.org/reference/str_remove.html"},(0,r.kt)("inlineCode",{parentName:"a"},"str_remove()")," function")," from ",(0,r.kt)("inlineCode",{parentName:"p"},"stringr")," can help with this - you will need to use the right regular expression."),(0,r.kt)("p",{parentName:"div"},(0,r.kt)("strong",{parentName:"p"},"Hint 2")," The regular expression syntax '(;|$)' will match ",(0,r.kt)("em",{parentName:"p"},"either")," a semicolon ",(0,r.kt)("em",{parentName:"p"},"or")," the end of the string - may be\nuseful."))),(0,r.kt)("h2",{id:"the-finished-product"},"The finished product"),(0,r.kt)("p",null,"If you get through all (or any) of that - congratulations!"),(0,r.kt)("p",null,"For a tutorial that uses this code - see the follow-on ",(0,r.kt)("a",{parentName:"p",href:"/chg-training-resources/bioinformatics/analysing_genes_across_species/"},"Analysing genes across species\ntutorial"),"."),(0,r.kt)("div",{className:"admonition admonition-tip alert alert--success"},(0,r.kt)("div",{parentName:"div",className:"admonition-heading"},(0,r.kt)("h5",{parentName:"div"},(0,r.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,r.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"},(0,r.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.5 0C3.48 0 1 2.19 1 5c0 .92.55 2.25 1 3 1.34 2.25 1.78 2.78 2 4v1h5v-1c.22-1.22.66-1.75 2-4 .45-.75 1-2.08 1-3 0-2.81-2.48-5-5.5-5zm3.64 7.48c-.25.44-.47.8-.67 1.11-.86 1.41-1.25 2.06-1.45 3.23-.02.05-.02.11-.02.17H5c0-.06 0-.13-.02-.17-.2-1.17-.59-1.83-1.45-3.23-.2-.31-.42-.67-.67-1.11C2.44 6.78 2 5.65 2 5c0-2.2 2.02-4 4.5-4 1.22 0 2.36.42 3.22 1.19C10.55 2.94 11 3.94 11 5c0 .66-.44 1.78-.86 2.48zM4 14h5c-.23 1.14-1.3 2-2.5 2s-2.27-.86-2.5-2z"}))),"Note")),(0,r.kt)("div",{parentName:"div",className:"admonition-content"},(0,r.kt)("p",{parentName:"div"},"If instead you'd like to see my version of the finished product - the R package and the command-line program with the\nimprovements listed here - there's also a link on the ",(0,r.kt)("a",{parentName:"p",href:"/chg-training-resources/bioinformatics/analysing_genes_across_species/"},"Analysing genes across species\ntutorial")," page."))))}h.isMDXComponent=!0}}]);