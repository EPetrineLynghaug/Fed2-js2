import{n as g}from"./navbar-ChR7nwex.js";import{b as h,h as b}from"./headers-B4k_fb22.js";import{s as n}from"./customAlert-u-7FB-Wo.js";import{a as w}from"./authGuard-VregjOBo.js";async function y(t){try{const e=await fetch(h,{method:"POST",headers:b(),body:JSON.stringify(t)});if(!e.ok)throw new Error(`Response Status: ${e.status}`);return(await e.json()).data}catch(e){throw e.name==="TypeError"?console.error("Network error or invalid JSON:",e.message):e.message.includes("Response Status")?console.error("Failed to create post:",e.message):console.error("An unexpected error occurred:",e.message),e}}async function P(t){t.preventDefault();const e=t.target,a=e?e[0].value.trim():"",i=e?e[1].value.trim():"",c=e?e[2].value.trim():"",s=e?e[3].value.trim():"",d=e?e[4].value.trim():"";if(!a||!i){n("Title and body are required to create a post.","error");return}const l=c?c.split(" "):[],u=["jpg","jpeg","png","gif","webp"];if(s&&!(r=>{if(!r)return!1;try{const f=new URL(r).pathname.split(".").pop().toLowerCase();return u.includes(f)}catch{return console.error("Invalid image URL"),!1}})(s)){n("Please enter a valid image URL.","error");return}const o=e.querySelector("button[type='submit']");o.disabled=!0,o.innerHTML='<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Creating...';const m={title:a,body:i,tags:l.length>0?l:void 0,media:s?{url:s,alt:d||void 0}:void 0};try{const r=await y(m);if(r&&r.id)n("Post created successfully!","success"),window.location.href=`/post/single-post/?id=${r.id}`;else throw new Error("Post ID not returned")}catch(r){console.error("Error creating post:",r),n("There was an error creating the post. Please try again.","error")}finally{o.disabled=!1,o.innerHTML="Submit Post"}}w();g();const v=document.forms.createPost;v.addEventListener("submit",P);
