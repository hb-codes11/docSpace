(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=`<!-- @license lucide-static v1.72.0 - ISC -->
<svg
  class="lucide lucide-layers-2"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M13 13.74a2 2 0 0 1-2 0L2.5 8.87a1 1 0 0 1 0-1.74L11 2.26a2 2 0 0 1 2 0l8.5 4.87a1 1 0 0 1 0 1.74z" />
  <path d="m20 14.285 1.5.845a1 1 0 0 1 0 1.74L13 21.74a2 2 0 0 1-2 0l-8.5-4.87a1 1 0 0 1 0-1.74l1.5-.845" />
</svg>
`,t=`<!-- @license lucide-static v1.72.0 - ISC -->
<svg
  class="lucide lucide-scissors"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <circle cx="6" cy="6" r="3" />
  <path d="M8.12 8.12 12 12" />
  <path d="M20 4 8.12 15.88" />
  <circle cx="6" cy="18" r="3" />
  <path d="M14.8 14.8 20 20" />
</svg>
`,n=`<!-- @license lucide-static v1.72.0 - ISC -->
<svg
  class="lucide lucide-file-text"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" />
  <path d="M14 2v5a1 1 0 0 0 1 1h5" />
  <path d="M10 9H8" />
  <path d="M16 13H8" />
  <path d="M16 17H8" />
</svg>
`,r=`<!-- @license lucide-static v1.72.0 - ISC -->
<svg
  class="lucide lucide-upload-cloud"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M12 13v8" />
  <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
  <path d="m8 17 4-4 4 4" />
</svg>
`,i=`<!-- @license lucide-static v1.72.0 - ISC -->
<svg
  class="lucide lucide-shield-check"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
  <path d="m9 12 2 2 4-4" />
</svg>
`,a=`modulepreload`,o=function(e){return`/`+e},s={},c=function(e){return e.pathname.endsWith(`.css`)},l=function(e,t,n){if(t in e)return e[t];let r=n();if(!r){e[t]=void 0;return}let i=r.then(()=>{e[t]=void 0},n=>{throw e[t]=void 0,n});return e[t]=i,i},u=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e,i=document.querySelector(`meta[property=csp-nonce]`),u=i?.nonce||i?.getAttribute(`nonce`);function d(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}function f(e){return import.meta.resolve?new URL(import.meta.resolve(e)):new URL(e,import.meta.url)}r=d(t.map(t=>{t=o(t,n);let r=f(t),i=c(r);return l(s,r.href,()=>{if(e===void 0){e={all:new Set,styles:new Set};let t=document.getElementsByTagName(`link`);for(let n=t.length-1;n>=0;n--){let r=t[n];e.all.add(r.href),r.rel===`stylesheet`&&e.styles.add(r.href)}}if((i?e.styles:e.all).has(r.href))return;let t=document.createElement(`link`);if(t.rel=i?`stylesheet`:a,i||(t.as=`script`),t.crossOrigin=``,t.href=r.href,u&&t.setAttribute(`nonce`,u),document.head.appendChild(t),i)return new Promise((e,n)=>{let i=a=>{t.removeEventListener(`load`,i),t.removeEventListener(`error`,i),a.type===`error`?n(Error(`Unable to preload CSS for ${r}`)):e(a)};t.addEventListener(`load`,i),t.addEventListener(`error`,i)})})}).filter(e=>e!==void 0))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})},d={merge:{title:`Merge PDFs`,summary:`Combine documents in any order`,hint:`Add at least two PDFs, then arrange them in the order you want.`,icon:e},split:{title:`Split PDF`,summary:`Extract pages or split into files`,hint:`Select the pages you want to keep or save each page as a separate PDF.`,icon:t},word:{title:`PDF to Word`,summary:`Export editable text to DOCX`,hint:`Convert selectable text into a Word document. Scanned pages and original layout are outside this conversion.`,icon:n}},f={BASE_URL:`/`,DEV:!1,MODE:`production`,PROD:!0,SSR:!1},p=!!(f.VITE_SUPABASE_URL&&f.VITE_SUPABASE_PUBLISHABLE_KEY);document.querySelector(`#app`).innerHTML=`
<header class="top"><div class="shell top-inner"><a class="brand" href="./">${e}docSpace</a>
${p?`<button id="account" class="outline">Sign in</button>`:`<span class="private">`+i+`On-device processing</span>`}
</div></header>
<main class="shell">
  <section class="hero"><h1>A little space<br>for your PDFs.</h1>
  <p>Merge, split, and convert your PDFs in one place.<br class="desktop"> Your documents stay on your device.</p>
  <div class="paper-art" aria-hidden="true"><div class="paper back"></div><div class="paper front"><span>PDF</span><i></i><i></i><i></i></div></div>
  </section>
  <nav aria-label="PDF tools" class="tools">${Object.entries(d).map(([e,t])=>`<button class="tool" data-mode="${e}" aria-pressed="false"><span class="tool-icon">${t.icon}</span><span><strong>${t.title}</strong><small>${t.summary}</small></span></button>`).join(``)}</nav>
  <section class="workbench" aria-labelledby="tool-title">
    <div class="tool-head"><h2 id="tool-title"></h2><p id="tool-hint"></p></div>
    <div class="drop" id="drop">
      <span class="upload-icon">${r}</span>
      <strong>Drop PDF files here</strong>
      <span class="limit">Up to 100 MB and 500 pages per job</span>
      <button class="primary" id="browse">Choose PDFs</button>
      <input type="file" id="picker" accept=".pdf,application/pdf" hidden>
    </div>
    <ol id="queue" aria-label="Selected files" hidden></ol>
    <div id="split-options" hidden>
      <label for="pages">Pages to keep</label>
      <input id="pages" type="text" placeholder="All pages" aria-describedby="range-help">
      <small id="range-help">Enter page numbers or ranges, like 1-3, 5.</small>
      <label class="check"><input id="separate" type="checkbox"> Save each selected page separately in a ZIP</label>
    </div>
    <div class="result">
      <p id="status" role="status" aria-live="polite"></p>
      <button class="primary" id="process" hidden></button>
      <button class="outline" id="cancel" hidden>Cancel</button>
      <a class="primary" id="download" hidden>Download</a>
    </div>
  </section>
</main>
<footer class="shell">${i}<span>Files are processed in your browser and never uploaded.</span></footer>
<dialog id="sign-in"><form id="sign-in-form"><h2>Sign in to docSpace</h2><p>Sync your last-used tool across devices.</p>
<label for="email">Email address</label><input type="email" id="email" required autocomplete="email">
<p id="account-status" role="status"></p><div class="dialog-actions"><button type="button" class="outline" id="close-dialog">Close</button><button class="primary" id="send-link">Send sign-in link</button></div>
</form></dialog>`;var m=e=>document.getElementById(e),h=m(`picker`),g=m(`status`),_=m(`download`),v=m(`queue`),y=`merge`,b=[],x,S,C,w,T,E=!1;function D(){C&&URL.revokeObjectURL(C),C=void 0,_.removeAttribute(`href`),_.hidden=!0,g.textContent=``,g.classList.remove(`error`)}function O(e,t=!1){g.textContent=e,g.classList.toggle(`error`,t)}function k(e){Object.hasOwn(d,e)&&e!==y&&!x&&(y=e,y!==`merge`&&(b=b.slice(0,1)),m(`pages`).value=``,m(`separate`).checked=!1,D(),A())}function A(e,t){let n=d[y];m(`tool-title`).textContent=n.title,m(`tool-hint`).textContent=n.hint,h.multiple=y===`merge`,m(`browse`).textContent=y===`merge`?`Choose PDFs`:`Choose PDF`,m(`browse`).disabled=!!x,m(`process`).textContent=n.title,m(`process`).hidden=!b.length||!!x,m(`process`).disabled=y===`merge`&&b.length<2,m(`cancel`).hidden=!x,m(`split-options`).hidden=y!==`split`||!b.length,m(`pages`).disabled=m(`separate`).disabled=!!x;for(let e of document.querySelectorAll(`[data-mode]`))e.setAttribute(`aria-pressed`,String(e.dataset.mode===y)),e.disabled=!!x;if(v.hidden=!b.length,v.replaceChildren(),b.forEach((e,t)=>{let n=document.createElement(`li`),r=document.createElement(`span`);r.className=`filename`,r.textContent=e.name,n.append(r);let i=document.createElement(`div`);i.className=`actions`;let a=y===`merge`?[[`↑`,`Move up`,-1],[`↓`,`Move down`,1]]:[];a.push([`×`,`Remove`,0]);for(let[n,r,o]of a){let a=document.createElement(`button`);a.className=`icon-button`,a.textContent=n,a.dataset.action=r,a.setAttribute(`aria-label`,`${r} ${e.name}`),a.disabled=!!x||t+o<0||t+o>=b.length,a.onclick=()=>{o?[b[t],b[t+o]]=[b[t+o],b[t]]:b.splice(t,1),D(),A(Math.min(t+o,b.length-1),r)},i.append(a)}n.append(i),v.append(n)}),e!==void 0){let n=v.children[e];([...n?.querySelectorAll(`button:enabled`)??[]].find(e=>e.dataset.action===t)??n?.querySelector(`button:enabled`)??m(`browse`)).focus()}}function j(e){if(x||!e.length)return;if(D(),y!==`merge`&&e.length!==1){O(`Choose one PDF for this tool.`,!0);return}let t=y===`merge`?[...b,...e]:e;t.length>50||t.reduce((e,t)=>e+t.size,0)>104857600?O(`Choose up to 50 files totaling 100 MB or less.`,!0):(b=t,A())}function M(){x?.cancel(),x=void 0,clearTimeout(S),A()}function N(e){M(),e.error?(O(e.error,!0),m(`process`).focus()):(C=URL.createObjectURL(e.blob),_.href=C,_.download=e.filename,_.textContent=`Download `+e.filename,_.hidden=!1,O(`Your download is ready.`),_.focus())}m(`browse`).onclick=()=>h.click(),h.onchange=()=>{j([...h.files]),h.value=``};var P=m(`drop`);P.ondragover=e=>{e.preventDefault(),P.classList.add(`dragging`)},P.ondragleave=()=>P.classList.remove(`dragging`),P.ondrop=e=>{e.preventDefault(),P.classList.remove(`dragging`),j([...e.dataTransfer.files])},window.addEventListener(`dragover`,e=>{e.dataTransfer.types.includes(`Files`)&&e.preventDefault()}),window.addEventListener(`drop`,e=>{e.dataTransfer.types.includes(`Files`)&&e.preventDefault()}),m(`cancel`).onclick=()=>{M(),O(`Processing canceled.`),m(`process`).focus()},m(`pages`).oninput=D,m(`separate`).onchange=D,m(`process`).onclick=()=>{D();try{if(y===`word`){let e=new AbortController,[t]=b,n={cancel:()=>e.abort()};x=n,Promise.all([u(()=>import(`./word-4Etm1WS_.js`),[]),t.arrayBuffer()]).then(async([{toWord:t},r])=>{let i=await t(r,e.signal);x===n&&N({blob:i,filename:`converted.docx`})}).catch(e=>{x===n&&N({error:([`InvalidPDFException`,`PasswordException`].includes(e.name)?`This PDF is damaged or encrypted. Try an unlocked copy.`:e.message)||`Word conversion failed.`})})}else{let e=new Worker(new URL(`/assets/processor-D0ixc3Tv.js`,``+import.meta.url),{type:`module`});x={cancel:()=>e.terminate()},e.onmessage=({data:e})=>N(e),e.onerror=()=>N({error:`Processing failed. Try again with a smaller PDF.`}),e.postMessage({files:b,mode:y,selection:m(`pages`).value.trim(),separate:m(`separate`).checked})}S=setTimeout(()=>N({error:`Processing timed out. Try a smaller set of pages or files.`}),12e4),A(),O(`Processing your files…`),m(`cancel`).focus()}catch{M(),O(`The browser could not start processing. Reload and try again.`,!0)}};var F=Promise.resolve();document.querySelector(`.tools`).onclick=e=>{let t=e.target.closest(`[data-mode]`);if(t&&(E=!0,k(t.dataset.mode),T)){let e={user_id:T.user.id,last_tool:y};F=F.then(async()=>{let{error:t}=await w.from(`tool_preferences`).upsert(e);t&&T?.user.id===e.user_id&&O(`Could not sync your tool preference.`,!0)}).catch(()=>O(`Could not sync your tool preference.`,!0))}};async function I(){let{createClient:e}=await u(async()=>{let{createClient:e}=await import(`./dist-CVPAM7_G.js`);return{createClient:e}},[]);w=e(f.VITE_SUPABASE_URL,f.VITE_SUPABASE_PUBLISHABLE_KEY,{auth:{flowType:`pkce`}});let t=m(`account`),n=m(`sign-in`),r=m(`account-status`);m(`close-dialog`).onclick=()=>n.close(),t.onclick=async()=>{if(!T)n.showModal();else{t.disabled=!0;try{let{error:e}=await w.auth.signOut();e&&O(`Could not sign out. Try again.`,!0)}finally{t.disabled=!1}}},m(`sign-in-form`).onsubmit=async e=>{e.preventDefault(),m(`send-link`).disabled=!0,r.textContent=`Sending your link…`;try{let{error:e}=await w.auth.signInWithOtp({email:m(`email`).value.trim(),options:{emailRedirectTo:location.origin+location.pathname}});r.textContent=e?`Could not send the link. Check your address and try again.`:`Open the sign-in link in this browser.`}catch{r.textContent=`Could not send the link. Check your connection and try again.`}finally{m(`send-link`).disabled=!1}},w.auth.onAuthStateChange((e,n)=>{let r=T?.user.id!==n?.user.id;if(T=n,t.textContent=n?`Sign out`:`Sign in`,!n||!r)return;let i=n.user.id;setTimeout(async()=>{let{data:e}=await w.from(`tool_preferences`).select(`last_tool`).eq(`user_id`,i).maybeSingle();T?.user.id===i&&!E&&!b.length&&e&&k(e.last_tool)})})}A(),p&&I().catch(()=>{m(`account`).disabled=!0,m(`account`).textContent=`Sign-in unavailable`});