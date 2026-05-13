const STORAGE_KEY = "lingualift-state-v1";

const ieltsWords = [
  { word: "allocate", ipa: "/ˈæləkeɪt/", meaning: "分配；拨出", tag: "Writing Task 2", example: "The city should allocate more funding to public transport." },
  { word: "beneficial", ipa: "/ˌbenɪˈfɪʃl/", meaning: "有益的", tag: "Speaking Part 3", example: "Regular exercise is beneficial for both physical and mental health." },
  { word: "coherent", ipa: "/kəʊˈhɪərənt/", meaning: "连贯的；一致的", tag: "Writing", example: "A coherent essay has clear topic sentences and logical transitions." },
  { word: "diverse", ipa: "/daɪˈvɜːs/", meaning: "多样的", tag: "Education", example: "A diverse classroom helps students understand different cultures." },
  { word: "efficient", ipa: "/ɪˈfɪʃnt/", meaning: "高效的", tag: "Technology", example: "Online booking makes the process more efficient for passengers." },
  { word: "evidence", ipa: "/ˈevɪdəns/", meaning: "证据", tag: "Academic", example: "The report provides evidence that air quality has improved." },
  { word: "implement", ipa: "/ˈɪmplɪment/", meaning: "实施；执行", tag: "Policy", example: "Governments can implement stricter rules to reduce waste." },
  { word: "significant", ipa: "/sɪɡˈnɪfɪkənt/", meaning: "显著的；重要的", tag: "Charts", example: "There was a significant increase in online sales after 2020." },
  { word: "sustainable", ipa: "/səˈsteɪnəbl/", meaning: "可持续的", tag: "Environment", example: "Many cities are investing in sustainable energy solutions." },
  { word: "valid", ipa: "/ˈvælɪd/", meaning: "有效的；合理的", tag: "Argument", example: "That is a valid point, but it needs stronger supporting examples." }
];

const dailyScenarios = [
  { title: "咖啡店点单", level: "Beginner", lines: ["Could I have a latte, please?", "Would you like it hot or iced?", "Iced, please. Could you make it less sweet?"], focus: "礼貌请求、冷热饮选择、少糖表达" },
  { title: "问路与交通", level: "Beginner", lines: ["Excuse me, how can I get to the subway station?", "Go straight for two blocks and turn left.", "Is it within walking distance?"], focus: "方向、距离、公共交通" },
  { title: "看医生", level: "Intermediate", lines: ["I have had a sore throat since yesterday.", "Do you have a fever or a cough?", "A mild cough, but no fever."], focus: "症状描述、时间表达" },
  { title: "租房沟通", level: "Intermediate", lines: ["Is the apartment furnished?", "The rent includes water, but electricity is separate.", "Could I schedule a viewing this weekend?"], focus: "房屋设施、费用、预约" }
];

const businessScenarios = [
  { title: "会议开场", level: "Beginner", lines: ["Thanks for joining today's meeting.", "Let's start with a quick project update.", "Could you share the latest timeline?"], focus: "会议流程、请求更新" },
  { title: "商务邮件跟进", level: "Intermediate", lines: ["I am writing to follow up on our proposal.", "Please let me know if you have any questions.", "We look forward to your feedback."], focus: "邮件目的、礼貌收尾" },
  { title: "客户需求确认", level: "Intermediate", lines: ["Could you clarify your main priority for this quarter?", "Our team can prepare two options by Friday.", "That sounds reasonable. Let's review them next week."], focus: "需求澄清、交付承诺" },
  { title: "谈判与让步", level: "Intermediate", lines: ["We can offer a discount for a longer contract.", "The price is still above our budget.", "If we adjust the scope, we may find a workable solution."], focus: "价格谈判、条件让步" }
];

const readingSources = [
  { name: "GamesIndustry.biz News", url: "https://www.gamesindustry.biz/news", area: "游戏行业", task: "记录一条公司、平台或发行趋势，并用 3 句话复述新闻影响。" },
  { name: "TechCrunch Startups", url: "https://techcrunch.com/category/startups/", area: "科技创业", task: "摘录融资、产品或商业模式关键词，判断该创业公司的目标用户。" },
  { name: "TechCrunch Apps", url: "https://techcrunch.com/category/apps/", area: "应用产品", task: "总结新功能解决了什么用户问题，并写出 5 个产品英语词汇。" },
  { name: "SCMP Tech", url: "https://www.scmp.com/tech", area: "中国科技大厂", task: "关注中国科技公司的战略、监管或 AI 动态，完成中英双语摘要。" }
];

const defaultState = {
  user: null,
  learnedWords: [],
  practiceCount: 0,
  dailyGoal: 8,
  summaries: {}
};

let state = loadState();

