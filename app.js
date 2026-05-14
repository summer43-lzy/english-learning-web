import { ieltsWords } from "./data/ielts-vocabulary.js";
import { businessScenarios } from "./data/business-scenarios.js";

const STORAGE_KEY = "lingualift-state-v1";

const dailyScenarios = [
  { title: "点餐", level: "Beginner", goal: "礼貌下单、选择冷热、提出少糖等偏好。", lines: ["Could I have a latte, please?", "Would you like it hot or iced?", "Iced, please. Could you make it less sweet?"] },
  { title: "问路", level: "Beginner", goal: "询问路线、理解方向、确认步行距离。", lines: ["Excuse me, how can I get to the subway station?", "Go straight for two blocks and turn left.", "Is it within walking distance?"] },
  { title: "看医生", level: "Intermediate", goal: "描述症状、说明持续时间、回答医生追问。", lines: ["I have had a sore throat since yesterday.", "Do you have a fever or a cough?", "A mild cough, but no fever."] },
  { title: "租房", level: "Intermediate", goal: "确认家具、费用范围和看房时间。", lines: ["Is the apartment furnished?", "The rent includes water, but electricity is separate.", "Could I schedule a viewing this weekend?"] }
];

const readingSources = [
  {
    name: "GamesIndustry.biz News",
    url: "https://www.gamesindustry.biz/news",
    feedUrl: "https://www.gamesindustry.biz/feed",
    area: "游戏行业",
    task: "关注公司、平台、发行与商业模式变化，用 3 句话复述影响。",
    items: [
      ["发行策略", "观察新游上线窗口、首发平台和订阅服务安排，判断发行方如何扩大触达。"],
      ["工作室动态", "留意收购、裁员或新团队成立，归纳对人才流动与项目排期的影响。"],
      ["主机平台", "比较 PlayStation、Xbox、Nintendo 或 PC 平台政策变化，提炼平台竞争点。"],
      ["移动游戏", "关注内购、广告变现和地区增长，记录一个 monetization 相关表达。"],
      ["独立游戏", "总结小团队如何通过发行商、展会或社区获得曝光。"],
      ["监管合规", "阅读隐私、年龄分级或概率披露相关信息，提炼合规关键词。"],
      ["财报表现", "记录收入、利润、用户数等指标变化，用英文描述上升或下降。"],
      ["电竞赛事", "关注赛事合作、赞助或观众数据，判断商业价值来源。"],
      ["技术工具", "了解引擎、AI 工具或云服务如何影响研发效率。"],
      ["市场趋势", "综合当天热门报道，写出一个对游戏行业未来 6 个月的预测。"]
    ]
  },
  {
    name: "TechCrunch Startups",
    url: "https://techcrunch.com/category/startups/",
    feedUrl: "https://techcrunch.com/category/startups/feed/",
    area: "科技创业",
    task: "摘录融资、产品或商业模式关键词，判断创业公司的目标用户。",
    items: [
      ["融资新闻", "记录融资轮次、金额和领投方，判断资本看好的细分赛道。"],
      ["AI 创业", "概括产品使用的 AI 能力，说明它替代或增强了哪个工作流程。"],
      ["企业软件", "关注面向 B2B 的效率工具，提炼 buyer、workflow、ROI 等词汇。"],
      ["消费应用", "判断产品如何获取用户，以及留存机制是否清晰。"],
      ["金融科技", "总结支付、风控或财富管理创新，并记录 compliance 相关表达。"],
      ["气候科技", "提炼减排、能源或供应链优化方向，说明商业可持续性。"],
      ["医疗健康", "关注数据、诊断或远程护理，区分 patient 与 provider 视角。"],
      ["出海公司", "记录目标地区、渠道策略和本地化挑战。"],
      ["创始人观点", "摘录一句关于市场、团队或产品判断的英文表达并复述。"],
      ["失败复盘", "总结公司关闭或转型原因，学习 runway、pivot、traction 等词。"]
    ]
  },
  {
    name: "TechCrunch Apps",
    url: "https://techcrunch.com/category/apps/",
    feedUrl: "https://techcrunch.com/category/apps/feed/",
    area: "应用产品",
    task: "总结新功能解决了什么用户问题，并写出 5 个产品英语词汇。",
    items: [
      ["社交应用", "关注推荐、创作者工具或私信功能，判断对用户互动的影响。"],
      ["生产力工具", "提炼新功能如何减少步骤、自动化任务或提升协作。"],
      ["AI 功能", "记录 app 如何整合聊天、生成内容或个性化推荐。"],
      ["订阅定价", "比较免费、会员和高级功能边界，学习 pricing tier 表达。"],
      ["应用商店", "关注审核、分发和抽成政策变化，归纳平台规则影响。"],
      ["隐私安全", "总结权限、数据加密或儿童保护相关更新。"],
      ["短视频与内容", "观察内容分发、创作者变现和社区治理变化。"],
      ["地图出行", "提炼路线、预订或本地服务功能背后的用户需求。"],
      ["健康应用", "记录习惯追踪、睡眠、运动或心理健康产品表达。"],
      ["产品复盘", "选择一条报道，用 problem-solution-impact 结构写三句摘要。"]
    ]
  },
  {
    name: "SCMP Tech",
    url: "https://www.scmp.com/tech",
    feedUrl: "https://www.scmp.com/rss/36/feed",
    area: "中国科技大厂",
    task: "关注中国科技公司的战略、监管或 AI 动态，完成中英双语摘要。",
    items: [
      ["AI 大模型", "记录模型发布、开源策略或应用落地，比较中英文关键词。"],
      ["电商平台", "关注价格战、跨境业务或商家工具，判断增长压力。"],
      ["芯片供应链", "提炼出口管制、国产替代或制造能力相关表达。"],
      ["智能汽车", "总结自动驾驶、车载软件或车企合作的最新动向。"],
      ["云计算", "关注企业客户、算力需求和 AI 基础设施投入。"],
      ["短视频平台", "记录内容治理、直播电商或海外市场变化。"],
      ["监管政策", "归纳数据安全、反垄断或平台治理对公司的影响。"],
      ["硬件新品", "概括手机、可穿戴或消费电子新品的差异化卖点。"],
      ["资本市场", "关注上市、回购或估值变化，学习 market sentiment 表达。"],
      ["全球竞争", "比较中国科技公司与海外对手在产品、市场和政策上的差异。"]
    ]
  }
];

