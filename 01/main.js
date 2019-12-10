let mediaRecorder
let stream

const btn = document.getElementById('recordingBtn')
const player = document.getElementById('player')
const downloadLink = document.getElementById('downloadLink')
const status = document.getElementById('recordingStatus')

// ボタンがクリックされたら
btn.addEventListener('click', async () => {
  // ここでマイクの使用許可をユーザに求める
  stream = await navigator.mediaDevices.getUserMedia({
    audio: true,
    video: false
  })
  status.style = 'display: inline;'
  downloadLink.style = 'display: none;'
  player.src = ''
  captureStart()
  setTimeout(() => {
    // 10秒後に停止する
    captureStop()
    status.style = 'display: none;'
    downloadLink.style = 'display: inline;'
  }, 10 * 1000);
})

function captureStart() {
  // マイクからのメディアストリームを記録する
  mediaRecorder = new MediaRecorder(stream, {
    // Chromeではwebmしか使えない
    mimeType: 'audio/webm',
  })
  mediaRecorder.start();
}

function captureStop() {
  mediaRecorder.stop()

  mediaRecorder.ondataavailable = (e) => {
    player.src  = URL.createObjectURL(e.data)
    downloadLink.href = URL.createObjectURL(e.data)
  }
  stream.getTracks().forEach(track => track.stop());
}