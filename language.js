const translations = {
  zh: {
    "nav.alphabet": "字母",
    "nav.rules": "规律",
    "nav.stress": "重音",
    "nav.voice": "语音",
    "nav.sentences": "句子",
    "hero.eyebrow": "Portugal standard · A0-A2 · pronunciation on every Portuguese item",
    "hero.title": "把欧洲葡语先听清，再开口。",
    "hero.lead": "一个本地可打开的 A2 以下学习网页：字母发音、重音规则、欧洲葡语语音框架、短句和长句随机生成。",
    "hero.demo": "听示范",
    "hero.start": "开始生成句子",
    "alphabet.title": "字母发音：先学字母名，再学词内声音",
    "alphabet.copy": "欧洲葡语里，字母名和词内读音不是一回事。每个字母都有独立配音入口；有授权真人音频时会优先播放本地音频，否则回退到单字母名 pt-PT 系统语音。",
    "rules.title": "欧洲葡语语音课程地图",
    "rules.copy": "把原来的 Módulo 1.5、Módulo 2 和 Módulo 3 合并为纵向课程：每章一个板块，每个板块内部横向滚动复查，所有例词和训练句都能听 pt-PT。",
    "drill.title": "Pattern Drill：结构替换训练",
    "drill.copy": "输入场景，先得到一个可复用句型。切换例句换结构；替换词只换主语、地点或名词。",
    "drill.input": "输入场景",
    "drill.switch": "切换例句",
    "drill.replace": "替换词",
    "drill.play": "▶ 读",
    "drill.slow": "◷ 慢速"
  },
  en: {
    "nav.alphabet": "Letters",
    "nav.rules": "Rules",
    "nav.stress": "Stress",
    "nav.voice": "Voice",
    "nav.sentences": "Drill",
    "hero.eyebrow": "Portugal standard · A0-A2 · pronunciation on every Portuguese item",
    "hero.title": "Hear European Portuguese first. Then speak.",
    "hero.lead": "A pronunciation-first A0-A2 trainer for letters, stress, sound rules, and structure drills.",
    "hero.demo": "Play demo",
    "hero.start": "Start drill",
    "alphabet.title": "Letters: name first, word sound next",
    "alphabet.copy": "In European Portuguese, letter names and word sounds are different. Each letter has a separate playback entry and falls back to a strict pt-PT system voice.",
    "rules.title": "European Portuguese Sound Map",
    "rules.copy": "Chapters 2-5 are arranged as vertical study panels. Each panel keeps horizontal review cards and pt-PT playback.",
    "drill.title": "Pattern Drill: structure substitution",
    "drill.copy": "Enter a scene. Get one reusable sentence pattern. Switch examples for a new structure; replace words to keep the structure and change only slots.",
    "drill.input": "Scene",
    "drill.switch": "Switch example",
    "drill.replace": "Replace words",
    "drill.play": "▶ Play",
    "drill.slow": "◷ Slow"
  }
};

const languageState = {
  current: localStorage.getItem("ptTrainerLanguage") || "zh"
};

function applyLanguage(lang) {
  languageState.current = lang;
  localStorage.setItem("ptTrainerLanguage", lang);
  document.documentElement.lang = lang === "en" ? "en" : "zh-CN";
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    element.textContent = translations[lang][key] || translations.zh[key] || element.textContent;
  });

  const toggle = document.querySelector("#languageToggle");
  if (toggle) toggle.textContent = lang === "en" ? "中文" : "EN";
}

document.addEventListener("DOMContentLoaded", () => {
  applyLanguage(languageState.current);
  document.querySelector("#languageToggle")?.addEventListener("click", () => {
    applyLanguage(languageState.current === "en" ? "zh" : "en");
  });
});
