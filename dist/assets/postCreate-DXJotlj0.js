import{n as g}from"./navbar-BTogxb2F.js";import{b as p,h}from"./headers-B4k_fb22.js";import{a as w}from"./authGuard-C2GFzsuy.js";async function y(t){try{const e=await fetch(p,{method:"POST",headers:h(),body:JSON.stringify(t)});if(!e.ok)throw new Error(`Response Status: ${e.status}`);return(await e.json()).data}catch(e){throw e.name==="TypeError"?console.error("Network error or invalid JSON:",e.message):e.message.includes("Response Status")?console.error("Failed to create post:",e.message):console.error("An unexpected error occurred:",e.message),e}}async function v(t){t.preventDefault();const e=t.target,o=e?e[0].value:"",n=e?e[1].value:"",i=e?e[2].value:"",s=e?e[3].value:"",c=e?e[4].value:"",a=i.split(" "),l=["jpg","jpeg","png","gif","webp"],d=r=>{if(!r)return!1;try{const f=new URL(r).pathname.split(".").pop().toLowerCase();return l.includes(f)}catch{return console.error("Invalid image URL"),!1}};if(media.length>0&&!d(media)){alert("Please enter a valid image URL");return}const u={title:o,body:n||void 0,tags:a.length>0?a:void 0,media:s?{url:s,alt:c||void 0}:void 0};try{const r=await y(u);if(r&&r.id)alert("Post created successfully!"),window.location.href=`/post/single-post/?id=${r.id}`;else throw new Error("Post ID not returned")}catch(r){console.error("Error creating post:",r),alert("There was an error creating the post. Please try again.")}}w();g();const P=document.forms.createPost;P.addEventListener("submit",v);