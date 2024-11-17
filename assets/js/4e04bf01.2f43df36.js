"use strict";(self.webpackChunkchg_training_resources=self.webpackChunkchg_training_resources||[]).push([[5674],{3905:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>h});var r=n(67294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var l=r.createContext({}),p=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},u=function(e){var t=p(e.components);return r.createElement(l.Provider,{value:t},e.children)},d="mdxType",c={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,i=e.mdxType,a=e.originalType,l=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),d=p(n),m=i,h=d["".concat(l,".").concat(m)]||d[m]||c[m]||a;return n?r.createElement(h,o(o({ref:t},u),{},{components:n})):r.createElement(h,o({ref:t},u))}));function h(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var a=n.length,o=new Array(a);o[0]=m;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[d]="string"==typeof e?e:i,o[1]=s;for(var p=2;p<a;p++)o[p]=n[p];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},69220:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>o,default:()=>c,frontMatter:()=>a,metadata:()=>s,toc:()=>p});var r=n(87462),i=(n(67294),n(3905));const a={sidebar_position:3},o="R and RStudio",s={unversionedId:"prerequisites/R",id:"prerequisites/R",title:"R and RStudio",description:"A great deal of data analysis work is done in R - you'll need this",source:"@site/docs/prerequisites/R.md",sourceDirName:"prerequisites",slug:"/prerequisites/R",permalink:"/chg-training-resources/prerequisites/R",draft:!1,editUrl:"https://github.com/chg-training/chg-training-resources/edit/main/docs/prerequisites/R.md",tags:[],version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3},sidebar:"sidebar1",previous:{title:"Setting up Conda",permalink:"/chg-training-resources/prerequisites/CONDA"},next:{title:"Getting a text editor",permalink:"/chg-training-resources/prerequisites/editor"}},l={},p=[{value:"Installing R directly",id:"installing-r-directly",level:2},{value:"Trying it out",id:"trying-it-out",level:2},{value:"Getting help",id:"getting-help",level:2},{value:"Next steps",id:"next-steps",level:2}],u={toc:p},d="wrapper";function c(e){let{components:t,...a}=e;return(0,i.kt)(d,(0,r.Z)({},u,a,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"r-and-rstudio"},"R and RStudio"),(0,i.kt)("p",null,"A great deal of data analysis work is done in ",(0,i.kt)("a",{parentName:"p",href:"https://www.r-project.org"},"R")," - you'll need this\ninstalled. The recommended way is to work with ",(0,i.kt)("a",{parentName:"p",href:"https://www.rstudio.com"},"RStudio"),", but it's also\npossible to use directly in the command-line, or via a Jupyter notebook and so on."),(0,i.kt)("h2",{id:"installing-r-directly"},"Installing R directly"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"R is downloaded from the 'Comprehensive R Archive Network'. First, pick ",(0,i.kt)("a",{parentName:"p",href:"https://cran.r-project.org/mirrors.html"},"an appropriate\nmirror")," and then click the appropriate download button.\nThis will guide you to install R - you want the 'base' version. (R can be installed in other ways\ntoo - e.g. it's also possible to have ",(0,i.kt)("a",{parentName:"p",href:"/chg-training-resources/prerequisites/CONDA"},"conda")," install R if you prefer - but this way is easiest.)")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},(0,i.kt)("inlineCode",{parentName:"p"},"Rstudio")," can be downloaded from ",(0,i.kt)("a",{parentName:"p",href:"https://www.rstudio.com"},"rstudio.com"),". Find the ",(0,i.kt)("a",{parentName:"p",href:"https://www.rstudio.com/products/rstudio/"},"Rstudio product\npage")," and click 'Download Rstudio Desktop'."))),(0,i.kt)("p",null,"Install both these packages (default options) and then try running Rstudio. You should see a window\nwith a few panes showing R's default startup text, a file browser and some information on your R\nenvironment (which means the variables you have in your session.)"),(0,i.kt)("h2",{id:"trying-it-out"},"Trying it out"),(0,i.kt)("p",null,"For example to test it, let's try a few things.  For example we could create a variable:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},'a = "Hello, this is a string"\n')),(0,i.kt)("p",null,"(You should see the variable ",(0,i.kt)("inlineCode",{parentName:"p"},"a")," appear in the ",(0,i.kt)("inlineCode",{parentName:"p"},"Environment")," pane.)"),(0,i.kt)("p",null,"Or make a simple plot:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"x = seq( from = 0, to = 2*pi, by = 0.01 )\nplot( x, sin(x), type = 'l' )\n")),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"img",src:n(51795).Z,width:"600",height:"400"})),(0,i.kt)("p",null,"Or generate and plot a million samples from a Gaussian distribution:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"data = rnorm( 1000000, mean = 0, sd = 1 )\nhist(data)\n")),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"img",src:n(72437).Z,width:"600",height:"400"})),(0,i.kt)("p",null,"Congratulations!  You now have R installed.  "),(0,i.kt)("h2",{id:"getting-help"},"Getting help"),(0,i.kt)("p",null,"R has a built-in help system which you can access by typgin ",(0,i.kt)("inlineCode",{parentName:"p"},"?")," followed by the symbol you're interested in.\nOr, you can type ",(0,i.kt)("inlineCode",{parentName:"p"},"??")," followed by some text, which will do a more general search for the text in the help.\nFor example, try ",(0,i.kt)("inlineCode",{parentName:"p"},"?sin")," to see what the ",(0,i.kt)("inlineCode",{parentName:"p"},"sin")," function does."),(0,i.kt)("h2",{id:"next-steps"},"Next steps"),(0,i.kt)("p",null,"A good thing to do is to ",(0,i.kt)("a",{parentName:"p",href:"/chg-training-resources/prerequisites/tidyverse"},"install tidyverse"),"."))}c.isMDXComponent=!0},72437:(e,t,n)=>{n.d(t,{Z:()=>r});const r=n.p+"assets/images/histogram-f069766731ace11ce3019bdf824b1a83.png"},51795:(e,t,n)=>{n.d(t,{Z:()=>r});const r=n.p+"assets/images/sin-3ff08f77b7f2f1223e5fc178082ed93a.png"}}]);