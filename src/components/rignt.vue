<template>
  <div id="app">
    <div id="container">
      <canvas ref="canvasRef" width="320" height="320" ></canvas>
    </div>
    <div id="params">
      <section>
        <label >绘制图形：</label>
        <select v-model="type" v-on:change="change">
          <option v-for="item in shapes" :key="item.value" :value="item.value">
          {{ item.label }}
          </option>
        </select>
      </section>
      <section >
        <label >边框宽度:</label>
        <input  type="number" v-model="lineWidth" v-on:change="change"></section>
      <section >
        <label >面积比例:</label>
        <input  type="number" min="1" max="100" step="1" v-model="range" v-on:change="change">
      </section>
      <section >
        <label >起始比例:</label>
        <input  type="number" min="1" max="100" step="1" v-model="startRang" v-on:change="change">
      </section>
      <section >
        <label >添加波浪:</label>
        <input  type="button" value="添加" v-on:click="addWave">
      </section>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import Wave from '@/utils/wave';
import Retina from '@/utils/retina';

const shapes = ref([
  { label: 'circle', value: 'circle' },
  { label: 'star', value: 'star' },
  { label: 'roundRect', value: 'roundRect' },
  { label: 'heart', value: 'heart' },
  { label: 'star', value: 'star' },
]);

 const type = ref("circle")
    , canvasRef = ref(null)
    , n = ref(!1)
    , width = ref(320)
    , height = ref(320)
    , startRang = ref(30)
    , range = ref(60)
    , c = ref(0)
    , lineWidth = ref(2)
    , base = new Wave({
        canvasWidth: width.value,
        canvasHeight: height.value,
        lineWidth: lineWidth.value
    })
    , wave1 = new Wave({
        canvasWidth: width.value,
        canvasHeight: height.value,
        waveWidth: .055,
        waveHeight: 4,
        colors: ["#F39C6B", "#A0563B"],
        xOffset: 0,
        speed: .04
    })
    , wave2 = new Wave({
        canvasWidth: width.value,
        canvasHeight: height.value,
        waveWidth: .04,
        waveHeight: 3,
        colors: ["rgba(243, 156, 107, 0.48)", "rgba(160, 86, 59, 0.48)"],
        xOffset: 2,
        speed: .02
    })
    , waves = [];
let nowRange = 0;
waves.push(wave1);
waves.push(wave2);

const change = ()=>{
    const ctx = canvasRef.value?.getContext("2d");
    ctx?.reset(),
    redraw(ctx),
    nowRange = startRang.value
}

let Y = 0;
const init = ()=>{
    const ctx = canvasRef.value?.getContext("2d");
    let I = (100 - range.value) / 100 + .0125;
    nowRange != range.value && (I = 1),
    ctx?.clearRect(0, 0, width.value, height.value * I),
    // base.drawBackground(ctx, c.value),
    nowRange <= range.value && (nowRange += 1),
    nowRange > range.value && (nowRange -= 1),
    waves.forEach((X) => {
        X.update({
            nowRange: nowRange
        }),
        X.draw(ctx),
        X.dict(ctx),
        nowRange !== range.value && window.cancelAnimationFrame(Y)
    }),
    Y = window.requestAnimationFrame(init)
}
const redraw = (ctx)=>{
    switch (n.value = !0,
    c.value = 0,
    type.value) {
    case "circle":
        base.drawCircle(ctx, lineWidth.value);
        break;
    case "star":
        base.drawStar(ctx, lineWidth.value);
        break;
    case "roundRect":
        base.drawRoundRect(ctx, lineWidth.value,100,10,100,250);
        break;
    case "heart":
        c.value = 12,
        base.drawHeart(ctx, lineWidth.value);
        break
    }
}
const addWave = ()=>{
    let ctx = new Wave({
        canvasWidth: width.value,
        canvasHeight: height.value,
        waveWidth: .04,
        waveHeight: 3,
        colors: ["rgba(255, 255, 255, 0.2)", "rgba(88, 88, 88, 0.2)"],
        xOffset: 4,
        speed: .08
    });
    waves.push(ctx)
}
onMounted(()=>{
    Retina.run(canvasRef.value);
    change();
    init()
})
</script>


<style scoped>
html {padding: 0; margin: 0;}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  display: flex;
}

#container {
    padding: 3px;
    background-color: #8663c3;
    margin-right: 3px
}

#params {
    padding: 20px 5px 2px;
    background: #42b883;
    display: flex;
    flex-direction: column
}

#params section {
    width: 100%;
    margin: 3px;
    display: flex
}

label {
    color: #0e3b30;
    font-size: 14px;
    width: 80px
}

input,select,button {
    width: 80px!important;
    border-radius: 3px;
    background-color: #faebd7;
    border: none;
    color: #8663c3
}


</style>
