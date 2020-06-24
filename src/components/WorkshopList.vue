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
      <div class="searchBar">
        <AutoComplete
          class="my-autoComplete"
          :multiple="true"
          v-model="selectedQueries"
          :suggestions="filteredQueriesMultiple"
          @complete="completeQueries($event)"
          @item-select="addFilter($event)"
          @item-unselect="removeFilter($event)"
          placeholder="Suche"
        />
        <div class="montPicker">
          <Calendar
            v-model="value"
            view="month"
            dateFormat="mm.yy"
            :yearNavigator="true"
            yearRange="2000:2030"
            placeholder="Datum"
          />
        <!--{{ value }}-->
      </div>
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
  value:Date|null = null;

  public completeQueries(event:any) {
    const availableQueries =  this.workshopStore.matchingQueries(event.query);
    availableQueries.unshift(event.query) // allow unkown/incomplete queries
    this.selectedQueries.forEach(element => { //remove already selected queries from suggestions
      const index = availableQueries.indexOf(element);
      if (index > -1) {
        availableQueries.splice(index, 1);
      }
    });
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

.searchBar {
  display: flex;
  align-items: stretch;
  flex-wrap: wrap;
}

.my-autoComplete {
  margin-top: 1em;
  margin-bottom: 1em;
}

.searchBar /deep/ .p-autocomplete {
  flex: 1;
  min-width: 10em;
  display: unset;
}

.searchBar /deep/ .p-autocomplete-multiple-container {
  flex-wrap: wrap;
}

.searchBar /deep/ .p-autocomplete-token {
  margin: .05em;
}

.montPicker {
  margin-top: 1em;
  margin-bottom: 1em;
}


</style>
