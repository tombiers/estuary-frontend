<template>
  <!--
  <Card class="p-shadow-3">
    <template slot="title">{{ workshop.type }} {{ date() }} {{ workshop.place.name }}</template>
    <template slot="content">
      <div>My Workshop Type is {{ workshop.type }}.</div>
      <div>My id is {{ workshop.id }}.</div>
      <div v-if="workshop.place.mapLink != ''">
        I was held at
        <a :href="workshop.place.mapLink">{{ workshop.place.name }}</a>.
      </div>
      <div v-else>I was held at {{ workshop.place.name }}</div>
      <div>The date was  {{ date() }}.</div>
      <div>I have been tagged with</div>
      <div>
        <li v-for="tag in workshop.tags" :key="tag">{{ tag }}</li>
      </div>
      <div>I got {{ workshop.upvotes }} upvotes.</div>
    </template>
    <template slot="footer">
      <Button icon="pi pi-thumbs-up" label="Vote" />
    </template>
  </Card>
  -->
  <VcABox :title="headline()" :expand="true" class="vca-blue-background vca-more-shadow workshop">
    <template slot="header">{{ date() }}</template>
    <div>I have been tagged with</div>
      <div v-for="tag in workshop.tags" :key="tag">
        <VcAFilterTag field="" :value="tag" />
        </div>
    <div>I got {{ workshop.upvotes }} upvotes.</div>
  </VcABox>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Workshop } from "@/shared/models/Workshop.model";

@Component
export default class WorkshopCard extends Vue {
  @Prop() private workshop!: Workshop;

  date() {
    return new Date(this.workshop.date).toDateString();
  }
  headline() {
    return this.workshop.type + " " + this.workshop.place.name;
  }
}
</script>

<style scoped lang="less">
.p-card {
  background-color: lightgreen;
  height: 100%;
}
.p-card /deep/ .p-card-body {
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  flex-direction: column;
}
.workshop {
  height: 100%;
}

</style>
