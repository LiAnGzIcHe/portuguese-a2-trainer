const longSentences = [
  {
    level: "A2 · daily routine",
    text: "Normalmente tomo o pequeno-almoço às oito e depois vou para a universidade.",
    zh: "训练目标：用完整长句描述日常安排。",
    hint: "normalmente 有 mente 副重音；pequeno-almoço 注意弱读 e/o。"
  },
  {
    level: "A2 · restaurant",
    text: "Queria reservar uma mesa para duas pessoas hoje à noite.",
    zh: "训练目标：礼貌提出预订请求。",
    hint: "reservar 末音节重音；pessoas 中间 e/o 不要读得太重。"
  },
  {
    level: "A2 · field movement",
    text: "Preciso de chegar ao ponto de encontro antes das nove.",
    zh: "训练目标：说明移动目标和时间限制。",
    hint: "ponto de encontro 是一个常用地点语块；antes das 连读要轻。"
  }
];

const dailyScenes = window.dailySentenceScenes || [];
const allDailySentences = dailyScenes.flatMap((scene) =>
  scene.sentences.map(([text, translation]) => ({
    sceneId: scene.id,
    sceneTitle: scene.title,
    sceneZh: scene.zh,
    text,
    translation,
    level: `A1-A2 · ${scene.title}`,
    zh: `翻译：${translation}`,
    hint: `场景：${scene.zh}`
  }))
);

const scenarioProfiles = [
  {
    id: "route",
    keywords: ["车站", "路线", "方向", "路", "地铁", "火车", "公交", "站", "地址"],
    goal: "快速确认地点、方向和时间限制。",
    templates: [
      "Desculpe, onde fica {place}?",
      "Pode repetir mais devagar?",
      "Tenho de chegar lá antes das {time}.",
      "É longe daqui?"
    ],
    slots: {
      place: ["a estação", "a saída", "a paragem", "a rua principal", "o ponto de encontro"],
      time: ["oito", "nove", "dez", "meio-dia", "seis e meia"]
    }
  },
  {
    id: "contact",
    keywords: ["联系人", "身份", "大厅", "酒店", "接头", "确认", "见面", "前台"],
    goal: "礼貌确认联系人身份，并请求对方确认信息。",
    templates: [
      "Desculpe, procuro {person}.",
      "Pode confirmar o nome, por favor?",
      "Tenho uma mensagem para {person}.",
      "Podemos falar aqui?"
    ],
    slots: {
      person: ["o senhor Silva", "a senhora Costa", "o meu colega", "a rececionista", "o motorista"]
    }
  },
  {
    id: "document",
    keywords: ["文件", "证件", "护照", "材料", "钥匙", "包", "票", "交接"],
    goal: "在低调场景里确认物品、请求检查并保持礼貌。",
    templates: [
      "Preciso de {object}, por favor.",
      "Pode verificar isto agora?",
      "Este documento é meu.",
      "Tenho de entregar {object} hoje."
    ],
    slots: {
      object: ["o documento", "a chave", "o bilhete", "a mala", "o telemóvel"]
    }
  },
  {
    id: "restaurant",
    keywords: ["餐厅", "咖啡", "吃饭", "预订", "菜单", "付款"],
    goal: "用短句快速完成点餐、确认和付款。",
    templates: [
      "Queria {item}, por favor.",
      "Pode trazer a conta?",
      "Tenho uma reserva para {time}.",
      "A mesa é para duas pessoas."
    ],
    slots: {
      item: ["um café", "água sem gás", "a sopa", "o menu", "a conta"],
      time: ["oito", "nove", "meio-dia", "hoje à noite"]
    }
  },
  {
    id: "default",
    keywords: [],
    goal: "在压力情境中快速提出请求、确认信息并要求重复。",
    templates: [
      "Desculpe, pode ajudar-me?",
      "Pode repetir mais devagar?",
      "Preciso de confirmar {object}.",
      "Tenho de falar com {person}."
    ],
    slots: {
      object: ["a morada", "o número", "o nome", "a hora", "o documento"],
      person: ["o meu colega", "a rececionista", "o motorista", "a senhora"]
    }
  }
];

