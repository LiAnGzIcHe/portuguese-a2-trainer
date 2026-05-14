const structureTemplates = [
  {
    id: "transport-to-place",
    keywords: ["公交", "车", "学校", "大学", "去", "交通", "地铁", "火车", "bus", "school", "university", "metro", "train"],
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
    keywords: ["公交", "站", "附近", "家", "上车", "坐车", "near", "home", "stop", "catch"],
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
    keywords: ["餐厅", "咖啡", "购物", "酒店", "点餐", "预订", "付款", "restaurant", "coffee", "hotel", "booking", "pay"],
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
    keywords: ["文件", "证件", "材料", "包", "钥匙", "需要", "带", "document", "passport", "key", "bag", "need"],
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
    keywords: ["名字", "介绍", "认识", "身份", "联系", "人", "name", "introduce", "identity", "person"],
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
    keywords: ["在哪里", "位置", "地点", "银行", "超市", "大使馆", "问路", "where", "location", "bank", "supermarket", "embassy"],
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
  },
  {
    id: "origin-language",
    keywords: ["教室", "自我介绍", "来自", "中国", "葡萄牙", "语言", "说", "classroom", "from", "china", "portugal", "language", "speak"],
    pattern: "{subject} sou de {country}. Falo {language}.",
    translation: "{subjectZh}来自{countryZh}。{subjectZh}说{languageZh}。",
    slots: {
      subject: [
        ["Eu", "我"],
        ["Nós", "我们"]
      ],
      country: [
        ["Portugal", "葡萄牙"],
        ["China", "中国"],
        ["Lisboa", "里斯本"],
        ["Pequim", "北京"]
      ],
      language: [
        ["português", "葡萄牙语"],
        ["chinês", "中文"],
        ["inglês", "英语"],
        ["um pouco de português", "一点葡萄牙语"]
      ]
    }
  },
  {
    id: "classroom-object",
    keywords: ["教室", "桌子", "黑板", "书", "字典", "颜色", "墙", "classroom", "desk", "board", "book", "dictionary", "color", "wall"],
    pattern: "{object} está {place}.",
    translation: "{objectZh}在{placeZh}。",
    slots: {
      object: [
        ["O dicionário", "词典"],
        ["A secretária", "办公桌"],
        ["O quadro", "黑板"],
        ["Os livros", "书"]
      ],
      place: [
        ["na mesa", "桌子上"],
        ["na sala", "教室里"],
        ["ali", "那边"],
        ["na tua mão", "你手里"]
      ]
    }
  },
  {
    id: "color-agreement",
    keywords: ["颜色", "桌子", "书", "墙", "白色", "绿色", "红色", "color", "desk", "book", "wall", "white", "green", "red"],
    pattern: "{noun} é {color}.",
    translation: "{nounZh}是{colorZh}的。",
    slots: {
      noun: [
        ["A parede", "墙"],
        ["A secretária", "办公桌"],
        ["O livro", "书"],
        ["A casa", "房子"]
      ],
      color: [
        ["branca", "白色"],
        ["castanha", "棕色"],
        ["verde", "绿色"],
        ["azul", "蓝色"]
      ]
    }
  },
  {
    id: "possessive-object",
    keywords: ["钱包", "驾照", "手机", "包", "我的", "你的", "物品", "wallet", "phone", "bag", "license", "object"],
    pattern: "{object} está {place}.",
    translation: "{objectZh}在{placeZh}。",
    slots: {
      object: [
        ["A minha carteira", "我的钱包"],
        ["O meu telemóvel", "我的手机"],
        ["A tua carta de condução", "你的驾照"],
        ["As minhas chaves", "我的钥匙"]
      ],
      place: [
        ["na mala", "包里"],
        ["no carro", "车里"],
        ["aqui", "这里"],
        ["ali", "那边"]
      ]
    }
  },
  {
    id: "work-place",
    keywords: ["工作", "职业", "医院", "公司", "办公室", "楼层", "work", "job", "hospital", "company", "office", "floor"],
    pattern: "{subject} trabalho {place}.",
    translation: "{subjectZh}在{placeZh}工作。",
    slots: {
      subject: [
        ["Eu", "我"],
        ["Nós", "我们"]
      ],
      place: [
        ["num hospital", "一家医院"],
        ["numa empresa", "一家公司"],
        ["num escritório", "一间办公室"],
        ["no centro", "市中心"]
      ]
    }
  },
  {
    id: "like-place",
    keywords: ["喜欢", "城市", "工作", "同事", "家", "like", "city", "colleague", "house"],
    pattern: "Gosto {object}.",
    translation: "我喜欢{objectZh}。",
    slots: {
      object: [
        ["da minha cidade", "我的城市"],
        ["do meu trabalho", "我的工作"],
        ["dos meus colegas", "我的同事们"],
        ["da tua casa", "你的房子"]
      ]
    }
  },
  {
    id: "family-description",
    keywords: ["家庭", "照片", "父母", "外貌", "爸爸", "妈妈", "family", "photo", "parents", "appearance", "father", "mother"],
    pattern: "{person} é {adjective}.",
    translation: "{personZh}{adjectiveZh}。",
    slots: {
      person: [
        ["O meu pai", "我爸爸"],
        ["A minha mãe", "我妈妈"],
        ["O João", "若昂"],
        ["A Marta", "玛塔"]
      ],
      adjective: [
        ["alto", "很高"],
        ["simpático", "很亲切"],
        ["magra", "很瘦"],
        ["bonita", "很漂亮"]
      ]
    }
  },
  {
    id: "state-feeling",
    keywords: ["状态", "困", "饿", "病", "发烧", "累", "state", "sleepy", "hungry", "sick", "tired"],
    pattern: "{person} está {state}.",
    translation: "{personZh}{stateZh}。",
    slots: {
      person: [
        ["O meu pai", "我爸爸"],
        ["A minha mãe", "我妈妈"],
        ["O Pedro", "佩德罗"],
        ["A Ana", "安娜"]
      ],
      state: [
        ["doente", "病了"],
        ["com sono", "困了"],
        ["com fome", "饿了"],
        ["cansado", "累了"]
      ]
    }
  },
  {
    id: "go-leisure",
    keywords: ["周末", "海滩", "电影院", "购物", "去", "weekend", "beach", "cinema", "shopping", "go"],
    pattern: "{subject} vou {destination}.",
    translation: "{subjectZh}去{destinationZh}。",
    slots: {
      subject: [
        ["Eu", "我"],
        ["Nós", "我们"]
      ],
      destination: [
        ["à praia", "海滩"],
        ["ao cinema", "电影院"],
        ["às compras", "购物"],
        ["ao restaurante", "餐厅"]
      ]
    }
  },
  {
    id: "time-routine",
    keywords: ["时间", "几点", "起床", "晚餐", "作息", "分钟", "time", "hour", "dinner", "routine", "minutes"],
    pattern: "{event} começa daqui a {time}.",
    translation: "{eventZh}{timeZh}后开始。",
    slots: {
      event: [
        ["A aula", "课程"],
        ["O jantar", "晚餐"],
        ["A reunião", "会议"],
        ["O filme", "电影"]
      ],
      time: [
        ["dez minutos", "十分钟"],
        ["trinta minutos", "三十分钟"],
        ["duas horas", "两小时"],
        ["um dia", "一天"]
      ]
    }
  },
  {
    id: "restaurant-order",
    keywords: ["餐厅", "点餐", "菜单", "鱼", "外套", "放", "restaurant", "order", "menu", "fish", "coat"],
    pattern: "{subject} queria {food}.",
    translation: "{subjectZh}想要{foodZh}。",
    slots: {
      subject: [
        ["Eu", "我"],
        ["Nós", "我们"]
      ],
      food: [
        ["meia dose de peixe", "半份鱼"],
        ["a ementa", "菜单"],
        ["um café", "一杯咖啡"],
        ["uma mesa", "一张桌子"]
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
let lastSceneText = "";

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
  const sceneText = drillScenario.value.trim();
  const offset = sceneText === lastSceneText ? activeTemplateIndex + 1 : 0;
  const selection = chooseTemplate(sceneText, offset);
  lastSceneText = sceneText;
  activeTemplateIndex = selection.index;
  activeTemplate = selection.template;
  setFeaturedSentence(fillTemplate(activeTemplate));
}

function replaceWords() {
  setFeaturedSentence(fillTemplate(activeTemplate));
}

function bootDrill() {
  const sceneText = drillScenario.value.trim();
  const selection = chooseTemplate(sceneText, 0);
  lastSceneText = sceneText;
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