function loadState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return { ...defaultState };
  try {
    return { ...defaultState, ...JSON.parse(raw) };
  } catch {
    return { ...defaultState };
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function speak(text) {
  if (!("speechSynthesis" in window)) {
    alert("当前浏览器不支持语音朗读，请使用 Chrome、Edge 或 Safari。 ");
    return;
  }
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  utterance.rate = 0.88;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
  state.practiceCount += 1;
  saveState();
  renderProgress();
  renderTodayReport();
}

function renderAuth() {
  const panel = document.querySelector("#auth-panel");
  if (!state.user) {
    panel.innerHTML = '<button class="button small" id="login-button" type="button">登录</button>';
    document.querySelector("#login-button").addEventListener("click", () => document.querySelector("#auth-dialog").showModal());
    return;
  }
  panel.innerHTML = `
    <span class="user-pill">Hi, ${state.user.name}</span>
    <button class="button small ghost" id="logout-button" type="button">登出</button>
  `;
  document.querySelector("#logout-button").addEventListener("click", () => {
    state.user = null;
    saveState();
    renderAuth();
  });
}

function renderVocab() {
  const stats = document.querySelector("#vocab-stats");
  const learned = state.learnedWords.length;
  const unlearned = ieltsWords.length - learned;
  stats.innerHTML = `
    <div><strong>${learned}</strong><span>已学单词</span></div>
    <div><strong>${unlearned}</strong><span>未学单词</span></div>
    <div><strong>${state.dailyGoal}</strong><span>每日目标</span></div>
  `;

  document.querySelector("#vocab-list").innerHTML = ieltsWords.map((item) => {
    const isLearned = state.learnedWords.includes(item.word);
    return `
      <article class="word-card ${isLearned ? "learned" : ""}">
        <div class="word-card-top">
          <span class="tag">${item.tag}</span>
          <button class="speak-button" data-speak="${item.word}" type="button">🔊</button>
        </div>
        <h3>${item.word}</h3>
        <p class="ipa">${item.ipa}</p>
        <p>${item.meaning}</p>
        <blockquote>${item.example}</blockquote>
        <button class="button full ${isLearned ? "success" : "primary"}" data-word="${item.word}" type="button">
          ${isLearned ? "已学 · 点击取消" : "标记已学"}
        </button>
      </article>
    `;
  }).join("");

  document.querySelectorAll("[data-word]").forEach((button) => {
    button.addEventListener("click", () => {
      const word = button.dataset.word;
      state.learnedWords = state.learnedWords.includes(word)
        ? state.learnedWords.filter((item) => item !== word)
        : [...state.learnedWords, word];
      saveState();
      renderVocab();
      renderProgress();
      renderTodayReport();
    });
  });

  document.querySelectorAll("[data-speak]").forEach((button) => {
    button.addEventListener("click", () => speak(button.dataset.speak));
  });
}

function scenarioCard(item) {
  const sentence = item.lines.join(" ");
  return `
    <article class="scenario-card">
      <div class="scenario-meta"><span>${item.level}</span><span>${item.focus}</span></div>
      <h3>${item.title}</h3>
      <ol>${item.lines.map((line) => `<li>${line}</li>`).join("")}</ol>
      <button class="button primary full" data-scenario="${sentence}" type="button">播放并跟读</button>
    </article>
  `;
}

function renderScenarios() {
  document.querySelector("#daily-scenarios").innerHTML = dailyScenarios.map(scenarioCard).join("");
  document.querySelector("#business-scenarios").innerHTML = businessScenarios.map(scenarioCard).join("");
  document.querySelectorAll("[data-scenario]").forEach((button) => {
    button.addEventListener("click", () => speak(button.dataset.scenario));
  });
}

function renderReadingSources() {
  document.querySelector("#reading-sources").innerHTML = readingSources.map((source) => `
    <article class="reading-card">
      <span class="tag">${source.area}</span>
      <h3>${source.name}</h3>
      <p>${source.task}</p>
      <a class="button ghost full" href="${source.url}" target="_blank" rel="noreferrer">打开资讯源</a>
    </article>
  `).join("");
}

function completedTasks() {
  const learnedTask = state.learnedWords.length > 0 ? 1 : 0;
  const practiceTask = state.practiceCount > 0 ? 1 : 0;
  const summaryTask = state.summaries[todayKey()] ? 1 : 0;
  return learnedTask + practiceTask + summaryTask;
}

function renderProgress() {
  const count = completedTasks();
  const percent = Math.round((count / 3) * 100);
  document.querySelector("#hero-progress").style.width = `${percent}%`;
  document.querySelector("#hero-progress-label").textContent = `完成 ${count}/3 项学习任务`;
  document.querySelector("#hero-plan").textContent = `${state.dailyGoal} 个雅思词汇 · 2 个对话场景 · 15 分钟阅读`;
}

function renderTodayReport() {
  const todaySummary = state.summaries[todayKey()] || "尚未填写今日总结。";
  document.querySelector("#today-report").innerHTML = `
    <div><strong>${state.learnedWords.length}</strong><span>累计已学雅思词汇</span></div>
    <div><strong>${state.practiceCount}</strong><span>累计发音练习次数</span></div>
    <div><strong>${completedTasks()}/3</strong><span>今日任务完成</span></div>
    <p>${todaySummary}</p>
  `;
  document.querySelector("#summary-text").value = state.summaries[todayKey()] || "";
}

function bindForms() {
  document.querySelector("#login-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    state.user = { name: form.get("username"), email: form.get("email") };
    saveState();
    document.querySelector("#auth-dialog").close();
    renderAuth();
  });

  document.querySelector("#daily-goal-form").addEventListener("submit", (event) => {
    event.preventDefault();
    state.dailyGoal = Number(document.querySelector("#daily-goal").value) || 8;
    saveState();
    document.querySelector("#goal-feedback").textContent = "今日背诵目标已保存。";
    renderVocab();
    renderProgress();
  });

  document.querySelector("#summary-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const text = document.querySelector("#summary-text").value.trim();
    if (!text) {
      document.querySelector("#summary-feedback").textContent = "请先输入今日总结。";
      return;
    }
    state.summaries[todayKey()] = text;
    saveState();
    document.querySelector("#summary-feedback").textContent = "今日总结已保存。";
    renderProgress();
    renderTodayReport();
  });

  const navToggle = document.querySelector(".nav-toggle");
  navToggle.addEventListener("click", () => {
    const links = document.querySelector("#nav-links");
    const isOpen = links.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

function init() {
  document.querySelector("#daily-goal").value = state.dailyGoal;
  renderAuth();
  renderVocab();
  renderScenarios();
  renderReadingSources();
  renderProgress();
  renderTodayReport();
  bindForms();
}

init();
