<template>
  <div>
    <div
        class="ps-card-collection"
      >
        <ProblemStatementCard 
        :problemStatement="ps" 
        class="ps-card"
        v-for="ps in workshop.content.problemStatements"
        :key="ps.id"/>
      </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getModule } from "vuex-module-decorators";
import WorkshopStore from "@/store/modules/Workshops.ts";
import { Workshop } from "@/shared/models/Workshop.model";
import { ProblemStatementWorkshopContent } from "@/shared/models/ProblemStatementWorkshopContent.model";
import ProblemStatementCard from "@/components/ProblemStatementCard.vue";

@Component({
  components:{
    ProblemStatementCard
    }
})
export default class PsWorkshopContent extends Vue {
  workshopStore = getModule(WorkshopStore);
  workshop: Workshop<ProblemStatementWorkshopContent> = 
    this.workshopStore.selectedWorkshop as Workshop<ProblemStatementWorkshopContent>;
}

</script>

<style scoped langs="less">

.ps-card-collection {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 5px;
}

.ps-card {
  text-align: center;
}


</style>