"use strict";(self.webpackChunkchg_training_resources=self.webpackChunkchg_training_resources||[]).push([[9984],{3905:(e,t,n)=>{n.d(t,{Zo:()=>m,kt:()=>h});var i=n(67294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function r(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,i,a=function(e,t){if(null==e)return{};var n,i,a={},o=Object.keys(e);for(i=0;i<o.length;i++)n=o[i],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(i=0;i<o.length;i++)n=o[i],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var p=i.createContext({}),l=function(e){var t=i.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):r(r({},t),e)),n},m=function(e){var t=l(e.components);return i.createElement(p.Provider,{value:t},e.children)},d="mdxType",c={inlineCode:"code",wrapper:function(e){var t=e.children;return i.createElement(i.Fragment,{},t)}},u=i.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,p=e.parentName,m=s(e,["components","mdxType","originalType","parentName"]),d=l(n),u=a,h=d["".concat(p,".").concat(u)]||d[u]||c[u]||o;return n?i.createElement(h,r(r({ref:t},m),{},{components:n})):i.createElement(h,r({ref:t},m))}));function h(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,r=new Array(o);r[0]=u;var s={};for(var p in t)hasOwnProperty.call(t,p)&&(s[p]=t[p]);s.originalType=e,s[d]="string"==typeof e?e:a,r[1]=s;for(var l=2;l<o;l++)r[l]=n[l];return i.createElement.apply(null,r)}return i.createElement.apply(null,n)}u.displayName="MDXCreateElement"},79847:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>p,contentTitle:()=>r,default:()=>c,frontMatter:()=>o,metadata:()=>s,toc:()=>l});var i=n(87462),a=(n(67294),n(3905));const o={sidebar_position:10},r="I/O redirection and pipelining",s={unversionedId:"bioinformatics/command_line/pipelines",id:"bioinformatics/command_line/pipelines",title:"I/O redirection and pipelining",description:"In programming there are three standard 'streams' of communication",source:"@site/docs/bioinformatics/401_command_line/08_pipelines.md",sourceDirName:"bioinformatics/401_command_line",slug:"/bioinformatics/command_line/pipelines",permalink:"/chg-training-resources/bioinformatics/command_line/pipelines",draft:!1,editUrl:"https://github.com/chg-training/chg-training-resources/edit/main/docs/bioinformatics/401_command_line/08_pipelines.md",tags:[],version:"current",sidebarPosition:10,frontMatter:{sidebar_position:10},sidebar:"sidebar2",previous:{title:"Working with files",permalink:"/chg-training-resources/bioinformatics/command_line/working_with_files"},next:{title:"Filtering files: sort, uniq, cut, tr",permalink:"/chg-training-resources/bioinformatics/command_line/filtering_files"}},p={},l=[{value:"Redirecting standard Output",id:"redirecting-standard-output",level:2},{value:"Pipelines and standard Input",id:"pipelines-and-standard-input",level:2},{value:"Next steps",id:"next-steps",level:2}],m={toc:l},d="wrapper";function c(e){let{components:t,...n}=e;return(0,a.kt)(d,(0,i.Z)({},m,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"io-redirection-and-pipelining"},"I/O redirection and pipelining"),(0,a.kt)("p",null,"In programming there are three standard 'streams' of communication"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"standard input (stdin)"),(0,a.kt)("li",{parentName:"ul"},"standard output (stdout)"),(0,a.kt)("li",{parentName:"ul"},"standard error (stderr)")),(0,a.kt)("p",null,"Stdin is what goes into a command, stdout is what comes out of it, and stderr is somewhere for the command to write messages about how things are going (such as error messages)."),(0,a.kt)("p",null,"One of the most powerful features of the shell is the ability to 'redirect' output, and to 'pipe' this output into other commands.\nThis allows you to built up pipelines of operations that do sophisticated things."),(0,a.kt)("h2",{id:"redirecting-standard-output"},"Redirecting standard Output"),(0,a.kt)("p",null,"By default, stdout from a command is sent to the terminal, and that's what you're seeing when you type ",(0,a.kt)("inlineCode",{parentName:"p"},"ls"),", etc."),(0,a.kt)("p",null,"However, sometimes you might need instead to have this output written to a file instead."),(0,a.kt)("p",null,"As we ",(0,a.kt)("a",{parentName:"p",href:"/chg-training-resources/bioinformatics/command_line/working_with_files#redirecting-output-to-a-file"},"saw already"),", if you follow a command with ",(0,a.kt)("inlineCode",{parentName:"p"},">")," and the\nname of a file, then stdout will go there instead, so"),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"% ls > myfiles.txt")),(0,a.kt)("p",null,"will send no output to the terminal, but instead creates a file ",(0,a.kt)("inlineCode",{parentName:"p"},"myfiles.txt"),'.  We say that the output has been\n"redirected" to the file.'),(0,a.kt)("div",{className:"admonition admonition-warning alert alert--danger"},(0,a.kt)("div",{parentName:"div",className:"admonition-heading"},(0,a.kt)("h5",{parentName:"div"},(0,a.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,a.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"},(0,a.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M5.05.31c.81 2.17.41 3.38-.52 4.31C3.55 5.67 1.98 6.45.9 7.98c-1.45 2.05-1.7 6.53 3.53 7.7-2.2-1.16-2.67-4.52-.3-6.61-.61 2.03.53 3.33 1.94 2.86 1.39-.47 2.3.53 2.27 1.67-.02.78-.31 1.44-1.13 1.81 3.42-.59 4.78-3.42 4.78-5.56 0-2.84-2.53-3.22-1.25-5.61-1.52.13-2.03 1.13-1.89 2.75.09 1.08-1.02 1.8-1.86 1.33-.67-.41-.66-1.19-.06-1.78C8.18 5.31 8.68 2.45 5.05.32L5.03.3l.02.01z"}))),"Warning")),(0,a.kt)("div",{parentName:"div",className:"admonition-content"},(0,a.kt)("p",{parentName:"div"},"Be ",(0,a.kt)("strong",{parentName:"p"},"CAREFUL"),".  Like most operations that write to files, this command will ",(0,a.kt)("strong",{parentName:"p"},"overwrite")," the file if it exists already"),(0,a.kt)("ul",{parentName:"div"},(0,a.kt)("li",{parentName:"ul"},"so you could lose data.  As usual you have to make sure you know what you are doing first.  (If in doubt, check with\n",(0,a.kt)("inlineCode",{parentName:"li"},"ls"),".)")))),(0,a.kt)("p",null,"If you use ",(0,a.kt)("inlineCode",{parentName:"p"},">>")," instead of ",(0,a.kt)("inlineCode",{parentName:"p"},">"),", then the output will be appended to the file rather than overwriting it.  So for example\nto list all files into the file a second time as well:"),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"% ls >> myfiles.txt")),(0,a.kt)("div",{className:"admonition admonition-tip alert alert--success"},(0,a.kt)("div",{parentName:"div",className:"admonition-heading"},(0,a.kt)("h5",{parentName:"div"},(0,a.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,a.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"},(0,a.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.5 0C3.48 0 1 2.19 1 5c0 .92.55 2.25 1 3 1.34 2.25 1.78 2.78 2 4v1h5v-1c.22-1.22.66-1.75 2-4 .45-.75 1-2.08 1-3 0-2.81-2.48-5-5.5-5zm3.64 7.48c-.25.44-.47.8-.67 1.11-.86 1.41-1.25 2.06-1.45 3.23-.02.05-.02.11-.02.17H5c0-.06 0-.13-.02-.17-.2-1.17-.59-1.83-1.45-3.23-.2-.31-.42-.67-.67-1.11C2.44 6.78 2 5.65 2 5c0-2.2 2.02-4 4.5-4 1.22 0 2.36.42 3.22 1.19C10.55 2.94 11 3.94 11 5c0 .66-.44 1.78-.86 2.48zM4 14h5c-.23 1.14-1.3 2-2.5 2s-2.27-.86-2.5-2z"}))),"Note")),(0,a.kt)("div",{parentName:"div",className:"admonition-content"},(0,a.kt)("p",{parentName:"div"},"Remember you can use ",(0,a.kt)("inlineCode",{parentName:"p"},"cat")," to look at the contents of a file."))),(0,a.kt)("h2",{id:"pipelines-and-standard-input"},"Pipelines and standard Input"),(0,a.kt)("p",null,"Many commands can also accept input from stdin. A good example is ",(0,a.kt)("inlineCode",{parentName:"p"},"wc"),": if it's not given a filename, ",(0,a.kt)("inlineCode",{parentName:"p"},"wc")," will work on\nstdin instead."),(0,a.kt)("p",null,"The best way to get input in to stdin is to ",(0,a.kt)("strong",{parentName:"p"},"pipe")," it in, using the ",(0,a.kt)("inlineCode",{parentName:"p"},"|")," character.  For example, if you read ",(0,a.kt)("a",{parentName:"p",href:"working_with_files.md"},"the\nsection on working with files")," you know that the\n",(0,a.kt)("inlineCode",{parentName:"p"},"cat")," command will print out the contents of a file:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"# cat myfiles.txt\n")),(0,a.kt)("p",null,"On the other hand the ",(0,a.kt)("inlineCode",{parentName:"p"},"wc -l")," counts the number of lines in its input.  To count the number of lines in the file, we\njust have to connect one to the other:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"% cat myfiles.txt | wc -l\n")),(0,a.kt)("p",null,"we say the output of ",(0,a.kt)("inlineCode",{parentName:"p"},"cat"),' has been "piped" into the input of ',(0,a.kt)("inlineCode",{parentName:"p"},"wc"),"."),(0,a.kt)("div",{className:"admonition admonition-tip alert alert--success"},(0,a.kt)("div",{parentName:"div",className:"admonition-heading"},(0,a.kt)("h5",{parentName:"div"},(0,a.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,a.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"},(0,a.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.5 0C3.48 0 1 2.19 1 5c0 .92.55 2.25 1 3 1.34 2.25 1.78 2.78 2 4v1h5v-1c.22-1.22.66-1.75 2-4 .45-.75 1-2.08 1-3 0-2.81-2.48-5-5.5-5zm3.64 7.48c-.25.44-.47.8-.67 1.11-.86 1.41-1.25 2.06-1.45 3.23-.02.05-.02.11-.02.17H5c0-.06 0-.13-.02-.17-.2-1.17-.59-1.83-1.45-3.23-.2-.31-.42-.67-.67-1.11C2.44 6.78 2 5.65 2 5c0-2.2 2.02-4 4.5-4 1.22 0 2.36.42 3.22 1.19C10.55 2.94 11 3.94 11 5c0 .66-.44 1.78-.86 2.48zM4 14h5c-.23 1.14-1.3 2-2.5 2s-2.27-.86-2.5-2z"}))),"Note")),(0,a.kt)("div",{parentName:"div",className:"admonition-content"},(0,a.kt)("p",{parentName:"div"},"It's also possible to redirect a file into the input of ",(0,a.kt)("inlineCode",{parentName:"p"},"wc -l")," directly - like this:"),(0,a.kt)("pre",{parentName:"div"},(0,a.kt)("code",{parentName:"pre"},"% wc -l < myfiles.txt\n")),(0,a.kt)("p",{parentName:"div"},"However, I find this more confusing because I prefer thinking of the data as flowing from left to right along the\npipeline, so I don't generally use this."))),(0,a.kt)("p",null,"Although this particular command could be done more simply just by writein ",(0,a.kt)("inlineCode",{parentName:"p"},"wc -l myfiles.txt"),", the pipelining here is\nmuch more flexible and more powerful.  For example, suppose we wanted to count the number of words in the first\nrow of the sonnet we were reading.  We could combine commands from the ",(0,a.kt)("a",{parentName:"p",href:"working_with_files.md"},"working with files")," page:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"% cat sonnet.txt | head -n 1 | wc -w\n")),(0,a.kt)("div",{className:"admonition admonition-tip alert alert--success"},(0,a.kt)("div",{parentName:"div",className:"admonition-heading"},(0,a.kt)("h5",{parentName:"div"},(0,a.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,a.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"},(0,a.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.5 0C3.48 0 1 2.19 1 5c0 .92.55 2.25 1 3 1.34 2.25 1.78 2.78 2 4v1h5v-1c.22-1.22.66-1.75 2-4 .45-.75 1-2.08 1-3 0-2.81-2.48-5-5.5-5zm3.64 7.48c-.25.44-.47.8-.67 1.11-.86 1.41-1.25 2.06-1.45 3.23-.02.05-.02.11-.02.17H5c0-.06 0-.13-.02-.17-.2-1.17-.59-1.83-1.45-3.23-.2-.31-.42-.67-.67-1.11C2.44 6.78 2 5.65 2 5c0-2.2 2.02-4 4.5-4 1.22 0 2.36.42 3.22 1.19C10.55 2.94 11 3.94 11 5c0 .66-.44 1.78-.86 2.48zM4 14h5c-.23 1.14-1.3 2-2.5 2s-2.27-.86-2.5-2z"}))),"Note")),(0,a.kt)("div",{parentName:"div",className:"admonition-content"},(0,a.kt)("p",{parentName:"div"},"Remember that you can get help on a command like ",(0,a.kt)("inlineCode",{parentName:"p"},"wc")," by viewing its man page - ",(0,a.kt)("inlineCode",{parentName:"p"},"man wc"),".\nPress ",(0,a.kt)("inlineCode",{parentName:"p"},"q")," to quit the man page."))),(0,a.kt)("p",null,"For example here are some quick recipes."),(0,a.kt)("p",null,"The number of lines and words in ",(0,a.kt)("inlineCode",{parentName:"p"},"sonnet.txt"),":"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"% cat sonnet.txt | wc -l\n% cat sonnet.txt | wc -w\n")),(0,a.kt)("p",null,"The number of words in the first and last line:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"% cat sonnet.txt | head -n 1 | wc -w\n% cat sonnet.txt | tail -n 1 | wc -w\n")),(0,a.kt)("p",null,"...or the number of lines that contain the word 'fair' (using ",(0,a.kt)("inlineCode",{parentName:"p"},"grep"),", which we shall ",(0,a.kt)("a",{parentName:"p",href:"basics.md"},"cpver on the next page"),")."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"% cat sonnet.txt | grep 'fair' | wc -l\n")),(0,a.kt)("div",{className:"admonition admonition-tip alert alert--success"},(0,a.kt)("div",{parentName:"div",className:"admonition-heading"},(0,a.kt)("h5",{parentName:"div"},(0,a.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,a.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"},(0,a.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.5 0C3.48 0 1 2.19 1 5c0 .92.55 2.25 1 3 1.34 2.25 1.78 2.78 2 4v1h5v-1c.22-1.22.66-1.75 2-4 .45-.75 1-2.08 1-3 0-2.81-2.48-5-5.5-5zm3.64 7.48c-.25.44-.47.8-.67 1.11-.86 1.41-1.25 2.06-1.45 3.23-.02.05-.02.11-.02.17H5c0-.06 0-.13-.02-.17-.2-1.17-.59-1.83-1.45-3.23-.2-.31-.42-.67-.67-1.11C2.44 6.78 2 5.65 2 5c0-2.2 2.02-4 4.5-4 1.22 0 2.36.42 3.22 1.19C10.55 2.94 11 3.94 11 5c0 .66-.44 1.78-.86 2.48zM4 14h5c-.23 1.14-1.3 2-2.5 2s-2.27-.86-2.5-2z"}))),"Quick tip: the command history")),(0,a.kt)("div",{parentName:"div",className:"admonition-content"},(0,a.kt)("p",{parentName:"div"},"As you build these pipelines, you may be getting bored of typing the same commands and filenames over and over again.\nHowever, one thing that helps is that the command line keeps a ",(0,a.kt)("strong",{parentName:"p"},"command history"),".  To see commands you're run before,\nuse ",(0,a.kt)("inlineCode",{parentName:"p"},"history"),":"),(0,a.kt)("pre",{parentName:"div"},(0,a.kt)("code",{parentName:"pre"},"% history\n")),(0,a.kt)("p",{parentName:"div"},"Even better is that you can get back to these commands by pressing the up arrow ",(0,a.kt)("inlineCode",{parentName:"p"},"\u2191")," (or forwards through them again by\npressing the down arrow ",(0,a.kt)("inlineCode",{parentName:"p"},"\u2193"),").  Try this now: press ",(0,a.kt)("inlineCode",{parentName:"p"},"\u2191")," to get back to that previous command and try editing it to use\n",(0,a.kt)("inlineCode",{parentName:"p"},"wc -w")," in place of ",(0,a.kt)("inlineCode",{parentName:"p"},"wc -l"),".  Bingo, in only a few keypresses you've changed to count words instead of lines."),(0,a.kt)("p",{parentName:"div"},"Using this together with ",(0,a.kt)("a",{parentName:"p",href:"/chg-training-resources/bioinformatics/command_line/tour#moving-faster"},"tab completion")," can save a great deal of typing and makes building pipelines and repeating commands quite quick.  See ",(0,a.kt)("a",{parentName:"p",href:"/chg-training-resources/bioinformatics/command_line/appendices/navigating_history"},"this page")," for more on the history."),(0,a.kt)("pre",{parentName:"div"},(0,a.kt)("code",{parentName:"pre"},"\n## Combining pipelines with redirection\n\nOf course you can also combine pipelines with redirection.\nFor let's conut the number of text files again and store it in a new file:\n\n")),(0,a.kt)("p",{parentName:"div"},"% ls '*.txt' | wc -l > number_of_text_files.txt"),(0,a.kt)("pre",{parentName:"div"},(0,a.kt)("code",{parentName:"pre"},"\n(You can use `ls` and `cat` to check it got the answer right.)\n\nThere is one other useful way to get the output into a file - the `tee` command.  This takes input on stdin,\nechoes it to stdout, but also sends a copy to a file as well.  (You can imagine a letter T with standard input coming\nfrom the left, standard output going to the right, and a copy being dropped in a file at the bottom.)\n\nSo let's list all the text files into text_files.txt, but also count them:\n\n~~~~\n% ls '*.txt' | tee text_files.txt | wc -l\n~~~~\n\n")))),(0,a.kt)("p",null,"Pipelining works because many programs ",(0,a.kt)("strong",{parentName:"p"},"read from stdin")," and ",(0,a.kt)("strong",{parentName:"p"},"write to stdout"),". Typically they work one line at a\ntime. Therefore you can build up pipelines made up of commands that each process the stream of lines in one way, passing\non the results to the next command in the pipeline.  At the end, you can redirect the output into a file."),(0,a.kt)("p",null,":::"),(0,a.kt)("h2",{id:"next-steps"},"Next steps"),(0,a.kt)("p",null,"Finally we will learn about a set of commands that can perform complex ",(0,a.kt)("a",{parentName:"p",href:"09_filtering_files.md"},"filtering operations")," on\nfiles."))}c.isMDXComponent=!0}}]);