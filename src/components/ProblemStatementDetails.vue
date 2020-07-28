<template>
  <div>
    <transition name="fade" mode="out-in">
      <div :key="problemStatement.id">
        <div class="ps-container">
          <div class="main-ps">
            <ProblemStatementCard
              :problemStatement="problemStatement"
              :detailed="true"
              :editable="editable"
              :openInEditMode="openInEditMode"
              class="ps-card"
              @openLink="eventHandler($event)"
              @highlight="highlight"
            />
          </div>
          <div class="linked-ps">
            <h2>{{$t('related')}}</h2>
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
              v-for="ps in linkedProblemStatements"
              :key="ps.id"
              :problemStatement="ps"
              class="ps-card-linked"
              @openLink="eventHandler($event)"
            />
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import ProblemStatementCard from "@/components/ProblemStatementCard.vue";
import { ProblemStatement } from "@/shared/models/ProblemStatement.model";
import { Workshop } from "@/shared/models/Workshop.model";
import { ProblemStatementWorkshopContent } from "@/shared/models/ProblemStatementWorkshopContent.model";
import { getModule } from 'vuex-module-decorators';
import ProblemStatementStore from "@/store/modules/ProblemStatements";

@Component({
  components: {
    ProblemStatementCard
  }
})
export default class ProblemStatementDetails extends Vue {
  @Prop() private Workshop!: Workshop<ProblemStatementWorkshopContent>;
  @Prop() private problemStatement!: ProblemStatement;
  @Prop({ default: false }) private openInEditMode!: boolean;
  @Prop({ default: false }) private editable!: boolean;
  
  private highlightId = -1;

  get linkedProblemStatements(): ProblemStatement[] {
    const psStore = getModule(ProblemStatementStore);
    const ps = this.problemStatement.linkedProblemStatementIds
      .filter(id => id != this.highlightId)     // the highlighted ps is shown elsewhere
      .sort((a,b) => a - b)                     // sort ascending
      .map(id => psStore.problemStatement(id))  // get the corosponding problem statements from vuex, this includes ps which aren't part of this workshop
      .filter(ps => typeof ps !== "undefined")  // remove ps that weren't found => no more undefined ps
      .map(ps => ps!);                          // let the compiler know that the remaining ps aren't undefined

    return ps;
  }

  get highlightedPS(): ProblemStatement | undefined {
    const psStore = getModule(ProblemStatementStore);
    return psStore.problemStatement(this.highlightId);
  }

  eventHandler(id: any) {
    this.$emit("openLink", id);
    this.highlightId = -1;
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  }

  highlight(id: any) {
    this.highlightId = id;
  }
}
</script>

<style scoped lang="less">
.ps-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.ps-column {
  flex: 1;
  //margin: 0px 10px 0px 10px;
}

.main-ps:extend(.ps-column) {
  min-width: 425px;
}

.linked-ps:extend(.ps-column) {
  min-width: 425px;
}

.ps-card-linked {
  margin-bottom: 10px;
}

.ps-card-linked  {
  opacity: 55%;
}

.ps-card-linked-highlight:extend(.ps-card-linked) {
  //background-color: cyan;
  opacity: 100%;
}

.ps-card-linked-highlight /deep/ .el-card {
  //background-color: moccasin;
}

// vue animations

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.slide-fade-enter-active {
  transition: all 0.5s ease;
}
.slide-fade-leave-active {
  transition: all 0.5s ease;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for <2.1.8 */ {
  transform: translateY(10px);
  opacity: 0;
}

.slide-fade-horizontal-enter-active {
  transition: all 0.5s ease;
}
.slide-fade-horizontal-leave-active {
  transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-horizontal-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for <2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>