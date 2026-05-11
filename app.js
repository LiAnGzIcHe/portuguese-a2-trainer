const alphabetItems = [
  { letter: "A", name: "á", sample: "água", hint: "stressed open a: água", mouth: "open" },
  { letter: "B", name: "bê", sample: "bom", hint: "b + rounded vowel: bom dia", mouth: "lipStop" },
  { letter: "C", name: "cê", sample: "casa / cidade", hint: "cê = /se/，不是 /i/；c before a/o/u is /k/, before e/i is /s/", mouth: "sibilant", letterMouth: "sibilant", wordMouth: "backOrS", ipa: "/se/", approx: "近似“塞/seh”，不是“逸/yi”" },
  { letter: "D", name: "dê", sample: "dia", hint: "European d stays crisp: dia", mouth: "tongueTip" },
  { letter: "E", name: "é", sample: "ele / pequeno", hint: "unstressed e often weakens or disappears", mouth: "midFront" },
  { letter: "F", name: "efe", sample: "falar", hint: "final -r carries stress in infinitives", mouth: "teethLip" },
  { letter: "G", name: "gê", sample: "gato / gente", hint: "g before e/i sounds like soft j", mouth: "backOrSoft" },
  { letter: "H", name: "agá", sample: "hoje", hint: "h is silent at word start", mouth: "silent" },
  { letter: "I", name: "i", sample: "vinho", hint: "clear high vowel i", mouth: "spread" },
  { letter: "J", name: "jota", sample: "já", hint: "soft sound as in já", mouth: "softFricative" },
  { letter: "K", name: "capa", sample: "kilo / kayak", hint: "K appears mainly in loanwords and names; letter name is capa in Portugal", mouth: "backTongue", letterMouth: "backTongue" },
  { letter: "L", name: "ele", sample: "Lisboa / sal", hint: "final l is darker in Portugal", mouth: "lateral" },
  { letter: "M", name: "eme", sample: "mãe", hint: "m can mark nasal vowel", mouth: "nasalLip" },
  { letter: "N", name: "ene", sample: "não", hint: "n can mark nasal vowel", mouth: "nasalTongue" },
  { letter: "O", name: "ó", sample: "obrigado / avô", hint: "unstressed o often sounds like u", mouth: "round" },
  { letter: "P", name: "pê", sample: "Portugal", hint: "p is unaspirated and clean", mouth: "lipStop" },
  { letter: "Q", name: "quê", sample: "quero", hint: "qu before e/i usually sounds k", mouth: "backTongue" },
  { letter: "R", name: "erre", sample: "rua / caro", hint: "initial rr/rr is strong; single intervocalic r is light", mouth: "rhotic" },
  { letter: "S", name: "esse", sample: "casa / dois", hint: "s changes by position and neighbors", mouth: "sibilant" },
  { letter: "T", name: "tê", sample: "tudo", hint: "European t stays crisp", mouth: "tongueTip" },
  { letter: "U", name: "u", sample: "um", hint: "um is nasal and compact", mouth: "tightRound" },
  { letter: "V", name: "vê", sample: "vinho", hint: "v is voiced, not b", mouth: "teethLip" },
  { letter: "W", name: "dáblio", sample: "web / watt", hint: "W appears mainly in loanwords and names; Portugal often says dáblio", mouth: "round", letterMouth: "round" },
  { letter: "X", name: "xis", sample: "explicar", hint: "x has several readings; learn by word family", mouth: "sibilant" },
  { letter: "Y", name: "ípsilon", sample: "yoga / youtuber", hint: "Y appears mainly in loanwords and names; letter name is ípsilon", mouth: "spread", letterMouth: "spread" },
  { letter: "Z", name: "zê", sample: "zero / luz", hint: "final z often sounds like sh before pause", mouth: "voicedSibilant" }
];

