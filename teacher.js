const teacherState = {
  data: null,
  categoryIndex: 0,
  phraseIndex: 0,
  voices: [],
  known: new Set(JSON.parse(localStorage.getItem("teacherKnownPhrases") || "[]")),
  review: new Set(JSON.parse(localStorage.getItem("teacherReviewPhrases") || "[]")),
  dailySeed: Number(localStorage.getItem("teacherDailySeed") || "0"),
  patternIndex: 0,
  variantIndex: 0,
  repeatTimer: null,
  mediaRecorder: null,
  recordingChunks: []
};

const el = {
  voiceStatus: document.querySelector("#teacherVoiceStatus"),
  voiceSelect: document.querySelector("#teacherVoiceSelect"),
  rate: document.querySelector("#teacherRate"),
  rateValue: document.querySelector("#teacherRateValue"),
  dailyList: document.querySelector("#dailyList"),
  refreshDaily: document.querySelector("#refreshDaily"),
  playDaily: document.querySelector("#playDaily"),
  categories: document.querySelector("#teacherCategories"),
  categoryTitlePt: document.querySelector("#categoryTitlePt"),
  categoryTitleZh: document.querySelector("#categoryTitleZh"),
  categoryGoal: document.querySelector("#categoryGoal"),
  phraseCounter: document.querySelector("#phraseCounter"),
  prevPhrase: document.querySelector("#prevPhrase"),
  nextPhrase: document.querySelector("#nextPhrase"),
  phrasePattern: document.querySelector("#phrasePattern"),
  activePt: document.querySelector("#activeTeacherPt"),
  translation: document.querySelector("#teacherTranslation"),
  playPhrase: document.querySelector("#playTeacherPhrase"),
  playSlow: document.querySelector("#playTeacherSlow"),
  repeatPhrase: document.querySelector("#repeatTeacherPhrase"),
  markKnown: document.querySelector("#markKnown"),
  markReview: document.querySelector("#markReview"),
  phraseList: document.querySelector("#phraseList"),
  patternSelect: document.querySelector("#patternSelect"),
  patternSentence: document.querySelector("#patternSentence"),
  patternMeaning: document.querySelector("#patternMeaning"),
  buildVariant: document.querySelector("#buildVariant"),
  playPattern: document.querySelector("#playPattern"),
  startRecording: document.querySelector("#startTeacherRecording"),
  stopRecording: document.querySelector("#stopTeacherRecording"),
  recordingStatus: document.querySelector("#teacherRecordingStatus"),
  recordingPlayback: document.querySelector("#teacherRecordingPlayback"),
  rawTranscript: document.querySelector("#rawTranscript"),
  previewTranscript: document.querySelector("#previewTranscript"),
  transcriptPreview: document.querySelector("#transcriptPreview")
};

function phraseId(phrase) {
  return `${phrase.source}:${phrase.pt}`;
}

function allPhrases() {
  return teacherState.data.categories.flatMap((category) =>
    category.phrases.map((phrase) => ({ ...phrase, category: category.title_zh }))
  );
}

function currentCategory() {
  return teacherState.data.categories[teacherState.categoryIndex];
}

function currentPhrase() {
  return currentCategory().phrases[teacherState.phraseIndex];
}

function isPtPtVoice(voice) {
  return voice.lang.replace("_", "-").toLowerCase() === "pt-pt";
}

function selectedVoice() {
  return teacherState.voices.find((voice) => voice.name === el.voiceSelect.value) || teacherState.voices[0];
}

function loadVoices() {
  if (!("speechSynthesis" in window)) {
    el.voiceStatus.textContent = "当前浏览器不支持 Web Speech API。";
    return;
  }

  const portugueseVoices = window.speechSynthesis.getVoices().filter((voice) => voice.lang.toLowerCase().startsWith("pt"));
  teacherState.voices = portugueseVoices.filter(isPtPtVoice);
  el.voiceSelect.innerHTML = "";

  if (!teacherState.voices.length) {
    el.voiceSelect.disabled = true;
    const option = document.createElement("option");
    option.textContent = "未检测到 pt-PT";
    el.voiceSelect.appendChild(option);
    el.voiceStatus.textContent = "未检测到 Portuguese (Portugal) 语音。为避免巴西葡语发音，朗读已限制为 pt-PT。";
    return;
  }

  el.voiceSelect.disabled = false;
  teacherState.voices.forEach((voice) => {
    const option = document.createElement("option");
    option.value = voice.name;
    option.textContent = `${voice.name} · ${voice.lang}`;
    el.voiceSelect.appendChild(option);
  });
  el.voiceStatus.textContent = `已启用 ${teacherState.voices.length} 个欧洲葡萄牙语语音。`;
}

function speak(text, rate = Number(el.rate.value)) {
  if (!("speechSynthesis" in window)) return;
  const voice = selectedVoice();
  if (!voice) {
    el.voiceStatus.textContent = "请先安装 Portuguese (Portugal) 语音包。";
    return;
  }
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "pt-PT";
  utterance.voice = voice;
  utterance.rate = rate;
  utterance.pitch = 0.96;
  window.speechSynthesis.speak(utterance);
}

