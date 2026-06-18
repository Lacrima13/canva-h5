const state = {
  identity: "",
  task: "",
  style: "",
  prompt: "",
  resultIndex: 0,
  colorIndex: 0
};

const pageCount = document.getElementById("pageCount");
const toast = document.getElementById("toast");

const styleThemeMap = {
  "清新治愈": "theme-fresh",
  "高级极简": "theme-minimal",
  "活力撞色": "theme-pop",
  "科技商务": "theme-tech",
  "可爱潮流": "theme-cute",
  "国潮醒目": "theme-china"
};

const resultTemplates = [
  {
    title: "自律学习计划",
    sub: "从今天开始，成为更稳定的自己",
    advice: "建议采用大标题居中构图，搭配清爽留白和低饱和背景，适合知识类、小红书干货类内容传播。"
  },
  {
    title: "新品灵感上新",
    sub: "把日常变成值得记录的瞬间",
    advice: "建议使用高对比标题和场景化副标题，突出新品氛围与生活方式，让用户快速产生点击兴趣。"
  },
  {
    title: "招新进行时",
    sub: "加入我们，让热爱被看见",
    advice: "建议采用活力撞色和强节奏卡片排版，增强年轻感和活动感，适合社团、校园、品牌活动传播。"
  },
  {
    title: "3分钟搞定设计",
    sub: "从空白画布，到专业视觉表达",
    advice: "建议强调Canva可画的模板、素材和在线编辑能力，突出低门槛、高效率、易上手的品牌价值。"
  }
];

const alternativeTitles = [
  "今天也要好好创作",
  "你的灵感正在加载",
  "让设计变简单一点",
  "从空白开始，也能很好看",
  "下一张封面，就从这里开始"
];

const colors = [
  "theme-fresh",
  "theme-minimal",
  "theme-pop",
  "theme-tech",
  "theme-cute",
  "theme-china"
];

function goTo(num) {
  document.querySelectorAll(".screen").forEach(screen => {
    screen.classList.remove("active");
  });

  const target = document.getElementById(`screen-${num}`);
  if (target) {
    target.classList.add("active");
    updatePageCount(num);
  }
}

function updatePageCount(num) {
  const pageMap = {
    1: "01 / 07",
    2: "02 / 07",
    3: "03 / 07",
    4: "04 / 07",
    5: "05 / 07",
    6: "06 / 07",
    7: "07 / 07",
    8: "完成"
  };

  pageCount.textContent = pageMap[num] || "01 / 07";
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 1700);
}

document.querySelectorAll("[data-type]").forEach(button => {
  button.addEventListener("click", () => {
    const type = button.dataset.type;
    const value = button.dataset.value;

    if (type === "identity") {
      state.identity = value;
      clearSelected("[data-type='identity']");
    }

    if (type === "task") {
      state.task = value;
      clearSelected("[data-type='task']");
    }

    if (type === "style") {
      state.style = value;
      clearSelected("[data-type='style']");
    }

    button.classList.add("selected");
  });
});

function clearSelected(selector) {
  document.querySelectorAll(selector).forEach(el => {
    el.classList.remove("selected");
  });
}

function nextWithCheck(nextPage, key) {
  if (!state[key]) {
    showToast("请先选择一个选项");
    return;
  }

  goTo(nextPage);
}

function fillPrompt(text) {
  document.getElementById("promptInput").value = text;
}

function startGenerate() {
  const input = document.getElementById("promptInput");
  const value = input.value.trim();

  if (!value) {
    showToast("请先输入一句创作需求");
    return;
  }

  state.prompt = value;
  goTo(6);

  const progressBar = document.getElementById("progressBar");
  const loadingText = document.getElementById("loadingText");
  const items = [
    document.getElementById("load-1"),
    document.getElementById("load-2"),
    document.getElementById("load-3"),
    document.getElementById("load-4")
  ];

  items.forEach(item => item.classList.remove("done"));
  progressBar.style.width = "0%";

  let progress = 0;

  const texts = [
    "正在分析你的创作需求……",
    "正在匹配Canva模板风格……",
    "正在生成标题与配色建议……",
    "正在优化社媒传播效果……"
  ];

  const timer = setInterval(() => {
    progress += 5;
    progressBar.style.width = `${progress}%`;

    if (progress >= 20) {
      loadingText.textContent = texts[1];
      items[0].classList.add("done");
    }

    if (progress >= 45) {
      loadingText.textContent = texts[2];
      items[1].classList.add("done");
    }

    if (progress >= 70) {
      loadingText.textContent = texts[3];
      items[2].classList.add("done");
    }

    if (progress >= 95) {
      items[3].classList.add("done");
    }

    if (progress >= 100) {
      clearInterval(timer);
      setTimeout(() => {
        renderResult();
        goTo(7);
      }, 500);
    }
  }, 90);
}

