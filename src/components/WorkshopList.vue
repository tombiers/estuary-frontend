<template>
  <div>
    <Button
      class="testButton"
      label="Lade Test Workshops"
      icon="pi pi-check"
      iconPos="right"
      @click="getWorkshops()"
      :disabled="loadDisabled"
    />
    <div class="p-grid">
      <div class="p-col-4" v-for="workshop in someWorkshops" :key="workshop.id">
        <WorkshopCard v-bind:workshop="workshop" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import WorkshopCard from "@/components/WorkshopCard.vue";
import { Workshop } from "@/shared/models/Workshop.model.ts";
import { Place } from "@/shared/models/Place.model.ts";

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
    this.someWorkshops.push(
      new Workshop(
        24,
        "noch einer",
        new Place("Hamburg", "https://goo.gl/maps/mbnen1jr8C81J6vU9"),
        1592212009205,
        ["gelb", "blau", "grün", "rot"],
        987
      )
    );
    this.someWorkshops.push(
      new Workshop(
        1,
        "der zweite",
        new Place("Berlin"),
        1592314101605,
        ["abcd", "fghi", "poiu"],
        37
      )
    );
    this.someWorkshops.push(
      new Workshop(
        33,
        "another Workshop",
        new Place("Berlin", "https://goo.gl/maps/TS79zqdFXi2tsekE6"),
        1591316104625,
        ["hjk", "sdf"],
        87
      )
    );
    this.loadDisabled = true;
  }
}

// TODO: Get workshops from vuex store and instantiate WorkshopCards
</script>

<style scoped lang="less">
.testButton {
  margin: 1em;
}

</style>
