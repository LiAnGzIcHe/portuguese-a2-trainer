const structureTemplates = [
  {
    id: "transport-to-place",
    keywords: ["公交", "车", "学校", "大学", "去", "交通", "地铁", "火车"],
    pattern: "Vou de {transport} para {place}.",
    translation: "我乘{transportZh}去{placeZh}。",
    slots: {
      transport: [
        ["autocarro", "公交车"],
        ["metro", "地铁"],
        ["comboio", "火车"],
        ["táxi", "出租车"],
        ["bicicleta", "自行车"]
      ],
      place: [
        ["a universidade", "大学"],
        ["a escola", "学校"],
        ["o centro", "市中心"],
        ["a estação", "车站"],
        ["o trabalho", "公司"]
      ]
    }
  },
  {
    id: "catch-near-place",
    keywords: ["公交", "站", "附近", "家", "上车", "坐车"],
    pattern: "Apanho {vehicle} perto de {place}.",
    translation: "我在{placeZh}附近坐{vehicleZh}。",
    slots: {
      vehicle: [
        ["o autocarro", "公交车"],
        ["o metro", "地铁"],
        ["o comboio", "火车"],
        ["um táxi", "出租车"]
      ],
      place: [
        ["casa", "家"],
        ["a escola", "学校"],
        ["o hotel", "酒店"],
        ["a estação", "车站"]
      ]
    }
  },
  {
    id: "want-service",
    keywords: ["餐厅", "咖啡", "购物", "酒店", "点餐", "预订", "付款"],
    pattern: "Queria {object}, por favor.",
    translation: "我想要{objectZh}，谢谢。",
    slots: {
      object: [
        ["um café", "一杯咖啡"],
        ["uma mesa", "一张桌子"],
        ["a conta", "账单"],
        ["um quarto", "一个房间"],
        ["uma tosta", "一份吐司"]
      ]
    }
  },
  {
    id: "need-object",
    keywords: ["文件", "证件", "材料", "包", "钥匙", "需要", "带"],
    pattern: "Preciso de {object} agora.",
    translation: "我现在需要{objectZh}。",
    slots: {
      object: [
        ["o documento", "文件"],
        ["a chave", "钥匙"],
        ["a mala", "包"],
        ["o passaporte", "护照"],
        ["o bilhete", "票"]
      ]
    }
  },
  {
    id: "identity",
    keywords: ["名字", "介绍", "认识", "身份", "联系", "人"],
    pattern: "{subject} chama-se {name}.",
    translation: "{subjectZh}叫{nameZh}。",
    slots: {
      subject: [
        ["Ele", "他"],
        ["Ela", "她"],
        ["O meu colega", "我的同事"],
        ["A professora", "老师"]
      ],
      name: [
        ["Pedro", "佩德罗"],
        ["Joana", "乔安娜"],
        ["Rita", "丽塔"],
        ["Tomás", "托马斯"]
      ]
    }
  },
  {
    id: "location",
    keywords: ["在哪里", "位置", "地点", "银行", "超市", "大使馆", "问路"],
    pattern: "{place} fica {direction}.",
    translation: "{placeZh}在{directionZh}。",
    slots: {
      place: [
        ["O banco", "银行"],
        ["O supermercado", "超市"],
        ["A entrada", "入口"],
        ["A escola", "学校"]
      ],
      direction: [
        ["ali", "那边"],
        ["perto daqui", "这附近"],
        ["ao fundo da rua", "街道尽头"],
        ["à direita", "右边"]
      ]
    }
  }
];

const drillScenario = document.querySelector("#drillScenario");
const drillSlots = document.querySelector("#drillSlots");
const drillSentenceList = document.querySelector("#drillSentenceList");
const sentenceLevel = document.querySelector("#sentenceLevel");
const sentenceText = document.querySelector("#sentenceText");
const sentenceZh = document.querySelector("#sentenceZh");
const sentenceHint = document.querySelector("#sentenceHint");
const switchButton = document.querySelector("#generateSentence");
const replaceButton = document.querySelector("#generateVariant");

let activeTemplateIndex = 0;
let activeTemplate = structureTemplates[0];
let featuredTranslation = "";
let historyItems = [];

