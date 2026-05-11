# Português PT A2 Studio

本地静态网页，用于 A2 及以下欧洲葡语入门学习。第一版覆盖：

- 欧洲葡语 pt-PT 发音播放，支持语速调节和语音选择
- 每个字母有独立字母名配音入口；可在 `audio/letters/` 放入授权真人录音覆盖 TTS
- 字母模块内嵌 `media/european-portuguese-reference.mp4` 作为真人发音参考视频
- 字母名、词内读音和基础发音提示
- 字母基础发音的嘴型、舌位、气流/鼻化对比
- 重音规则与 vowel reduction 入门
- 资深教师式语音学习路径：sounds -> stress -> reduction -> chunks
- A1/A2 短句和长句随机生成，每条含中文解释、读音提示和播放按钮

## 打开方式

直接双击 `index.html` 即可打开。

也可以在本目录运行：

```powershell
python -m http.server 8000
```

然后访问 `http://localhost:8000`。

## 语音说明

网页使用浏览器 Web Speech API，并严格限制为 `pt-PT` voice。为了得到欧洲葡语发音，请在 Windows 语言设置里安装 `Portuguese (Portugal)` 语音包。若浏览器只检测到 `pt-BR` 或其他非 `pt-PT` 葡语 voice，页面会禁用播放，避免误用巴西葡语发音。

如果你有授权的真人字母音频，可按以下文件名放入 `audio/letters/`，网页会优先播放这些文件：

```text
a.mp3, b.mp3, c.mp3, ... z.mp3
```

没有对应 MP3 时，网页会自动回退到 pt-PT TTS，并只播放单字母名，例如 `cê`。

## 参考产品逻辑

第一版结构参考了当前欧洲葡语学习网站的共性：A1/A2 路径、慢速/正常播放、真实生活语块、IPA/重音/弱读显式教学。教学文本为原创草案，后续可扩展为真人音频、CAPLE/CIPLE 练习和 spaced repetition。
