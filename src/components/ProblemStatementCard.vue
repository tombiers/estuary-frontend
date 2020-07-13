<template>
  <div class="ps-container">
    <VcABox
      :id="problemStatement.id"
      :title="id"
      :expand="true"
      class="vca-blue-background vca-more-shadow ps"
    >
      <template slot="header">
        <div class="ps-header">
          <Button 
            @click="clicked($event)" 
            label="" 
            icon="pi pi-search-plus" 
            iconPos="left" 
            class="p-button-secondary p-button-text ps-interaction-button-details"
          />
        </div>
      </template>
        <div class="ps-content">
           {{ text }}
        </div>

      <div v-if="detailed" class="ps-links-top">
        <div class="ps-links">
          <div class="ps-link-elements">Beziehungen: </div>
        </div>
        <div v-for="linkTag in linkTags" :key="linkTag">
          <div class="ps-links">
            <div class="ps-link-elements">
              {{linkTag}}: 
            </div>
            <div
              class="ps-link-elements" 
              v-for="pslink in getLinksbyTag(linkTag)"
              :key="pslink.id"
            >
              <ProblemStatementLinkComponent 
                :problemStatementLink="pslink"
                @openLink="highlight"
              />
            </div>
          </div>
        </div>
        <div class="ps-links" v-if="LinksWithoutTag.length > 0" >  <!-- links without a tag -->
            <div class="ps-link-elements">
              ohne Tag: 
            </div>
            <div
              class="ps-link-elements" 
              v-for="pslink in LinksWithoutTag"
              :key="pslink.id"
            >
              <ProblemStatementLinkComponent 
                :problemStatementLink="pslink"
                @openLink="highlight"
              />
            </div>
          </div>
        </div>

    <div v-else class="ps-links-top">
      <div class="ps-links" v-if="problemStatement.linked.length != 0">
        <Button 
          @click="clicked($event)" 
          label="" 
          icon="pi pi-search-plus" 
          iconPos="left" 
          class="p-button-secondary p-button-text ps-interaction-button-details"
        />
        <div class="ps-link-elements">In Beziehung zu: </div>
        <div
          class="ps-link-elements" 
          v-for="pslink in orderedPsLinks"
          :key="pslink.id"
        >
        <ProblemStatementLinkComponent 
          :problemStatementLink="pslink"
          @openLink="openLink"
        />
        </div>
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
import { ProblemStatementLink } from '../shared/models/ProblemStatementLink.model';

@Component({
  components: {
    ProblemStatementLinkComponent
  }
})
export default class ProblemStatementCard extends Vue {
  @Prop() private problemStatement!: ProblemStatement;
  @Prop({default: false}) private detailed!: boolean;

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

  get linkTags(): string[] {
    const linkTags:string[] = []
    this.problemStatement.linked.forEach(link => {
      linkTags.push(...link.tags)
    })
    return [...new Set(linkTags)];  // remove duplicates
  }

  get orderedPsLinks(): ProblemStatementLink[] {
    return this.problemStatement.linked.sort((a, b) => a.id - b.id);
  }

  getLinksbyTag(tag: string): ProblemStatementLink[] {
    return this.problemStatement.linked.filter(link => link.tags.some(linkTag => linkTag.match(tag)));
  }

  get LinksWithoutTag(): ProblemStatementLink[] {
    const linksWithoutTag:ProblemStatementLink[] = [];
    linksWithoutTag.push(...this.problemStatement.linked.filter(link => link.tags.length == 0));
    return linksWithoutTag;
  }

  like(event: any) {
    console.log("like");
    this.iconClass = "pi pi-thumbs-up new-button-icon-used"
  }

  comment(event: any) {
    console.log("comment");
  }

  clicked() {
    this.$emit("openLink",this.problemStatement.id)
  }
  openLink(id: string) {
    this.$emit("openLink",id)
  }

  highlight(id: string) {
    //alert("highlight " + id);
    this.$emit("highlight", id);
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

.ps-link-elements {
  align-self: center;
}

.ps-links {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
  //border-bottom: 1px solid #ebeef5;
  padding: 5px 0px;
}

.ps-links-top {
  display: flex;
  flex-direction: column;
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

.ps-interaction-button-details:extend(.ps-interaction-button){
  margin-left: 5px;
  border-radius: 50%;
}

.ps-links /deep/ .p-button.p-button-icon-only {
  padding: 5px;
}

</style>
