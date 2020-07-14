<template>
<div class="ps-container">
  <div class="main-ps">
    <ProblemStatementCard 
      :problemStatement="problemStatement"
      :detailed="true"
      class="ps-card"
      @openLink="eventHandler($event)"
      @highlight="highlight"
    />
  </div>
  <div class="linked-ps">
    <transition name="slide-fade" mode="out-in">
    <ProblemStatementCard
      :key="highlightId"
      v-if="highlightId > -1"
      :problemStatement="highlightedPS"
      class="ps-card-linked-highlight"
      @openLink="eventHandler($event)"
    />
    </transition>
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

  private highlightId = -1;

  get linkedWorkshops(): ProblemStatement[] {
    return this.problemStatement.linked
    .filter(link => link.id != this.highlightId)
    .map(
      link => {
        return this.Workshop.content.problemStatements.find(ps => ps.id == link.id)!
      }
    ).sort((a, b) => a.id - b.id);
  }

  get highlightedPS(): ProblemStatement | undefined {
    return this.Workshop.content.problemStatements.find(ps=> ps.id == this.highlightId);
  }

  eventHandler(id: any) {
    this.$emit('openLink', id)
  }

  highlight(id: any) {
    this.highlightId = -1;
    this.highlightId = id;
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

.ps-card-linked /deep/ .el-card {
  opacity: 55%;
}

.ps-card-linked-highlight:extend(.ps-card-linked) {
  //background-color: cyan;
}

.ps-card-linked-highlight /deep/ .el-card {
  //background-color: moccasin;
}



// vue animations

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.slide-fade-enter-active {
  transition: all .5s ease;
}
.slide-fade-leave-active {
  transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for <2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}

</style>