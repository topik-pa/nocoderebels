<script setup>
import { ref, onBeforeMount } from 'vue'
import CmpOrbits from './components/CmpOrbits.vue'

let orbits = ref([])

onBeforeMount(async () => {
  await getRemoteData()
})
const getRemoteData = () => {
  fetch('https://xsrr-l2ye-dpbj.f2.xano.io/api:oUvfVMO5/receive_week?start_date=2024-7-12')
    .then((response) => response.json())
    .then((json) => {
      orbits.value = json
    })
}
</script>

<template>
  <main>
    <CmpOrbits :orbits="orbits" />
    <div id="shadow"></div>
  </main>
</template>

<style scoped>
main {
  --avatarbasesize: .8rem;
  --primary-color: #ffffff;
  --secondary-color: #111111;
}
#shadow {
  position: absolute;
  bottom: 0;
  height: 0px;
  width: 100%;
  background: gray;
  box-shadow: 0px 0px 40px 60px var(--secondary-color);
}
</style>