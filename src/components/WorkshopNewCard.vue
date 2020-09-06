<template>
  <div class="workshop-container">
    <VcABox
      id="-1"
      title="Neuer Workshop"
      :expand="true"
      class="vca-blue-background vca-more-shadow workshop"
    >
      <template slot="header"></template>
      <div class="workshop-body">
        <div class="workshop-body-item">
          <!-- name -->
          <Calendar
          class="stretch"
            v-model="date"
            view="month"
            dateFormat="mm.yy"
            :yearNavigator="true"
            yearRange="2000:2030"
            placeholder="Datum"
            :showIcon="true"
          />
        </div>
        <div class="workshop-body-item">
          <!-- place -->
          <input type="text" v-model="place" placeholder="Ort"/>
        </div>
        <div class="workshop-body-item">
          <!-- type -->
          <Dropdown v-model="type" :options="types" optionLabel="name" placeholder="Typ auswählen" class="stretch alignLeft"/>
        </div>
        <div class="workshop-body-item">
          <!-- teaser -->
          <Textarea v-model="teaser" :autoResize="true" rows="5" placeholder="Teaser" />
        </div>
        <div class="workshop-body-item">
          <!-- create button -->
          <Button
            class="testButton"
            label="Erstelle Workshop"
            icon-pos="right"
            @click="createWorkshop"
          />
        </div>
      </div>
    </VcABox>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { BaseWorkshop, WorkshopType } from "@/shared/models/BaseWorkshop.model";
import WorkshopStore from "@/store/modules/Workshops.ts";
import { getModule } from "vuex-module-decorators";
import WorkshopTags from "@/components/WorkshopTags.vue";
import { i18n } from "@/main";
import { Workshop } from "@/shared/models/Workshop.model";
import { ProblemStatementWorkshopContent } from '@/shared/models/ProblemStatementWorkshopContent.model';
import { WorkshopContent } from '@/shared/models/WorkshopContent.model';
import { Place } from '@/shared/models/Place.model';

@Component({
  components: {
    WorkshopTags
  }
})
export default class WorkshopNewCard extends Vue {
  //@Prop() private workshop!: BaseWorkshop;

  place = "";
  date: Date | null = null;
  type = {name: "", value: WorkshopType.UNKOWN}
  types = [
    {name: i18n.t("workshopType.ps"), value: WorkshopType.PS},
    {name: i18n.t("workshopType.idea"), value: WorkshopType.IDEA}
  ];
  teaser = "";

  createWorkshop() {
    if(this.type.value !== WorkshopType.UNKOWN && this.place !== "" && this.date !== null && this.teaser !== "") {
      const workshop = new BaseWorkshop(142334, this.type.value, new Place(this.place,""), this.date.getTime(), [], 0, this.teaser); 
      const workshopStore = getModule(WorkshopStore);
      workshopStore.createWorkshop(workshop).then(newWorkshop => {
        if (typeof newWorkshop !== "undefined") {
          this.$router.push({ name: 'WorkshopDetails', params: { id: newWorkshop.id.toString() } });
        }
      });
    }
  }
}
</script>

<style scoped lang="less">
.workshop-container {
  height: 100%;
}

// overwrite the 2em margin-top of VcABox
.workshop-container /deep/ .box-card.tail {
  margin: 0;
}

.workshop-container /deep/ .el-card__body {
  flex: 1;
}

.workshop {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.workshop-body {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.workshop-body-item {
  align-self: flex-start;
  margin: 10px 0px 10px 0px;
  width: 100%;
}

.workshop-body-likes {
  align-self: flex-end;
  margin-top: auto;
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

.vca-blue-background:hover {
  background: whitesmoke;
}

textarea {
  width: 100%;
  font-size: 1em;
  padding: 0.4em;
}

input {
  width: 100%;
  font-size: 1em;
  padding: 0.4em;
}

.stretch {
  width: 100%;
}

.alignLeft {
  text-align: left;
}
</style>
