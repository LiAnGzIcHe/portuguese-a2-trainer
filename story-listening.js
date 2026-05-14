const state = {
  stories: [],
  storyIndex: 0,
  lineIndex: 0,
  voices: [],
  repeatTimer: null,
  mediaRecorder: null,
  recordingChunks: []
};

const elements = {
  voiceStatus: document.querySelector("#storyVoiceStatus"),
  voiceSelect: document.querySelector("#storyVoiceSelect"),
  rate: document.querySelector("#storyRate"),
  rateValue: document.querySelector("#storyRateValue"),
  tabs: document.querySelector("#storyTabs"),
  playFullStory: document.querySelector("#playFullStory"),
  storyScope: document.querySelector("#storyScope"),
  storyTitle: document.querySelector("#storyTitle"),
  storyTheme: document.querySelector("#storyTheme"),
  lineCounter: document.querySelector("#lineCounter"),
  prevLine: document.querySelector("#prevLine"),
  nextLine: document.querySelector("#nextLine"),
  activeSpeaker: document.querySelector("#activeSpeaker"),
  activePt: document.querySelector("#activePt"),
  activeTranslation: document.querySelector("#activeTranslation"),
  playLine: document.querySelector("#playLine"),
  playLineSlow: document.querySelector("#playLineSlow"),
  repeatLine: document.querySelector("#repeatLine"),
  lineList: document.querySelector("#lineList"),
  grammar: document.querySelector("#grammarSummary"),
  vocabulary: document.querySelector("#vocabularySummary"),
  practice: document.querySelector("#practiceSummary"),
  startRecording: document.querySelector("#startRecording"),
  stopRecording: document.querySelector("#stopRecording"),
  recordingStatus: document.querySelector("#recordingStatus"),
  recordingPlayback: document.querySelector("#recordingPlayback"),
  customTextInput: document.querySelector("#customTextInput"),
  previewCustomText: document.querySelector("#previewCustomText"),
  customPreview: document.querySelector("#customPreview")
};

function ptPtVoice(voice) {
  return voice.lang.replace("_", "-").toLowerCase() === "pt-pt";
}

function selectedVoice() {
  return state.voices.find((voice) => voice.name === elements.voiceSelect.value) || state.voices[0];
}

function loadVoices() {
  if (!("speechSynthesis" in window)) {
    elements.voiceStatus.textContent = "当前浏览器不支持 Web Speech API。";
    return;
  }

  const allPortuguese = window.speechSynthesis.getVoices().filter((voice) => voice.lang.toLowerCase().startsWith("pt"));
  state.voices = allPortuguese.filter(ptPtVoice);
  elements.voiceSelect.innerHTML = "";

  if (!state.voices.length) {
    elements.voiceSelect.disabled = true;
    const option = document.createElement("option");
    option.textContent = "未检测到 pt-PT";
    elements.voiceSelect.appendChild(option);
    elements.voiceStatus.textContent = "未检测到 Portuguese (Portugal) 语音。为避免巴西葡语发音，朗读已限制为 pt-PT。";
    return;
  }

  elements.voiceSelect.disabled = false;
  state.voices.forEach((voice) => {
    const option = document.createElement("option");
    option.value = voice.name;
    option.textContent = `${voice.name} · ${voice.lang}`;
    elements.voiceSelect.appendChild(option);
  });
  elements.voiceStatus.textContent = `已启用 ${state.voices.length} 个欧洲葡萄牙语语音。`;
}

