(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{"1oc3":function(e,t,n){"use strict";var r=n("q1tI"),o=n.n(r),a=n("vOnD"),i=a.c.div.withConfig({displayName:"Hero__Container",componentId:"sc-1wsaguq-0"})(["width:100%;margin:0 auto;height:500px;"]),c=a.c.div.withConfig({displayName:"Hero__HeroImage",componentId:"sc-1wsaguq-1"})(["position:absolute;width:100%;height:500px;max-width:1140px;left:0;right:0;margin:0 auto;overflow:hidden;background-repeat:no-repeat;background-position:center;background-size:cover;"]),l=a.c.div.withConfig({displayName:"Hero__Trees",componentId:"sc-1wsaguq-2"})(["position:absolute;max-width:2070px;width:100%;height:500px;margin:0 auto;background-repeat:repeat-x;background-position:center;background-size:cover;z-index:1;"]),s=a.c.div.withConfig({displayName:"Hero__TitleContainer",componentId:"sc-1wsaguq-3"})(["position:absolute;bottom:0;left:0;right:0;text-align:center;width:100%;vertical-align:bottom;padding-bottom:32px;"]),p=a.c.h1.withConfig({displayName:"Hero__Title",componentId:"sc-1wsaguq-4"})(["font-weight:700;font-size:32sp;margin:10px 50px;color:white;text-shadow:1px 1px 4px rgba(34,34,34,0.85);"]);t.a=function(e){return o.a.createElement(i,null,o.a.createElement(c,{style:{backgroundImage:'url("'+e.heroImg+'")'}},o.a.createElement(s,null,o.a.createElement(p,null,e.title))),o.a.createElement(l,{style:{backgroundImage:'url("'+e.treesImg+'")'}}))}},"5Q0V":function(e,t,n){var r=n("cDf5").default;e.exports=function(e,t){if("object"!==r(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var o=n.call(e,t||"default");if("object"!==r(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)},e.exports.__esModule=!0,e.exports.default=e.exports},Bnag:function(e,t){e.exports=function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")},e.exports.__esModule=!0,e.exports.default=e.exports},EbDI:function(e,t){e.exports=function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)},e.exports.__esModule=!0,e.exports.default=e.exports},Ijbi:function(e,t,n){var r=n("WkPL");e.exports=function(e){if(Array.isArray(e))return r(e)},e.exports.__esModule=!0,e.exports.default=e.exports},JIEu:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAKnRFWHRDcmVhdGlvbiBUaW1lAEZyIDkgTm92IDIwMDcgMTY6Mjc6MDYgKzAxMDAM3ZqdAAAAB3RJTUUH1wsJDxwzm8yD2gAAAAlwSFlzAAALEgAACxIB0t1+/AAAAARnQU1BAACxjwv8YQUAAAHdSURBVHjaxVO7btRAFD3zsNdxQIqQqBYk6ghR0tLxDXwCn8HX0BGlo6JCKAqCIlVCkCjQLgkgxbDB67XnlXPHRvsJGWs04/F53ZkxcNtNvXj5arG7uzf3KfJNIUSFh/dn2H9Qc564pABj0Z98hPt6CsVHyzoCrv6tl/bO3Xvzx0+fw0cveugp8ORRjWf7e1lAmi5naKuAHh2QSI4RpQbeHBzOrSfIBQ/vAzWRE8jcDQNCQk4g3TtinMtkEUHfIaxW0OIqa55rMTEYu3xXWm/r1AYZ5AYolqoJ6D4dU1jDCjFkMrskoFukKG2ys56EFEkyC38abE4+w1z/heU3K0Q/OUchp0zNxCCuU+sX37F69xZYt9CmQDHKUYDwQMPIONpo9A5o2gH9ZoPBjwKm5h78/glcs+ayylQtpyOjQFLS2fnovMHrDz9wftEixTACJKY1HFUmZbIk5GM4WkWyI/bg+AJD0CjKAmVhMlFPpchmaWUm4v8+HrElAu/Pmnz+RWmReGmU2QoYmRsRQHYdE2CbYMOaF51HOWNt1iJSoODFqeSd9YlAUe2g4+gVpjI0ZmoUspe/Lpfdqpk7cWH0QN0zVeOwqxnSjJtYVWi/fEO/DlDWZ2chX4W0vO1/EbgBHTnbxGOMU+UAAAAASUVORK5CYII="},KE4F:function(e,t,n){"use strict";var r=n("dI71"),o=n("q1tI"),a=n.n(o),i=n("vOnD"),c=n("b9pq"),l=n("Wbzz"),s=n("5hye"),p=i.c.div.withConfig({displayName:"Translations__TranslationContainer",componentId:"kzuojb-0"})(["border-radius:5px;padding:10px;margin-top:10px;background-color:",";border:1px solid ",";"],s.a.lightYellow,s.a.grey700),u=i.c.span.withConfig({displayName:"Translations__InfoText",componentId:"kzuojb-1"})(["color:",";"],s.a.grey900),d=i.c.a.withConfig({displayName:"Translations__TranslationLink",componentId:"kzuojb-2"})(["color:",";text-decoration:underline;"],s.a.grey900),g=function(e){function t(){return e.apply(this,arguments)||this}return Object(r.a)(t,e),t.prototype.render=function(){var e=this.props.translations;return a.a.createElement(p,null,a.a.createElement(u,null,"This article also exists in: "),e.map((function(t,n){return a.a.createElement(o.Fragment,{key:"translation-"+n},a.a.createElement(d,{href:Object(l.withPrefix)(t.link)},t.language),n<e.length-1?", ":"")})))},t}(a.a.Component),m=function(e){var t=i.c.time.withConfig({displayName:"Time__TimeContainer",componentId:"sc-1u6vd0l-0"})(["color:",";"],s.a.postMetadata),n=e.date,r=new Date(n),o=r.toLocaleDateString("en-GB",{year:"numeric",month:"2-digit",day:"numeric"}).split("/").reverse().join("-"),c=r.toLocaleDateString("en-GB",{year:"numeric",month:"long",day:"numeric"});return a.a.createElement(t,{datetime:o},c)},f=n("LObP"),h=i.c.header.withConfig({displayName:"ContentHeader__Header",componentId:"sc-1qtxhip-0"})(["margin-bottom:2rem;color:",";font-size:0.9em;"],s.a.textLight),x=function(e){function t(){return e.apply(this,arguments)||this}return Object(r.a)(t,e),t.prototype.render=function(){var e=this.props,t=e.date,n=e.tags,r=e.translations;return a.a.createElement(h,null,t&&a.a.createElement(m,{date:t}),t&&Array.isArray(n)&&n.length>0&&a.a.createElement(f.a,null),Array.isArray(n)&&n.length>0&&a.a.createElement(o.Fragment,null,a.a.createElement(c.a,{tags:n})),r&&a.a.createElement(g,{translations:r}))},t}(a.a.Component),b=n("X8hv"),y=n.n(b),v=i.c.div.withConfig({displayName:"Content__ContentBody",componentId:"p0bolz-0"})(["line-height:1.6;text-align:justify;& > h2{padding-top:3rem;margin-top:3rem;border-top:1px solid #ececec;}& > h3{padding-top:3rem;}& > p{margin:1em 0 0 0;}& a{box-shadow:0 2px 0 0 ",";&:hover{filter:brightness(150%);box-shadow:none;}&.anchor,&.gatsby-resp-image-link{box-shadow:none;}}h1 .anchor svg,h2 .anchor svg,h3 .anchor svg,h4 .anchor svg,h5 .anchor svg,h6 .anchor svg{visibility:hidden;margin-left:-16px;}h1:hover .anchor svg,h2:hover .anchor svg,h3:hover .anchor svg,h4:hover .anchor svg,h5:hover .anchor svg,h6:hover .anchor svg,h1 .anchor:focus svg,h2 .anchor:focus svg,h3 .anchor:focus svg,h4 .anchor:focus svg,h5 .anchor:focus svg,h6 .anchor:focus svg{visibility:visible;}& > blockquote{box-sizing:border-box;background-color:#f7f7f7;border-left:5px solid rgb(244,213,36);margin:30px 0px;padding:5px 20px;border-radius:0 8px 8px 0;}& > blockquote p{margin:0.8em 0;font-style:italic;}& .gatsby-highlight{border-radius:5px;font-size:15px;line-height:1.7;border-radius:10px;overflow:auto;tab-size:1.5em;margin:1.5em -1.5em;@media (max-width:500px){border-radius:0;margin-left:-25px;margin-right:-25px;}}& .gatsby-highlight > pre{border:0;margin:0;padding:1;}& .gatsby-highlight pre[class*='language-']{float:left;min-width:100%;}& .gatsby-highlight-code-line{background-color:",";display:block;margin-right:-1em;margin-left:-1em;padding-right:1em;padding-left:0.75em;border-left:0.25em solid ",";}& h1 > code.language-text,& h2 > code.language-text,& h3 > code.language-text,& h4 > code.language-text,& h5 > code.language-text,& h6 > code.language-text,& a > code.language-text,& p > code.language-text,& li > code.language-text,& em > code.language-text,& strong > code.language-text{background:",";color:#222222cc;padding:0 3px;font-size:0.94em;border-radius:0.3rem;word-wrap:break-word;}& code{word-wrap:break-word;}& table{margin-top:1em;border-collapse:collapse;border-radius:0.5em;overflow:hidden;& th,& td{padding:0.5em;background:#f7f7f7;border-bottom:2px solid ",";}}"],s.a.links,s.a.highlight_code_linebg,s.a.highlight_code_bg,s.a.highlight_code_oneline,s.a.white),A=function(e){function t(){return e.apply(this,arguments)||this}return Object(r.a)(t,e),t.prototype.render=function(){var e=this.props,t=e.content,n=e.date,r=e.tags,o=e.translations;return a.a.createElement("section",null,(r||n||o)&&a.a.createElement(x,{date:n,tags:r,translations:o}),a.a.createElement(v,null,a.a.createElement(y.a,null,t)))},t}(a.a.Component);t.a=A},Kbi2:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAByUDbMAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAPASURBVDhPrZT7TxxVFMc/d/Y1wA60gEXwgSU1ViJiJSZqahpqm2jQNlRSHyhRa6wG2kTSpK3v2BptoyRorJi2IaLlF/qyoTU0sRAClDaKRqQ0qShElkJBdpd9z+7seGfQ+A9wkjvn3jnn3Pu93/PNFaY0lsiUf/2SmNATuqm4XYyPTRMOJ3C7nXbAMNLkF2STEw+RXAjjyvYSVDXmZhZwOBYx6HoKrWA5N4dmEZoXMflFi1m4YT2B4jtp2ncKny9IVpZKPK5TXfswlROXmb84RO5DFXQXP8CpYwOoqptoTOeWu4p4uUQn9/pfOJ7dgjJcupZIbz/qd8fZv7+aqk33EgpF5bkmQsivIqwZpviPWpNQIsnjm8p5S7tGocckZ8d2Bn6ZRLnUe5U9v+cSy9QI7H2Xmur7adxbJRHOEgrrSAikg0GIxQlHdK4vJNi5tZSNF9pQn6jC/WQV9fXfcrFvDCUm4fZ3DbPxkxEGVz2C75k6ykWAr1q3k6llkAyESM3NkwyG8OZnc2BdFsUnW1nW/CndvjQVFR/QNzBBTKJlzh8wdcM0o3raDOiWUEzTiEQWJ9Imd71njq5Zb3vbov/H/OGEXWfVW/uI0Z17TPObE5DhwVKcrTqLq/QiR44cDeGRsUQCQ6ITiiJzFhMVyafFq4SFeOEpFKtG98trzAdJ+YMYATmkTwcX7JGamSXpm7K9tTb8AdIyx47JPKvOqk/LzcVky1Ezs6cP0+0mlTSIRHWE1J1wyWEYhAd/InVjDueKfLwPVmDEJQrVIxEpqMLA5XJYgiNWuRZx4tzP5pU/YkQjCQqLNHY8Lwtm5zC+78JdV8vE1m3Mdxwnt6aG4o6j9tXDXd14VAfHnKu52j+CV+qytCQDh4uy95sPHGFqPETrkTpibe0kG17jHXMNpy/N8ljoCoHh31hx3z00/qhwvvMymxs246t/g1u7z/LZjTy+bjqMW3hQIpEYr7xey9i1j1l4cRuJM508V9ZIU8sZ8papiLSFRfIhuc3P1/i8uZ11lQe5/exJbpOkn5s4xJu7X0J3ulD2HXyaw4dqmVp5N9Ml5awaKaWz7bzcIFMOgWIRS8r2dpvJprfnV8nVq/y5YQvZPT/Q0L6btx/NQ8mYGmew4A4u7PqQso+GiYyNoWkSkXBgJPxMy3q/c7ntrbX1X5NiVpQUqwtr+bJjiKzRIcyZScTfwYDpTybxJBPkZMkOWofbJuQrEifqVFFk99Kyi5mpOF6vKmOLGrTABoOyefEkNxUVSipsBS6NLeHjCP8AHa/ubr0bcvgAAAAASUVORK5CYII="},RIqP:function(e,t,n){var r=n("Ijbi"),o=n("EbDI"),a=n("ZhPi"),i=n("Bnag");e.exports=function(e){return r(e)||o(e)||a(e)||i()},e.exports.__esModule=!0,e.exports.default=e.exports},WkPL:function(e,t){e.exports=function(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r},e.exports.__esModule=!0,e.exports.default=e.exports},X8hv:function(e,t,n){var r=n("sXyB"),o=n("RIqP"),a=n("lSNA"),i=n("8OQS");function c(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?c(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var s=n("q1tI"),p=n("7ljp"),u=p.useMDXComponents,d=p.mdx,g=n("BfwJ").useMDXScope;e.exports=function(e){var t=e.scope,n=e.components,a=e.children,c=i(e,["scope","components","children"]),p=u(n),m=g(t),f=s.useMemo((function(){if(!a)return null;var e=l({React:s,mdx:d},m),t=Object.keys(e),n=t.map((function(t){return e[t]}));return r(Function,["_fn"].concat(o(t),[""+a])).apply(void 0,[{}].concat(o(n)))}),[a,t]);return s.createElement(f,l({components:p},c))}},ZhPi:function(e,t,n){var r=n("WkPL");e.exports=function(e,t){if(e){if("string"==typeof e)return r(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?r(e,t):void 0}},e.exports.__esModule=!0,e.exports.default=e.exports},b48C:function(e,t){e.exports=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}},e.exports.__esModule=!0,e.exports.default=e.exports},b9pq:function(e,t,n){"use strict";var r=n("dI71"),o=n("q1tI"),a=n.n(o),i=n("Wbzz"),c=n("vOnD"),l=n("5hye"),s=c.c.div.withConfig({displayName:"TagList__ListContainer",componentId:"tgjq80-0"})(["display:inline;color:",";"],l.a.postMetadata),p=Object(c.c)(i.Link).withConfig({displayName:"TagList__TagListItemLink",componentId:"tgjq80-1"})(["text-transform:uppercase;color:",";&:not(:first-child){margin-left:0.3rem;}&:hover{border-bottom:1px dotted ",";}&:before{content:'#';}"],l.a.postMetadata,l.a.textLight),u=c.c.span.withConfig({displayName:"TagList__TagListItem",componentId:"tgjq80-2"})(["text-transform:uppercase;color:",";&:not(:first-child){margin-left:0.3rem;}&:before{content:'#';}"],l.a.postMetadata),d=function(e){function t(){return e.apply(this,arguments)||this}return Object(r.a)(t,e),t.prototype.render=function(){var e=this.props,t=e.tags,n=e.noLink;return a.a.createElement(s,null,t.map((function(e,r){return a.a.createElement(o.Fragment,{key:"tag-list-"+r},!n&&a.a.createElement(p,{to:"/tags/"+e},e),n&&a.a.createElement(u,{to:"/tags/"+e},e),r<t.length-1?", ":"")})))},t}(a.a.Component);t.a=d},kSEI:function(e,t,n){"use strict";var r=n("dI71"),o=n("q1tI"),a=n.n(o),i=n("vOnD"),c=n("Kbi2"),l=n.n(c),s=n("JIEu"),p=n.n(s),u=i.c.img.withConfig({displayName:"Flag__FlagImage",componentId:"sc-1n11y4w-0"})(["padding-right:0.5rem;padding-bottom:0.2rem;"]),d=function(e){function t(){return e.apply(this,arguments)||this}return Object(r.a)(t,e),t.prototype.render=function(){var e=this.props.language,t="en"===e?l.a:p.a,n="en"===e?"english post":"post en francais";return a.a.createElement(u,{src:t,alt:n,className:"flag"})},t}(a.a.Component);t.a=d},lSNA:function(e,t,n){var r=n("o5UB");e.exports=function(e,t,n){return(t=r(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e},e.exports.__esModule=!0,e.exports.default=e.exports},o5UB:function(e,t,n){var r=n("cDf5").default,o=n("5Q0V");e.exports=function(e){var t=o(e,"string");return"symbol"===r(t)?t:String(t)},e.exports.__esModule=!0,e.exports.default=e.exports},sXyB:function(e,t,n){var r=n("SksO"),o=n("b48C");function a(t,n,i){return o()?(e.exports=a=Reflect.construct.bind(),e.exports.__esModule=!0,e.exports.default=e.exports):(e.exports=a=function(e,t,n){var o=[null];o.push.apply(o,t);var a=new(Function.bind.apply(e,o));return n&&r(a,n.prototype),a},e.exports.__esModule=!0,e.exports.default=e.exports),a.apply(null,arguments)}e.exports=a,e.exports.__esModule=!0,e.exports.default=e.exports},yZlL:function(e,t,n){"use strict";n.r(t),n.d(t,"pageQuery",(function(){return O}));var r=n("dI71"),o=n("q1tI"),a=n.n(o),i=n("Bl7J"),c=n("SgMy"),l=n("1oc3"),s=n("vOnD"),p=n("KE4F"),u=s.c.article.withConfig({displayName:"Article__ArticleWrapper",componentId:"jwdbi9-0"})(["padding:0 30px 30px;@media only screen and (max-width:500px){padding:0;}"]),d=function(e){function t(){return e.apply(this,arguments)||this}return Object(r.a)(t,e),t.prototype.render=function(){var e=this.props.post;return a.a.createElement(u,null,a.a.createElement(p.a,{content:e.body,date:e.frontmatter.date,tags:e.frontmatter.tags,translations:e.frontmatter.translations}))},t}(a.a.Component),g=n("Wbzz"),m=n("5hye"),f=n("tHN7"),h=n("su/s"),x=n("b9pq"),b=n("kSEI"),y=n("LObP"),v=s.c.aside.withConfig({displayName:"PrevNextPost__PreviewContainer",componentId:"sc-1r1qyep-0"})(["display:flex;flex-wrap:wrap;max-width:770px;width:80%;margin:0px auto 30px auto;top:20px;position:relative;@media (max-width:780px){width:100%;padding:25px;}"]),A=s.c.article.withConfig({displayName:"PrevNextPost__Preview",componentId:"sc-1r1qyep-1"})(["cursor:pointer;flex:1 1 300px;background-color:",";box-shadow:0 0 0 0,0 6px 12px rgba(0,0,0,0.1);margin:20px 20px;border-radius:5px;&:hover{box-shadow:0 0 0 0,0 6px 12px ",";transition:all 0.3s ease;transform:translate3D(0,-1px,0);}@media (min-width:780px){&:first-child{margin-left:0;}&:last-child{margin-right:0;}}"],m.a.backgroundArticle,m.a.grey300),w=s.c.div.withConfig({displayName:"PrevNextPost__PreviewCover",componentId:"sc-1r1qyep-2"})(["width:auto;height:200px;background:#c5d2d9 no-repeat 50%;background-size:cover;border-radius:5px 5px 0 0;"]),E=s.c.div.withConfig({displayName:"PrevNextPost__PreviewContent",componentId:"sc-1r1qyep-3"})(["padding:20px;header{padding:0 0 10px 0;}section{padding-bottom:10px;}footer{font-size:0.8em;}"]),I=function(e){var t=[e.previous,e.next].filter((function(e){return e})).map((function(e){return{node:e}})),n=Object(f.a)(),r=n.siteCover,i=n.defaultLang,c=Object(h.a)(r).fluid;return a.a.createElement(o.Fragment,null,a.a.createElement(v,null,t.map((function(e,t){var n=e.node,r=n.excerpt,o=n.timeToRead,l=e.node.frontmatter,s=l.tags,p=l.cover,u=l.title,d=l.slug,m=l.language,f=p&&p.publicURL||c.src;return a.a.createElement(A,{key:"prev-next-"+t},a.a.createElement(g.Link,{to:"/blog/"+d,"aria-label":"View "+u+" article"},a.a.createElement(w,{style:{backgroundImage:'url("'+f+'")'}}),a.a.createElement(E,null,a.a.createElement("header",null,a.a.createElement("h2",null,i!==m&&a.a.createElement(b.a,{language:m}),u)),a.a.createElement("section",null,a.a.createElement("p",null,r)),a.a.createElement("footer",null,a.a.createElement(y.c,{min:o}),Array.isArray(s)&&a.a.createElement(a.a.Fragment,null,a.a.createElement(y.a,null),a.a.createElement(x.a,{tags:s,noLink:!0}))))))}))))},k=n("EYWl"),C=function(e){function t(){return e.apply(this,arguments)||this}return Object(r.a)(t,e),t.prototype.render=function(){var e=this.props.data.post,t=this.props.pageContext,n=t.previous,r=t.next;return a.a.createElement(i.a,{location:this.props.location},a.a.createElement(k.a,{title:e.frontmatter.title,description:e.excerpt,cover:e.frontmatter.cover&&e.frontmatter.cover.publicURL,imageShare:e.frontmatter.imageShare&&e.frontmatter.imageShare.publicURL,lang:e.frontmatter.language,translations:e.frontmatter.translations,path:e.frontmatter.slug,isBlogPost:!0}),a.a.createElement(l.a,{heroImg:e.frontmatter.cover&&e.frontmatter.cover.publicURL,title:e.frontmatter.title}),a.a.createElement(c.a,null,a.a.createElement(d,{post:e})),a.a.createElement(I,{previous:n,next:r}))},t}(a.a.Component),O=(t.default=C,"3874984925")}}]);
//# sourceMappingURL=component---src-templates-blog-post-js-26ab79a6b44f9dedab9d.js.map