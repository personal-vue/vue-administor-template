// 基准大小
const baseSize = 16
// 设置 rem 函数
function setRem () {
  // 当前页面宽度相对于 1920 宽的缩放比例。
  const scale = document.documentElement.clientWidth / 1920

  // 设置页面根节点字体大小（“Math.min(scale, 2)” 指最高放大比例为 2，可根据实际业务需求自行调整）
  const fontSizeNum = baseSize * Math.min(scale, 2)

  // 设置页面根节点字体大小
  document.documentElement.style.fontSize = fontSizeNum + 'px'
}
// 初始化
setRem()
// 改变窗口大小时重新设置 rem
window.onresize = function () {
  setRem()
}
