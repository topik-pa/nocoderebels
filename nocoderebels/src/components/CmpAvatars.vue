<script setup>
const props = defineProps({
  avatars: {
    type: Array,
    required: true
  }
})
defineEmits(['showAvtrInfo', 'hideAvtrInfo'])

const angles = [
  [102],
  [110, 64],
  [126, 102, 56],
  [110, 102, 80, 72],
  [118, 110, 102, 80, 72],
  [118, 110, 102, 80, 72, 64],
  [126, 118, 110, 102, 80, 72, 64],
  [126, 118, 110, 102, 80, 72, 64, 56],
  [134, 126, 118, 110, 102, 80, 72, 64, 56],
  [134, 126, 118, 110, 102, 80, 72, 64, 56, 48],
  [142, 134, 126, 118, 110, 102, 80, 72, 64, 56, 48],
  [142, 134, 126, 118, 110, 102, 80, 72, 64, 56, 48, 40],
  [150, 142, 134, 126, 118, 110, 102, 80, 72, 64, 56, 48, 40],
  [150, 142, 134, 126, 118, 110, 102, 80, 72, 64, 56, 48, 40, 32],
  [158, 150, 142, 134, 126, 118, 110, 102, 80, 72, 64, 56, 48, 40, 32],
  [158, 150, 142, 134, 126, 118, 110, 102, 80, 72, 64, 56, 48, 40, 32, 24],
  [166, 158, 150, 142, 134, 126, 118, 110, 102, 80, 72, 64, 56, 48, 40, 32, 24],
  [166, 158, 150, 142, 134, 126, 118, 110, 102, 80, 72, 64, 56, 48, 40, 32, 24, 16],
  [172, 166, 158, 150, 142, 134, 126, 118, 110, 102, 80, 72, 64, 56, 48, 40, 32, 24, 16],
  [172, 166, 158, 150, 142, 134, 126, 118, 110, 102, 80, 72, 64, 56, 48, 40, 32, 24, 16, 8]
]
</script>

<template>
  <div class="avatars">
    <div
      v-for="(avatar, k) in props.avatars"
      :key="k"
      class="avatar"
      :style="{ '--angle': angles[props.avatars.length - 1][k] + 'deg' }"
      
      @mouseover="$emit('showAvtrInfo', $event, avatar)"
      @mouseout="$emit('hideAvtrInfo')"
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
