<template>
  <div>
    <Card>
      <template slot="title">{{ workshop.name }} {{ workshop.date }}</template>
      <template slot="content">
        <div>I am WorkshopCard {{ workshop.name }}.</div>
        <div>My id is {{ workshop.id }}.</div>
        <div v-if="workshop.place.mapLink != ''">I was held at <a :href= "workshop.place.mapLink" >{{ workshop.place.name }}</a>.</div>
        <div v-else>I was held at {{ workshop.place.name }}</div>
        <div>The date was {{ workshop.date }}.</div>
        <div>I have been tagged with</div>
        <div>
          <li v-for="tag in workshop.tags" :key="tag">{{ tag }}</li>
        </div>
        <div>I got {{ workshop.upvotes }} upvotes.</div>
      </template>
      <template slot="footer">
        <Button icon="pi pi-thumbs-up" label="Save" />
      </template>
    </Card>
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
