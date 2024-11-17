"use strict";(self.webpackChunkchg_training_resources=self.webpackChunkchg_training_resources||[]).push([[2201],{3905:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>h});var o=n(67294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},i=Object.keys(e);for(o=0;o<i.length;o++)n=i[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(o=0;o<i.length;o++)n=i[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var p=o.createContext({}),l=function(e){var t=o.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},u=function(e){var t=l(e.components);return o.createElement(p.Provider,{value:t},e.children)},c="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},m=o.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,p=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),c=l(n),m=r,h=c["".concat(p,".").concat(m)]||c[m]||d[m]||i;return n?o.createElement(h,a(a({ref:t},u),{},{components:n})):o.createElement(h,a({ref:t},u))}));function h(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,a=new Array(i);a[0]=m;var s={};for(var p in t)hasOwnProperty.call(t,p)&&(s[p]=t[p]);s.originalType=e,s[c]="string"==typeof e?e:r,a[1]=s;for(var l=2;l<i;l++)a[l]=n[l];return o.createElement.apply(null,a)}return o.createElement.apply(null,n)}m.displayName="MDXCreateElement"},79118:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>p,contentTitle:()=>a,default:()=>d,frontMatter:()=>i,metadata:()=>s,toc:()=>l});var o=n(87462),r=(n(67294),n(3905));const i={sidebar_position:2},a="Introduction to R",s={unversionedId:"bioinformatics/introduction_to_R/README",id:"bioinformatics/introduction_to_R/README",title:"Introduction to R",description:"Suggested prerequsite courses: Introduction to the Command Line, Programming Concepts.",source:"@site/docs/bioinformatics/introduction_to_R/README.md",sourceDirName:"bioinformatics/introduction_to_R",slug:"/bioinformatics/introduction_to_R/",permalink:"/chg-training-resources/bioinformatics/introduction_to_R/",draft:!1,editUrl:"https://github.com/chg-training/chg-training-resources/edit/main/docs/bioinformatics/introduction_to_R/README.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2},sidebar:"sidebar2",previous:{title:"Challenge questions",permalink:"/chg-training-resources/bioinformatics/command_line/questions"},next:{title:"R as a calculator",permalink:"/chg-training-resources/bioinformatics/introduction_to_R/fundamentals"}},p={},l=[{value:"Checking it works",id:"checking-it-works",level:2}],u={toc:l},c="wrapper";function d(e){let{components:t,...i}=e;return(0,r.kt)(c,(0,o.Z)({},u,i,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"introduction-to-r"},"Introduction to R"),(0,r.kt)("p",null,(0,r.kt)("em",{parentName:"p"},"Suggested prerequsite courses:")," ",(0,r.kt)("strong",{parentName:"p"},(0,r.kt)("em",{parentName:"strong"},"Introduction to the Command Line")),", ",(0,r.kt)("strong",{parentName:"p"},(0,r.kt)("em",{parentName:"strong"},"Programming Concepts")),"."),(0,r.kt)("p",null,"This short course is designed to teach the basics of the ",(0,r.kt)("strong",{parentName:"p"},"R programming language"),"."),(0,r.kt)("p",null,"To use R, the very first thing you'll need to do is get R running.  For this tutorial you can choose one of two options:"),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Option 1"),": You can run R inside JupyterHub - either a hosted instance or your own installation.  (Instructions for setting that up can be found ",(0,r.kt)("a",{parentName:"p",href:"/chg-training-resources/prerequisites/Jupyterlab"},"on the environment setup pages"),".  Start by logging into the site, start a new tab by pressing the ",(0,r.kt)("inlineCode",{parentName:"p"},"+")," button, and then choose 'R' from the 'Notebook' section.  You should see something like this:"),(0,r.kt)("p",null,(0,r.kt)("img",{alt:"img",src:n(49702).Z,width:"1732",height:"286"})),(0,r.kt)("p",null,"You can type your commands into the box."),(0,r.kt)("p",null,"Or ",(0,r.kt)("strong",{parentName:"p"},"Option 2"),": you can download and install R and RStudio, and run it locally on your laptop.  To do this, visit the\n",(0,r.kt)("a",{parentName:"p",href:"https://posit.co/download/rstudio-desktop/"},"Rstudio download page")," and then download 'R' and 'RStudio Desktop'."),(0,r.kt)("p",null,"Once you have done this, install both packages and then start RStudio.  You should see something like this:\n",(0,r.kt)("img",{alt:"img",src:n(13).Z,width:"2226",height:"1328"})),(0,r.kt)("p",null,"The R prompt is in the left hand pane - you can type your commands in there."),(0,r.kt)("div",{className:"admonition admonition-tip alert alert--success"},(0,r.kt)("div",{parentName:"div",className:"admonition-heading"},(0,r.kt)("h5",{parentName:"div"},(0,r.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,r.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"},(0,r.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.5 0C3.48 0 1 2.19 1 5c0 .92.55 2.25 1 3 1.34 2.25 1.78 2.78 2 4v1h5v-1c.22-1.22.66-1.75 2-4 .45-.75 1-2.08 1-3 0-2.81-2.48-5-5.5-5zm3.64 7.48c-.25.44-.47.8-.67 1.11-.86 1.41-1.25 2.06-1.45 3.23-.02.05-.02.11-.02.17H5c0-.06 0-.13-.02-.17-.2-1.17-.59-1.83-1.45-3.23-.2-.31-.42-.67-.67-1.11C2.44 6.78 2 5.65 2 5c0-2.2 2.02-4 4.5-4 1.22 0 2.36.42 3.22 1.19C10.55 2.94 11 3.94 11 5c0 .66-.44 1.78-.86 2.48zM4 14h5c-.23 1.14-1.3 2-2.5 2s-2.27-.86-2.5-2z"}))),"Note")),(0,r.kt)("div",{parentName:"div",className:"admonition-content"},(0,r.kt)("p",{parentName:"div"},"There are a couple of differences between these two environments, which we list here for clarity:"),(0,r.kt)("ul",{parentName:"div"},(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"In R/Rstudio you press ",(0,r.kt)("inlineCode",{parentName:"p"},"<enter>")," to run a command, while in JupyterHub you press ",(0,r.kt)("inlineCode",{parentName:"p"},"<shift>-<enter>"),".")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"the prompt looks different - in RStudio it looks like ",(0,r.kt)("inlineCode",{parentName:"p"},">"),", while in JupyterHub it looks like ",(0,r.kt)("inlineCode",{parentName:"p"},"[ ]:")," followed by a box\nin the page. In this tutorial we will write ",(0,r.kt)("inlineCode",{parentName:"p"},">")," to indicate the prompt.")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"Some of the output is formatted differently.  (For example you'll notice this when we talk ",(0,r.kt)("a",{parentName:"p",href:"/chg-training-resources/bioinformatics/introduction_to_R/vectors"},"about vectors or\nvalues"),".)")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"Plots (and R help pages) appear inline in JupyterHub, but in a seperate pane for RStudio."))),(0,r.kt)("p",{parentName:"div"},"In this tutorial we will mostly write things the way R / RStudio show them, but as long as you're happy to allow for\nthese differences, you can use the JupyterHub notebook."))),(0,r.kt)("h2",{id:"checking-it-works"},"Checking it works"),(0,r.kt)("p",null,"Whichever way you start R, you should now have an ",(0,r.kt)("strong",{parentName:"p"},"R prompt"),"."),(0,r.kt)("p",null,"To check your R is really working, let's try out a command.  For example we could print a message:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},'> print( "Hello there!" )\n')),(0,r.kt)("div",{className:"admonition admonition-caution alert alert--warning"},(0,r.kt)("div",{parentName:"div",className:"admonition-heading"},(0,r.kt)("h5",{parentName:"div"},(0,r.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,r.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 16 16"},(0,r.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M8.893 1.5c-.183-.31-.52-.5-.887-.5s-.703.19-.886.5L.138 13.499a.98.98 0 0 0 0 1.001c.193.31.53.501.886.501h13.964c.367 0 .704-.19.877-.5a1.03 1.03 0 0 0 .01-1.002L8.893 1.5zm.133 11.497H6.987v-2.003h2.039v2.003zm0-3.004H6.987V5.987h2.039v4.006z"}))),"Note")),(0,r.kt)("div",{parentName:"div",className:"admonition-content"},(0,r.kt)("p",{parentName:"div"},"The ",(0,r.kt)("inlineCode",{parentName:"p"},">")," is just there to indicate the prompt - don't type that!  Type the command and press ",(0,r.kt)("inlineCode",{parentName:"p"},"<enter>")," to run it."),(0,r.kt)("p",{parentName:"div"},"Or if you are using JupyterHub, press ",(0,r.kt)("inlineCode",{parentName:"p"},"<shift>-<enter>")," instead."))),(0,r.kt)("p",null,"You should see a result like:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},'[1] "Hello there!"\n')),(0,r.kt)("p",null,"Congratulations, you've got R working!"),(0,r.kt)("p",null,"You're now ready to try out some ",(0,r.kt)("a",{parentName:"p",href:"/chg-training-resources/bioinformatics/introduction_to_R/fundamentals"},"fundamentals"),"."))}d.isMDXComponent=!0},49702:(e,t,n)=>{n.d(t,{Z:()=>o});const o=n.p+"assets/images/r_jupyterhub-7615fd640f6ef8c256ada93bf0140fc2.png"},13:(e,t,n)=>{n.d(t,{Z:()=>o});const o=n.p+"assets/images/rstudio-8eeea880659fa78278313b24454336e8.png"}}]);