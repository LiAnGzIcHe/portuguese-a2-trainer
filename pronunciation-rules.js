const pronunciationRules = [
  {
    chapter: "第二章",
    section: "2.1 单元音",
    pattern: "A: aberto / reduzido",
    sound: "á /a/ · a /ɐ/",
    teaching: "先分强弱：á 或强读 a 开口大；非重读 a 收短，嘴型更小。",
    examples: "água · casa · falar",
    drill: "开口大，再收小",
    speak: "água, casa, falar"
  },
  {
    chapter: "第二章",
    section: "2.1 单元音",
    pattern: "E: aberto / fechado",
    sound: "é /ɛ/ · ê /e/",
    teaching: "é 是开口 e，ê 是闭口 e。A2 阶段先用重音符号判断，再按高频词记忆。",
    examples: "café · pé · você · mês",
    drill: "开口 e 对闭口 e",
    speak: "café, pé, você, mês"
  },
  {
    chapter: "第二章",
    section: "2.1 单元音",
    pattern: "I / U",
    sound: "/i/ · /u/",
    teaching: "i 舌位高、嘴角略展开；u 小圆唇。都要短、干净，不拖成长音。",
    examples: "vinho · aqui · um · tudo",
    drill: "高舌位，短音",
    speak: "vinho, aqui, um, tudo"
  },
  {
    chapter: "第二章",
    section: "2.1 单元音",
    pattern: "O: aberto / fechado",
    sound: "ó /ɔ/ · ô /o/",
    teaching: "ó 口腔更开；ô 更闭更圆。avó 和 avô 是最适合入门的最小对比。",
    examples: "avó · só · avô · pôr",
    drill: "圆唇开合对比",
    speak: "avó, só, avô, pôr"
  },
  {
    chapter: "第二章",
    section: "2.2 元音弱化",
    pattern: "e não tónico",
    sound: "/ɨ/ or deleted",
    teaching: "欧洲葡语核心：非重读 e 很弱，常被压缩，快读时甚至接近消失。",
    examples: "pequeno · telefone · de",
    drill: "先找重音，再压 e",
    speak: "pequeno, telefone, de"
  },
  {
    chapter: "第二章",
    section: "2.2 元音弱化",
    pattern: "o não tónico",
    sound: "often /u/",
    teaching: "非重读 o 常读得接近 u，所以 Portugal 不要按字母逐个读满。",
    examples: "Portugal · obrigado · bonito",
    drill: "o 弱读成小圆唇",
    speak: "Portugal, obrigado, bonito"
  },
  {
    chapter: "第二章",
    section: "2.2 元音弱化",
    pattern: "a não tónico",
    sound: "weak /ɐ/",
    teaching: "非重读 a 不是完整“啊”，而是短、轻、靠中间的弱元音。",
    examples: "semana · janela · Lisboa",
    drill: "轻读，不抢重音",
    speak: "semana, janela, Lisboa"
  },
  {
    chapter: "第二章",
    section: "2.3 鼻元音",
    pattern: "-am / -an",
    sound: "nasal /ɐ̃/",
    teaching: "m/n 在音节尾多是鼻化标记，不要读成完整的 m 或 n 结尾。",
    examples: "campo · antes · falam",
    drill: "元音进鼻腔",
    speak: "campo, antes, falam"
  },
  {
    chapter: "第二章",
    section: "2.3 鼻元音",
    pattern: "-em / -en / -im",
    sound: "nasal e / i",
    teaching: "先保持元音短，再让气流走鼻腔；不要在结尾补一个明显的 n。",
    examples: "bem · sempre · fim",
    drill: "短音鼻化",
    speak: "bem, sempre, fim"
  },
  {
    chapter: "第二章",
    section: "2.3 鼻元音",
    pattern: "-om / -um",
    sound: "nasal o / u",
    teaching: "圆唇同时鼻化。bom 和 um 是高频功能块，要整体听、整体模仿。",
    examples: "bom · conta · um · mundo",
    drill: "圆唇加鼻化",
    speak: "bom, conta, um, mundo"
  },
  {
    chapter: "第三章",
    section: "3.1 开口二合元音",
    pattern: "ai / ei / oi / ui",
    sound: "vowel + glide",
    teaching: "二合元音是一口气滑过去，不拆成两个完整音节。",
    examples: "vai · lei · noite · muito",
    drill: "连滑，不断开",
    speak: "vai, lei, noite, muito"
  },
  {
    chapter: "第三章",
    section: "3.1 开口二合元音",
    pattern: "au / eu / iu",
    sound: "glide to /u/",
    teaching: "收尾向小圆唇滑动。eu, meu, viu 要保持收束感。",
    examples: "mau · meu · europeu · viu",
    drill: "最后收圆",
    speak: "mau, meu, europeu, viu"
  },
  {
    chapter: "第三章",
    section: "3.1 开口二合元音",
    pattern: "ou",
    sound: "often /o/ in EP",
    teaching: "标准欧洲葡语里，很多 ou 接近闭口 o，不必读成很明显的 o-u。",
    examples: "sou · estou · pouco",
    drill: "闭口 o，不拖尾",
    speak: "sou, estou, pouco"
  },
  {
    chapter: "第三章",
    section: "3.2 鼻二合元音",
    pattern: "-ão",
    sound: "nasal diphthong",
    teaching: "最重要的鼻二合元音之一：全程鼻化，并滑向圆唇。",
    examples: "não · pão · estação",
    drill: "鼻化 + 圆唇滑动",
    speak: "não, pão, estação"
  },
  {
    chapter: "第三章",
    section: "3.2 鼻二合元音",
    pattern: "-ãe / -õe",
    sound: "nasal glide",
    teaching: "鼻化后向前部滑动；-ões 是常见复数结尾。",
    examples: "mãe · cães · põe · estações",
    drill: "鼻化后滑动",
    speak: "mãe, cães, põe, estações"
  },
  {
    chapter: "第三章",
    section: "3.2 鼻二合元音",
    pattern: "-am / -em finais",
    sound: "nasal ending",
    teaching: "词尾 -am, -em 常表现为鼻化结尾。先整体模仿，不按字母拼读。",
    examples: "falam · viagem · também",
    drill: "词尾整体读",
    speak: "falam, viagem, também"
  },
  {
    chapter: "第四章",
    section: "4.1 核心辅音",
    pattern: "C / Ç",
    sound: "ca /k/ · ce /s/",
    teaching: "c+a/o/u 读 /k/；c+e/i 读 /s/；ç 在 a/o/u 前保持 /s/。",
    examples: "casa · cidade · coração",
    drill: "看后面的元音",
    speak: "casa, cidade, coração"
  },
  {
    chapter: "第四章",
    section: "4.1 核心辅音",
    pattern: "G / GU / J",
    sound: "ga /g/ · ge /ʒ/",
    teaching: "g+a/o/u 是硬 g；g+e/i 像 j；gue/gui 里的 u 多数不发音。",
    examples: "gato · gente · guitarra · já",
    drill: "硬 g 对软 j",
    speak: "gato, gente, guitarra, já"
  },
  {
    chapter: "第四章",
    section: "4.1 核心辅音",
    pattern: "Q / H",
    sound: "qu /k/ · h silent",
    teaching: "quero, aqui 的 qu 多读 /k/；词首 h 不发音。",
    examples: "quero · aqui · hoje · hotel",
    drill: "qu 不加英语 w",
    speak: "quero, aqui, hoje, hotel"
  },
  {
    chapter: "第四章",
    section: "4.1 核心辅音",
    pattern: "R",
    sound: "strong / light",
    teaching: "词首 r 和 rr 是强 r；两个元音中间的单 r 更短、更轻。",
    examples: "rua · carro · caro · agora",
    drill: "强弱 r 对比",
    speak: "rua, carro, caro, agora"
  },
  {
    chapter: "第四章",
    section: "4.1 核心辅音",
    pattern: "S / Z / X",
    sound: "position changes",
    teaching: "s 在不同位置会变；词尾 s/z 在停顿前常接近 sh。x 需要按词记。",
    examples: "sim · casa · dois · luz · táxi",
    drill: "按位置听变化",
    speak: "sim, casa, dois, luz, táxi"
  },
  {
    chapter: "第四章",
    section: "4.1 核心辅音",
    pattern: "B D F L M N P T V",
    sound: "core consonants",
    teaching: "先把爆破音读短，f/v 分清齿唇摩擦；词尾 l 在葡萄牙更暗。",
    examples: "bom · dia · falar · sal · vinho",
    drill: "短、准、不送气过强",
    speak: "bom, dia, falar, sal, vinho"
  },
  {
    chapter: "第四章",
    section: "4.2 特殊辅音组合",
    pattern: "lh / nh",
    sound: "/ʎ/ · /ɲ/",
    teaching: "lh 是舌面 lateral；nh 像 ñ。先绑定高频词，不要拆成 l+h 或 n+h。",
    examples: "filho · melhor · vinho · tenho",
    drill: "整体发音",
    speak: "filho, melhor, vinho, tenho"
  },
  {
    chapter: "第四章",
    section: "4.2 特殊辅音组合",
    pattern: "ch / rr / ss",
    sound: "/ʃ/ · strong r · /s/",
    teaching: "ch 多读 sh；rr 是强 r；ss 在两个元音之间保持清 s。",
    examples: "chá · chegar · carro · passar",
    drill: "组合优先于单字母",
    speak: "chá, chegar, carro, passar"
  },
  {
    chapter: "第四章",
    section: "4.3 辅音连缀",
    pattern: "bl cl fl gl pl",
    sound: "stop/fricative + l",
    teaching: "先发前一个辅音，再让 l 快速进入；不要在中间加中文式元音。",
    examples: "bloco · claro · flor · inglês · plano",
    drill: "不插入额外元音",
    speak: "bloco, claro, flor, inglês, plano"
  },
  {
    chapter: "第四章",
    section: "4.3 辅音连缀",
    pattern: "br cr dr fr gr pr tr vr",
    sound: "consonant + r",
    teaching: "r 在连缀中很短。训练目标是快速接上，不把 br 读成 b-er。",
    examples: "branco · cravo · droga · frio · grande · prato · três · livro",
    drill: "辅音直接接 r",
    speak: "branco, cravo, droga, frio, grande, prato, três, livro"
  },
  {
    chapter: "第五章",
    section: "5.1 分音节",
    pattern: "CV rhythm",
    sound: "consonant + vowel",
    teaching: "基础节奏先按辅音+元音切：ca-sa, me-sa。遇到连缀时不要强行拆开。",
    examples: "casa · mesa · escola",
    drill: "先切块，再找重音",
    speak: "casa, mesa, escola"
  },
  {
    chapter: "第五章",
    section: "5.1 分音节",
    pattern: "diphthong stays together",
    sound: "one syllable",
    teaching: "二合元音一般留在同一音节里；hiato 才分开。A2 先按常见二合元音整体读。",
    examples: "pai · noite · europeu",
    drill: "二合元音不拆",
    speak: "pai, noite, europeu"
  },
  {
    chapter: "第五章",
    section: "5.2 重音规则",
    pattern: "default penultimate",
    sound: "倒数第二音节",
    teaching: "无重音符号且以 a/e/o/as/es/os/am/em 结尾，多数重音在倒数第二音节。",
    examples: "casa · mesa · falam · jovem",
    drill: "默认倒二",
    speak: "casa, mesa, falam, jovem"
  },
  {
    chapter: "第五章",
    section: "5.2 重音规则",
    pattern: "final stress endings",
    sound: "最后音节",
    teaching: "以 -r, -l, -z, -im, -um 等结尾时，先按最后音节重读。",
    examples: "falar · papel · arroz · jardim",
    drill: "末音节承重",
    speak: "falar, papel, arroz, jardim"
  },
  {
    chapter: "第五章",
    section: "5.2 重音规则",
    pattern: "antepenultimate",
    sound: "倒数第三音节",
    teaching: "倒三重音通常有图形重音提示；先看符号，再读强音节。",
    examples: "música · próximo · médico",
    drill: "符号先行",
    speak: "música, próximo, médico"
  },
  {
    chapter: "第五章",
    section: "5.3 变音符号",
    pattern: "´  `  ^  ~",
    sound: "accent cues",
    teaching: "´ 多提示开口强读；^ 多提示闭口强读；` 常见于 à；~ 标记鼻化。",
    examples: "café · avô · à · não",
    drill: "符号决定入口",
    speak: "café, avô, à, não"
  },
  {
    chapter: "第五章",
    section: "5.4 连读与省音",
    pattern: "ligação",
    sound: "words link",
    teaching: "词尾辅音遇到下一个元音会连起来，先慢速读清，再逐步加速。",
    examples: "os amigos · dez euros · mais água",
    drill: "跨词连接",
    speak: "os amigos, dez euros, mais água"
  },
  {
    chapter: "第五章",
    section: "5.4 连读与省音",
    pattern: "elisão",
    sound: "vowel compression",
    teaching: "口语中弱元音会被压短或省略。欧洲葡语听起来快，常是弱音节被压缩。",
    examples: "de Lisboa · pequeno almoço · está aqui",
    drill: "弱音节压缩",
    speak: "de Lisboa, pequeno almoço, está aqui"
  }
];