function speak(text, rate = Number(elements.rate.value)) {
  if (!("speechSynthesis" in window)) return;
  const voice = selectedVoice();
  if (!voice) {
    elements.voiceStatus.textContent = "请先安装 Portuguese (Portugal) 语音包。";
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

async function loadStoryData() {
  const response = await fetch("data/a1-unidade-example-bank.json");
  if (!response.ok) throw new Error("Cannot load story bank");
  const data = await response.json();
  state.stories = data.story_modules || [];
}

function currentStory() {
  return state.stories[state.storyIndex];
}

function currentLine() {
  return currentStory().dialogue[state.lineIndex];
}

function renderTabs() {
  elements.tabs.innerHTML = "";
  state.stories.forEach((story, index) => {
    const button = document.createElement("button");
    const scope = document.createElement("span");
    button.type = "button";
    button.className = `story-tab${index === state.storyIndex ? " is-active" : ""}`;
    button.textContent = story.title;
    scope.textContent = story.scope;
    button.appendChild(scope);
    button.addEventListener("click", () => {
      state.storyIndex = index;
      state.lineIndex = 0;
      renderStory();
    });
    elements.tabs.appendChild(button);
  });
}

function renderStory() {
  const story = currentStory();
  elements.storyScope.textContent = story.scope;
  elements.storyTitle.textContent = story.title;
  elements.storyTheme.textContent = story.theme_zh;
  renderTabs();
  renderLineList();
  renderActiveLine(false);
  renderSummaries(story);
}

function renderActiveLine(revealTranslation) {
  const story = currentStory();
  const line = currentLine();
  elements.lineCounter.textContent = `${state.lineIndex + 1} / ${story.dialogue.length}`;
  elements.activeSpeaker.textContent = line.speaker;
  elements.activePt.textContent = line.pt;
  elements.activeTranslation.classList.toggle("is-visible", revealTranslation);
  elements.activeTranslation.querySelector(".translation-text").textContent = line.zh;
  document.querySelectorAll(".line-row").forEach((row, index) => {
    row.classList.toggle("is-active", index === state.lineIndex);
  });
}

function renderLineList() {
  const story = currentStory();
  elements.lineList.innerHTML = "";
  story.dialogue.forEach((line, index) => {
    const row = document.createElement("div");
    const speaker = document.createElement("strong");
    const text = document.createElement("p");
    const button = document.createElement("button");
    row.className = `line-row${index === state.lineIndex ? " is-active" : ""}`;
    speaker.textContent = line.speaker;
    text.textContent = line.pt;
    button.type = "button";
    button.textContent = "播放";
    row.append(speaker, text, button);
    row.addEventListener("click", () => {
      state.lineIndex = index;
      renderActiveLine(false);
    });
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      state.lineIndex = index;
      renderActiveLine(false);
      speak(line.pt);
    });
    elements.lineList.appendChild(row);
  });
}

function renderSummaries(story) {
  elements.grammar.innerHTML = "";
  story.grammar_points.forEach((point) => {
    const item = document.createElement("div");
    const title = document.createElement("strong");
    const text = document.createElement("p");
    item.className = "summary-item";
    const detail = [...(point.forms || []), ...(point.examples || [])].join(" · ");
    title.textContent = point.topic;
    text.textContent = detail;
    item.append(title, text);
    elements.grammar.appendChild(item);
  });

  elements.vocabulary.innerHTML = "";
  Object.entries(story.vocabulary || {}).forEach(([groupName, words]) => {
    const group = document.createElement("div");
    const title = document.createElement("b");
    group.className = "vocab-group";
    title.textContent = groupName.replaceAll("_", " ");
    group.appendChild(title);
    words.forEach((word) => {
      const tag = document.createElement("span");
      tag.textContent = word;
      group.appendChild(tag);
    });
    elements.vocabulary.appendChild(group);
  });

  elements.practice.innerHTML = "";
  (story.practice || []).forEach((practice) => {
    const item = document.createElement("div");
    const task = document.createElement("strong");
    const answer = document.createElement("p");
    item.className = "practice-item";
    task.textContent = practice.task;
    answer.textContent = practice.answer;
    item.append(task, answer);
    elements.practice.appendChild(item);
  });
}

function moveLine(step) {
  const story = currentStory();
  state.lineIndex = (state.lineIndex + step + story.dialogue.length) % story.dialogue.length;
  renderActiveLine(false);
}

