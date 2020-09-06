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
      <Button
        class="testButton"
        :label="$t('createWorkshop')"
        icon="pi pi-plus"
        icon-pos="left"
        @click="createNewWorkshop()"
        :disabled="createNew"
      />
    </div>
    <div class="searchBar">
      <div class="monthPicker">
        <Calendar
          v-model="datepicker"
          view="month"
          dateFormat="mm.yy"
          :yearNavigator="true"
          yearRange="2000:2030"
          :placeholder="$t('date')"
          :showIcon="true"
          @date-select="filterDate($event)"
        />
      </div>
      <AutoComplete
        class="my-autoComplete"
        :multiple="true"
        v-model="selectedQueries"
        :suggestions="filteredQueriesMultiple"
        @complete="completeQueries($event)"
        @item-select="addFilter($event)"
        @item-unselect="removeFilter($event)"
        :placeholder="$t('search')"
        field="display"
      />
    </div>
    <div class="p-grid">
      <div class="p-col-12 p-md-6 p-lg-4 p-xl-3" v-if="createNew">
        <WorkshopNewCard
          @cancel="cancelCreate()"
        />
      </div>
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
import WorkshopNewCard from "@/components/WorkshopNewCard.vue";
import { BaseWorkshop } from "@/shared/models/BaseWorkshop.model.ts";
import { getModule } from "vuex-module-decorators";
import WorkshopStore from "@/store/modules/Workshops.ts";
import { AutoCompleteItem } from "@/shared/models/AutoCompleteItem.model.ts";
import ProblemStatementStore from '../store/modules/ProblemStatements';

@Component({
  // Specify `components` option.
  // See Vue.js docs for all available options:
  // https://vuejs.org/v2/api/#Options-Data
  components: {
    WorkshopCard,
    WorkshopNewCard
  }
})
export default class WorkshopList extends Vue {
  loadDisabled = false;
  workshopStore = getModule(WorkshopStore);
  selectedQueries: AutoCompleteItem[] = this.workshopStore.activeFilterQueries.map(query =>  new AutoCompleteItem(query));
  filteredQueriesMultiple: AutoCompleteItem[] = [];
  datepicker: Date | null = null;
  createNew = false;

  public completeQueries(event: any) {
    const availableQueries = this.workshopStore.matchingQueries(event.query);
    availableQueries.unshift(event.query); // allow unkown/incomplete queries
    this.selectedQueries.forEach(({value}) => { //remove already selected string queries from suggestions
      if (typeof value === "string") {
        const index = availableQueries.indexOf(value);
        if (index > -1) {
          availableQueries.splice(index, 1);
        }
      }
    });
    this.filteredQueriesMultiple = []; // remove old items
    availableQueries.forEach(query => {
      this.filteredQueriesMultiple.push(new AutoCompleteItem(query));
    });
  }

  getWorkshops() {
    if (this.workshopStore.workshops.length == 0) {
      console.log("no workshops in store, call test data creator.");
      this.workshopStore.fetchWorkshops();
      getModule(ProblemStatementStore).generateTestData();
    }
    this.loadDisabled = true;
  }

  filterDate(event: Date) {
    this.selectedQueries.push(new AutoCompleteItem(Number(event)));
    this.workshopStore.addFilter(Number(event));
    this.datepicker = null;
  }

  addFilter(event: any) {
    this.workshopStore.addFilter(event.value.value);
  }

  removeFilter(event: any) {
    this.workshopStore.removeFilter(event.value.value);
  }

  createNewWorkshop() {
    this.createNew = true;
  }

  cancelCreate() {
    this.createNew = false;
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
  margin: 0.05em;
}

.monthPicker {
  margin-top: 1em;
  margin-bottom: 1em;
  margin-right: 0.25em;
  //margin-left: .25em;
}

.monthPicker /deep/ .p-inputtext {
  display: none;
}

.monthPicker /deep/ .p-monthpicker {
  width: 15em;
}

.monthPicker /deep/ .p-button {
  display: unset;
  border-radius: 5px;
}
</style>
