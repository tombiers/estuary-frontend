<template>
  <div class="ps-container">
    <VcABox
      :id="problemStatement.id"
      title
      :expand="true"
      class="vca-blue-background vca-more-shadow ps"
    >
      <template slot="header">
        <div class="ps-header">
          <span class="p-overlay-badge like-button">
            <span class="p-badge">{{problemStatement.likes}}</span>
            <i class="pi pi-thumbs-up" style="font-size: 2em"></i>
          </span>
          <div class="ps-text">
           {{ text }}
          </div>
        </div>
        </template>
      <div class="ps-links">
        <ProblemStatementLinkComponent 
        :problemStatementLink="psLink" 
        class="ps-card"
        v-for="psLink in problemStatement.linked"
        :key="psLink.id"/>
      </div>
    </VcABox>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import WorkshopStore from "@/store/modules/Workshops.ts";
import { getModule } from "vuex-module-decorators";
import { ProblemStatement } from "@/shared/models/ProblemStatement.model";
import ProblemStatementLinkComponent  from "@/components/ProblemStatementLinkComponent.vue"

@Component({
  components: {
    ProblemStatementLinkComponent
  }
})
export default class ProblemStatementCard extends Vue {
  @Prop() private problemStatement!: ProblemStatement;

  get text() {
    return (
      `Ich als ${this.problemStatement.iAm} möchte, ${this.problemStatement.iWant}. ` +
      `Aber ${this.problemStatement.but}, weil ${this.problemStatement.because}. ` +
      `Darum fühle ich mich ${this.problemStatement.feel}.`
    );
  }

}
</script>

<style scoped lang="less">
.ps-container {
  height: 100%;
}

// overwrite the 2em margin-top of VcABox
.ps-container /deep/ .box-card.tail {
  margin: 0;
}

.ps-container /deep/ .el-card__body {
  flex: 1;
}

.ps-container /deep/ .el-card__header {
  height: 100%;
}

.ps {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.ps-links {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}

.likes-thumb {
  color: blue;
  font-size: 1em;
  align-content: center;
}

.like-button {
  float: right
}

.ps-text {
  text-align: left;
}
</style>
