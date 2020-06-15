<template>
  <div>
    <h1>I am WorkshopCard {{ workshop.name }}.</h1>
    <h2>My id is {{ workshop.id }}.</h2>
    <h2>I was held at {{ workshop.place }}.</h2>
    <h2>The date was {{ workshop.date }}.</h2>
    <h2>I have been tagged with</h2>
    <ul>
      <li v-for="tag in workshop.tags" :key="tag">
        {{ tag }}
      </li>
    </ul>
    <h2>I got {{ workshop.upvotes }} upvotes.</h2>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Workshop } from "@/shared/models/Workshop.model";

@Component
export default class WorkshopCard extends Vue {
  @Prop() private workshop!: Workshop;

}
</script>

<style scoped lang="less">
</style>
