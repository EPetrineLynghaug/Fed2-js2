import{a as i}from"./authGuard-VregjOBo.js";import{n as l,g as c}from"./navbar-ChR7nwex.js";import{c as d,h as m}from"./headers-B4k_fb22.js";import{c as p}from"./post-card-wZ2deOrP.js";import"./customAlert-u-7FB-Wo.js";async function f(o){try{const e=await fetch(`${d}/${o}?_posts=true`,{method:"GET",headers:m()});if(!e.ok)throw new Error(`Response Status: ${e.status}`);const t=(await e.json()).data;return t.posts&&t.posts.length>0&&t.posts.sort((s,r)=>new Date(r.created)-new Date(s.created)),t}catch(e){throw e.name==="TypeError"?console.error("Network error or request failed while reading profile:",e.message):e.message.includes("Response Status")?console.error(`Failed to read profile for user '${o}':`,e.message):console.error("An unexpected error occurred while reading profile:",e.message),e}}i();l();const u=c(),w=new URLSearchParams(window.location.search),h=w.get("name");async function g(o){const e=await f(o);if(e){const a=document.querySelector(".profile");a.classList.add("min-w-100","w-full","max-w-screen-xl","py-8","px-4","mx-auto");const t=document.createElement("div");if(t.classList.add("flex","items-center","justify-start","space-x-4","w-full","max-w-md"),e.avatar){const r=document.createElement("img");r.src=e.avatar.url?e.avatar.url:"https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png",r.alt=e.avatar.alt?e.avatar.alt:`${e.name}'s avatar`,r.classList.add("w-10","h-10","sm:w-12","sm:h-12","md:w-16","md:h-16","rounded-full","object-cover","border-2","border-gray-400"),t.append(r)}const s=document.createElement("p");if(s.innerText=e.name,s.classList.add("text-base","sm:text-lg","md:text-xl","font-semibold","text-textPrimary"),t.append(s),a.append(t),e.posts.length>0){const r=u.email===e.email,n=p(e.posts,r);document.querySelector(".posts").append(n)}}else{const a=document.querySelector(".profile"),t=document.createElement("p");t.innerText="User not found",t.classList.add("text-md","font-semibold","text-red-500","text-center"),a.append(t)}}g(h);