function pick(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function templateMatchesScene(template, scene) {
  const normalized = scene.toLowerCase();
  return template.keywords.some((keyword) => normalized.includes(keyword));
}

function chooseTemplate(scene, offset = 0) {
  const matches = structureTemplates
    .map((template, index) => ({ template, index }))
    .filter(({ template }) => templateMatchesScene(template, scene));
  const pool = matches.length ? matches : structureTemplates.map((template, index) => ({ template, index }));
  return pool[offset % pool.length];
}

function fillTemplate(template) {
  const values = {};
  const zhValues = {};
  let text = template.pattern;
  let translation = template.translation;

  Object.entries(template.slots).forEach(([slot, options]) => {
    const [pt, zh] = pick(options);
    values[slot] = pt;
    zhValues[`${slot}Zh`] = zh;
    text = text.replaceAll(`{${slot}}`, pt);
    translation = translation.replaceAll(`{${slot}}`, pt).replaceAll(`{${slot}Zh}`, zh);
  });

  return {
    id: template.id,
    level: "A1-A2 · structure drill",
    text,
    translation,
    hint: template.pattern,
    slots: values
  };
}

function cleanTranslation(item) {
  return item.translation || "";
}

function hideFeaturedTranslation() {
  sentenceZh.classList.remove("is-revealed");
  sentenceZh.textContent = "░░░░░░░░░░░░░░░";
  sentenceZh.setAttribute("aria-label", languageState.current === "en" ? "Click to reveal translation" : "点击查看中文翻译");
}

function revealFeaturedTranslation() {
  sentenceZh.classList.add("is-revealed");
  sentenceZh.textContent = featuredTranslation;
  sentenceZh.setAttribute("aria-label", featuredTranslation);
}

function renderSlots(usedSlots) {
  drillSlots.innerHTML = "";
  Object.entries(usedSlots).forEach(([slot, value]) => {
    const tag = document.createElement("span");
    tag.textContent = `${slot}: ${value}`;
    drillSlots.appendChild(tag);
  });
}

function setFeaturedSentence(item, keepHistory = true) {
  sentenceLevel.textContent = item.level;
  sentenceText.textContent = item.text;
  featuredTranslation = cleanTranslation(item);
  sentenceHint.textContent = item.hint;
  hideFeaturedTranslation();
  renderSlots(item.slots || {});

  if (keepHistory) {
    historyItems = [item, ...historyItems.filter((historyItem) => historyItem.text !== item.text)].slice(0, 4);
    renderDrillList();
  }
}

function renderDrillList() {
  drillSentenceList.innerHTML = "";
  historyItems.forEach((item, index) => {
    const card = document.createElement("article");
    card.className = "drill-line-card";
    card.innerHTML = `
      <span>${String(index + 1).padStart(2, "0")}</span>
      <div>
        <p class="portuguese">${item.text}</p>
        <small class="translation is-masked" data-translation="${item.translation}">░░░░░░░░░░░░░░░</small>
      </div>
      <div class="drill-mini-actions">
        <button type="button" class="translate-button" aria-label="Reveal translation">译</button>
        <button type="button" class="read-button" aria-label="Play sentence">▶</button>
      </div>
    `;
    card.querySelector(".read-button").addEventListener("click", () => speak(item.text));
    card.querySelector(".translate-button").addEventListener("click", () => {
      const translation = card.querySelector(".translation");
      translation.classList.toggle("is-masked");
      translation.textContent = translation.classList.contains("is-masked") ? "░░░░░░░░░░░░░░░" : translation.dataset.translation;
    });
    card.addEventListener("click", (event) => {
      if (!event.target.closest("button")) setFeaturedSentence(item, false);
    });
    drillSentenceList.appendChild(card);
  });
}

function switchExample() {
  const selection = chooseTemplate(drillScenario.value.trim(), activeTemplateIndex + 1);
  activeTemplateIndex = selection.index;
  activeTemplate = selection.template;
  setFeaturedSentence(fillTemplate(activeTemplate));
}

function replaceWords() {
  setFeaturedSentence(fillTemplate(activeTemplate));
}

function bootDrill() {
  const selection = chooseTemplate(drillScenario.value.trim(), 0);
  activeTemplateIndex = selection.index;
  activeTemplate = selection.template;
  setFeaturedSentence(fillTemplate(activeTemplate));
}

switchButton.addEventListener("click", switchExample);
replaceButton.addEventListener("click", replaceWords);
drillScenario.addEventListener("change", bootDrill);
document.querySelector("#playSentence").addEventListener("click", () => speak(sentenceText.textContent));
document.querySelector("#playSlowSentence").addEventListener("click", () => speak(sentenceText.textContent, 0.58));
sentenceZh.addEventListener("click", revealFeaturedTranslation);
sentenceZh.addEventListener("keydown", (event) => {
  if (event.code === "Space" || event.code === "Enter") {
    event.preventDefault();
    revealFeaturedTranslation();
  }
});

bootDrill();
