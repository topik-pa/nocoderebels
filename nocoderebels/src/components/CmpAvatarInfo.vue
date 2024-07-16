<script setup>
const props = defineProps({
  avtrinfo: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div
    class="avtrinfo"
    :class="{ visible: props.avtrinfo.visible }"
    :style="{ '--x': props.avtrinfo.xPos + 'px', '--y': props.avtrinfo.yPos + 'px' }"
    v-if="props.avtrinfo.visible"
  >
    <img :src="props.avtrinfo.avatar?.img" alt="Avatar image" />
    <div>
      <h2 class="name">{{ props.avtrinfo.avatar?.name }}</h2>
      <div class="position">{{ props.avtrinfo.avatar?.position }}</div>
      <div class="city">{{ props.avtrinfo.avatar?.city }}</div>
    </div>
  </div>
</template>

<style scoped>
.avtrinfo {
  justify-content: space-between;
  align-items: center;
  background: white;
  padding: 0.4rem;
  border: 1px solid var(--primary-color);
  top: calc(var(--avatarbasesize) * 2 + var(--y));
  position: absolute;
  left: calc(var(--avatarbasesize) * 2 + var(--x));
  display: flex;
  opacity: 0;
  transition: opacity .6s ease-out;
}
.avtrinfo.visible {
  opacity: 1;
}
.avtrinfo img {
  width: calc(var(--avatarbasesize) * 4);
  height: calc(var(--avatarbasesize) * 4);
  border-radius: 50%;
}
.avtrinfo > div {
  margin-left: var(--avatarbasesize);
  font-size: var(--avatarbasesize);
  padding-left: var(--avatarbasesize);
  border-left: 1px solid var(--primary-color);
}
</style>
