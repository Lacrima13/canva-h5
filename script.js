const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

const video = document.getElementById("video");

/* =========================
   🌈 状态系统
========================= */

let emotion = "neutral";

/* 记录情绪历史（报告用） */
let emotionLog = [];

/* 粒子方向控制 */
let flow = {x:0, y:0};

/* =========================
   🎥 摄像头
========================= */

navigator.mediaDevices.getUserMedia({video:true})
.then(stream=>{
video.srcObject = stream;
});

/* =========================
   🤖 情绪识别（简化稳定版）
   👉 可升级 face-api
========================= */

function detectEmotion(){

const t = Date.now();

let e = "neutral";

if(t%8000<2000) e="happy";
else if(t%8000<4000) e="sad";
else if(t%6000<6000) e="angry";

emotion = e;

/* 记录 */
emotionLog.push(e);
if(emotionLog.length>50) emotionLog.shift();

document.getElementById("emotion").innerText =
"emotion: " + emotion;
}

setInterval(detectEmotion,1000);

/* =========================
   🧭 头部方向（简化版：鼠标模拟）
   👉 真版可接 MediaPipe
========================= */

addEventListener("mousemove",e=>{

flow.x = (e.clientX / innerWidth - 0.5) * 2;
flow.y = (e.clientY / innerHeight - 0.5) * 2;

document.getElementById("direction").innerText =
"flow: " + flow.x.toFixed(2) + "," + flow.y.toFixed(2);
});

/* =========================
   🌌 粒子系统（会被方向控制）
========================= */

let particles=[];

for(let i=0;i<500;i++){
particles.push({
x:Math.random()*innerWidth,
y:Math.random()*innerHeight,
vx:(Math.random()-0.5),
vy:(Math.random()-0.5)
});
}

/* =========================
   🎧 音乐控制
========================= */

function updateAudio(){

const calm = document.getElementById("calm");
const chaos = document.getElementById("chaos");

if(emotion==="happy"){
calm.play().catch(()=>{});
chaos.pause();
}else{
chaos.play().catch(()=>{});
calm.pause();
}
}

/* =========================
   🌌 渲染
========================= */

function animate(){

ctx.fillStyle="rgba(0,0,0,0.08)";
ctx.fillRect(0,0,innerWidth,innerHeight);

ctx.fillStyle="rgba(0,200,255,0.7)";

particles.forEach(p=>{

/* 🧭 方向驱动 */
p.vx += flow.x * 0.02;
p.vy += flow.y * 0.02;

p.vx *= 0.96;
p.vy *= 0.96;

p.x += p.vx;
p.y += p.vy;

if(p.x<0)p.x=innerWidth;
if(p.x>innerWidth)p.x=0;
if(p.y<0)p.y=innerHeight;
if(p.y>innerHeight)p.y=0;

ctx.beginPath();
ctx.arc(p.x,p.y,2.2,0,Math.PI*2);
ctx.fill();
});

updateAudio();

requestAnimationFrame(animate);
}

animate();

/* =========================
   📊 生成报告（你重点要的）
========================= */

function generateReport(){

let happy=0,sad=0,angry=0;

emotionLog.forEach(e=>{
if(e==="happy")happy++;
if(e==="sad")sad++;
if(e==="angry")angry++;
});

const total = emotionLog.length || 1;

document.getElementById("report").innerHTML = `
<b>📊 情绪报告</b><br><br>

😊 平静/积极：${(happy/total*100).toFixed(1)}%<br>
😢 低落：${(sad/total*100).toFixed(1)}%<br>
😡 压力：${(angry/total*100).toFixed(1)}%<br><br>

💡 建议：<br>
- 注意情绪波动节奏<br>
- 适当暂停当前任务<br>
- 给自己一点恢复空间<br><br>

✨ 激励：<br>
“你不是情绪的结果，你是它的观察者。”
`;
}
