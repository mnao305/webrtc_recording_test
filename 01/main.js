let mediaRecorder
let stream
let url

// ボタンとか取ってきてるだけ
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
  // urlがもうすでに存在していたら開放する
  if(url) URL.revokeObjectURL(url)
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
    // Chromeではwebmしか使えない、らしい。
    mimeType: 'audio/webm',
  })
  mediaRecorder.start();
}

function captureStop() {
  mediaRecorder.stop()

  mediaRecorder.ondataavailable = (e) => {
    // Blobデータが利用可能になったら、そのデータのURLをプレイヤーとリンクに入れる
    url = URL.createObjectURL(e.data)
    player.src = url
    downloadLink.href = url
  }
  // デバイスの開放。これをしないとマイクがずっとキャプチャ状態になるよ
  stream.getTracks().forEach(track => track.stop());
}