async function loadData() {
  const response = await fetch("data/teacher-phrase-bank.json");
  if (!response.ok) throw new Error("Cannot load teacher phrase bank");
  teacherState.data = await response.json();
}

function renderCategories() {
  el.categories.innerHTML = "";
  teacherState.data.categories.forEach((category, index) => {
    const button = document.createElement("button");
    const label = document.createElement("span");
    button.type = "button";
    button.className = `category-button${index === teacherState.categoryIndex ? " is-active" : ""}`;
    button.textContent = category.title_zh;
    label.textContent = category.title_pt;
    button.appendChild(label);
    button.addEventListener("click", () => {
      teacherState.categoryIndex = index;
      teacherState.phraseIndex = 0;
      renderTeacher();
    });
    el.categories.appendChild(button);
  });
}

function renderTeacher() {
  const category = currentCategory();
  el.categoryTitlePt.textContent = category.title_pt;
  el.categoryTitleZh.textContent = category.title_zh;
  el.categoryGoal.textContent = category.goal_zh;
  renderCategories();
  renderPhraseList();
  renderActivePhrase(false);
}

function renderActivePhrase(reveal) {
  const category = currentCategory();
  const phrase = currentPhrase();
  el.phraseCounter.textContent = `${teacherState.phraseIndex + 1} / ${category.phrases.length}`;
  el.phrasePattern.textContent = `${phrase.pattern} · ${phrase.level}`;
  el.activePt.textContent = phrase.pt;
  el.translation.classList.toggle("is-visible", reveal);
  el.translation.querySelector(".translation-text").textContent = phrase.zh;
  el.markKnown.textContent = teacherState.known.has(phraseId(phrase)) ? "已听懂" : "听懂";
  el.markReview.textContent = teacherState.review.has(phraseId(phrase)) ? "已加入复习" : "复习";
  document.querySelectorAll(".phrase-row").forEach((row, index) => {
    row.classList.toggle("is-active", index === teacherState.phraseIndex);
  });
}

function renderPhraseList() {
  el.phraseList.innerHTML = "";
  currentCategory().phrases.forEach((phrase, index) => {
    const row = document.createElement("div");
    const text = document.createElement("strong");
    const meta = document.createElement("span");
    row.className = `phrase-row${teacherState.known.has(phraseId(phrase)) ? " is-known" : ""}`;
    text.textContent = phrase.pt;
    meta.textContent = `${phrase.zh} · ${phrase.pattern}`;
    row.append(text, meta);
    row.addEventListener("click", () => {
      teacherState.phraseIndex = index;
      renderActivePhrase(false);
    });
    el.phraseList.appendChild(row);
  });
}

function movePhrase(step) {
  const total = currentCategory().phrases.length;
  teacherState.phraseIndex = (teacherState.phraseIndex + step + total) % total;
  renderActivePhrase(false);
}

function persistProgress() {
  localStorage.setItem("teacherKnownPhrases", JSON.stringify([...teacherState.known]));
  localStorage.setItem("teacherReviewPhrases", JSON.stringify([...teacherState.review]));
}

function toggleSet(set, id) {
  if (set.has(id)) set.delete(id);
  else set.add(id);
  persistProgress();
  renderTeacher();
  renderDaily();
}

function dailyPhrases() {
  const phrases = allPhrases();
  const start = teacherState.dailySeed % Math.max(1, phrases.length);
  return Array.from({ length: Math.min(8, phrases.length) }, (_, index) => phrases[(start + index * 5) % phrases.length]);
}

function renderDaily() {
  el.dailyList.innerHTML = "";
  dailyPhrases().forEach((phrase) => {
    const item = document.createElement("div");
    const text = document.createElement("strong");
    const meta = document.createElement("span");
    item.className = `daily-item${teacherState.known.has(phraseId(phrase)) ? " is-known" : ""}`;
    text.textContent = phrase.pt;
    meta.textContent = `${phrase.zh} · ${phrase.category}`;
    item.append(text, meta);
    item.addEventListener("click", () => speak(phrase.pt));
    el.dailyList.appendChild(item);
  });
}

function playPhrasesSequentially(phrases, index = 0) {
  if (index >= phrases.length) return;
  speak(phrases[index].pt);
  window.setTimeout(() => playPhrasesSequentially(phrases, index + 1), Math.max(1800, phrases[index].pt.length * 90));
}

function repeatCurrent(times = 3) {
  window.clearTimeout(teacherState.repeatTimer);
  let count = 0;
  const run = () => {
    if (count >= times) return;
    count += 1;
    speak(currentPhrase().pt, count === 1 ? Number(el.rate.value) : 0.66);
    teacherState.repeatTimer = window.setTimeout(run, Math.max(1700, currentPhrase().pt.length * 95));
  };
  run();
}

function renderPatternOptions() {
  el.patternSelect.innerHTML = "";
  teacherState.data.patterns.forEach((pattern, index) => {
    const option = document.createElement("option");
    option.value = String(index);
    option.textContent = pattern.title;
    el.patternSelect.appendChild(option);
  });
  renderPattern();
}

