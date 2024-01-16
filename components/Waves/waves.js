/* 注册全局组件 */
Vue.component('waves', {
  template: `
    <canvas id="canvas" style="position:absolute;top:0px;left:0px;z-index:1;">抱歉您的浏览器不支持canvas！</canvas>
  `,
  props: {
    lines: {
      type: Array,
      default: [
        "rgba(241,109,88, 0.2)",
        "rgba(241,109,88, 0.2)",
        "rgba(241,109,88, 0.2)",
        "rgba(241,109,88, 0.5)",
      ]
    },
    render: {
      type: Function
    }
  },
  data() {
    return {}
  },
  mounted() {
    this.renderWaves();
  },
  methods: {
    render() {
      this.$emit('render', 1);
      this.renderWaves();
    },
    //* 初始化水波
    renderWaves() {
      let canvas = document.getElementById('canvas');
      let ctx = canvas.getContext('2d');
      canvas.width = canvas.parentNode.offsetWidth;
      canvas.height = canvas.parentNode.offsetHeight;
      //如果浏览器支持requestAnimFrame则使用requestAnimFrame否则使用setTimeout  
      window.requestAnimFrame = (function () {
        return window.requestAnimationFrame ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame ||
          function (callback) {
            window.setTimeout(callback, 1000 / 60);
          };
      })();
      //初始角度为0  
      let step = 0;
      //定义三条不同波浪的颜色  
      let lines = this.lines;

      function loop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        step++;
        //画3个不同颜色的矩形  
        for (let j = lines.length - 1; j >= 0; j--) {
          ctx.fillStyle = lines[j];
          //每个矩形的角度都不同，每个之间相差45度  
          let angle = (step + j * 100) * Math.PI / 180;
          let deltaHeight = Math.sin(angle) * 50;
          let deltaHeightRight = Math.cos(angle) * 50;
          ctx.beginPath();
          ctx.moveTo(0, canvas.height / 2 + deltaHeight);
          ctx.bezierCurveTo(canvas.width / 2, canvas.height / 2 + deltaHeight - 50, canvas.width / 2, canvas
            .height / 2 + deltaHeightRight - 50, canvas.width, canvas.height / 2 + deltaHeightRight);
          ctx.lineTo(canvas.width, canvas.height);
          ctx.lineTo(0, canvas.height);
          ctx.lineTo(0, canvas.height / 2 + deltaHeight);
          ctx.closePath();
          ctx.fill();
        }
        requestAnimFrame(loop);
      }
      loop();
    },
  }
});