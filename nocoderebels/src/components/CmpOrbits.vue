<script setup>
import { ref } from 'vue'
import { useDebounceFn } from '@vueuse/core'
import CmpAvatars from './CmpAvatars.vue'
import CmpAvatarInfo from './CmpAvatarInfo.vue'

const props = defineProps({
  orbits: {
    type: Object,
    required: true
  }
})

let zooms = ref([8, 7, 6, 5, 4, 3, 2, 1, 0])
let zoom = ref(7)
const baseRadius = 8
const edges = {
  hide: 0 * baseRadius,
  noavatars: 1 * baseRadius,
  smallavatar: 3 * baseRadius,
  bigavatar: 7 * baseRadius
}

const onWheel = useDebounceFn((ev) => {
  if (ev.deltaY < 0 && zoom.value <= 13) {
    zoom.value += 1
    for (let i = 0; i < props.orbits.length; i++) {
      zooms.value[i] = zooms.value[i] += 1
    }
  } else if (ev.deltaY > 0 && zoom.value > 0) {
    zoom.value -= 1
    for (let i = 0; i < props.orbits.length; i++) {
      zooms.value[i] = zooms.value[i] -= 1
    }
  }
}, 50)

const avtrinfo = ref({
  xPos: undefined,
  yPos: undefined,
  visible: false,
  avatar: undefined
})
const showAvtrInfo = (ev, avatar) => {
  avtrinfo.value.xPos = ev.x,
  avtrinfo.value.yPos = ev.y,
  avtrinfo.value.avatar = avatar,
  avtrinfo.value.visible = true
}
const hideAvtrInfo = () => {
  avtrinfo.value.visible = false
}
</script>

<template>
  <div>
    <ul class="orbits" @wheel="onWheel">
      <li
        v-for="(orbit, i) in orbits"
        :key="i"
        class="orbit"
        :class="{
          hide: zooms[i] <= edges.hide,
          noavatars: zooms[i] * baseRadius <= edges.noavatars,
          small: zooms[i] * baseRadius > edges.hide && zooms[i] * baseRadius <= edges.smallavatar,
          big: zooms[i] * baseRadius >= edges.bigavatar
        }"
        :style="{
          '--moltiply': zooms[i],
          '--base': baseRadius + 'rem',
          '--radius': (zooms[i] * baseRadius) / 2 + 'rem',
          '--count': orbit.array.length
        }"
      >
        <span class="date">
          {{ new Date(orbit.contact_date).toLocaleDateString() }}
        </span>
        <CmpAvatars
          :avatars="orbit.array"
          @showAvtrInfo="showAvtrInfo"
          @hideAvtrInfo="hideAvtrInfo"
        />
      </li>
    </ul>
    <CmpAvatarInfo :avtrinfo="avtrinfo" />
  </div>
</template>

<style scoped>
.orbits {
  width: 100vw;
  height: 100vh;
  background-color: var(--secondary-color);
  padding: 0;
}
.orbit {
  position: absolute;
  bottom: calc(var(--base) * var(--moltiply) / -2);
  left: calc(50% - (var(--base) * var(--moltiply)) / 2);
  border: 1px solid var(--primary-color);
  border-radius: 50%;
  width: calc(var(--base) * var(--moltiply));
  height: calc(var(--base) * var(--moltiply));
  transition: width 0.6s ease-out, height 0.6s ease-out, bottom 0.6s ease-out, left 0.6s ease-out;
  list-style: none;
}
.date {
  display: table;
  margin: auto;
  top: -0.5rem;
  background: var(--secondary-color);
  padding: 0 0.5rem;
  position: relative;
  font-size: 0.7rem;
  color: var(--primary-color);
  font-style: italic;
}
</style>
