<template>
  <div>
    客户
    <button @click="exportJSON">导出jsonn</button>
    <div id="printOrder-data">连接打印机</div>
    <button @click="doPrintVue">打印</button>
    <button @click="dividePrint">分页打印</button>
    <section id="pagesPrint">
      分页打印
      <div class="no-print">不打印</div>
      <!--要实现分页打印功能，只需在要打印的地方加入下面这个代码就行了-->
      <!-- page-break-after属性只能应用于块状元素，
        在一些非块状元素使用时需添加display： block。
        另外在使用window.print()打印时，实现分页需要在最外层设置，
        否则打印时只会打印分页中的第一页。-->
      <div  style="page-break-before:always;"><br /></div>
    </section>

    <button @click="openNewWindow">打开新窗口</button>
  </div>
</template>

<script>
import FileSaver from 'file-saver'
export default {
  data () {
    return {
      // 待导出的json数据
      CfgInfo: [{
        CAN: {
          Chn: 0,
          name: 'CAN通道'
        },
        LIN: {
          Chn: 1,
          name: 'LIN通道'
        }
      }]
    }
  },
  methods: {
    // 连接打印机
    // 打印
    doPrintVue: function () {
      var newstr = document.getElementById('printOrder-data').innerHTML
      document.body.innerHTML = newstr
      window.print()
      // 重新加载页面，以刷新数据
      window.location.reload()
    },
    // 分页打印
    dividePrint () {
      var iframe = document.getElementById('print-iframe')
      if (!iframe) {
        var el = document.getElementById('pagesPrint').innerHTML

        iframe = document.createElement('iframe')
        var doc = null
        iframe.setAttribute('id', 'print-iframe')
        iframe.setAttribute('style', 'position:absolute;width:0px;height:0px;left:-500px;top:-500px;')
        window.document.body.appendChild(iframe)
        doc = iframe.contentWindow.document// 这里可以自定义样式
        // doc.write("<LINK rel="stylesheet" type="text/css" href="css/print.css">");
        doc.write('<div style="color:red">' + el + '</div>')

        // 获取不需要打印的内容，隐藏它们
        var noPrints = doc.getElementsByClassName('no-print')
        console.log('doc: ', doc.getElementsByClassName('no-print'))
        for (var i = 0; i < noPrints.length; i++) {
          console.log('noPrints: ', noPrints[i])
          noPrints[i].style.display = 'none'
        }
        doc.close()
        iframe.contentWindow.focus()
      }

      iframe.contentWindow.print()

      // 这样即使取消打印，也会删掉打印的iframe的dom
      document.body.removeChild(iframe)

      // if (navigator.userAgent.indexOf('MSIE') > 0) {
      //   document.body.removeChild(iframe)
      // }
    },
    // 导出为json文件
    exportJSON () {
      // 将json转换成字符串
      const data = JSON.stringify(this.CfgInfo)
      const blob = new Blob([data], {type: ''})
      FileSaver.saveAs(blob, 'hahaha.json')
    },
    // 打开新窗口
    openNewWindow () {
      let routeData = this.$router.resolve({
        name: 'customers',
        query: {
          name: 'lei',
          age: 18,
          phoneNum: 12345678901
        }
      })

      window.open(routeData.href, '_blank')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