const chapterMeta = {
  "第二章": {
    id: "vowels",
    title: "元音系统",
    subtitle: "Vogais · 单元音、弱化与鼻元音",
    description: "先建立欧洲葡语的元音听觉坐标：开口/闭口、强读/弱读、口腔/鼻腔。"
  },
  "第三章": {
    id: "diphthongs",
    title: "二合元音、三合元音与鼻二合元音",
    subtitle: "Ditongos · Tritongos · Ditongos Nasais",
    description: "把滑动音当成一个整体训练，重点掌握 -ão, -ãe, -õe 和 ou 的欧洲葡语读法。"
  },
  "第四章": {
    id: "consonants",
    title: "辅音与辅音连缀",
    subtitle: "Consoantes · Grupos Consonânticos",
    description: "按字母环境判断 c/g/s/r/x，再训练 lh, nh, ch, rr, ss 和辅音连缀。"
  },
  "第五章": {
    id: "stress",
    title: "重读、分音节与语音规则",
    subtitle: "Acentuação · Divisão Silábica · Ligação",
    description: "先分音节，再找重音，最后处理连读、省音和弱音节压缩。"
  }
};

const pronunciationChapters = document.querySelector("#pronunciationChapters");

function renderPronunciationRules() {
  if (!pronunciationChapters) return;

  const groupedRules = pronunciationRules.reduce((groups, rule) => {
    if (!groups.has(rule.chapter)) groups.set(rule.chapter, []);
    groups.get(rule.chapter).push(rule);
    return groups;
  }, new Map());

  groupedRules.forEach((rules, chapter) => {
    const meta = chapterMeta[chapter];
    const panel = document.createElement("article");
    panel.className = "chapter-panel";
    panel.id = meta.id;
    panel.innerHTML = `
      <div class="chapter-panel-head">
        <div>
          <p class="eyebrow">${chapter}</p>
          <h3>${meta.title}</h3>
          <p class="chapter-subtitle">${meta.subtitle}</p>
          <p>${meta.description}</p>
        </div>
        <div class="rules-toolbar" aria-label="${chapter} 横向滚动控制">
          <button type="button" class="rules-prev" aria-label="向左滚动">‹</button>
          <button type="button" class="rules-next" aria-label="向右滚动">›</button>
        </div>
      </div>
      <div class="rules-carousel" aria-label="${meta.title} 发音规则"></div>
    `;

    const carousel = panel.querySelector(".rules-carousel");
    rules.forEach((rule, index) => {
    const card = document.createElement("article");
    card.className = "sound-rule-card";
    card.innerHTML = `
      <span class="rule-index">${String(index + 1).padStart(2, "0")}</span>
      <p class="rule-group">${rule.section}</p>
      <h3>${rule.pattern}</h3>
      <p class="rule-sound">${rule.sound}</p>
      <p>${rule.teaching}</p>
      <p class="rule-drill">${rule.drill}</p>
      <p class="rule-examples">${rule.examples}</p>
      <button type="button" data-speak="${rule.speak}">▶ 读例词</button>
    `;
      carousel.appendChild(card);
    });

    panel.querySelector(".rules-prev").addEventListener("click", () => scrollRules(carousel, -1));
    panel.querySelector(".rules-next").addEventListener("click", () => scrollRules(carousel, 1));
    pronunciationChapters.appendChild(panel);
  });
}

function scrollRules(carousel, direction) {
  if (!carousel) return;
  const card = carousel.querySelector(".sound-rule-card");
  const distance = card ? card.getBoundingClientRect().width + 16 : 320;
  carousel.scrollBy({ left: direction * distance, behavior: "smooth" });
}

renderPronunciationRules();
