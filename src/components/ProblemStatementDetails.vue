<template>
<div class="ps-container">
  <div class="main-ps">
    <ProblemStatementCard 
      :problemStatement="problemStatement"
      class="ps-card"
      @openLink="eventHandler($event)"
    />
  </div>
  <div class="linked-ps">
    <ProblemStatementCard 
      v-for="ps in linkedWorkshops"
      :key="ps.id"
      :problemStatement="ps"
      class="ps-card-linked"
      @openLink="eventHandler($event)"
    />
  </div>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import ProblemStatementCard from "@/components/ProblemStatementCard.vue";
import { ProblemStatement } from '@/shared/models/ProblemStatement.model';
import { Workshop } from "@/shared/models/Workshop.model";
import { ProblemStatementWorkshopContent } from "@/shared/models/ProblemStatementWorkshopContent.model";

@Component({
  components:{
    ProblemStatementCard
    }
})
export default class ProblemStatementDetails extends Vue {
  @Prop() private Workshop!: Workshop<ProblemStatementWorkshopContent>;
  @Prop() private problemStatement!: ProblemStatement;

  get linkedWorkshops(): ProblemStatement[] {
    return this.problemStatement.linked.map(
      link => {
        return this.Workshop.content.problemStatements.find(ps => ps.id == link.id)!
      }
    );
  }

  eventHandler(id: any) {
    this.$emit('openLink', id)
  }
}

</script>

<style scoped lang="less">

.ps-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  background: whitesmoke;
}

.ps-column {
  flex: 1;
  margin: 0px 10px 0px 10px;
}

.main-ps:extend(.ps-column) {
  min-width: 300px;
}

.linked-ps:extend(.ps-column) {
  min-width: 400px;
}

.ps-card-linked {
  margin-bottom: 10px;
}

.linked-ps /deep/ .el-card {
  opacity: 55%;
}


</style>