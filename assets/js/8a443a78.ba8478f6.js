"use strict";(self.webpackChunkchg_training_resources=self.webpackChunkchg_training_resources||[]).push([[6063],{3905:(e,n,t)=>{t.d(n,{Zo:()=>c,kt:()=>g});var a=t(67294);function i(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function r(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){i(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function p(e,n){if(null==e)return{};var t,a,i=function(e,n){if(null==e)return{};var t,a,i={},o=Object.keys(e);for(a=0;a<o.length;a++)t=o[a],n.indexOf(t)>=0||(i[t]=e[t]);return i}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)t=o[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(i[t]=e[t])}return i}var s=a.createContext({}),l=function(e){var n=a.useContext(s),t=n;return e&&(t="function"==typeof e?e(n):r(r({},n),e)),t},c=function(e){var n=l(e.components);return a.createElement(s.Provider,{value:n},e.children)},d="mdxType",m={inlineCode:"code",wrapper:function(e){var n=e.children;return a.createElement(a.Fragment,{},n)}},u=a.forwardRef((function(e,n){var t=e.components,i=e.mdxType,o=e.originalType,s=e.parentName,c=p(e,["components","mdxType","originalType","parentName"]),d=l(t),u=i,g=d["".concat(s,".").concat(u)]||d[u]||m[u]||o;return t?a.createElement(g,r(r({ref:n},c),{},{components:t})):a.createElement(g,r({ref:n},c))}));function g(e,n){var t=arguments,i=n&&n.mdxType;if("string"==typeof e||i){var o=t.length,r=new Array(o);r[0]=u;var p={};for(var s in n)hasOwnProperty.call(n,s)&&(p[s]=n[s]);p.originalType=e,p[d]="string"==typeof e?e:i,r[1]=p;for(var l=2;l<o;l++)r[l]=t[l];return a.createElement.apply(null,r)}return a.createElement.apply(null,t)}u.displayName="MDXCreateElement"},9350:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>s,contentTitle:()=>r,default:()=>m,frontMatter:()=>o,metadata:()=>p,toc:()=>l});var a=t(87462),i=(t(67294),t(3905));const o={sidebar_position:4},r="Principal component analysis of the 1000 Genomes Project",p={unversionedId:"population_genetics/admixture_and_biobanks/pca",id:"population_genetics/admixture_and_biobanks/pca",title:"Principal component analysis of the 1000 Genomes Project",description:"The example is based on a subset of genotype data of common variant included in the 1000 Genome Project (chromosome 21",source:"@site/docs/population_genetics/admixture_and_biobanks/pca.md",sourceDirName:"population_genetics/admixture_and_biobanks",slug:"/population_genetics/admixture_and_biobanks/pca",permalink:"/chg-training-resources/population_genetics/admixture_and_biobanks/pca",draft:!1,editUrl:"https://github.com/chg-training/chg-training-resources/edit/main/docs/population_genetics/admixture_and_biobanks/pca.md",tags:[],version:"current",sidebarPosition:4,frontMatter:{sidebar_position:4},sidebar:"sidebar7",previous:{title:"Fst",permalink:"/chg-training-resources/population_genetics/admixture_and_biobanks/fst"},next:{title:"ADMIXTURE analysis",permalink:"/chg-training-resources/population_genetics/admixture_and_biobanks/admixture"}},s={},l=[{value:"Loading the PCs:",id:"loading-the-pcs",level:2},{value:"Summarizing and ploting",id:"summarizing-and-ploting",level:2},{value:"Ploting the top 2 PCs",id:"ploting-the-top-2-pcs",level:2},{value:"Adding population labels",id:"adding-population-labels",level:2}],c={toc:l},d="wrapper";function m(e){let{components:n,...t}=e;return(0,i.kt)(d,(0,a.Z)({},c,t,{components:n,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"principal-component-analysis-of-the-1000-genomes-project"},"Principal component analysis of the 1000 Genomes Project"),(0,i.kt)("p",null,"The example is based on a subset of genotype data of common variant included in the 1000 Genome Project (chromosome 21\nonly). "),(0,i.kt)("div",{className:"admonition admonition-tip alert alert--success"},(0,i.kt)("div",{parentName:"div",className:"admonition-heading"},(0,i.kt)("h5",{parentName:"div"},(0,i.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,i.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"},(0,i.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.5 0C3.48 0 1 2.19 1 5c0 .92.55 2.25 1 3 1.34 2.25 1.78 2.78 2 4v1h5v-1c.22-1.22.66-1.75 2-4 .45-.75 1-2.08 1-3 0-2.81-2.48-5-5.5-5zm3.64 7.48c-.25.44-.47.8-.67 1.11-.86 1.41-1.25 2.06-1.45 3.23-.02.05-.02.11-.02.17H5c0-.06 0-.13-.02-.17-.2-1.17-.59-1.83-1.45-3.23-.2-.31-.42-.67-.67-1.11C2.44 6.78 2 5.65 2 5c0-2.2 2.02-4 4.5-4 1.22 0 2.36.42 3.22 1.19C10.55 2.94 11 3.94 11 5c0 .66-.44 1.78-.86 2.48zM4 14h5c-.23 1.14-1.3 2-2.5 2s-2.27-.86-2.5-2z"}))),"Note")),(0,i.kt)("div",{parentName:"div",className:"admonition-content"},(0,i.kt)("p",{parentName:"div"},"You should have already generated the dataset (",(0,i.kt)("inlineCode",{parentName:"p"},"g1k_common_genotypes.txt.gz"),") yourself.\nIf not please run the ",(0,i.kt)("a",{parentName:"p",href:"/chg-training-resources/population_genetics/admixture_and_biobanks/getting_setup"},"setup section"),"."))),(0,i.kt)("p",null,"We are now ready to examine the PCA we computed."),(0,i.kt)("h2",{id:"loading-the-pcs"},"Loading the PCs:"),(0,i.kt)("p",null,"Let's load the data first (make sure your R session is pointing to the correct folder)."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-r"},'library( tidyverse )\nlibrary( ggplot2 )\nlibrary( ggpubr )\n\npca <- read.table( "g1k_chr21.eigenvec", header = FALSE, stringsAsFactors = F )\neigenval <- scan( "g1k_chr21.eigenval", as.numeric() )\n')),(0,i.kt)("h2",{id:"summarizing-and-ploting"},"Summarizing and ploting"),(0,i.kt)("p",null,"Let's determine the percentage of variation explained by each PC. The first thing we'll do is ",(0,i.kt)("strong",{parentName:"p"},"name the columns"),"\n(because plink, rather unhelpfully, doesn't output column names)."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-r"},'# set names\nnames(pca)[1] <- "iid"\nnames(pca)[2] <- "fid"\nnames(pca)[3:ncol(pca)] <- paste0("PC", 1:(ncol(pca)-2))\n\n')),(0,i.kt)("p",null,"It turns out that the 'eigenvalues' reflect the ",(0,i.kt)("em",{parentName:"p"},"proportion of variance explained")," by the corresponding principal\ncomponents.  Since the PCs are orthogonal (at right-angles to each other), we can simply sum their variances to\ncalculate total variant explained.  For example, let's calculate the total variance explained by the first 10 PCs:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},'\npve <- data.frame( PC = 1:10, percent_explained = eigenval / sum(eigenval)*100 )\npve$label = sprintf( "%.2f%%", pve$percent_explained )\n\n(\n  ggplot(pve, aes(x = as.factor(PC), y = percent_explained ))\n  + geom_col()\n  + geom_text( aes( label = label, vjust = -0.2 ))\n  + xlab( "Principal Components" )\n  + ylab( "% Variance Explained" )\n  + theme_classic()\n)\n')),(0,i.kt)("h2",{id:"ploting-the-top-2-pcs"},"Ploting the top 2 PCs"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-r"},"(\n  ggplot(pca, aes(PC1, PC2))\n  + geom_point(size = 1)\n  + theme_classic()\n)\n")),(0,i.kt)("h2",{id:"adding-population-labels"},"Adding population labels"),(0,i.kt)("p",null,"These PCs were ",(0,i.kt)("a",{parentName:"p",href:"/chg-training-resources/population_genetics/admixture_and_biobanks/getting_setup"},"computed on")," all 1000 Genomes populations - and you can see there is some nice\nseparation into different clusters among different individuals.  Are these really different populations?  Let's add\ntheir population label now, so we can check whether individuals (as in their point) really are grouping by their genetic\nancestry:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-r"},'# read in population information\npop <- read_table( "integrated_call_samples_v3.20130502.ALL.panel" )\n\n# assign continental population to each sample\npca$superPop <- pop[ match( pca$iid, pop$sample ),]$super_pop\n(\n  ggplot(pca, aes( x = PC1, y = PC2, col=superPop))\n  + geom_point(size = 1)\n  + theme_classic()\n  + xlab(paste0("PC1 (", signif(pve$percent_explained[1], 3), "%)"))\n  + ylab(paste0("PC2 (", signif(pve$percent_explained[2], 3), "%)"))\n)\n')),(0,i.kt)("p",null,"Interesting!"),(0,i.kt)("div",{className:"admonition admonition-tip alert alert--success"},(0,i.kt)("div",{parentName:"div",className:"admonition-heading"},(0,i.kt)("h5",{parentName:"div"},(0,i.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,i.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"},(0,i.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.5 0C3.48 0 1 2.19 1 5c0 .92.55 2.25 1 3 1.34 2.25 1.78 2.78 2 4v1h5v-1c.22-1.22.66-1.75 2-4 .45-.75 1-2.08 1-3 0-2.81-2.48-5-5.5-5zm3.64 7.48c-.25.44-.47.8-.67 1.11-.86 1.41-1.25 2.06-1.45 3.23-.02.05-.02.11-.02.17H5c0-.06 0-.13-.02-.17-.2-1.17-.59-1.83-1.45-3.23-.2-.31-.42-.67-.67-1.11C2.44 6.78 2 5.65 2 5c0-2.2 2.02-4 4.5-4 1.22 0 2.36.42 3.22 1.19C10.55 2.94 11 3.94 11 5c0 .66-.44 1.78-.86 2.48zM4 14h5c-.23 1.14-1.3 2-2.5 2s-2.27-.86-2.5-2z"}))),"Question")),(0,i.kt)("div",{parentName:"div",className:"admonition-content"},(0,i.kt)("p",{parentName:"div"},"Which populations define the main axes of variation here?"),(0,i.kt)("p",{parentName:"div"},"What if you plot other PCs - say, PCs 2 and 3, or others?"))))}m.isMDXComponent=!0}}]);