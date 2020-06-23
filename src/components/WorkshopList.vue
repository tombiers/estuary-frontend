<template>
  <div>
    <div>
    <Button
      class="testButton"
      label="Lade Test Workshops"
      icon="pi pi-check"
      icon-pos="left"
      @click="getWorkshops()"
      :disabled="loadDisabled"
    />
    </div>
      <div class="myAuto">
        <AutoComplete 
          class="testButton"
          :multiple="true" 
          v-model="selectedQueries" 
          :suggestions="filteredQueriesMultiple" 
          @complete="completeQueries($event)"
          @item-select="addFilter($event)"
          @item-unselect="removeFilter($event)"
        />
      </div>
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

  addFilter(event: any) {
    this.workshopStore.addFilter(event.value);
  }

  removeFilter(event: any) {
    this.workshopStore.removeFilter(event.value);
  }
}
</script>

<style scoped lang="less">
.testButton {
  margin: 1em;
}

.myAuto {
  display: flex;
}

.myAuto /deep/ .p-autocomplete {
  flex: 1;
  display: unset;
}

.myAuto /deep/ .p-autocomplete-multiple-container {
  flex-wrap: wrap;
}

.myAuto /deep/ .p-autocomplete-token {
  margin: .05em;
}

</style>
