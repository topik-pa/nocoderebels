<script setup>
const props = defineProps({
  avatars: {
    type: Array,
    required: true
  }
})
defineEmits(['showAvtrInfo', 'hideAvtrInfo'])

const angles = [
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
  [172, 162, 153, 144, 133, 68, 58, 47, 36, 27, 18, 7, 0],
  [180, 172, 162, 153, 144, 133, 68, 58, 47, 36, 27, 18, 7, 0],
  [180, 172, 162, 153, 144, 133, 122, 68, 58, 47, 36, 27, 18, 7, 0],
  [180, 172, 162, 153, 144, 133, 122, 90, 68, 58, 47, 36, 27, 18, 7, 0],
  [180, 172, 162, 153, 144, 133, 122, 90, 78, 68, 58, 47, 36, 27, 18, 7, 0],
  [180, 172, 162, 153, 144, 133, 122, 112, 90, 78, 68, 58, 47, 36, 27, 18, 7, 0],
  [180, 172, 162, 153, 144, 133, 122, 112, 102, 90, 78, 68, 58, 47, 36, 27, 18, 7, 0],
  [180, 172, 162, 153, 144, 133, 122, 112, 102, 95, 86, 78, 68, 58, 47, 36, 27, 18, 7, 0]
]
</script>

<template>
  <div class="avatars">
    <div
      v-for="(avatar, k) in props.avatars"
      :key="k"
      class="avatar"
      :style="{ '--angle': angles[props.avatars.length - 1][k] + 'deg' }"
      @mouseenter="$emit('showAvtrInfo', $event, avatar)"
      @mouseleave="$emit('hideAvtrInfo')"
    >
      <img :src="avatar.img" alt="Avatar" />
    </div>
  </div>
</template>

<style scoped>
.avatar {
  width: calc(var(--avatarbasesize) * 2);
  height: calc(var(--avatarbasesize) * 2);
  position: absolute;
  left: calc(50% - var(--avatarbasesize));
  bottom: var(--radius);
  translate: calc(cos(var(--angle)) * var(--radius)) calc(sin(var(--angle)) * var(--radius) / -1);
  transition: all .6s ease-out;
}
.avatar > img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 1px solid var(--primary-color);
}
.noavatars .avatar {
  visibility: hidden;
}
.small .avatar {
  width: var(--avatarbasesize);
  height: var(--avatarbasesize);
}
.big .avatar {
  width: calc(var(--avatarbasesize) * 3);
  height: calc(var(--avatarbasesize) * 3);
}
</style>