function playFullStoryFrom(index = 0) {
  const story = currentStory();
  if (index >= story.dialogue.length) return;
  state.lineIndex = index;
  renderActiveLine(false);
  speak(story.dialogue[index].pt);
  window.setTimeout(() => playFullStoryFrom(index + 1), Math.max(2200, story.dialogue[index].pt.length * 82));
}

function repeatCurrentLine(times = 3) {
  window.clearTimeout(state.repeatTimer);
  let count = 0;
  const run = () => {
    if (count >= times) return;
    count += 1;
    speak(currentLine().pt, count === 1 ? Number(elements.rate.value) : 0.68);
    state.repeatTimer = window.setTimeout(run, Math.max(1900, currentLine().pt.length * 90));
  };
  run();
}

async function startRecording() {
  if (!navigator.mediaDevices?.getUserMedia || !window.MediaRecorder) {
    elements.recordingStatus.textContent = "当前浏览器不支持录音。";
    return;
  }

  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  state.recordingChunks = [];
  state.mediaRecorder = new MediaRecorder(stream);
  state.mediaRecorder.addEventListener("dataavailable", (event) => {
    if (event.data.size > 0) state.recordingChunks.push(event.data);
  });
  state.mediaRecorder.addEventListener("stop", () => {
    const blob = new Blob(state.recordingChunks, { type: "audio/webm" });
    elements.recordingPlayback.src = URL.createObjectURL(blob);
    elements.recordingPlayback.hidden = false;
    stream.getTracks().forEach((track) => track.stop());
    elements.recordingStatus.textContent = "录音完成，可以回放。";
  });
  state.mediaRecorder.start();
  elements.startRecording.disabled = true;
  elements.stopRecording.disabled = false;
  elements.recordingStatus.textContent = "正在录音...";
}

function stopRecording() {
  if (state.mediaRecorder?.state === "recording") state.mediaRecorder.stop();
  elements.startRecording.disabled = false;
  elements.stopRecording.disabled = true;
}

function previewCustomText() {
  const sentences = elements.customTextInput.value
    .split(/(?<=[.!?。！？])\s+/)
    .map((sentence) => sentence.trim())
    .filter(Boolean);
  elements.customPreview.innerHTML = sentences.length
    ? ""
    : "";
  const previewItems = sentences.length ? sentences : ["粘贴文段后会在这里显示切句结果。"];
  previewItems.forEach((sentence) => {
    const item = document.createElement("p");
    item.textContent = sentence;
    elements.customPreview.appendChild(item);
  });
}

function bindEvents() {
  elements.rate.addEventListener("input", () => {
    elements.rateValue.textContent = Number(elements.rate.value).toFixed(2);
  });
  elements.prevLine.addEventListener("click", () => moveLine(-1));
  elements.nextLine.addEventListener("click", () => moveLine(1));
  elements.activeTranslation.addEventListener("click", () => elements.activeTranslation.classList.toggle("is-visible"));
  elements.playLine.addEventListener("click", () => speak(currentLine().pt));
  elements.playLineSlow.addEventListener("click", () => speak(currentLine().pt, 0.62));
  elements.repeatLine.addEventListener("click", () => repeatCurrentLine());
  elements.playFullStory.addEventListener("click", () => playFullStoryFrom(state.lineIndex));
  elements.startRecording.addEventListener("click", startRecording);
  elements.stopRecording.addEventListener("click", stopRecording);
  elements.previewCustomText.addEventListener("click", previewCustomText);
  document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") moveLine(1);
    if (event.key === "ArrowLeft") moveLine(-1);
    if (event.code === "Space" && document.activeElement.tagName !== "TEXTAREA") {
      event.preventDefault();
      elements.activeTranslation.classList.toggle("is-visible");
    }
  });
}

async function boot() {
  bindEvents();
  loadVoices();
  if ("speechSynthesis" in window) window.speechSynthesis.onvoiceschanged = loadVoices;
  try {
    await loadStoryData();
    renderStory();
  } catch (error) {
    elements.storyTitle.textContent = "故事库加载失败";
    elements.storyTheme.textContent = "请通过本地开发服务器或 GitHub Pages 打开本页面。";
  }
}

boot();
