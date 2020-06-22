<template>
  <VcABox
    id="card"
    :title="headlineWithDate()"
    :expand="true"
    class="vca-blue-background vca-more-shadow workshop"
  >
    <template slot="header">
      <span class="p-overlay-badge">
      <span class="p-badge p-badge-info">{{workshop.upvotes}}</span>
      <i class="pi pi-thumbs-up" style="font-size: 2em"></i>
      </span>
    </template>
    <div class="p-grid tags">
      <VcAFilterTag 
        class="p-col" 
        v-for="tag in workshop.tags" :key="tag" 
          field 
          :value="tag" 
      />
    </div>
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
  headlineWithDate() {
    return this.headline() + " " + this.date();
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

.likes-text {
  color: blue;
  font-size: 2em;
  align-content: center;
}

.likes-thumb {
  color: blue;
  font-size: 1em;
  align-content: center;
}
</style>
