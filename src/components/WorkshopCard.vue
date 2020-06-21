<template>
  <VcABox
    id="card"
    :title="headline()"
    :expand="true"
    class="vca-blue-background vca-more-shadow workshop"
  >
    <template slot="header">{{ date() }}</template>
    <div>I have been tagged with</div>
    <div class="p-grid tags">
      <VcAFilterTag 
        class="p-col" 
        v-for="tag in workshop.tags" :key="tag" 
          field 
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
  headlineWithLink() {
    let re = "";
    if (this.workshop.place.mapLink != "") {
      re = `<a href="${this.workshop.place.mapLink}">${this.workshop.place.name}</a>`;
    } else {
      re = `I was held at ${this.workshop.place.name}`;
    }
    return re;
  }
}
</script>

<style scoped lang="less">
.workshop {
  height: 100%;
}

.tags {
  margin: 0.5em;
}
</style>
