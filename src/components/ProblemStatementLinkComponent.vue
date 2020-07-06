<template>
  <div class="ps-link-container">
    <VcAFilterTag :field="id" class="ps-link-tag">
      {{ tags }}
    </VcAFilterTag>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { ProblemStatementLink } from "@/shared/models/ProblemStatementLink.model";
import WorkshopTags from "@/components/WorkshopTags.vue"

@Component({
  components: {
    WorkshopTags
  }
})
export default class ProblemStatementLinkComponent extends Vue {
  @Prop() private problemStatementLink!: ProblemStatementLink;
  @Prop({default: true}) private detailed!: boolean;

  get id() {
    return this.problemStatementLink.id
  }

  get tags() {
    if (!this.detailed || this.problemStatementLink.tags.length == 0) return " ";
    return this.problemStatementLink.tags.reduce( (acc, cur) => acc + ", " + cur);
  }
}
</script>

<style scoped lang="less">

.ps-link-container {
  margin-left: 10px;
  margin-right: 10px;
  display: flex;
  flex-wrap: wrap;
}

.ps-link-tag {
  flex: 1;
}

.vca-blue-background:hover {
  background: whitesmoke;
}

.ps-link-container /deep/ .el-card__header {
  padding: 10px;
}
/*
.ps-link-container /deep/ .el-card__body {
  display: none
}
*/

</style>
