<template>
  <div>
    <Button
      class="testButton"
      label="Lade Test Workshops"
      icon="pi pi-check"
      icon-pos="left"
      @click="getWorkshops()"
      :disabled="loadDisabled"
    />
    <Button
      class="testButton"
      label="Setze Workshop Filter"
      icon="pi pi-check"
      icon-pos="left"
      @click="setWorkshopFilter()"
      :disabled="false"
    />
    <AutoComplete 
      class="testButton"
      :multiple="true" 
      v-model="selectedQueries" 
      :suggestions="filteredQueriesMultiple" 
      @complete="completeQueries($event)"
      @item-select="addFilter($event)"
      @item-unselect="removeFilter($event)"
     />
    <div class="p-grid">
      <div
        class="p-col-12 p-md-6 p-lg-4 p-xl-3"
        v-for="workshop in workshopStore.filteredWorkshops"
        :key="workshop.id"
      >
        <WorkshopCard :workshop="workshop" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import WorkshopCard from "@/components/WorkshopCard.vue";
import { Workshop } from "@/shared/models/Workshop.model.ts";
import { Place } from "@/shared/models/Place.model.ts";
import { getModule } from "vuex-module-decorators";
import WorkshopStore from "@/store/modules/Workshops.ts";

@Component({
  // Specify `components` option.
  // See Vue.js docs for all available options:
  // https://vuejs.org/v2/api/#Options-Data
  components: {
    WorkshopCard
  }
})
export default class WorkshopList extends Vue {
  loadDisabled = false;
  workshopStore = getModule(WorkshopStore);
  selectedQueries: string[] = [];
	filteredQueriesMultiple: string[] = [];

  public completeQueries(event:any) {
    const availableQueries =  this.workshopStore.matchingQueries(event.query);
    if (availableQueries.length == 0) { //enable unkonwn search terms
        availableQueries.push(event.query) 
    } 
    this.filteredQueriesMultiple = availableQueries;
  }

  getWorkshops() {
    if (this.workshopStore.workshops.length == 0) {
      console.log("no workshops in store, call test data creator.");
      this.workshopStore.createTestData();
    }
    this.loadDisabled = true;
  }

  private filterOn = false;

  setWorkshopFilter() {
    if (!this.filterOn) {
      this.workshopStore.setFilter(["Berlin", "sdf", 1591316104625]);
    } else {
      this.workshopStore.setFilter([]);
    }
    this.filterOn = !this.filterOn;
  }

  addFilter(event: any) {
    console.log("adding: " + event.value)
    this.workshopStore.addFilter(event.value);
  }

  removeFilter(event: any) {
    console.log("removing: " + event.value)
    this.workshopStore.removeFilter(event.value);
  }
}

// TODO: Get workshops from vuex store and instantiate WorkshopCards
</script>

<style scoped lang="less">
.testButton {
  margin: 1em;
}
</style>
