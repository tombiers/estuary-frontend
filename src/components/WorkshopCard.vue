<template>
  <VcABox :title="headline()" :expand="true" class="vca-blue-background vca-more-shadow workshop">
    <template slot="header">{{ date() }}</template>
    <div>I have been tagged with</div>
    <div class="p-grid tags">
      <VcAFilterTag class="p-col" v-for="tag in workshop.tags" :key="tag" 
        field="" 
        :value="tag" 
      />
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
.workshop {
  height: 100%;
}

.tags {
  margin: .5em;
}


</style>
