<template>
    <a class="link" :href="linkToPS" :id="uniqueId">
      {{ PSid }}
    </a>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { ProblemStatementLink } from "@/shared/models/ProblemStatementLink.model";
import WorkshopTags from "@/components/WorkshopTags.vue"
import { mixins } from 'vue-class-component';
import UidMixin from "@/mixins/UidMixin";

@Component({
  components: {
    WorkshopTags
  }
})
export default class ProblemStatementLinkComponent extends mixins(UidMixin) {
  @Prop() private problemStatementLink!: ProblemStatementLink;
  @Prop({default: true}) private detailed!: boolean;

  mounted() {
    document.getElementById(this.uniqueId)!.onclick = this.openLink;
  }

  openLink() {
    this.$emit('openLink',this.problemStatementLink.id);
  }

  get uniqueId() {
    return this.uid + this.PSid;
  }

  get PSid() {
    return "PS" + this.problemStatementLink.id;
  }

  get linkToPS() {
    return '#' + this.PSid;
    //return "/ProblemStatement/" + this.problemStatementLink.id;
  }

  get tags() {
    if (!this.detailed || this.problemStatementLink.tags.length == 0) return " ";
    return this.problemStatementLink.tags.reduce( (acc, cur) => acc + ", " + cur);
  }
}
</script>

<style scoped lang="less">

.link {
  margin-right: 5px;
}

.ps-link-container {
  margin-left: 10px;
  margin-right: 10px;
  display: flex;
  flex-wrap: wrap;
}

.ps-link-tag {
  flex: 1;
}

.ps-link-container /deep/ .field {
  font-size: 0.8em;
  font-weight: 700;
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
