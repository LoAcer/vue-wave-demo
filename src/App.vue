<template>
  <div id="app">
    <ul>
      <li><WaterWave :type="'circle'" /></li>
      <li style="margin-top: 5px"><WaterWave :type="'star'" /></li>
      <li style=" margin-top: 22px;margin-left: -10px"><WaterWave :type="'roundRect'" /></li>
      <li style=" margin-top: 5px;margin-left: -170px"><WaterWave :type="'heart'" /></li>
    </ul>
  </div>
</template>

<script>
import WaterWave from './components/WaterWave';

export default {
  name: 'app',
  components: {
    WaterWave
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  background-color: #2c0d61;
}

ul {
  list-style: none;
  overflow: hidden;
  position: relative;
  margin: 0;
  top: 20px;
  padding: 0 20px;
}

ul li {
  float: left;
  margin-right: 40px;
}

</style>
