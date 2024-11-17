"use strict";(self.webpackChunkchg_training_resources=self.webpackChunkchg_training_resources||[]).push([[6305],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>u});var a=n(67294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,i=function(e,t){if(null==e)return{};var n,a,i={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var l=a.createContext({}),p=function(e){var t=a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},c=function(e){var t=p(e.components);return a.createElement(l.Provider,{value:t},e.children)},m="mdxType",h={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},d=a.forwardRef((function(e,t){var n=e.components,i=e.mdxType,r=e.originalType,l=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),m=p(n),d=i,u=m["".concat(l,".").concat(d)]||m[d]||h[d]||r;return n?a.createElement(u,o(o({ref:t},c),{},{components:n})):a.createElement(u,o({ref:t},c))}));function u(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var r=n.length,o=new Array(r);o[0]=d;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[m]="string"==typeof e?e:i,o[1]=s;for(var p=2;p<r;p++)o[p]=n[p];return a.createElement.apply(null,o)}return a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},74314:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>o,default:()=>h,frontMatter:()=>r,metadata:()=>s,toc:()=>p});var a=n(87462),i=(n(67294),n(3905));const r={sidebar_position:5},o="Viewing gene records",s={unversionedId:"bioinformatics/exploring_gene_annotations_in_bash/viewing",id:"bioinformatics/exploring_gene_annotations_in_bash/viewing",title:"Viewing gene records",description:"Use the less command to view the file:",source:"@site/docs/bioinformatics/exploring_gene_annotations_in_bash/viewing.md",sourceDirName:"bioinformatics/exploring_gene_annotations_in_bash",slug:"/bioinformatics/exploring_gene_annotations_in_bash/viewing",permalink:"/chg-training-resources/bioinformatics/exploring_gene_annotations_in_bash/viewing",draft:!1,editUrl:"https://github.com/chg-training/chg-training-resources/edit/main/docs/bioinformatics/exploring_gene_annotations_in_bash/viewing.md",tags:[],version:"current",sidebarPosition:5,frontMatter:{sidebar_position:5},sidebar:"sidebar2",previous:{title:"Decompressing the file",permalink:"/chg-training-resources/bioinformatics/exploring_gene_annotations_in_bash/decompressing"},next:{title:"Counting genes",permalink:"/chg-training-resources/bioinformatics/exploring_gene_annotations_in_bash/counting"}},l={},p=[],c={toc:p},m="wrapper";function h(e){let{components:t,...n}=e;return(0,i.kt)(m,(0,a.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"viewing-gene-records"},"Viewing gene records"),(0,i.kt)("p",null,"Use the ",(0,i.kt)("inlineCode",{parentName:"p"},"less")," command to view the file:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"less -S gencode.v41.annotation.gff3\n")),(0,i.kt)("p",null,"You can scroll around and have a look in there.  You should see some ",(0,i.kt)("strong",{parentName:"p"},"metadata")," lines at the top (they start with ",(0,i.kt)("inlineCode",{parentName:"p"},"#"),").  They look like this:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"##gff-version 3\n#description: evidence-based annotation of the human genome (GRCh38), version 41 (Ensembl 107)\n#provider: GENCODE\n#contact: gencode-help@ebi.ac.uk\n#format: gff3\n#date: 2022-05-12\n##sequence-region chr1 1 248956422\n")),(0,i.kt)("p",null,"...and include information on the human genome assembly used (GRCh38, what's known as 'build 38') and other\nthings."),(0,i.kt)("p",null,"This is followed by some ",(0,i.kt)("em",{parentName:"p"},"data rows"),", that look like:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"chr1    HAVANA  gene    11869   14409   .       +       .       ID=ENSG00000223972.5;gene_id=ENSG00000223972.>\nchr1    HAVANA  transcript      11869   14409   .       +       .       ID=ENST00000456328.2;Parent=ENSG00000>\nchr1    HAVANA  exon    11869   12227   .       +       .       ID=exon:ENST00000456328.2:1;Parent=ENST000004>\nchr1    HAVANA  exon    12613   12721   .       +       .       ID=exon:ENST00000456328.2:2;Parent=ENST000004>\n")),(0,i.kt)("p",null,"When you want to quit ",(0,i.kt)("inlineCode",{parentName:"p"},"less"),", press ",(0,i.kt)("inlineCode",{parentName:"p"},"q"),"."),(0,i.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,i.kt)("div",{parentName:"div",className:"admonition-heading"},(0,i.kt)("h5",{parentName:"div"},(0,i.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,i.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,i.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"Tip")),(0,i.kt)("div",{parentName:"div",className:"admonition-content"},(0,i.kt)("p",{parentName:"div"},"What's the ",(0,i.kt)("inlineCode",{parentName:"p"},"-S")," for in that less command?  Well try it without and you'll see:"),(0,i.kt)("pre",{parentName:"div"},(0,i.kt)("code",{parentName:"pre"},"less gencode.v41.annotation.gff3\n")),(0,i.kt)("p",{parentName:"div"},"The ",(0,i.kt)("inlineCode",{parentName:"p"},"-S")," tells ",(0,i.kt)("inlineCode",{parentName:"p"},"less")," to extend all the lines off the right of the screen - without it they wrap around which\nmakes reading the file pretty difficult."))),(0,i.kt)("p",null,"So, what does all that data mean? This file format is one of those annoying ones that ",(0,i.kt)("strong",{parentName:"p"},"includes no column\nnames"),". To figure out what they mean, you have to look at the GFF3 specification. You can find this ",(0,i.kt)("a",{parentName:"p",href:"https://www.gencodegenes.org/pages/data_format.html"},"on the\nGENCODE site")," or a similar description ",(0,i.kt)("a",{parentName:"p",href:"http://www.ensembl.org/info/website/upload/gff3.html"},"on\nEnsembl"),"."),(0,i.kt)("div",{className:"admonition admonition-tip alert alert--success"},(0,i.kt)("div",{parentName:"div",className:"admonition-heading"},(0,i.kt)("h5",{parentName:"div"},(0,i.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,i.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"},(0,i.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.5 0C3.48 0 1 2.19 1 5c0 .92.55 2.25 1 3 1.34 2.25 1.78 2.78 2 4v1h5v-1c.22-1.22.66-1.75 2-4 .45-.75 1-2.08 1-3 0-2.81-2.48-5-5.5-5zm3.64 7.48c-.25.44-.47.8-.67 1.11-.86 1.41-1.25 2.06-1.45 3.23-.02.05-.02.11-.02.17H5c0-.06 0-.13-.02-.17-.2-1.17-.59-1.83-1.45-3.23-.2-.31-.42-.67-.67-1.11C2.44 6.78 2 5.65 2 5c0-2.2 2.02-4 4.5-4 1.22 0 2.36.42 3.22 1.19C10.55 2.94 11 3.94 11 5c0 .66-.44 1.78-.86 2.48zM4 14h5c-.23 1.14-1.3 2-2.5 2s-2.27-.86-2.5-2z"}))),"Question")),(0,i.kt)("div",{parentName:"div",className:"admonition-content"},(0,i.kt)("p",{parentName:"div"},"Look at the first 'gene' in the file. By manually looking at the file and comparing to the file specification,\ncan you figure out:"),(0,i.kt)("ul",{parentName:"div"},(0,i.kt)("li",{parentName:"ul"},"which chromosome is it on?"),(0,i.kt)("li",{parentName:"ul"},"which strand is it transcribed on?"),(0,i.kt)("li",{parentName:"ul"},"what type of gene is it - is it protein-coding? (Hint: look for the ",(0,i.kt)("inlineCode",{parentName:"li"},"gene_type")," attribute.  It can be looked up in the ",(0,i.kt)("a",{parentName:"li",href:"https://www.gencodegenes.org/pages/biotypes.html"},"list of biotypes"),".)"),(0,i.kt)("li",{parentName:"ul"},"how many transcripts does the gene have?")))),(0,i.kt)("p",null,"Note that to answer this last question, you'll need to look at how the different rows in the file are related to\neach other.  In short:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"each row has an ",(0,i.kt)("inlineCode",{parentName:"li"},"ID")," attribute"),(0,i.kt)("li",{parentName:"ul"},"some rows also have a ",(0,i.kt)("inlineCode",{parentName:"li"},"Parent")," attribute")),(0,i.kt)("p",null,"these attributes make the records in the file into a tree.  So conceptually the structure looks something like"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"            gene\n           /    \\      \n transcript1   transcript2  ...\n")),(0,i.kt)("p",null,"i.e. each transcript has a parent gene - which means that it represents an observed or predicted RNA transcript of that\ngene.  Transcripts themselves have exons - the parts of the transcript that actually make it to mature messenger RNA - so actually it is more like this:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"             gene\n            /    \\      \n  transcript1   transcript2  ...\n   /      |      |       \\\nexon1  exon2    exon1    exon2\n")),(0,i.kt)("div",{className:"admonition admonition-tip alert alert--success"},(0,i.kt)("div",{parentName:"div",className:"admonition-heading"},(0,i.kt)("h5",{parentName:"div"},(0,i.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,i.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"},(0,i.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.5 0C3.48 0 1 2.19 1 5c0 .92.55 2.25 1 3 1.34 2.25 1.78 2.78 2 4v1h5v-1c.22-1.22.66-1.75 2-4 .45-.75 1-2.08 1-3 0-2.81-2.48-5-5.5-5zm3.64 7.48c-.25.44-.47.8-.67 1.11-.86 1.41-1.25 2.06-1.45 3.23-.02.05-.02.11-.02.17H5c0-.06 0-.13-.02-.17-.2-1.17-.59-1.83-1.45-3.23-.2-.31-.42-.67-.67-1.11C2.44 6.78 2 5.65 2 5c0-2.2 2.02-4 4.5-4 1.22 0 2.36.42 3.22 1.19C10.55 2.94 11 3.94 11 5c0 .66-.44 1.78-.86 2.48zM4 14h5c-.23 1.14-1.3 2-2.5 2s-2.27-.86-2.5-2z"}))),"Question")),(0,i.kt)("div",{parentName:"div",className:"admonition-content"},(0,i.kt)("p",{parentName:"div"},"There are also ",(0,i.kt)("em",{parentName:"p"},"coding sequence")," records (",(0,i.kt)("inlineCode",{parentName:"p"},"type=CDS"),"). Can you tell what these have as parents - exons,\ntranscripts or genes?"))))}h.isMDXComponent=!0}}]);