const defaultState = {
  user: null,
  accounts: {},
  pendingOtp: null,
  learnedWords: [],
  practiceCount: 0,
  dailyGoal: 8,
  summaries: {},
  businessPracticed: []
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
  if (state.user && state.accounts?.[state.user.phone]) {
    state.accounts[state.user.phone].learningData = {
      learnedWords: state.learnedWords,
      summaries: state.summaries,
      practiceCount: state.practiceCount,
      businessPracticed: state.businessPracticed
    };
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function normalizePhone(phone = "") {
  return String(phone).replace(/\D/g, "");
}

function isValidPhone(phone) {
  return /^1[3-9]\d{9}$/.test(phone);
}

function generateCode() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

function generateAccountId(phone) {
  const suffix = phone.slice(-4);
  const randomPart = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `LL-${new Date().getFullYear()}-${suffix}-${randomPart}`;
}

function setAuthFeedback(message, type = "info") {
  const feedback = document.querySelector("#auth-feedback");
  if (!feedback) return;
  feedback.textContent = message;
  feedback.dataset.type = type;
}

function accountCount() {
  return Object.keys(state.accounts || {}).length;
}

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function todayLabel() {
  return new Intl.DateTimeFormat("zh-CN", { month: "long", day: "numeric" }).format(new Date());
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
    panel.innerHTML = `
      <span class="account-count">${accountCount()} 个本机账号</span>
      <button class="button small" id="login-button" type="button">注册 / 登录</button>
    `;
    document.querySelector("#login-button").addEventListener("click", () => document.querySelector("#auth-dialog").showModal());
    return;
  }
  panel.innerHTML = `
    <span class="user-pill" title="账号ID：${state.user.accountId}">Hi, ${state.user.nickname}</span>
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
  const learned = state.learnedWords.filter((word) => ieltsWords.some((item) => item.word === word)).length;
  const total = ieltsWords.length;
  const unlearned = total - learned;
  const completion = total === 0 ? 0 : Math.round((learned / total) * 100);
  stats.innerHTML = `
    <div><strong>${total}</strong><span>词库总量</span></div>
    <div><strong>${learned}</strong><span>已学单词</span></div>
    <div><strong>${unlearned}</strong><span>未学单词</span></div>
    <div><strong>${completion}%</strong><span>完成率</span></div>
  `;

  document.querySelector("#vocab-list").innerHTML = ieltsWords.map((item) => {
    const isLearned = state.learnedWords.includes(item.word);
    return `
      <article class="word-row ${isLearned ? "learned" : ""}">
        <div class="word-main">
          <span class="tag">${item.tag}</span>
          <div class="word-title">
            <h4>${item.word}</h4>
            <button class="speak-button" data-speak="${item.word}" type="button" aria-label="朗读 ${item.word}">🔊</button>
          </div>
          <p>${item.ipa}</p>
        </div>
        <p>${item.meaning}</p>
        <blockquote class="word-example">${item.example}</blockquote>
        <button class="button full ${isLearned ? "success" : "primary"}" data-word="${item.word}" type="button">
          ${isLearned ? "已学 · 取消" : "标记已学"}
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

function scenarioRow(item) {
  const sentence = item.lines.join(" ");
  return `
    <article class="scenario-row">
      <div>
        <span class="scenario-level">${item.category || item.level}</span>
        <h4>${item.title}</h4>
        <small>${item.level}</small>
      </div>
      <p class="scenario-goal">${item.goal}</p>
      <ol class="scenario-lines">${item.lines.map((line) => `<li>${line}</li>`).join("")}</ol>
      <button class="button primary full scenario-action" data-scenario="${sentence}" data-business-title="${item.category ? item.title : ""}" type="button">播放跟读</button>
    </article>
  `;
}

function businessStatsMarkup() {
  const practiced = (state.businessPracticed || []).filter((title) => businessScenarios.some((item) => item.title === title)).length;
  const categories = new Set(businessScenarios.map((item) => item.category)).size;
  const completion = businessScenarios.length === 0 ? 0 : Math.round((practiced / businessScenarios.length) * 100);
  return `
    <div class="stats business-stats">
      <div><strong>${businessScenarios.length}</strong><span>商务场景总量</span></div>
      <div><strong>${categories}</strong><span>职场类别</span></div>
      <div><strong>${practiced}</strong><span>已跟读场景</span></div>
      <div><strong>${completion}%</strong><span>练习完成率</span></div>
    </div>
  `;
}

function renderScenarios() {
  document.querySelector("#daily-scenarios").innerHTML = dailyScenarios.map(scenarioRow).join("");
  document.querySelector("#business-scenarios").innerHTML = `${businessStatsMarkup()}${businessScenarios.map(scenarioRow).join("")}`;
  document.querySelectorAll("[data-scenario]").forEach((button) => {
    button.addEventListener("click", () => {
      state.businessPracticed = state.businessPracticed || [];
      if (button.dataset.businessTitle && !state.businessPracticed.includes(button.dataset.businessTitle)) {
        state.businessPracticed = [...state.businessPracticed, button.dataset.businessTitle];
      }
      speak(button.dataset.scenario);
      renderScenarios();
    });
  });
}

function stripHtml(text = "") {
  const template = document.createElement("template");
  template.innerHTML = text;
  return (template.content.textContent || "").replace(/\s+/g, " ").trim();
}

function summarize(text) {
  const cleanText = stripHtml(text);
  if (!cleanText) return "源站未提供摘要，请打开原文完成三句摘要。";
  return cleanText.length > 88 ? `${cleanText.slice(0, 88)}…` : cleanText;
}

function newsItemMarkup([title, summary], index) {
  return `
    <li>
      <span class="news-rank">${String(index + 1).padStart(2, "0")}</span>
      <span><strong>${title}</strong><span>${summary}</span></span>
    </li>
  `;
}

function renderReadingSources() {
  document.querySelector("#reading-sources").innerHTML = readingSources.map((source, sourceIndex) => `
    <article class="reading-card">
      <div class="reading-card-header">
        <div>
          <span class="tag">${source.area}</span>
          <h3>${source.name}</h3>
          <p>${todayLabel()} Top 10 · ${source.task}</p>
          <small class="feed-status" id="feed-status-${sourceIndex}">正在尝试读取源站今日/最新排序；失败时展示学习清单。</small>
        </div>
        <a class="button ghost" href="${source.url}" target="_blank" rel="noreferrer">打开源站</a>
      </div>
      <ol class="news-list" id="news-list-${sourceIndex}">
        ${source.items.map(newsItemMarkup).join("")}
      </ol>
    </article>
  `).join("");

  hydrateReadingFeeds();
}

async function hydrateReadingFeeds() {
  await Promise.allSettled(readingSources.map(async (source, sourceIndex) => {
    const status = document.querySelector(`#feed-status-${sourceIndex}`);
    const list = document.querySelector(`#news-list-${sourceIndex}`);
    if (!source.feedUrl || !status || !list) return;

    const proxyUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(source.feedUrl)}&count=10`;
    const response = await fetch(proxyUrl);
    if (!response.ok) throw new Error("Feed request failed");

    const payload = await response.json();
    const liveItems = (payload.items || []).slice(0, 10).map((item) => [item.title, summarize(item.description || item.content)]);
    if (liveItems.length === 0) throw new Error("Feed returned no items");

    list.innerHTML = liveItems.map(newsItemMarkup).join("");
    status.textContent = `已按源站 RSS 最新顺序更新 ${liveItems.length} 条；如需确认当日排名，请打开源站。`;
  })).then((results) => {
    results.forEach((result, sourceIndex) => {
      if (result.status === "rejected") {
        const status = document.querySelector(`#feed-status-${sourceIndex}`);
        if (status) status.textContent = "源站实时读取受限，当前展示 10 条今日阅读清单；点击源站核对实时排序。";
      }
    });
  });
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
  const learned = state.learnedWords.filter((word) => ieltsWords.some((item) => item.word === word)).length;
  const completion = Math.round((learned / ieltsWords.length) * 100);
  document.querySelector("#today-report").innerHTML = `
    <div><strong>${learned}/${ieltsWords.length}</strong><span>雅思词汇进度</span></div>
    <div><strong>${completion}%</strong><span>词汇完成率</span></div>
    <div><strong>${completedTasks()}/3</strong><span>今日任务完成</span></div>
    <p>${todaySummary}</p>
  `;
  document.querySelector("#summary-text").value = state.summaries[todayKey()] || "";
}

