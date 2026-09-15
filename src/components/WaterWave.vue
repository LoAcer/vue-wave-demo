<template>
  <div class="content page">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script>
  import Wave from "../utils/wave";
  import Retina from "../utils/retina"

  export default {
    name: "WaterWave",
    props:['type'],
    data(){
      return {
        canvas:null,
        isDrawContainer:false,
      }
    },
    methods:{
      drawCanvas() {
        const ctx = this.canvas.getContext('2d');
        ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        if (!this.isDrawContainer) {
          this.drawContainer(ctx);
        }
        this.base.drawBackground(ctx);
        if (this.nowRange <= this.rangeValue) {
          this.nowRange += 1;
        }
        if (this.nowRange > this.rangeValue) {
          this.nowRange -= 1;
        }
        this.wave2.update({
          nowRange: this.nowRange,
        });
        this.wave2.draw(ctx);
        
        this.wave1.update({
          nowRange: this.nowRange,
        });
        this.wave1.draw(ctx);
        this.wave1.dict(ctx);
        window.requestAnimationFrame(this.drawCanvas);
      },

      drawContainer(ctx) {
        ctx.reset()
        ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        switch(this.type) {
          case 'circle':
            this.base.drawCircle(ctx,2);
            break;
          case 'star':
            this.base.drawStar(ctx, 2, 200, 562);
            break;
          case 'roundRect':
            this.base.drawRoundRect(ctx,2);
            break;
          case 'heart':
            this.base.drawHeart(ctx,2);
            break;
          case 'hexagram':
            this.base.hexagram(ctx);
            break;
          case 'heartPolar':
            this.base.drawHeartPolar(ctx);
            break;
          default:
            this.base.drawCircle(ctx,2);
            break;
        }
        this.isDrawContainer = true;
      },

      redraw(){
        this.isDrawContainer = false;
        this.nowRange = 30
        this.drawCanvas();
      }

    },
    mounted() {
      const canvas = this.$refs.canvas;
      canvas.height = 600;
      canvas.width = 600;
      // 高清适配
      Retina.run(canvas);

      this.canvas = canvas;
      this.canvasWidth = canvas.width;
      this.canvasHeight = canvas.height;
      
      this.nowRange = 0;
      this.rangeValue = 60;
      this.base = new Wave({
        canvasWidth: this.canvasWidth,
        canvasHeight: this.canvasHeight
      });
      this.wave1 = new Wave({
        canvasWidth: this.canvasWidth, // 轴长
        canvasHeight: this.canvasHeight, // 轴高
        waveWidth: 0.055, // 波浪宽度,数越小越宽
        waveHeight: 4, // 波浪高度,数越大越高
        colors: ['#F39C6B', '#A0563B'], // 波浪颜色
        xOffset: 0, // 初始偏移
        speed: 0.04, // 速度
      });
      this.wave2 = new Wave({
        canvasWidth: this.canvasWidth, // 轴长
        canvasHeight: this.canvasHeight, // 轴高
        waveWidth: 0.04, // 波浪宽度,数越小越宽
        waveHeight: 3, // 波浪高度,数越大越高
        colors: ['rgba(243, 156, 107, 0.48)', 'rgba(160, 86, 59, 0.48)'], // 波浪颜色
        xOffset: 2, // 初始偏移
        speed: 0.02, // 速度
      });
      this.drawCanvas();
    }, 
    watch:{
      type:function(n, o){
        this.redraw();
      }
    }
  }
</script>

<style scoped>

</style>
