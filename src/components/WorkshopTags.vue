<template>
  <div class="workshop-body-tag-container">
    <VcAFilterTag class="tag" v-for="tag in tags" :key="tag" field :value="tag" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class WorkshopTags extends Vue {
  @Prop() private tags!: string[];
}
</script>

<style scoped lang="less">

.workshop-body-tag-container {
  margin: 0.5em;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.tag {
  flex-shrink: 1;
}

</style>
