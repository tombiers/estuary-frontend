<template>
  <div>
    <div
      v-if="showPsComparison"
    >
      <ProblemStatementDetails 
        :problemStatement="detailedPS"
        :Workshop="workshop"
        @openLink="eventHandler($event)"
        :editable="true"
        :openInEditMode="openInEditMode"
      />
    </div>
    <div
        class="ps-card-collection"
        v-else
      >
        <ProblemStatementCard 
          :problemStatement="ps"
          :detailed="detailed"
          :editable="true"
          class="ps-card"
          v-for="ps in workshop.content.problemStatements"
          :key="ps.id"
          @openLink="eventHandler($event)"
          @openLinkAndEdit="eventHandlerEdit($event)"
        />
      </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { getModule } from "vuex-module-decorators";
import WorkshopStore from "@/store/modules/Workshops.ts";
import { Workshop } from "@/shared/models/Workshop.model";
import { ProblemStatementWorkshopContent } from "@/shared/models/ProblemStatementWorkshopContent.model";
import ProblemStatementCard from "@/components/ProblemStatementCard.vue";
import ProblemStatementDetails from "@/components/ProblemStatementDetails.vue";
import { ProblemStatement } from '../shared/models/ProblemStatement.model';

@Component({
  components:{
    ProblemStatementCard,
    ProblemStatementDetails
    }
})
export default class PsWorkshopContent extends Vue {
  @Prop({default: true}) private detailed!: boolean;
  @Prop({default: false}) private showPsComparison!: boolean;

  private openInEditMode = false;

  workshopStore = getModule(WorkshopStore);
  workshop: Workshop<ProblemStatementWorkshopContent> = 
    this.workshopStore.selectedWorkshop as Workshop<ProblemStatementWorkshopContent>;
  showSinglePsDetails = false;
  detailedPS:ProblemStatement|null = null;

  eventHandler(id: number) {
    this.openInEditMode = false
    this.detailedPS = this.workshop.content.problemStatements[id-1];
    this.$emit('update:showPsComparison', true);
    this.goToTop();
  }

  eventHandlerEdit(id: number) {
    this.openInEditMode = true
    this.detailedPS = this.workshop.content.problemStatements[id-1];
    this.$emit('update:showPsComparison', true);
    this.goToTop();
  }

  goToTop() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  }

}

</script>

<style scoped langs="less">

.ps-card-collection {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  grid-gap: 5px;
}

.ps-card {
  text-align: center;
}


</style>