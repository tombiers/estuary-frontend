<template>
  <div>
    <div
      v-if="detailed"
    >
      <ProblemStatementDetails 
        :problemStatement="detailedPS"
        :Workshop="workshop"
      />
    </div>
    <div
        class="ps-card-collection"
        v-else
      >
        <ProblemStatementCard 
        :problemStatement="ps"
        :detailed="detailed"
        class="ps-card"
        v-for="ps in workshop.content.problemStatements"
        :key="ps.id"/>
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

@Component({
  components:{
    ProblemStatementCard,
    ProblemStatementDetails
    }
})
export default class PsWorkshopContent extends Vue {
  @Prop({default: true}) private detailed!: boolean;

  workshopStore = getModule(WorkshopStore);
  workshop: Workshop<ProblemStatementWorkshopContent> = 
    this.workshopStore.selectedWorkshop as Workshop<ProblemStatementWorkshopContent>;
  showSinglePsDetails = false;
  detailedPS = this.workshop.content.problemStatements[0];
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