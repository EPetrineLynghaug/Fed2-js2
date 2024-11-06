function c(){const t=localStorage.getItem("userInfo");return t?JSON.parse(t):null}function i(t){t.preventDefault(),localStorage.removeItem("token"),localStorage.removeItem("userInfo"),window.location.href="/auth/login/"}let d;if(localStorage.token){const t=c();d=[{name:"Home",url:"/"},{name:"New Post",url:"/post/create/"},{name:"My Profile",url:`/profile/?name=${t.name}`}]}else d=[{name:"Login",url:"/auth/login/"},{name:"Register",url:"/auth/register/"}];function u(){const t=document.createElement("nav");t.classList.add("bg-backgroundDark","p-4","flex","justify-between","items-center","shadow-md","w-full","z-50","fixed","top-0"),t.style.height="64px";const s=document.createElement("div");s.classList.add("text-white","font-bold","text-xl"),s.innerText="Noroff Network";const a=document.createElement("div");if(a.classList.add("hidden","sm:flex","gap-6","items-center","ml-auto"),d.forEach(e=>{const n=document.createElement("a");n.href=e.url,n.innerText=e.name,n.classList.add("text-gray-300","font-semibold","hover:text-teal-400","transition-colors","duration-200","py-2","px-4","rounded"),a.append(n)}),localStorage.token){const e=document.createElement("button");e.innerText="Logout",e.classList.add("bg-red-500","text-white","font-semibold","px-4","py-2","rounded","hover:bg-red-700","transition-colors","duration-200"),e.addEventListener("click",i),a.append(e)}const o=document.createElement("button");o.id="menu-btn",o.setAttribute("aria-expanded","false"),o.classList.add("sm:hidden","cursor-pointer","text-white"),o.innerHTML=`
    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
    </svg>
  `;const r=document.createElement("div");if(r.id="nav-menu-mobile",r.classList.add("hidden","absolute","top-0","right-0","mt-16","bg-backgroundDark","rounded-l-lg","w-3/4","max-w-xs","flex","flex-col","gap-2","p-4","shadow-lg","sm:hidden"),d.forEach(e=>{const n=document.createElement("a");n.href=e.url,n.innerText=e.name,n.classList.add("text-gray-300","font-semibold","hover:bg-teal-600","hover:text-white","transition-colors","duration-200","py-2","px-4","rounded-md"),r.append(n)}),localStorage.token){const e=document.createElement("button");e.innerText="Logout",e.classList.add("text-gray-300","font-semibold","bg-red-500","hover:bg-red-700","hover:text-white","transition-colors","duration-200","py-2","px-4","rounded-md","w-full","text-left"),e.addEventListener("click",i),r.append(e)}t.append(s,o,a,r),document.body.prepend(t);const l=document.getElementById("content");l&&(l.style.paddingTop="64px"),o.addEventListener("click",()=>{r.classList.toggle("hidden");const e=o.getAttribute("aria-expanded")==="true";o.setAttribute("aria-expanded",!e)})}export{c as g,u as n};