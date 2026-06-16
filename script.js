const canvas=document.getElementById("bg");
const ctx=canvas.getContext("2d");

canvas.width=innerWidth;
canvas.height=innerHeight;

const video=document.getElementById("video");

let mood="calm";
let immersion=false;

/* 🌈 情绪系统 */
const emotionMap={
happy:"calm",
neutral:"calm",
sad:"tired",
angry:"chaos",
surprised:"anxiety",
fearful:"chaos"
};

const colorMap={
calm:"0,220,255",
tired:"180,180,180",
chaos:"255,0,200",
anxiety:"255,80,160"
};

const emojiMap={
calm:"😄",
tired:"😢",
chaos:"😡",
anxiety:"😨"
};

/* 💡 情绪建议系统（你要的“结果+建议+激励”） */
const adviceMap={
calm:{
title:"🌿 情绪稳定",
desc:"你目前处于平稳状态。",
tips:["适合专注","适合规划","保持节奏"],
quote:"稳定，是最稀缺的力量。"
},
tired:{
title:"🌫 情绪偏低",
desc:"你可能有些疲惫。",
tips:["适当休息","减少压力","放松10分钟"],
quote:"休息不是停止，是恢复。"
},
chaos:{
title:"⚡ 情绪波动",
desc:"系统检测到压力波动。",
tips:["深呼吸","拆解任务","降低刺激"],
quote:"混乱，是重组的开始。"
},
anxiety:{
title:"🌪 情绪焦虑",
desc:"建议降低外部刺激。",
tips:["闭眼休息","慢呼吸","写下想法"],
quote:"你比你感受到的更稳定。"
}
};

/* 🎥 摄像头 */
navigator.mediaDevices.getUserMedia({video:true})
.then(stream=>{
video.srcObject=stream;
document.getElementById("camStatus").innerText="ON";
});

/* 🤖 模拟情绪识别（稳定可运行） */
function detectEmotion(){

const t=Date.now();

let e="neutral";
if(t%8000<2000)e="happy";
else if(t%8000<4000)e="sad";
else if(t%8000<6000)e="angry";
else e="neutral";

mood=emotionMap[e];

updateUI(e);
updateAdvice();
}

/* 🧠 UI更新 */
function updateUI(e){
document.getElementById("emoji").innerText=emojiMap[mood];
document.getElementById("moodText").innerText=
"AI情绪：" + e + " → 状态：" + mood;
}

/* 💡 建议系统 */
function updateAdvice(){
const d=adviceMap[mood];

document.getElementById("adviceBox").innerHTML=`
<b>${d.title}</b><br><br>
${d.desc}<br><br>
建议：<br>- ${d.tips.join("<br>- ")}<br><br>
<i>${d.quote}</i>
`;
}

setInterval(detectEmotion,1000);

/* 🔊 音乐 */
function toggleMusic(){
const calm=document.getElementById("calmSound");
const chaos=document.getElementById("chaosSound");

if(mood==="calm"){
chaos.pause();
calm.play().catch(()=>{});
}else{
calm.pause();
chaos.play().catch(()=>{});
}
}

/* 🌌 沉浸模式 */
function toggleImmersion(){
immersion=!immersion;

document.querySelector(".ui").style.display=
immersion?"none":"flex";

document.getElementById("exitBtn").style.display=
immersion?"block":"none";

canvas.style.filter=immersion
?"contrast(1.9) saturate(1.6)"
:"contrast(1.6) saturate(1.3)";
}

/* 🌊 粒子系统 */
let particles=[];
for(let i=0;i<400;i++){
particles.push({
x:Math.random()*innerWidth,
y:Math.random()*innerHeight,
vx:(Math.random()-0.5),
vy:(Math.random()-0.5)
});
}

let mouse={x:0,y:0};
addEventListener("mousemove",e=>{
mouse.x=e.clientX;
mouse.y=e.clientY;
});

function animate(){

ctx.fillStyle=immersion
?"rgba(0,0,0,0.06)"
:"rgba(0,0,0,0.12)";

ctx.fillRect(0,0,innerWidth,innerHeight);

ctx.globalCompositeOperation="lighter";

ctx.fillStyle=`rgba(${colorMap[mood]},0.75)`;

particles.forEach(p=>{
p.x+=p.vx;
p.y+=p.vy;

p.vx*=0.96;
p.vy*=0.96;

if(p.x<0)p.x=innerWidth;
if(p.x>innerWidth)p.x=0;
if(p.y<0)p.y=innerHeight;
if(p.y>innerHeight)p.y=0;

ctx.beginPath();
ctx.arc(p.x,p.y,2.5,0,Math.PI*2);
ctx.fill();
});

requestAnimationFrame(animate);
}

animate();