const drillScenario = document.querySelector("#drillScenario");
const drillInputPanel = document.querySelector("#drillInputPanel");
const drillSlots = document.querySelector("#drillSlots");
const drillSentenceList = document.querySelector("#drillSentenceList");
const sentenceLevel = document.querySelector("#sentenceLevel");
const sentenceText = document.querySelector("#sentenceText");
const sentenceZh = document.querySelector("#sentenceZh");
const sentenceHint = document.querySelector("#sentenceHint");
const shortMode = document.querySelector("#shortMode");
const longMode = document.querySelector("#longMode");
const generateButton = document.querySelector("#generateSentence");
const variantButton = document.querySelector("#generateVariant");

let sentenceMode = "short";
let activeProfile = scenarioProfiles[0];
let drillItems = [];
let featuredTranslation = "";

function pick(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function selectProfile(scene) {
  const normalized = scene.toLowerCase();
  return scenarioProfiles.find((profile) => profile.keywords.some((keyword) => normalized.includes(keyword))) || scenarioProfiles.at(-1);
}

function selectDailyScene(scene) {
  const normalized = scene.toLowerCase();
  return dailyScenes.find((dailyScene) => dailyScene.keywords.some((keyword) => normalized.includes(keyword))) || null;
}

function pickUnique(items, count, offset = 0) {
  const pool = [...items];
  const selected = [];
  while (pool.length && selected.length < count) {
    const index = (Math.floor(Math.random() * pool.length) + offset) % pool.length;
    selected.push(pool.splice(index, 1)[0]);
  }
  return selected;
}

function fillTemplate(template, profile) {
  const usedSlots = {};
  let text = template;
  Object.entries(profile.slots).forEach(([slot, values]) => {
    if (text.includes(`{${slot}}`)) {
      usedSlots[slot] = pick(values);
      text = text.replaceAll(`{${slot}}`, usedSlots[slot]);
    }
  });
  return { text, pattern: template, slots: usedSlots };
}

function buildDrillItem(profile, index) {
  const template = profile.templates[index % profile.templates.length];
  const item = fillTemplate(template, profile);
  return {
    ...item,
    level: `A2 · pattern drill · ${profile.id}`,
    zh: `训练目标：${profile.goal}`,
    hint: `Pattern: ${item.pattern}`
  };
}

function buildBankItem(sentence, index) {
  return {
    ...sentence,
    level: `A1-A2 · scene bank · ${sentence.sceneId}`,
    zh: `翻译：${sentence.translation}`,
    hint: `本地句库：${sentence.sceneZh} · 句型替换 ${index + 1}`,
    slots: {
      scene: sentence.sceneZh
    }
  };
}

function cleanTranslation(item) {
  return item.translation || item.zh.replace("翻译：", "").replace("训练目标：", "");
}

function hideFeaturedTranslation() {
  sentenceZh.classList.remove("is-revealed");
  sentenceZh.textContent = "░░░░░░░░░░░░░░░";
  sentenceZh.setAttribute("aria-label", "点击查看中文翻译");
}

function revealFeaturedTranslation() {
  sentenceZh.classList.add("is-revealed");
  sentenceZh.textContent = featuredTranslation;
  sentenceZh.setAttribute("aria-label", featuredTranslation);
}

function setFeaturedSentence(item) {
  sentenceLevel.textContent = item.level;
  sentenceText.textContent = item.text;
  featuredTranslation = cleanTranslation(item);
  hideFeaturedTranslation();
  sentenceHint.textContent = item.hint;
  renderSlots(item.slots || {});
}

function generateBaseDrill() {
  const sceneText = drillScenario.value.trim();
  const dailyScene = selectDailyScene(sceneText);
  activeProfile = selectProfile(sceneText);
  if (dailyScene) {
    drillItems = pickUnique(
      dailyScene.sentences.map(([text, translation]) => ({
        sceneId: dailyScene.id,
        sceneTitle: dailyScene.title,
        sceneZh: dailyScene.zh,
        text,
        translation
      })),
      2
    ).map(buildBankItem);
  } else {
    drillItems = [buildDrillItem(activeProfile, 0), buildDrillItem(activeProfile, 1)];
  }
  setFeaturedSentence(drillItems[0]);
  renderDrillList();
}

function generateVariant() {
  if (!drillItems.length) {
    generateBaseDrill();
    return;
  }
  const usedTexts = new Set(drillItems.map((item) => item.text));
  const currentScene = dailyScenes.find((scene) => scene.id === drillItems.at(-1)?.sceneId);
  const candidatePool = currentScene
    ? currentScene.sentences
        .map(([text, translation]) => ({ sceneId: currentScene.id, sceneTitle: currentScene.title, sceneZh: currentScene.zh, text, translation }))
        .filter((sentence) => !usedTexts.has(sentence.text))
    : [];
  const next = candidatePool.length ? buildBankItem(pick(candidatePool), drillItems.length) : buildDrillItem(activeProfile, drillItems.length);
  drillItems.push(next);
  setFeaturedSentence(next);
  renderDrillList();
}

function makeLongSentence() {
  const richDailyItems = allDailySentences.filter((item) => item.text.length > 42);
  const item = pick(richDailyItems.length ? richDailyItems : longSentences);
  sentenceLevel.textContent = item.level;
  sentenceText.textContent = item.text;
  featuredTranslation = cleanTranslation(item);
  hideFeaturedTranslation();
  sentenceHint.textContent = item.hint;
  drillSlots.innerHTML = "";
  drillSentenceList.innerHTML = "";
}

function renderSlots(usedSlots) {
  drillSlots.innerHTML = "";
  Object.entries(usedSlots).forEach(([slot, value]) => {
    const tag = document.createElement("span");
    tag.textContent = `${slot}: ${value}`;
    drillSlots.appendChild(tag);
  });
}

function renderDrillList() {
  drillSentenceList.innerHTML = "";
  drillItems.forEach((item, index) => {
    const card = document.createElement("article");
    card.className = "drill-line-card";
    card.innerHTML = `
      <span>${String(index + 1).padStart(2, "0")}</span>
      <div>
        <p class="portuguese">${item.text}</p>
        <small class="translation is-masked" data-translation="${cleanTranslation(item)}">░░░░░░░░░░░░░░░</small>
      </div>
      <div class="drill-mini-actions">
        <button type="button" class="translate-button" aria-label="显示句子 ${index + 1} 翻译">译</button>
        <button type="button" class="read-button" aria-label="播放句子 ${index + 1}">▶</button>
      </div>
    `;
    card.querySelector(".read-button").addEventListener("click", () => speak(item.text));
    card.querySelector(".translate-button").addEventListener("click", () => {
      const translation = card.querySelector(".translation");
      translation.classList.toggle("is-masked");
      translation.textContent = translation.classList.contains("is-masked") ? "░░░░░░░░░░░░░░░" : translation.dataset.translation;
    });
    card.addEventListener("click", (event) => {
      if (!event.target.closest("button")) {
        setFeaturedSentence(item);
      }
    });
    drillSentenceList.appendChild(card);
  });
}

shortMode.addEventListener("click", () => {
  sentenceMode = "short";
  shortMode.classList.add("selected");
  longMode.classList.remove("selected");
  drillInputPanel.hidden = false;
  variantButton.hidden = false;
  generateButton.textContent = "根据场景生成两个短句";
  generateBaseDrill();
});

longMode.addEventListener("click", () => {
  sentenceMode = "long";
  longMode.classList.add("selected");
  shortMode.classList.remove("selected");
  drillInputPanel.hidden = true;
  variantButton.hidden = true;
  generateButton.textContent = "随机生成";
  makeLongSentence();
});

generateButton.addEventListener("click", () => {
  if (sentenceMode === "short") {
    generateBaseDrill();
  } else {
    makeLongSentence();
  }
});

variantButton.addEventListener("click", generateVariant);
document.querySelector("#playSentence").addEventListener("click", () => speak(sentenceText.textContent));
document.querySelector("#playSlowSentence").addEventListener("click", () => speak(sentenceText.textContent, 0.58));
sentenceZh.addEventListener("click", revealFeaturedTranslation);
sentenceZh.addEventListener("keydown", (event) => {
  if (event.code === "Space" || event.code === "Enter") {
    event.preventDefault();
    revealFeaturedTranslation();
  }
});

generateBaseDrill();
