<script setup>
import { ref, onBeforeMount } from 'vue'
import { useDebounceFn } from '@vueuse/core'

let orbits = ref([])
let zoom = ref(3)
let mask = ref([])
let baseRadius = 7
let angles = [
  [90],
  [120, 60],
  [120, 90, 60],
  [150, 110, 70, 30],
  [150, 120, 90, 60, 30],
  [180, 150, 110, 70, 30, 0],
  [180, 150, 110, 70, 30, 10, 0],
  [180, 170, 150, 110, 70, 30, 10, 0],
  [180, 170, 150, 110, 100, 70, 30, 10, 0],
  [162, 153, 144, 133, 68, 58, 47, 36, 27, 18],
  [174, 158, 144, 128, 109, 90, 69, 50, 35, 23, 7],
  [172, 162, 148, 130, 118, 104, 75, 60, 47, 36, 27, 18],
  [172, 162, 153, 144, 133, 68, 58, 47, 36, 27, 18, 7],
  [180, 172, 162, 153, 144, 133, 68, 58, 47, 36, 27, 18, 7, 0],
  [180, 172, 162, 153, 144, 133, 122, 68, 58, 47, 36, 27, 18, 7, 0],
  [180, 172, 162, 153, 144, 133, 122, 90, 68, 58, 47, 36, 27, 18, 7, 0],
  [180, 172, 162, 153, 144, 133, 122, 90, 78, 68, 58, 47, 36, 27, 18, 7, 0],
  [180, 172, 162, 153, 144, 133, 122, 112, 90, 78, 68, 58, 47, 36, 27, 18, 7, 0],
  [180, 172, 162, 153, 144, 133, 122, 112, 102, 90, 78, 68, 58, 47, 36, 27, 18, 7, 0],
  [180, 172, 162, 153, 144, 133, 122, 112, 102, 95, 86, 78, 68, 58, 47, 36, 27, 18, 7, 0]
]

onBeforeMount(async () => {
  await getRemoteData()
})

const setMask = () => {
  mask.value = []
  let _zoom = zoom.value
  for (let i = 0; i < orbits.value.length; i++) {
    mask.value.push(i - _zoom)
  }
}

const onWheel = useDebounceFn((ev) => {
  if (ev.deltaY < 0 && zoom.value > -1) {
    zoom.value -= 1
  } else if (ev.deltaY > 0 && zoom.value <= 7) {
    zoom.value += 1
  }
  setMask()
}, 50)

const getRemoteData = () => {
  fetch('https://xsrr-l2ye-dpbj.f2.xano.io/api:oUvfVMO5/receive_week?start_date=2024-7-12')
    .then((response) => response.json())
    .then((json) => {
      orbits.value = json
      setMask()
    })
}
</script>

<template>
  <main>
    <ul class="orbits" @wheel="onWheel">
      <li
        v-for="(orbit, i) in orbits"
        :key="i"
        class="orbit"
        :class="{
          hide: mask[i] <= 0,
          none: mask[i] * baseRadius <= 7,
          small: mask[i] * baseRadius >= 7 && mask[i] * baseRadius <= 21,
          big: mask[i] * baseRadius >= 49
        }"
        :style="{
          '--moltiply': mask[i],
          '--base': baseRadius + 'rem',
          '--radius': (mask[i] * baseRadius) / 2 + 'rem',
          '--count': orbit.array.length
        }"
      >
        <span class="date">
          {{ new Date(orbit.contact_date).toLocaleDateString()}}
        </span>
        <div
          class="avatar"
          :style="{ '--angle': angles[orbit.array.length - 1][k] + 'deg' }"
          v-for="(person, k) in orbit.array"
          :key="k"
        ></div>
      </li>
    </ul>
  </main>
</template>

<style scoped>
.orbits {
  width: 100vw;
  height: 100vh;
}
.orbit {
  position: absolute;
  bottom: calc(var(--base) * var(--moltiply) / -2);
  left: calc(50% - (var(--base) * var(--moltiply)) / 2);
  border: 1px solid red;
  border-radius: 50%;
  width: calc(var(--base) * var(--moltiply));
  height: calc(var(--base) * var(--moltiply));
  transition: width 0.6s ease-out, height 0.6s ease-out, bottom 0.6s ease-out, left 0.6s ease-out;
  list-style: none;
}

.date {
    display: block;
    width: 4rem;
    text-align: center;
    top: 0;
    background: white;
    top: -.2rem;
    margin: 0 auto;
    position: relative;
    font-size: 0.6rem;
    color: gray;
    font-style: italic;
}

.avatar {
  width: 1.4rem;
  height: 1.4rem;
  border-radius: 50%;
  border: 1px solid red;
  position: absolute;
  left: calc(50% - 0.7rem);
  bottom: var(--radius);
  transform-origin: 50% 50%;
  translate: calc(cos(var(--angle)) * var(--radius)) calc(sin(var(--angle)) * var(--radius) / -1);
  transition: all 0.6s ease-out;
}
.none .avatar {
  visibility: hidden;
}

.small .avatar {
  width: 0.7rem;
  height: 0.7rem;
}
.big .avatar {
  width: 2.1rem;
  height: 2.1rem;
}
</style>