function bindForms() {
  document.querySelector("#send-code-button").addEventListener("click", () => {
    const phone = normalizePhone(document.querySelector("#phone").value);
    if (!isValidPhone(phone)) {
      setAuthFeedback("请输入有效的中国大陆 11 位手机号。", "error");
      return;
    }
    const code = generateCode();
    state.pendingOtp = { phone, code, expiresAt: Date.now() + 5 * 60 * 1000 };
    saveState();
    setAuthFeedback(`验证码已发送（演示码：${code}），5 分钟内有效。`, "success");
  });

  document.querySelector("#login-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const mode = form.get("auth-mode");
    const nickname = String(form.get("nickname") || "").trim();
    const phone = normalizePhone(form.get("phone"));
    const code = String(form.get("sms-code") || "").trim();
    const existingAccount = state.accounts[phone];

    if (!nickname) {
      setAuthFeedback("请先设置昵称。", "error");
      return;
    }
    if (!isValidPhone(phone)) {
      setAuthFeedback("请输入有效的中国大陆 11 位手机号。", "error");
      return;
    }
    if (!state.pendingOtp || state.pendingOtp.phone !== phone || state.pendingOtp.code !== code || state.pendingOtp.expiresAt < Date.now()) {
      setAuthFeedback("验证码不正确或已过期，请重新获取。", "error");
      return;
    }
    if (mode === "register" && existingAccount) {
      setAuthFeedback("该手机号已注册，请切换到登录。", "error");
      return;
    }
    if (mode === "login" && !existingAccount) {
      setAuthFeedback("该手机号尚未注册，请先注册。", "error");
      return;
    }

    const account = existingAccount || {
      accountId: generateAccountId(phone),
      phone,
      createdAt: new Date().toISOString(),
      learningData: { learnedWords: [], summaries: {}, practiceCount: 0, businessPracticed: [] }
    };
    account.nickname = nickname;
    account.lastLoginAt = new Date().toISOString();
    if (existingAccount?.learningData) {
      state.learnedWords = existingAccount.learningData.learnedWords || [];
      state.summaries = existingAccount.learningData.summaries || {};
      state.practiceCount = existingAccount.learningData.practiceCount || 0;
      state.businessPracticed = existingAccount.learningData.businessPracticed || [];
    }
    account.learningData = {
      learnedWords: state.learnedWords,
      summaries: state.summaries,
      practiceCount: state.practiceCount,
      businessPracticed: state.businessPracticed
    };
    state.accounts = { ...state.accounts, [phone]: account };
    state.user = { accountId: account.accountId, nickname: account.nickname, phone: account.phone };
    state.pendingOtp = null;
    saveState();
    event.currentTarget.reset();
    document.querySelector("#auth-dialog").close();
    renderAuth();
    renderVocab();
    renderScenarios();
    renderProgress();
    renderTodayReport();
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
