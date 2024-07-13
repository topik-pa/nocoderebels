<script setup>
import { ref, onBeforeMount} from 'vue'
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
    <CmpOrbits :orbits="orbits"/>
  </main>
</template>

<style scoped>
</style>