const mouthProfiles = {
  open: { shape: "open", title: "开口大", compare: "下巴放低，嘴唇自然展开；像中文“啊”，但更短更干净。" },
  lipStop: { shape: "closed", title: "双唇闭合", compare: "先完全闭唇，再轻轻放开；葡语 p/b 不要喷太强气。" },
  backOrS: { shape: "split", title: "c 的词内分裂", compare: "casa 的 ca 用后舌 /k/；cidade 的 ci 用窄缝气流 /s/。字母名 cê 本身按 /s/ 示意。" },
  tongueTip: { shape: "tip", title: "舌尖轻触", compare: "舌尖碰上齿龈后快速离开；不要读成英语式强爆破。" },
  midFront: { shape: "mid", title: "中前元音", compare: "嘴角微开；非重读 e 在欧洲葡语里常弱化，声音更轻。" },
  teethLip: { shape: "teeth", title: "上齿触下唇", compare: "f/v 都是齿唇音；v 要带声带振动，不能混成 b。" },
  backOrSoft: { shape: "split", title: "后舌 / 软擦音", compare: "ga/go/gu 用后舌；ge/gi 像柔和的 j，喉部不要太硬。" },
  silent: { shape: "rest", title: "h 不发音", compare: "词首 h 不改变嘴型；直接从后面的元音开始。" },
  spread: { shape: "spread", title: "嘴角横向", compare: "舌位高、嘴角略向两侧；声音短，不拖成长音。" },
  softFricative: { shape: "soft", title: "柔和擦音", compare: "舌面靠近上腭，气流摩擦；比英语 j 更柔。" },
  lateral: { shape: "tip", title: "舌尖顶住，气流两侧走", compare: "l 用舌尖定位；词尾 l 在葡萄牙更暗、更靠后。" },
  nasalLip: { shape: "closedNasal", title: "闭唇 + 鼻腔", compare: "m 让气流走鼻腔；ãe 不是完整两个音节。" },
  nasalTongue: { shape: "nasal", title: "鼻化元音", compare: "n 常提示前一个元音鼻化；口腔别开太大。" },
  round: { shape: "round", title: "圆唇", compare: "重读 ó/ô 圆唇清楚；非重读 o 常弱化接近 u。" },
  backTongue: { shape: "back", title: "后舌抬起", compare: "qu 通常读 k；嘴唇别加英语式 w，除非单词本身要求。" },
  rhotic: { shape: "rhotic", title: "r 的强弱对比", compare: "词首/rr 更强；两个元音中间的 r 更轻、更短。" },
  sibilant: { shape: "sibilant", title: "窄缝气流", compare: "舌尖接近上齿龈形成细气流；词尾常受后面声音影响。" },
  tightRound: { shape: "tightRound", title: "小圆唇", compare: "u 嘴唇更小更圆；um 要鼻化，声音收紧。" },
  voicedSibilant: { shape: "voicedSibilant", title: "带声擦音", compare: "z 要有声带振动；词尾 z 暂停前常接近 sh。" }
};

const voiceSelect = document.querySelector("#voiceSelect");
const voiceStatus = document.querySelector("#voiceStatus");
const rateControl = document.querySelector("#rateControl");
const rateValue = document.querySelector("#rateValue");
const alphabetGrid = document.querySelector("#alphabetGrid");
const labMouth = document.querySelector("#labMouth");
const labLetter = document.querySelector("#labLetter");
const labSample = document.querySelector("#labSample");
const labTitle = document.querySelector("#labTitle");
const labHint = document.querySelector("#labHint");

let availableVoices = [];

function isEuropeanPortugueseVoice(voice) {
  return voice.lang.replace("_", "-").toLowerCase() === "pt-pt";
}

function preferredVoice() {
  const selected = availableVoices.find((voice) => voice.name === voiceSelect.value);
  return selected || availableVoices.find(isEuropeanPortugueseVoice);
}

function speak(text, customRate) {
  if (!("speechSynthesis" in window)) {
    voiceStatus.textContent = "当前浏览器不支持 Web Speech API。";
    return;
  }

  const voice = preferredVoice();
  if (!voice) {
    window.speechSynthesis.cancel();
    voiceStatus.textContent = "已阻止播放：未检测到欧洲葡语 pt-PT 语音，避免误用巴西葡语发音。请安装 Portuguese (Portugal) 语音包。";
    return;
  }

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "pt-PT";
  utterance.rate = customRate || Number(rateControl.value);
  utterance.pitch = 0.96;
  utterance.voice = voice;
  window.speechSynthesis.speak(utterance);
}