function buildPatternSentence(pattern) {
  return Object.entries(pattern.slots).reduce((sentence, [slot, values]) => {
    const value = values[teacherState.variantIndex % values.length];
    return sentence.replace(`{${slot}}`, value);
  }, pattern.base);
}

function renderPattern() {
  const pattern = teacherState.data.patterns[teacherState.patternIndex];
  el.patternSentence.textContent = buildPatternSentence(pattern);
  el.patternMeaning.textContent = `${pattern.title} · ${pattern.zh}`;
}

async function startRecording() {
  if (!navigator.mediaDevices?.getUserMedia || !window.MediaRecorder) {
    el.recordingStatus.textContent = "当前浏览器不支持录音。";
    return;
  }
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  teacherState.recordingChunks = [];
  teacherState.mediaRecorder = new MediaRecorder(stream);
  teacherState.mediaRecorder.addEventListener("dataavailable", (event) => {
    if (event.data.size > 0) teacherState.recordingChunks.push(event.data);
  });
  teacherState.mediaRecorder.addEventListener("stop", () => {
    const blob = new Blob(teacherState.recordingChunks, { type: "audio/webm" });
    el.recordingPlayback.src = URL.createObjectURL(blob);
    el.recordingPlayback.hidden = false;
    stream.getTracks().forEach((track) => track.stop());
    el.recordingStatus.textContent = "录音完成，可以回放。";
  });
  teacherState.mediaRecorder.start();
  el.startRecording.disabled = true;
  el.stopRecording.disabled = false;
  el.recordingStatus.textContent = "正在录音...";
}

function stopRecording() {
  if (teacherState.mediaRecorder?.state === "recording") teacherState.mediaRecorder.stop();
  el.startRecording.disabled = false;
  el.stopRecording.disabled = true;
}

function previewTranscript() {
  const candidates = el.rawTranscript.value
    .split(/(?<=[.!?。！？])\s+/)
    .map((item) => item.trim())
    .filter((item) => item.length > 8 && item.length < 120)
    .slice(0, 16);
  el.transcriptPreview.innerHTML = "";
  (candidates.length ? candidates : ["粘贴转录后，这里会显示候选课堂句。"]).forEach((candidate) => {
    const row = document.createElement("div");
    const text = document.createElement("span");
    row.className = "candidate-row";
    text.textContent = candidate;
    row.appendChild(text);
    el.transcriptPreview.appendChild(row);
  });
}

function bindEvents() {
  el.rate.addEventListener("input", () => {
    el.rateValue.textContent = Number(el.rate.value).toFixed(2);
  });
  el.prevPhrase.addEventListener("click", () => movePhrase(-1));
  el.nextPhrase.addEventListener("click", () => movePhrase(1));
  el.translation.addEventListener("click", () => el.translation.classList.toggle("is-visible"));
  el.playPhrase.addEventListener("click", () => speak(currentPhrase().pt));
  el.playSlow.addEventListener("click", () => speak(currentPhrase().pt, 0.62));
  el.repeatPhrase.addEventListener("click", () => repeatCurrent());
  el.markKnown.addEventListener("click", () => toggleSet(teacherState.known, phraseId(currentPhrase())));
  el.markReview.addEventListener("click", () => toggleSet(teacherState.review, phraseId(currentPhrase())));
  el.refreshDaily.addEventListener("click", () => {
    teacherState.dailySeed += 1;
    localStorage.setItem("teacherDailySeed", String(teacherState.dailySeed));
    renderDaily();
  });
  el.playDaily.addEventListener("click", () => playPhrasesSequentially(dailyPhrases()));
  el.patternSelect.addEventListener("change", () => {
    teacherState.patternIndex = Number(el.patternSelect.value);
    teacherState.variantIndex = 0;
    renderPattern();
  });
  el.buildVariant.addEventListener("click", () => {
    teacherState.variantIndex += 1;
    renderPattern();
  });
  el.playPattern.addEventListener("click", () => speak(el.patternSentence.textContent));
  el.startRecording.addEventListener("click", startRecording);
  el.stopRecording.addEventListener("click", stopRecording);
  el.previewTranscript.addEventListener("click", previewTranscript);
  document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") movePhrase(1);
    if (event.key === "ArrowLeft") movePhrase(-1);
    if (event.code === "Space" && document.activeElement.tagName !== "TEXTAREA") {
      event.preventDefault();
      el.translation.classList.toggle("is-visible");
    }
  });
}

async function boot() {
  bindEvents();
  loadVoices();
  if ("speechSynthesis" in window) window.speechSynthesis.onvoiceschanged = loadVoices;
  try {
    await loadData();
    renderDaily();
    renderTeacher();
    renderPatternOptions();
  } catch (error) {
    el.categoryTitleZh.textContent = "课堂用语库加载失败";
    el.categoryGoal.textContent = "请通过本地开发服务器或 GitHub Pages 打开本页面。";
  }
}

boot();
