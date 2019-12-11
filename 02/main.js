import Recorder from "./lib/recorder.js"

// ボタンとか取ってきてるだけ
const btn = document.getElementById("recordingBtn")
const player = document.getElementById("player")
const downloadLink = document.getElementById("downloadLink")
const status = document.getElementById("recordingStatus")
const recorder = new Recorder()

// ボタンがクリックされたら
btn.addEventListener("click", () => {
  status.style = "display: inline;"
  downloadLink.style = "display: none;"
  player.src = ""
  recorder.start()
  setTimeout(() => {
    // 10秒後に停止する
    const url = recorder.stop()
    player.src = url
    downloadLink.href = url
    status.style = "display: none;"
    downloadLink.style = "display: inline;"
  }, 10 * 1000)
})
