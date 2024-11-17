"use strict";(self.webpackChunkchg_training_resources=self.webpackChunkchg_training_resources||[]).push([[2070],{3905:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>m});var a=n(67294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,a,i=function(e,t){if(null==e)return{};var n,a,i={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var c=a.createContext({}),l=function(e){var t=a.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},u=function(e){var t=l(e.components);return a.createElement(c.Provider,{value:t},e.children)},d="mdxType",p={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},h=a.forwardRef((function(e,t){var n=e.components,i=e.mdxType,r=e.originalType,c=e.parentName,u=o(e,["components","mdxType","originalType","parentName"]),d=l(n),h=i,m=d["".concat(c,".").concat(h)]||d[h]||p[h]||r;return n?a.createElement(m,s(s({ref:t},u),{},{components:n})):a.createElement(m,s({ref:t},u))}));function m(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var r=n.length,s=new Array(r);s[0]=h;var o={};for(var c in t)hasOwnProperty.call(t,c)&&(o[c]=t[c]);o.originalType=e,o[d]="string"==typeof e?e:i,s[1]=o;for(var l=2;l<r;l++)s[l]=n[l];return a.createElement.apply(null,s)}return a.createElement.apply(null,n)}h.displayName="MDXCreateElement"},54682:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>s,default:()=>p,frontMatter:()=>r,metadata:()=>o,toc:()=>l});var a=n(87462),i=(n(67294),n(3905));const r={sidebar_position:9},s="Appendix 2: understanding sequence duplication levels",o={unversionedId:"sequence_data_analysis/introduction_to_next_generation_sequencing_data_analysis/duplicates",id:"sequence_data_analysis/introduction_to_next_generation_sequencing_data_analysis/duplicates",title:"Appendix 2: understanding sequence duplication levels",description:"Duplicates arise naturally in sequencing from random fragments that just happen to have the same breakpoints. However,",source:"@site/docs/sequence_data_analysis/introduction_to_next_generation_sequencing_data_analysis/duplicates.md",sourceDirName:"sequence_data_analysis/introduction_to_next_generation_sequencing_data_analysis",slug:"/sequence_data_analysis/introduction_to_next_generation_sequencing_data_analysis/duplicates",permalink:"/chg-training-resources/sequence_data_analysis/introduction_to_next_generation_sequencing_data_analysis/duplicates",draft:!1,editUrl:"https://github.com/chg-training/chg-training-resources/edit/main/docs/sequence_data_analysis/introduction_to_next_generation_sequencing_data_analysis/duplicates.md",tags:[],version:"current",sidebarPosition:9,frontMatter:{sidebar_position:9},sidebar:"sidebar9",previous:{title:"Appendix 1: Paired-end sequencing in theory and practice",permalink:"/chg-training-resources/sequence_data_analysis/introduction_to_next_generation_sequencing_data_analysis/Short_read_theory"},next:{title:"Appendix 3: read trimming",permalink:"/chg-training-resources/sequence_data_analysis/introduction_to_next_generation_sequencing_data_analysis/Read_trimming"}},c={},l=[{value:"Duplicates by chance!",id:"duplicates-by-chance",level:2},{value:"Sequencing errors harm detection",id:"sequencing-errors-harm-detection",level:2},{value:"Fastqc doesn&#39;t take into account read pairs",id:"fastqc-doesnt-take-into-account-read-pairs",level:2},{value:"Genomes contain true duplicates",id:"genomes-contain-true-duplicates",level:2},{value:"Conclusion",id:"conclusion",level:2}],u={toc:l},d="wrapper";function p(e){let{components:t,...r}=e;return(0,i.kt)(d,(0,a.Z)({},u,r,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"appendix-2-understanding-sequence-duplication-levels"},"Appendix 2: understanding sequence duplication levels"),(0,i.kt)("p",null,"Duplicates arise naturally in sequencing from random fragments that just happen to have the same breakpoints. However,\nas explained a bit more on the ",(0,i.kt)("a",{parentName:"p",href:"/chg-training-resources/sequence_data_analysis/introduction_to_next_generation_sequencing_data_analysis/Short_read_theory"},"paired-end sequencing theory")," page, they also arise artifically\nfrom amplification and other chemistry artifacts, so it makes sense to assess levels of duplication in the data. That's\nwhat ",(0,i.kt)("a",{parentName:"p",href:"/chg-training-resources/sequence_data_analysis/introduction_to_next_generation_sequencing_data_analysis/Quality_control#sequence-duplication-levels-adapter-content-and-over-represented-sequences"},"the plot on the QC page\ndoes"),". For our sample,\nit says that most reads are not duplicated, but a few do appear twice or more."),(0,i.kt)("p",null,"Does that look sensible?  Well, here are three considerations"),(0,i.kt)("h2",{id:"duplicates-by-chance"},"Duplicates by chance!"),(0,i.kt)("p",null,"If we sequence a genome to a high level of coverage we'll of course get some duplicates just by chance. To assess that,\nlet's ignore the paired end-y-ness for a moment and imagine sequencing the malaria genome with 2 million single-end 100\nbase pair reads. We could simulate that by just choosing random read start points - here's a bit of R code that does\nthat:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"# make sure to run this in an R session - not in the terminal!\n\nsimulate_duplicates = function( genome_size, number_of_reads ) {\n  # Sample read start locations\n  read_locations = sample( 1:genome_size, size = number_of_reads, replace = T )\n  # tabulate where the reads hit and make a histogram.\n  reads_per_location = table( read_locations )\n  M = max( max( reads_per_location ), 10 )\n  # Make a histogram\n  h = hist(\n    reads_per_location,\n    breaks = 0.5 + 0:M,\n    plot = FALSE\n  )\n  # Count duplicates (one per each additional copy)\n  duplicates = sum( 1:(M-1) * h$counts[2:M] )\n  return( list(\n    duplicate_rate = duplicates / number_of_reads,\n    histogram = h\n  ))\n}\n\nd = simulate_duplicates( 23E6, 2E6 )\n")),(0,i.kt)("p",null,"This returns a duplication rate of about 4% - let's plot it:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"plot(\n  1:10,\n  d$histogram$density * 100,\n  xlab = \"Sequence duplication level\",\n  ylab = \"Proportion (%)\",\n  type = 'l',\n  ylim = c(0, 100),\n  bty = 'n'\n)\n")),(0,i.kt)("p",null,"This shows:"),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"img",src:n(665).Z,width:"400",height:"300"})),(0,i.kt)("p",null,"So what this suggests is that we ought to get some duplicates anyway - even if everything else was perfect. (In reality,\nsequence coverage is far from uniform so we could expect a higher number of duplicates)"),(0,i.kt)("h2",{id:"sequencing-errors-harm-detection"},"Sequencing errors harm detection"),(0,i.kt)("p",null,"FastQC's method of detecting duplicates relies on the first 50bp of duplicates being identical.\nHowever the first few bp also typically have higher error rates, which might hurt detection.\nSo this might lead fastqc to ",(0,i.kt)("em",{parentName:"p"},"underestimate")," the duplication rate."),(0,i.kt)("h2",{id:"fastqc-doesnt-take-into-account-read-pairs"},"Fastqc doesn't take into account read pairs"),(0,i.kt)("p",null,"Another point to note is that fastqc ",(0,i.kt)("strong",{parentName:"p"},"does not take into account the read pairs in this analysis")," - it analyses each\nfastq file seperately. Artifically-generated duplicates generally duplicate the whole fragment, meaning that ",(0,i.kt)("strong",{parentName:"p"},"both read\n1 and read 2 should be duplicated."),"  So this might lead fastqc to ",(0,i.kt)("em",{parentName:"p"},"overestimate")," the duplication rate.  "),(0,i.kt)("h2",{id:"genomes-contain-true-duplicates"},"Genomes contain true duplicates"),(0,i.kt)("p",null,"It's worth noting also that genomes contain truly duplicated sequence.  So some level of duplication may arise from\nreads that are not really read duplicates, but simply reads coming from duplicated sequence."),(0,i.kt)("h2",{id:"conclusion"},"Conclusion"),(0,i.kt)("p",null,"My hunch is that the 3% duplication rate output by fastqc above is probably an underestimate. "),(0,i.kt)("p",null,"One way to find out is to try comparing the number above to the ",(0,i.kt)("a",{parentName:"p",href:"/chg-training-resources/sequence_data_analysis/introduction_to_next_generation_sequencing_data_analysis/Aligning_reads"},"number of reads that are marked as\nduplicates")," in the alignment section.  Those duplicates are computed based on the alignment positions\nof read 1 and read 2, and are probably more accurate."))}p.isMDXComponent=!0},665:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/simulated_duplicates-416e2cfb1869287143412f9314297a9b.jpg"}}]);