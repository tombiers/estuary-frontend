<template>
    <div>
      <div v-if="detailed" class="badge" :href="linkToPS" :id="uniqueId">
        {{ PSid }}
        <div v-if="tags != ''" class="badge-inner">
          {{ tags }}
        </div>
      </div>


    <a v-else class="link" :href="linkToPS" :id="uniqueId">
      {{ PSid }}
    </a>
    </div>
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
  @Prop({default: false}) private detailed!: boolean;

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
    if (!this.detailed || this.problemStatementLink.tags.length == 0) return "";
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

.badge {
  background-color: greenyellow;
  border: none;
  color: black;
  padding: 2.5px 10px 2.5px 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 16px;
}

.badge-inner {
  background-color: whitesmoke;
  border: none;
  color: black;
  padding: 2.5px 10px 2.5px 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  cursor: pointer;
  border-radius: 16px;
}

</style>
