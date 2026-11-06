const root=document.documentElement;
const toggle=document.getElementById("theme");
const saved=localStorage.getItem("theme");
const prefersDark=window.matchMedia("(prefers-color-scheme: dark)").matches;
function setTheme(t){root.dataset.theme=t;toggle.textContent=t==="dark"?"☀":"☾";localStorage.setItem("theme",t)}
setTheme(saved||(prefersDark?"dark":"light"));
toggle.addEventListener("click",()=>setTheme(root.dataset.theme==="dark"?"light":"dark"));

const roles=["Computer Science Student","Web Developer","System Analyst Aspirant","Project Coordinator"];
const typed=document.getElementById("typed");
let r=0,c=0,del=false;
function type(){
  const word=roles[r];
  typed.textContent=word.slice(0,c);
  if(!del&&c<word.length){c++;setTimeout(type,80)}
  else if(!del){del=true;setTimeout(type,1400)}
  else if(c>0){c--;setTimeout(type,40)}
  else{del=false;r=(r+1)%roles.length;setTimeout(type,300)}
}
type();

function count(el){
  const target=+el.dataset.count,pre=el.dataset.prefix||"",suf=el.dataset.suffix||"";
  const start=performance.now(),dur=1400;
  function step(now){
    const p=Math.min((now-start)/dur,1);
    el.textContent=pre+Math.round(target*(1-Math.pow(1-p,3)))+suf;
    if(p<1)requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

const io=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(!e.isIntersecting)return;
    e.target.classList.add("show");
    e.target.querySelectorAll("[data-count]").forEach(count);
    io.unobserve(e.target);
  });
},{threshold:.15});
document.querySelectorAll(".reveal").forEach(el=>io.observe(el));
