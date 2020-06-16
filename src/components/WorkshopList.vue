<template>
  <div>
    <Button label="Lade Workshops" icon="pi pi-check" iconPos="right" @click="getWorkshops()" :disabled="loadDisabled" />
    <h1>Here be some Workshops <i class = "pi pi-thumbs-up"/></h1>
    <div v-for="workshop in someWorkshops" :key="workshop.id">
      <WorkshopCard v-bind:workshop = "workshop"/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import WorkshopCard from "@/components/WorkshopCard.vue";
import { Workshop } from "@/shared/models/Workshop.model.ts";

@Component({
  // Specify `components` option.
  // See Vue.js docs for all available options:
  // https://vuejs.org/v2/api/#Options-Data
  components: {
    WorkshopCard
  }
})
export default class WorkshopList extends Vue {

  someWorkshops: Workshop[] = [];
  loadDisabled = false;

  getWorkshops() {
    this.someWorkshops.push(new Workshop(24,"noch einer","Bremen",86876876, ["gelb","blau","grün","rot"], 987))
    this.someWorkshops.push(new Workshop(1, "der zweite", "Berlin", 12345678, ["abcd","fghi","poiu"], 37));
    this.someWorkshops.push(new Workshop(33, "another Workshop", "Hamburg", 321312, ["hjk","sdf"], 87));
    this.loadDisabled = true;
  }
}

// TODO: Get workshops from vuex store and instantiate WorkshopCards
</script>

<style scoped lang="less">
</style>
