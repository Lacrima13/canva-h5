<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>灵感急救站｜Canva可画艺术互动广告</title>
  <meta name="theme-color" content="#0ec7d2" />
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <div class="bg">
    <span></span><span></span><span></span>
  </div>

  <main class="app">
    <header>
      <div class="brand"><b>C</b><div><strong>Canva 可画</strong><em>Visual AI Studio</em></div></div>
      <button onclick="openModal()">说明</button>
    </header>
    <div class="bar"><i id="progressBar"></i></div>

    <section class="screen active" id="screen-1">
      <div class="inner hero">
        <div class="hero-visual">
          <img src="assets/cover-lab.svg" alt="创作实验室视觉">
          <span class="float f1">模板库</span><span class="float f2">风格板</span><span class="float f3">AI生成</span>
        </div>
        <p class="eyebrow center">AIGC × ART DIRECTION</p>
        <h1>灵感急救站</h1>
        <h2>3分钟生成你的社媒封面</h2>
        <p class="desc center">把“工具演示”升级成一场视觉创作实验：用插画、海报样机、艺术色块和动态流程，让用户更想继续体验。</p>
        <div class="poster-row">
          <div class="poster-card a"><small>STUDY</small><strong>学习计划</strong></div>
          <div class="poster-card b"><small>EVENT</small><strong>招新季</strong></div>
          <div class="poster-card c"><small>PRODUCT</small><strong>新品上新</strong></div>
        </div>
        <button class="primary" onclick="goTo(2)">开始急救我的灵感</button>
        <button class="ghost" onclick="openModal()">查看设计说明</button>
      </div>
    </section>

    <section class="screen" id="screen-2">
      <div class="inner">
        <p class="eyebrow">01 / USER INSIGHT</p>
        <h2>创作者不是不想设计，<br>而是没有时间从零开始。</h2>
        <p class="desc">用“赶稿桌面”替代单纯文字说明，把焦虑场景图像化，让用户一眼看懂为什么需要Canva可画。</p>
        <div class="visual-card"><img src="assets/deadline-scene.svg" alt="赶稿场景"></div>
        <div class="dashboard">
          <div><span>封面图</span><b class="red">未完成</b></div>
          <div><span>标题</span><b class="orange">未确定</b></div>
          <div><span>素材</span><b class="orange">未整理</b></div>
          <div><span>灵感值</span><b class="red">0%</b></div>
        </div>
        <div class="pain-list">
          <article><b>不会设计</b><span>不熟悉版式、字体和色彩。</span></article>
          <article><b>缺少灵感</b><span>面对空白画布容易卡住。</span></article>
          <article><b>时间紧张</b><span>内容发布节奏不断压缩。</span></article>
        </div>
        <nav><button class="secondary" onclick="goTo(1)">返回</button><button class="primary small" onclick="goTo(3)">继续体验</button></nav>
      </div>
    </section>

    <section class="screen" id="screen-3">
      <div class="inner">
        <p class="eyebrow">02 / CREATOR TYPE</p>
        <h2>选择你的创作者身份</h2>
        <p class="desc">用更具视觉表现力的人群卡片，让身份选择本身成为作品的一部分。</p>
        <div class="creator-gallery">
          <button class="creator c1" data-type="identity" data-value="企业新媒体运营"><i></i><b>企业新媒体运营</b><span>品牌统一 / 高频发布</span></button>
          <button class="creator c2" data-type="identity" data-value="个人博主"><i></i><b>个人博主</b><span>封面吸睛 / 风格统一</span></button>
          <button class="creator c3" data-type="identity" data-value="中小创业者"><i></i><b>中小创业者</b><span>产品转化 / 低成本设计</span></button>
          <button class="creator c4" data-type="identity" data-value="大学生创作者"><i></i><b>大学生创作者</b><span>社团海报 / 汇报封面</span></button>
        </div>
        <nav><button class="secondary" onclick="goTo(2)">返回</button><button class="primary small" onclick="nextWithCheck(4,'identity')">下一步</button></nav>
      </div>
    </section>

    <section class="screen" id="screen-4">
      <div class="inner">
        <p class="eyebrow">03 / DESIGN TASK</p>
        <h2>今天要完成哪种视觉物料？</h2>
        <p class="desc">把任务选择做成“海报墙”，强化作品的视觉冲击力和广告感。</p>
        <div class="task-gallery">
          <button class="task t1" data-type="task" data-value="小红书封面"><small>01</small><b>小红书封面</b><span>干货 / 种草 / 生活方式</span></button>
          <button class="task t2" data-type="task" data-value="公众号首图"><small>02</small><b>公众号首图</b><span>推文 / 活动 / 品牌资讯</span></button>
          <button class="task t3" data-type="task" data-value="活动宣传海报"><small>03</small><b>活动宣传海报</b><span>校园 / 快闪 / 招新</span></button>
          <button class="task t4" data-type="task" data-value="产品介绍图"><small>04</small><b>产品介绍图</b><span>卖点 / 私域 / 电商</span></button>
        </div>
        <div class="note"><b>任务会影响生成策略</b><p>不同物料对应不同标题大小、图文比例、按钮位置和转化文案。</p></div>
        <nav><button class="secondary" onclick="goTo(3)">返回</button><button class="primary small" onclick="nextWithCheck(5,'task')">下一步</button></nav>
      </div>
    </section>

    <section class="screen" id="screen-5">
      <div class="inner">
        <p class="eyebrow">04 / VISUAL STYLE</p>
        <h2>选择视觉风格板</h2>
        <p class="desc">使用更像艺术作品集的Moodboard：颜色、形状、留白和节奏共同决定最后的视觉气质。</p>
        <div class="mood-gallery">
          <button class="mood m1" data-type="style" data-value="清新治愈"><i></i><b>清新治愈</b><strong>SOFT LIFE</strong><span>柔和 / 留白 / 轻盈</span></button>
          <button class="mood m2" data-type="style" data-value="高级极简"><i></i><b>高级极简</b><strong>LESS IS MORE</strong><span>克制 / 质感 / 专业</span></button>
          <button class="mood m3" data-type="style" data-value="活力撞色"><i></i><b>活力撞色</b><strong>WOW!</strong><span>醒目 / 年轻 / 传播</span></button>
          <button class="mood m4" data-type="style" data-value="科技商务"><i></i><b>科技商务</b><strong>AI FLOW</strong><span>秩序 / 效率 / 理性</span></button>
        </div>
        <nav><button class="secondary" onclick="goTo(4)">返回</button><button class="primary small" onclick="nextWithCheck(6,'style')">下一步</button></nav>
      </div>
    </section>

    <section class="screen" id="screen-6">
      <div class="inner">
        <p class="eyebrow">05 / PROMPT TO DESIGN</p>
        <h2>用一句话描述你的需求</h2>
        <p class="desc">把文字提示转化为视觉语言，让用户感受到AIGC从“理解”到“生成”的过程。</p>
        <div class="visual-card"><img src="assets/prompt-art.svg" alt="Prompt转视觉方案"></div>
        <div class="prompt-box"><label>你的创作需求 <em>Prompt</em></label><textarea id="promptInput" placeholder="例如：我要做一张小红书封面，主题是自律学习计划，风格清新，标题要醒目。"></textarea></div>
        <div class="tags">
          <button onclick="fillPrompt('我要做一张小红书封面，主题是自律学习计划，风格清新，标题要醒目。')">自律学习计划</button>
          <button onclick="fillPrompt('我要做一张咖啡店新品宣传海报，突出新品上市、松弛感和高级氛围。')">咖啡新品海报</button>
          <button onclick="fillPrompt('我要做一张社团招新海报，氛围年轻、有活力，适合大学生传播。')">社团招新</button>
        </div>
        <nav><button class="secondary" onclick="goTo(5)">返回</button><button class="primary small" onclick="startGenerate()">开始生成</button></nav>
      </div>
    </section>

    <section class="screen" id="screen-7">
      <div class="inner gen">
        <div class="ai-core"><b>AI</b><span class="k1">模板匹配</span><span class="k2">标题生成</span><span class="k3">版式优化</span><span class="k4">配色建议</span></div>
        <p class="eyebrow center">AIGC GENERATING</p>
        <h2>正在生成灵感方案</h2>
        <p class="desc center" id="loadingText">正在理解你的创作需求……</p>
        <div class="load"><i id="generateBar"></i></div>
        <div class="log"><div id="g1">分析用户身份与创作场景</div><div id="g2">提取主题关键词与传播平台</div><div id="g3">匹配Canva模板结构与素材方向</div><div id="g4">生成标题、副标题与配色建议</div><div id="g5">输出可编辑视觉方案</div></div>
      </div>
    </section>

    <section class="screen" id="screen-8">
      <div class="inner">
        <p class="eyebrow">06 / OUTPUT</p>
        <h2>从空白画布到完整封面</h2>
        <p class="desc">生成结果是一套“视觉方向”，包含标题、标签、画面结构、色彩氛围和转化建议。</p>
        <div class="result">
          <div class="blank"><span>Before</span><b>空白画布</b><p>没有标题、素材、配色与版式。</p></div>
          <div class="poster" id="afterPanel"><small id="posterTask">小红书封面</small><em id="posterTag">#学习 #效率 #成长</em><h3 id="posterTitle">自律学习计划</h3><p id="posterSubtitle">7天找回生活节奏</p><button onclick="showFinal()">保存方案</button></div>
        </div>
        <div class="color-strip"><i></i><i></i><i></i><i></i><i></i></div>
        <div class="note"><b>AI设计建议</b><p id="aiAdvice">建议采用大标题、高对比信息层级和清晰视觉留白，增强社媒平台首屏点击率。</p></div>
        <div class="tools"><button onclick="changeResult()">换模板</button><button onclick="changeColor()">换配色</button><button onclick="optimizeTitle()">改标题</button></div>
        <nav><button class="secondary" onclick="goTo(6)">返回</button><button class="primary small" onclick="showFinal()">生成处方卡</button></nav>
      </div>
    </section>

    <section class="screen" id="screen-9">
      <div class="inner">
        <p class="eyebrow">FINAL / SUMMARY</p>
        <h2>你的创作处方已生成</h2>
        <div class="prescription">
          <div class="pres-head"><span>Canva 可画</span><b>灵感急救处方卡</b></div>
          <p><em>创作者身份</em><strong id="finalIdentity">个人博主</strong></p>
          <p><em>创作任务</em><strong id="finalTask">小红书封面</strong></p>
          <p><em>推荐风格</em><strong id="finalStyle">清新治愈</strong></p>
          <p><em>关键词</em><strong id="finalKeywords">高效 / 清晰 / 吸睛</strong></p>
        </div>
        <div class="final-posters"><i></i><i></i><i></i></div>
        <div class="note"><b>课程作业说明</b><p>本作品通过艺术化插画、海报样机、风格板和AIGC生成动效，完整呈现了Canva可画从用户痛点到品牌转化的H5互动广告体验。</p></div>
        <div class="final-actions"><button class="primary" onclick="openCanva()">打开Canva可画</button><button class="secondary" onclick="copyReport()">复制答辩说明</button><button class="secondary" onclick="restart()">重新体验</button></div>
      </div>
    </section>

    <div class="modal" id="introModal"><div class="modal-card"><button onclick="closeModal()">×</button><p class="eyebrow">DESIGN STATEMENT</p><h2>作品设计说明</h2><p>《灵感急救站》是一款更偏艺术化表达的AIGC互动广告H5。它通过场景插画、海报墙、视觉风格板、动态生成和结果样机，让用户感受到Canva可画的创作能力，而不是只阅读文字介绍。</p><p>作品目标是提升设计感、视觉吸引力和用户点击欲望，形成“痛点代入—风格选择—AI生成—结果转化”的完整体验。</p><div><span>AIGC</span><span>H5互动广告</span><span>视觉设计</span><span>Canva可画</span></div></div></div>
    <div class="toast" id="toast">请选择后再继续</div>
  </main>
<script src="script.js"></script>
</body>
</html>
