!function(){let t=document.querySelector("button[data-start]"),e=document.querySelector("button[data-stop]"),r=document.querySelector("body"),d=null;e.setAttribute("disabled",""),t.addEventListener("click",()=>{t.setAttribute("disabled",""),e.removeAttribute("disabled"),d=setInterval(()=>{r.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16)}`},1e3)}),e.addEventListener("click",()=>{clearInterval(d),t.removeAttribute("disabled"),e.setAttribute("disabled","")})}();
//# sourceMappingURL=01-color-switcher.ce70bff8.js.map