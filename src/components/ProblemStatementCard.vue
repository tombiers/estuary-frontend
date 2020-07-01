<template>
  <div class="ps-container">
    <VcABox
      :id="problemStatement.id"
      title
      :expand="true"
      class="vca-blue-background vca-more-shadow ps"
    >
      <template slot="header"></template>
      <div class="ps-body">
        <div class="ps-body-teaser">
          <span class="p-overlay-badge">
            <span class="p-badge">{{problemStatement.likes}}</span>
            <i class="pi pi-thumbs-up" style="font-size: 2em"></i>
          </span>
          {{ text }}
        </div>
      </div>
    </VcABox>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import WorkshopStore from "@/store/modules/Workshops.ts";
import { getModule } from "vuex-module-decorators";
import { ProblemStatement } from "@/shared/models/ProblemStatement.model";

@Component({
  components: {}
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

  mounted() {
    console.log(this.text);
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

.ps {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.ps-body {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.ps-body-likes {
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

// i don't want the header
.ps-container /deep/ .el-card__header {
  display: none;
}
</style>
