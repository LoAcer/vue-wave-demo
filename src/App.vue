<template>
  <div id="app">
    <div id="container">
      <WaterWave ref="canvasRef" :type="drawType"  />
    </div>
    <div id="params">
      <section>
        <label >绘制图形：</label>
        <select v-model="drawType">
          <option v-for="item in shapes" :key="item.value" :value="item.value">
          {{ item.label }}
          </option>
        </select>
      </section>
      <section >
        <label >边框宽度:</label>
        <input  type="number"></section>
      <section >
        <label >面积比例:</label>
        <input  type="number" min="1" max="100" step="1">
      </section>
      <section >
        <label >起始比例:</label>
        <input  type="number" min="1" max="100" step="1">
      </section>
      <section >
        <label >添加波浪:</label>
        <input  type="button" value="添加">
      </section>
    </div>
    <div id="right">
      <rignt></rignt>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import WaterWave from './components/WaterWave.vue';
import rignt from './components/rignt.vue';

const drawType = ref('star');
const shapes = ref([
  { label: 'circle', value: 'circle' },
  { label: 'star', value: 'star' },
  { label: 'roundRect', value: 'roundRect' },
  { label: 'heart', value: 'heart' },
  { label: 'star', value: 'star' },
  { label: 'hexagram',value: 'hexagram'},
  { label: 'heartPolar',value:'heartPolar'},
]);

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