function renderResult() {
  const result = resultTemplates[state.resultIndex % resultTemplates.length];

  const badge = document.getElementById("posterBadge");
  const title = document.getElementById("posterTitle");
  const sub = document.getElementById("posterSub");
  const advice = document.getElementById("aiAdvice");
  const design = document.getElementById("resultDesign");

  badge.textContent = state.task || "社媒封面";
  title.textContent = getSmartTitle(result.title);
  sub.textContent = result.sub;
  advice.textContent = getSmartAdvice(result.advice);

  design.className = "result-design";

  if (state.style && styleThemeMap[state.style]) {
    design.classList.add(styleThemeMap[state.style]);
  } else {
    design.classList.add(colors[state.colorIndex % colors.length]);
  }
}

function getSmartTitle(defaultTitle) {
  const prompt = state.prompt;

  if (prompt.includes("咖啡")) return "咖啡新品上新";
  if (prompt.includes("学习")) return "自律学习计划";
  if (prompt.includes("招新")) return "社团招新季";
  if (prompt.includes("招聘")) return "寻找发光的你";
  if (prompt.includes("产品")) return "新品推荐指南";
  if (prompt.includes("活动")) return "活动预告来了";

  return defaultTitle;
}

function getSmartAdvice(defaultAdvice) {
  const identityPart = state.identity ? `针对${state.identity}的使用场景，` : "";
  const taskPart = state.task ? `该方案将${state.task}作为核心载体，` : "";
  const stylePart = state.style ? `采用${state.style}的视觉语言，` : "";

  return `${identityPart}${taskPart}${stylePart}${defaultAdvice}`;
}

function changeResult() {
  state.resultIndex += 1;
  renderResult();
  showToast("已为你换一版方案");
}

function adjustColor() {
  const design = document.getElementById("resultDesign");

  colors.forEach(c => design.classList.remove(c));

  state.colorIndex += 1;
  const nextColor = colors[state.colorIndex % colors.length];

  design.classList.add(nextColor);
  showToast("配色已调整");
}

function changeTitle() {
  const title = document.getElementById("posterTitle");
  const randomIndex = Math.floor(Math.random() * alternativeTitles.length);
  title.textContent = alternativeTitles[randomIndex];
  showToast("标题已优化");
}

function showFinalCard() {
  document.getElementById("finalIdentity").textContent = state.identity || "个人博主";
  document.getElementById("finalTask").textContent = state.task || "小红书封面";
  document.getElementById("finalStyle").textContent = state.style || "清新治愈";

  const keywords = getKeywords();
  document.getElementById("finalKeywords").textContent = keywords;

  goTo(8);
}

function getKeywords() {
  const base = ["高效", "清晰", "吸睛", "轻松"];

  if (state.style === "清新治愈") return "清新 / 柔和 / 留白 / 治愈";
  if (state.style === "高级极简") return "极简 / 质感 / 留白 / 专业";
  if (state.style === "活力撞色") return "醒目 / 年轻 / 高对比 / 传播感";
  if (state.style === "科技商务") return "效率 / 秩序 / 科技 / 专业";
  if (state.style === "可爱潮流") return "趣味 / 亲和 / 潮流 / IP感";
  if (state.style === "国潮醒目") return "文化 / 节奏 / 识别度 / 国潮";

  return base.join(" / ");
}

function openCanva() {
  window.open("https://www.canva.cn/", "_blank");
}

function copySummary() {
  const text = `
《灵感急救站：3分钟生成你的社媒封面》

创作者身份：${state.identity || "个人博主"}
创作任务：${state.task || "小红书封面"}
推荐风格：${state.style || "清新治愈"}
创作需求：${state.prompt || "未填写"}
创作关键词：${getKeywords()}

核心概念：通过Canva可画帮助社媒创作者从空白画布快速生成专业视觉方案。
  `.trim();

  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => {
      showToast("创作处方已复制");
    });
  } else {
    showToast("当前浏览器不支持自动复制");
  }
}

function restart() {
  state.identity = "";
  state.task = "";
  state.style = "";
  state.prompt = "";
  state.resultIndex = 0;
  state.colorIndex = 0;

  document.querySelectorAll(".selected").forEach(el => {
    el.classList.remove("selected");
  });

  document.getElementById("promptInput").value = "";
  goTo(1);
}

function showAbout() {
  document.getElementById("aboutModal").classList.add("show");
}

function closeAbout() {
  document.getElementById("aboutModal").classList.remove("show");
}

window.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    closeAbout();
  }
});
