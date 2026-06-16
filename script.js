const canvas=document.getElementById("bg");
const ctx=canvas.getContext("2d");

canvas.width=innerWidth;
canvas.height=innerHeight;

const video=document.getElementById("video");

let mood="calm";

/* 🌈 AI情绪映射 */
const emotionMap={
happy:"calm",
neutral:"calm",
sad:"tired",
angry:"chaos",
fearful:"anxiety",
disgusted:"chaos",
surprised:"anxiety"
};

const colorMap={
calm:"0,220,255",
tired:"180,180,180",
chaos:"255,0,200",
anxiety:"255,80,160"
};

/* 🤖 初始化摄像头 */
async function startVideo(){
const stream=await navigator.mediaDevices.getUserMedia({video:true});
video.srcObject=stream;
}
startVideo();

/* 🤖 加载AI模型 */
async function loadAI(){
await faceapi.nets.tinyFaceDetector.loadFromUri("https://cdn.jsdelivr.net/npm/face-api.js/models");
await faceapi.nets.faceExpressionNet.loadFromUri("https://cdn.jsdelivr.net/npm/face-api.js/models");

detect();
}
loadAI();

/* 😶 AI识别情绪 */
async function detect(){

const detection=await faceapi
.detectSingleFace(video,new faceapi.TinyFaceDetectorOptions())
withFaceExpressions();

if(detection){
const expr=detection.expressions;
const max=Math.max(...Object.values(expr));
const emotion=Object.keys(expr).find(k=>expr[k]===max);

mood=emotionMap[emotion]||"calm";

document.getElementById("output").innerHTML=
"AI情绪识别：" + emotion + " → 宇宙状态：" + mood;
}

setTimeout(detect,500);
}

/* 🌌 粒子系统 */
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

/* 🌊 渲染 */
function animate(){

ctx.fillStyle="rgba(0,0,0,0.08)";
ctx.fillRect(0,0,innerWidth,innerHeight);

ctx.globalCompositeOperation="lighter";

ctx.fillStyle=`rgba(${colorMap[mood]},0.7)`;

particles.forEach(p=>{

let dx=mouse.x-p.x;
let dy=mouse.y-p.y;

p.vx+=dx*0.00002;
p.vy+=dy*0.00002;

p.vx*=0.96;
p.vy*=0.96;

p.x+=p.vx;
p.y+=p.vy;

if(p.x<0)p.x=innerWidth;
if(p.x>innerWidth)p.x=0;
if(p.y<0)p.y=innerHeight;
if(p.y>innerHeight)p.y=0;

ctx.beginPath();
ctx.arc(p.x,p.y,2.6,0,Math.PI*2);
ctx.fill();
});

requestAnimationFrame(animate);
}

animate();
