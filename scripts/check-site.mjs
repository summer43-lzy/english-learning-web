import { readFile } from "node:fs/promises";

const requiredFiles = ["index.html", "styles.css", "app.js", "data/ielts-vocabulary.js", "data/ielts-vocabulary.json", "data/business-scenarios.js", "db/user-learning-schema.sql"];
const requiredText = [
  "账号管理",
  "雅思词汇",
  "今日学习",
  "学习总结",
  "生活对话",
  "商务对话",
  "词库总量",
  "GamesIndustry.biz News",
  "TechCrunch Startups",
  "TechCrunch Apps",
  "SCMP Tech",
  "fetchIeltsVocabulary",
  "saveLearningProgress",
  "user_learning_progress"
];

for (const file of requiredFiles) {
  await readFile(file, "utf8");
}

const html = await readFile("index.html", "utf8");
const app = await readFile("app.js", "utf8");
const ieltsData = await readFile("data/ielts-vocabulary.js", "utf8");
const businessData = await readFile("data/business-scenarios.js", "utf8");
const schema = await readFile("db/user-learning-schema.sql", "utf8");
const vocabularyPayload = JSON.parse(await readFile("data/ielts-vocabulary.json", "utf8"));
const combined = `${html}\n${app}\n${ieltsData}\n${businessData}\n${schema}`;
const missing = requiredText.filter((text) => !combined.includes(text));

if (missing.length > 0) {
  console.error(`Missing expected content: ${missing.join(", ")}`);
  process.exit(1);
}

if (!Array.isArray(vocabularyPayload.words) || vocabularyPayload.words.length !== 1000) {
  console.error(`Expected 1000 IELTS vocabulary words, got ${vocabularyPayload.words?.length ?? 0}.`);
  process.exit(1);
}

console.log("Site content check passed.");
