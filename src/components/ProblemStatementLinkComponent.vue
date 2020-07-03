<template>
  <div class="ps-link-container">
    <VcABox
      :id="problemStatementLink.id"
      :title="problemStatementLink.id"
      :expand="true"
      class="vca-blue-background vca-more-shadow ps-link"
    >
    <div>
      <WorkshopTags :tags="problemStatementLink.tags" />
    </div>
    </VcABox>
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

  get id() {
    return this.problemStatementLink.id
  }
}
</script>

<style scoped lang="less">

.ps-link-container {
  margin-left: 20px;
  margin-right: 20px;
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