function loadVoices() {
  const allPortugueseVoices = window.speechSynthesis
    .getVoices()
    .filter((voice) => voice.lang.toLowerCase().startsWith("pt"));
  availableVoices = allPortugueseVoices.filter(isEuropeanPortugueseVoice);

  voiceSelect.innerHTML = "";
  if (!availableVoices.length) {
    const option = document.createElement("option");
    option.textContent = "未检测到欧洲葡语 pt-PT 语音";
    voiceSelect.appendChild(option);
    voiceSelect.disabled = true;
    const blockedCount = allPortugueseVoices.length;
    voiceStatus.textContent = blockedCount
      ? `检测到 ${blockedCount} 个非 pt-PT 葡语语音，已全部禁用，避免巴西葡语发音。请安装 Portuguese (Portugal) 语音包。`
      : "未检测到欧洲葡语 pt-PT 语音：请在 Windows 语言设置中安装 Portuguese (Portugal) 语音包。";
    return;
  }

  voiceSelect.disabled = false;
  availableVoices.forEach((voice) => {
    const option = document.createElement("option");
    option.value = voice.name;
    option.textContent = `${voice.name} · ${voice.lang} · Portugal`;
    voiceSelect.appendChild(option);
  });

  voiceStatus.textContent = `已检测到 ${availableVoices.length} 个欧洲葡语 pt-PT 语音；其他葡语变体不会用于播放。`;
}

function renderAlphabet() {
  alphabetItems.forEach((item) => {
    const mouth = mouthProfiles[item.mouth];
    const card = document.createElement("article");
    card.className = "letter-card";
    card.innerHTML = `
      <strong>${item.letter}</strong>
      <p><b>字母名</b> ${item.name}</p>
      ${item.ipa ? `<p class="ipa-note"><b>${item.ipa}</b> · ${item.approx}</p>` : ""}
      <p><b>例词</b> ${item.sample}</p>
      <p>${item.hint}</p>
      <div class="mouth-compare" aria-label="${item.letter} 嘴型对比">
        <span class="mouth-icon mouth-${mouth.shape}" aria-hidden="true">
          <i></i>
        </span>
        <div>
          <b>${mouth.title}</b>
          <small>${mouth.compare}</small>
        </div>
      </div>
      <div class="letter-actions">
        <button type="button" class="mouth-demo-button" data-letter="${item.letter}" aria-label="显示 ${item.letter} 的嘴型动画">嘴型动画</button>
        <button type="button" class="letter-sound-button" aria-label="播放字母名 ${item.name}">▶ 字母</button>
        <button type="button" class="word-sound-button" aria-label="播放例词 ${item.sample}">▶ 例词</button>
      </div>
    `;
    card.querySelector(".letter-sound-button").addEventListener("click", () => {
      updatePronunciationLab(item, true, "字母发音", item.letterMouth);
      playLetterAudio(item);
    });
    card.querySelector(".word-sound-button").addEventListener("click", () => {
      updatePronunciationLab(item, true, "例词发音", item.wordMouth);
      speak(item.sample.replace(" / ", ". "));
    });
    card.querySelector(".mouth-demo-button").addEventListener("click", () => updatePronunciationLab(item, true));
    card.querySelector(".mouth-compare").addEventListener("click", () => updatePronunciationLab(item, true));
    alphabetGrid.appendChild(card);
  });
  updatePronunciationLab(alphabetItems[0], false);
}

function playLetterAudio(item) {
  const customAudio = `audio/letters/${item.letter.toLowerCase()}.mp3`;
  const audio = new Audio(customAudio);
  audio.addEventListener("error", () => speak(item.name), { once: true });
  audio.play().catch(() => speak(item.name));
}

function updatePronunciationLab(item, replayAnimation, modeLabel = "嘴型动画", mouthOverride) {
  const mouth = mouthProfiles[mouthOverride || item.mouth];
  labLetter.textContent = `${item.letter} · ${item.name}`;
  labSample.textContent = item.sample;
  labTitle.textContent = `${modeLabel} · ${mouth.title}`;
  labHint.textContent = mouth.compare;
  labMouth.className = `animated-mouth mouth-${mouth.shape}`;

  if (replayAnimation) {
    labMouth.classList.remove("is-speaking");
    void labMouth.offsetWidth;
    labMouth.classList.add("is-speaking");
  }
}

document.addEventListener("click", (event) => {
  const button = event.target.closest("[data-speak]");
  if (button) {
    speak(button.dataset.speak);
  }
});

rateControl.addEventListener("input", () => {
  rateValue.textContent = Number(rateControl.value).toFixed(2);
});

renderAlphabet();

if ("speechSynthesis" in window) {
  loadVoices();
  window.speechSynthesis.onvoiceschanged = loadVoices;
} else {
  voiceStatus.textContent = "当前浏览器不支持 Web Speech API。";
}
