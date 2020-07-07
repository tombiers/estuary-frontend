<template>
  <div class="ps-container">
    <VcABox
      :id="problemStatement.id"
      :title="id"
      :expand="true"
      class="vca-blue-background vca-more-shadow ps"
    >
      <template slot="header">
        </template>
        <div class="ps-content">
           {{ text }}
        </div>
      <div class="ps-links" v-if="problemStatement.linked.length != 0">
        In Beziehung zu:
        <div 
          v-for="pslink in problemStatement.linked"
          :key="pslink.id"
        >
        <ProblemStatementLinkComponent 
          :problemStatementLink="pslink"
        />
        </div>
      </div>
        <div class="ps-interaction">
        <div class="ps-interaction-buttons">

          <button 
            class="ps-interaction-button p-button-secondary p-button-text p-button p-component" 
            type="button" 
            @click="like($event)"
            >
            <div :class="iconClass"></div>
            <span class="p-button-label">like</span>
          </button>

          <Button @click="comment($event)" label="comment" icon="pi pi-comments" iconPos="left" class="p-button-secondary p-button-text ps-interaction-button"/>

        </div>
        <div class="ps-interaction-info">
          <span>{{ likes }}</span>
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
import ProblemStatementLinkComponent  from "@/components/ProblemStatementLinkComponent.vue"

@Component({
  components: {
    ProblemStatementLinkComponent
  }
})
export default class ProblemStatementCard extends Vue {
  @Prop() private problemStatement!: ProblemStatement;
  @Prop({default: true}) private detailed!: boolean;

  private iconClass = "pi pi-thumbs-up new-button-icon"

  get id() {
    return "PS" + this.problemStatement.id;
  }

  get text() {
    return (
      `Ich als ${this.problemStatement.iAm} möchte, ${this.problemStatement.iWant}. ` +
      `Aber ${this.problemStatement.but}, weil ${this.problemStatement.because}. ` +
      `Darum fühle ich mich ${this.problemStatement.feel}.`
    );
  }

  get links() {
    if (this.problemStatement.linked.length == 0) 
      return "";

    return "In Beziehung zu: " + 
    this.problemStatement.linked.map(link => "PS" + link.id.toString()).reduce( (acc, cur) => acc + ", " + cur);
  }

  get likes() {
    return "Likes: " + this.problemStatement.likes;
  }

  like(event: any) {
    console.log("like");
    this.iconClass = "pi pi-thumbs-up new-button-icon-used"
  }

  comment(event: any) {
    console.log("comment");
  }

}
</script>

<style scoped lang="less">
.new-button-icon {
  margin-right: 0.5em;
}

.new-button-icon-used {
  .new-button-icon();
  color: blue;
}

.ps-container {
  height: auto;
}

// overwrite the 2em margin-top of VcABox
.ps-container /deep/ .box-card.tail {
  margin: 0;
}

.ps-container /deep/ .el-card__body {
  flex: 1;
  padding-left: 0;
  padding-right: 0;
}

// .ps-container /deep/ .el-card__header {
//   height: 100%;
// }

.ps {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.ps-links {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
  border-bottom: 1px solid #ebeef5;
  padding: 20px;
}

.likes-thumb {
  color: blue;
  font-size: 1em;
  align-content: center;
}

.like-button {
  float: right
}

.ps-content {
  text-align: left;
  border-bottom: 1px solid #ebeef5;
  padding: 20px;
}

.ps-interaction {
  padding: 20px 20px 0px 20px;
}

.ps-interaction-buttons {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
}

.ps-interaction-button {
  flex: 0;
  margin-right: 5px;
}

.ps-interaction-info {
  margin-top: 20px;
  text-align: left;
}

.mine:extend(.pi .pi-thumbs-up) {
  color: cyan;
}
</style>
