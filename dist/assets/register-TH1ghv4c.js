import{n}from"./navbar-uG-9voh2.js";import{a as i,h as c}from"./headers-B4k_fb22.js";import{e as m,p as f,n as l}from"./regex-zrQpdC9D.js";async function u({name:o,email:e,password:s}){try{const r={name:o,email:e,password:s},t=await fetch(i,{method:"POST",headers:c(),body:JSON.stringify(r)});if(!t.ok)throw new Error(`Error: ${t.status} - ${t.statusText}`);return(await t.json()).data}catch(r){throw r.name==="TypeError"?console.error("Network error or invalid JSON:",r.message):console.error("Registration failed:",r.message),r}}async function d(o){o.preventDefault();const e=o.target,s=e?e[0].value:"",r=e?e[1].value:"",t=e?e[2].value:"";if(!m(r)||!f(t)||!l(s))return;await u({name:s,email:r,password:t}),alert("Registration successful!"),window.location.href="/auth/login/"}n();const h=document.forms.register;h.addEventListener("submit",d);