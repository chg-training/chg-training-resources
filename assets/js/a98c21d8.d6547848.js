"use strict";(self.webpackChunkchg_training_resources=self.webpackChunkchg_training_resources||[]).push([[9885],{3905:(e,n,t)=>{t.d(n,{Zo:()=>p,kt:()=>f});var r=t(67294);function i(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function a(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){i(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function s(e,n){if(null==e)return{};var t,r,i=function(e,n){if(null==e)return{};var t,r,i={},o=Object.keys(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||(i[t]=e[t]);return i}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(i[t]=e[t])}return i}var c=r.createContext({}),l=function(e){var n=r.useContext(c),t=n;return e&&(t="function"==typeof e?e(n):a(a({},n),e)),t},p=function(e){var n=l(e.components);return r.createElement(c.Provider,{value:n},e.children)},g="mdxType",u={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},m=r.forwardRef((function(e,n){var t=e.components,i=e.mdxType,o=e.originalType,c=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),g=l(t),m=i,f=g["".concat(c,".").concat(m)]||g[m]||u[m]||o;return t?r.createElement(f,a(a({ref:n},p),{},{components:t})):r.createElement(f,a({ref:n},p))}));function f(e,n){var t=arguments,i=n&&n.mdxType;if("string"==typeof e||i){var o=t.length,a=new Array(o);a[0]=m;var s={};for(var c in n)hasOwnProperty.call(n,c)&&(s[c]=n[c]);s.originalType=e,s[g]="string"==typeof e?e:i,a[1]=s;for(var l=2;l<o;l++)a[l]=t[l];return r.createElement.apply(null,a)}return r.createElement.apply(null,t)}m.displayName="MDXCreateElement"},50047:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>a,default:()=>u,frontMatter:()=>o,metadata:()=>s,toc:()=>l});var r=t(87462),i=(t(67294),t(3905));const o={sidebar_position:7.5},a="Counting genes again",s={unversionedId:"bioinformatics/exploring_gene_annotations_in_bash/counting2",id:"bioinformatics/exploring_gene_annotations_in_bash/counting2",title:"Counting genes again",description:"So why are there 60,000 genes in the file - isn't that too many?",source:"@site/docs/bioinformatics/exploring_gene_annotations_in_bash/counting2.md",sourceDirName:"bioinformatics/exploring_gene_annotations_in_bash",slug:"/bioinformatics/exploring_gene_annotations_in_bash/counting2",permalink:"/chg-training-resources/bioinformatics/exploring_gene_annotations_in_bash/counting2",draft:!1,editUrl:"https://github.com/chg-training/chg-training-resources/edit/main/docs/bioinformatics/exploring_gene_annotations_in_bash/counting2.md",tags:[],version:"current",sidebarPosition:7.5,frontMatter:{sidebar_position:7.5},sidebar:"sidebar2",previous:{title:"Counting genes",permalink:"/chg-training-resources/bioinformatics/exploring_gene_annotations_in_bash/counting"},next:{title:"Investigating specific genes",permalink:"/chg-training-resources/bioinformatics/exploring_gene_annotations_in_bash/investigating"}},c={},l=[],p={toc:l},g="wrapper";function u(e){let{components:n,...t}=e;return(0,i.kt)(g,(0,r.Z)({},p,t,{components:n,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"counting-genes-again"},"Counting genes again"),(0,i.kt)("p",null,"So why are there 60,000 genes in the file - isn't that too many?"),(0,i.kt)("p",null,"If you didn't work this out already, go back and use ",(0,i.kt)("inlineCode",{parentName:"p"},"less -S")," to look at the 'gene' records in the\nfile again, and remember that ",(0,i.kt)("inlineCode",{parentName:"p"},"gene_type")," attribute.  Many of the records actually don't say they\nare protein-coding genes but something else.  (For example ",(0,i.kt)("inlineCode",{parentName:"p"},"ENSG00000223972.6")," is a ['transcribed\nunprocessed pseudogene', i.e. something that makes mRNA but there isn't evidence it is translated to\nprotein - see ",(0,i.kt)("a",{parentName:"p",href:"http://www.ensembl.org/info/genome/genebuild/biotypes.html"},"the Ensembl biotypes\npage")," for a more specific definition.)"),(0,i.kt)("p",null,"Let's try to count just the protein-coding ones. To do this we will use a couple of commands - ",(0,i.kt)("inlineCode",{parentName:"p"},"awk"),'\nwhich we are here using just to select rows with "gene" in the ',(0,i.kt)("inlineCode",{parentName:"p"},"type")," column, and ",(0,i.kt)("inlineCode",{parentName:"p"},"wc")," which will\ncount the number of lines:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-sh"},"cat gencode.v41.annotation.gff3  | awk '$3==\"gene\"' | grep 'gene_type=protein_coding' | wc -l\n")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"20017\n")),(0,i.kt)("p",null,"This is a much more sensible number - there are about 20,000 protein-coding genes in the human genome.\nThat\u2019s a lot but we are big animals!"))}u.isMDXComponent=!0}}]);