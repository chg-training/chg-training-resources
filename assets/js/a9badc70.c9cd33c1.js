"use strict";(self.webpackChunkchg_training_resources=self.webpackChunkchg_training_resources||[]).push([[8331],{3905:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>h});var a=n(67294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},s=Object.keys(e);for(a=0;a<s.length;a++)n=s[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(a=0;a<s.length;a++)n=s[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var c=a.createContext({}),l=function(e){var t=a.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},p=function(e){var t=l(e.components);return a.createElement(c.Provider,{value:t},e.children)},u="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},m=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,s=e.originalType,c=e.parentName,p=o(e,["components","mdxType","originalType","parentName"]),u=l(n),m=r,h=u["".concat(c,".").concat(m)]||u[m]||d[m]||s;return n?a.createElement(h,i(i({ref:t},p),{},{components:n})):a.createElement(h,i({ref:t},p))}));function h(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var s=n.length,i=new Array(s);i[0]=m;var o={};for(var c in t)hasOwnProperty.call(t,c)&&(o[c]=t[c]);o.originalType=e,o[u]="string"==typeof e?e:r,i[1]=o;for(var l=2;l<s;l++)i[l]=n[l];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},72360:(e,t,n)=>{n.d(t,{Z:()=>i});var a=n(67294),r=n(86010);const s={tabItem:"tabItem_OmH5"};function i(e){let{children:t,hidden:n,className:i}=e;return a.createElement("div",{role:"tabpanel",className:(0,r.Z)(s.tabItem,i),hidden:n},t)}},9877:(e,t,n)=>{n.d(t,{Z:()=>d});var a=n(87462),r=n(67294),s=n(72389),i=n(67392),o=n(7094),c=n(12466),l=n(86010);const p={tabList:"tabList_uSqn",tabItem:"tabItem_LplD"};function u(e){const{lazy:t,block:n,defaultValue:s,values:u,groupId:d,className:m}=e,h=r.Children.map(e.children,(e=>{if((0,r.isValidElement)(e)&&void 0!==e.props.value)return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)})),g=u??h.map((e=>{let{props:{value:t,label:n,attributes:a}}=e;return{value:t,label:n,attributes:a}})),b=(0,i.l)(g,((e,t)=>e.value===t.value));if(b.length>0)throw new Error(`Docusaurus error: Duplicate values "${b.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`);const f=null===s?s:s??h.find((e=>e.props.default))?.props.value??h[0]?.props.value;if(null!==f&&!g.some((e=>e.value===f)))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${f}" but none of its children has the corresponding value. Available values are: ${g.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);const{tabGroupChoices:v,setTabGroupChoices:_}=(0,o.U)(),[y,k]=(0,r.useState)(f),w=[],{blockElementScrollPositionUntilNextRender:N}=(0,c.o5)();if(null!=d){const e=v[d];null!=e&&e!==y&&g.some((t=>t.value===e))&&k(e)}const x=e=>{const t=e.currentTarget,n=w.indexOf(t),a=g[n].value;a!==y&&(N(t),k(a),null!=d&&_(d,a))},O=e=>{let t=null;switch(e.key){case"ArrowRight":{const n=w.indexOf(e.currentTarget)+1;t=w[n]||w[0];break}case"ArrowLeft":{const n=w.indexOf(e.currentTarget)-1;t=w[n]||w[w.length-1];break}}t?.focus()};return r.createElement("div",{className:(0,l.Z)("tabs-container",p.tabList)},r.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,l.Z)("tabs",{"tabs--block":n},m)},g.map((e=>{let{value:t,label:n,attributes:s}=e;return r.createElement("li",(0,a.Z)({role:"tab",tabIndex:y===t?0:-1,"aria-selected":y===t,key:t,ref:e=>w.push(e),onKeyDown:O,onFocus:x,onClick:x},s,{className:(0,l.Z)("tabs__item",p.tabItem,s?.className,{"tabs__item--active":y===t})}),n??t)}))),t?(0,r.cloneElement)(h.filter((e=>e.props.value===y))[0],{className:"margin-top--md"}):r.createElement("div",{className:"margin-top--md"},h.map(((e,t)=>(0,r.cloneElement)(e,{key:t,hidden:e.props.value!==y})))))}function d(e){const t=(0,s.Z)();return r.createElement(u,(0,a.Z)({key:String(t)},e))}},81114:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>i,default:()=>d,frontMatter:()=>s,metadata:()=>o,toc:()=>l});var a=n(87462),r=(n(67294),n(3905));n(9877),n(72360);const s={sidebar_position:3},i="Picking a 'canonical' transcript",o={unversionedId:"bioinformatics/analysing_genes_across_species/extreme_genes/canonical_transcripts",id:"bioinformatics/analysing_genes_across_species/extreme_genes/canonical_transcripts",title:"Picking a 'canonical' transcript",description:"To assign a 'coding length' to each gene, we have to deal with the fact that genes have multiple transcripts.  Suggestion: let's solve this by picking one 'represenative' transcript per gene - the one with the longest coding length.",source:"@site/docs/bioinformatics/analysing_genes_across_species/extreme_genes/003_canonical_transcripts.md",sourceDirName:"bioinformatics/analysing_genes_across_species/extreme_genes",slug:"/bioinformatics/analysing_genes_across_species/extreme_genes/canonical_transcripts",permalink:"/chg-training-resources/bioinformatics/analysing_genes_across_species/extreme_genes/canonical_transcripts",draft:!1,editUrl:"https://github.com/chg-training/chg-training-resources/edit/main/docs/bioinformatics/analysing_genes_across_species/extreme_genes/003_canonical_transcripts.md",tags:[],version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3},sidebar:"sidebar2",previous:{title:"Computing coding length",permalink:"/chg-training-resources/bioinformatics/analysing_genes_across_species/extreme_genes/long_genes_2"},next:{title:"The number of exons",permalink:"/chg-training-resources/bioinformatics/analysing_genes_across_species/extreme_genes/how_many_exons"}},c={},l=[],p={toc:l},u="wrapper";function d(e){let{components:t,...n}=e;return(0,r.kt)(u,(0,a.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"picking-a-canonical-transcript"},"Picking a 'canonical' transcript"),(0,r.kt)("p",null,"To assign a 'coding length' to each gene, we have to deal with the fact that genes have multiple transcripts.  ",(0,r.kt)("strong",{parentName:"p"},"Suggestion"),": let's solve this by picking one 'represenative' transcript per gene - the one with the longest coding length."),(0,r.kt)("div",{className:"admonition admonition-tip alert alert--success"},(0,r.kt)("div",{parentName:"div",className:"admonition-heading"},(0,r.kt)("h5",{parentName:"div"},(0,r.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,r.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"},(0,r.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.5 0C3.48 0 1 2.19 1 5c0 .92.55 2.25 1 3 1.34 2.25 1.78 2.78 2 4v1h5v-1c.22-1.22.66-1.75 2-4 .45-.75 1-2.08 1-3 0-2.81-2.48-5-5.5-5zm3.64 7.48c-.25.44-.47.8-.67 1.11-.86 1.41-1.25 2.06-1.45 3.23-.02.05-.02.11-.02.17H5c0-.06 0-.13-.02-.17-.2-1.17-.59-1.83-1.45-3.23-.2-.31-.42-.67-.67-1.11C2.44 6.78 2 5.65 2 5c0-2.2 2.02-4 4.5-4 1.22 0 2.36.42 3.22 1.19C10.55 2.94 11 3.94 11 5c0 .66-.44 1.78-.86 2.48zM4 14h5c-.23 1.14-1.3 2-2.5 2s-2.27-.86-2.5-2z"}))),"Note")),(0,r.kt)("div",{parentName:"div",className:"admonition-content"},(0,r.kt)("p",{parentName:"div"},"As it happens, Ensembl also create a list of 'canonical' transcripts as ",(0,r.kt)("a",{parentName:"p",href:"https://www.ensembl.org/info/genome/genebuild/canonical.html"},"described on this page"),".  According to that page:"),(0,r.kt)("blockquote",{parentName:"div"},(0,r.kt)("p",{parentName:"blockquote"},'"For accurate analysis, we recommend that more than one\ntranscripts at a locus may need to be considered, however, we\ndesignate a single Ensembl Canonical transcript per locus to\nprovide consistency when only one transcript is required"')),(0,r.kt)("p",{parentName:"div"},"For some species, the Ensembl canonical transcript can be found in the ",(0,r.kt)("inlineCode",{parentName:"p"},"tsv")," folder on the Ensembl FTP site (at least\nit's there for humans in ",(0,r.kt)("a",{parentName:"p",href:"https://ftp.ensembl.org/pub/release-108/tsv/"},"release 108"),").  However, the file isn't there for all species, making it a bit difficult for us."),(0,r.kt)("p",{parentName:"div"},"However that page also says:"),(0,r.kt)("blockquote",{parentName:"div"},(0,r.kt)("p",{parentName:"blockquote"},"\u201cDefault\u201d selection: in the absence of the data above (which\ncurrently applies to all non-human genomes), transcripts\nprioritised accordingly, choosing the one with the longest\ncombined exon length:"),(0,r.kt)("ul",{parentName:"blockquote"},(0,r.kt)("li",{parentName:"ul"},"protein-coding\n..."))),(0,r.kt)("p",{parentName:"div"},"In other words - they're suggesting the coding sequence length as a reasonable default choice.  So that's what we'll compute here."))),(0,r.kt)("p",null,"In fact computing the transcript with the longest coding sequence turns out to be quite easy now.  First, let's sort our\ntranscripts-with-cds-length dataframe by length, to put the longest ones at the top:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"transcripts_and_cds = (\n    transcripts_and_cds\n    %>% arrange(\n            dataset,\n            gene_id,\n            transcript_id,\n            desc( cds_length )\n    )\n)\n")),(0,r.kt)("p",null,"If you look at the output and find genes that appear more than once (multiple transcripts) you should now see that they come in order of decrease ",(0,r.kt)("inlineCode",{parentName:"p"},"cds_length"),".  Now let's capture those by using ",(0,r.kt)("inlineCode",{parentName:"p"},"head")," to extract just the first entry for each gene:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"canonical_transcripts = (\n    transcripts_and_cds\n    %>% group_by( dataset, gene_id )\n    %>% summarise(\n        canonical_transcript_id = head( transcript_id, 1 ),\n        cds_start = head( cds_start, 1 ),\n        cds_end = head( cds_end, 1 ),\n        cds_length = head( cds_length, 1 )\n    )\n)\n")),(0,r.kt)("div",{className:"admonition admonition-caution alert alert--warning"},(0,r.kt)("div",{parentName:"div",className:"admonition-heading"},(0,r.kt)("h5",{parentName:"div"},(0,r.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,r.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 16 16"},(0,r.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M8.893 1.5c-.183-.31-.52-.5-.887-.5s-.703.19-.886.5L.138 13.499a.98.98 0 0 0 0 1.001c.193.31.53.501.886.501h13.964c.367 0 .704-.19.877-.5a1.03 1.03 0 0 0 .01-1.002L8.893 1.5zm.133 11.497H6.987v-2.003h2.039v2.003zm0-3.004H6.987V5.987h2.039v4.006z"}))),"Note")),(0,r.kt)("div",{parentName:"div",className:"admonition-content"},(0,r.kt)("p",{parentName:"div"},"You ",(0,r.kt)("strong",{parentName:"p"},"must")," always sanity check the results!  At the very least you should check some genes by hand to ensure this has got the answer right.  (Doing this also gets you used to filtering and manipulating dataframes, so it's good practice too.)"))),(0,r.kt)("p",null,"As a last point, let's link the genes back to the canonical transcripts:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-r"},'genes = inner_join(\n    genes,\n    canonical_transcripts,\n    by = c( "dataset", "gene_id" )\n)\n')),(0,r.kt)("p",null,"Congratulations!  You now have a table of genes, with a somewhat sensibly-chosen canonical transcript, and the coding sequence length!"))}d.isMDXComponent=!0}}]);