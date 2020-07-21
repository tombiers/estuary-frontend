<template>
  <div :class="psClass">

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
            :label="$t('details')" 
            class="p-button-secondary p-button-text ps-interaction-button-details"
          />
          <ToggleButton 
            v-if="editable" 
            v-model="editMode" 
            onIcon="pi pi-save" 
            offIcon="pi pi-pencil" 
            style="border-radius: 50%;"
            @change="toggleEditMode()"/>
        </div>
      </template>
        <div v-if="editMode" class="ps-content">
          <div>
            <span> {{$t("problemStatement.iAm")}}: </span>
            <br>
            <Textarea v-model="problemStatement.iAm" :autoResize="true" rows="1" cols="40" />
          </div>
          <div>
            <span> {{$t("problemStatement.iWant")}} </span>
            <br>
            <Textarea v-model="problemStatement.iWant" :autoResize="true" rows="5" cols="40" />
          </div>
          <div>
            <span> {{$t("problemStatement.but")}} </span>
            <br>
            <Textarea v-model="problemStatement.but" :autoResize="true" rows="5" cols="40" />
          </div>
          <div>
            <span> {{$t("problemStatement.because")}} </span>
            <br>
            <Textarea v-model="problemStatement.because" :autoResize="true" rows="5" cols="40" />
          </div>
          <div>
            <span> {{$t("problemStatement.feel")}} </span>
            <br>
            <Textarea v-model="problemStatement.feel" :autoResize="true" rows="2" cols="40" />
          </div>
           
        </div>
        <div v-else class="ps-content">
           {{ text }}
        </div>

    <div class="ps-links-top">
      <div class="ps-links" v-if="problemStatement.linked.length != 0">
        <Button 
          @click="clicked($event)" 
          label="" 
          icon="pi pi-search-plus" 
          iconPos="left" 
          class="p-button-secondary p-button-text ps-interaction-button-details"
        />
        <div class="ps-link-elements">{{$t('related')}}: </div>
        <div
          class="ps-link-elements" 
          v-for="pslink in orderedPsLinks"
          :key="pslink.id"
        >

<div v-if="detailed">
        <ProblemStatementLinkComponent 
          :problemStatementLink="pslink"
          @openLink="highlight"
          :detailed="detailed"
        />
</div>
<div v-else>
        <ProblemStatementLinkComponent 
          :problemStatementLink="pslink"
          @openLink="openLink"
          :detailed="detailed"
        />
</div>


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
            <div :class="likeIconClass" style="font-size: 75%"></div>
            <span class="p-button-label">{{$t('doLike')}}</span>
          </button>

          <button 
            class="ps-interaction-button p-button-secondary p-button-text p-button p-component" 
            type="button" 
            @click="comment($event)"
            >
            <div :class="commentIconClass" style="font-size: 75%"></div>
            <span class="p-button-label">{{$t('doComment')}}</span>
          </button>

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
import { i18n } from "@/main";
import ProblemStatementStore from '../store/modules/ProblemStatements';

@Component({
  components: {
    ProblemStatementLinkComponent
  }
})
export default class ProblemStatementCard extends Vue {
  @Prop() private problemStatement!: ProblemStatement;
  @Prop({default: false}) private detailed!: boolean;
  @Prop({default: false}) private editable!: boolean;

  private editMode = false;

  private likeIconClass = "pi pi-thumbs-up new-button-icon";
  private commentIconClass = "pi pi-comments new-button-icon";

  private psClass = "ps-container";

  mounted() {
    switch (Math.round(Math.random() * 3)) {
      case 0: this.psClass += " tilt-left-2"
      break;
      case 1: this.psClass += " tilt-left-1"
      break;
      case 2: this.psClass += " tilt-right-1"
      break;
      case 3: this.psClass += " tilt-right-2"
      break;
    }
    
  }

  get id() {
    return "PS" + this.problemStatement.id;
  }

  get text() {
    return (
      i18n.t("problemStatement.iAm").toString() + this.problemStatement.iAm + " " +
      i18n.t("problemStatement.iWant").toString() + this.problemStatement.iWant + ". " +
      i18n.t("problemStatement.but").toString() + this.problemStatement.but + ", " +
      i18n.t("problemStatement.because").toString() + this.problemStatement.because + ". " +
      i18n.t("problemStatement.feel").toString() + this.problemStatement.feel
    );
  }

  get links() {
    if (this.problemStatement.linked.length == 0) 
      return "";

    return "In Beziehung zu: " + 
    this.problemStatement.linked.map(link => "PS" + link.id.toString()).reduce( (acc, cur) => acc + ", " + cur);
  }

  get likes() {
    return i18n.t('showLike').toString() + ": " + this.problemStatement.likes;
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

  toggleEditMode() {
    if (this.editMode == false) { // finished editing, 
      // TODO: send changes to vuex
      getModule(ProblemStatementStore).update(this.problemStatement);
    }
  }

  like(event: any) {
    console.log("like");
    this.likeIconClass = "pi pi-thumbs-up new-button-icon-used"
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

.ps-container /deep/ .p-inputtext {
  width: 100%;
}

.ps-container {
  height: auto;
  margin: 1em;
}
.tilt-left-2 {
  deg: -2deg;
  transform:rotate($deg);
    -webkit-transform:rotate($deg);
    -moz-transform:rotate($deg);
    -ms-transform:rotate($deg);
}

.tilt-left-1 {
  deg: -1deg;
  transform:rotate($deg);
    -webkit-transform:rotate($deg);
    -moz-transform:rotate($deg);
    -ms-transform:rotate($deg);
}


.tilt-base {
  deg: 0deg;
  transform:rotate($deg);
    -webkit-transform:rotate($deg);
    -moz-transform:rotate($deg);
    -ms-transform:rotate($deg);
}

.tilt-right-1 {
  deg: 1deg;
  transform:rotate($deg);
    -webkit-transform:rotate($deg);
    -moz-transform:rotate($deg);
    -ms-transform:rotate($deg);
}

.tilt-right-2 {
  deg: 2deg;
  transform:rotate($deg);
    -webkit-transform:rotate($deg);
    -moz-transform:rotate($deg);
    -ms-transform:rotate($deg);
}

/*
.ps-container:hover {
    transform:scale(1.1);
    -webkit-transform:scale(1.1);
    -moz-transform:scale(1.1);
    -ms-transform:scale(1.1);
}*/

.ps-container /deep/ .box-card {
  font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif ,arial,sans-serif;
  font-style: oblique;
  font-size: 1.25em;
  font-weight: 500;
  color:#000;
  background:#ffc;
  border-bottom-right-radius: 60px 5px;
}

.ps-container /deep/ .box-card:after {     
    content: "";
  position:absolute;
  z-index:-1;
  right:-0px; bottom:20px;
  width:200px;
  height: 25px;
  background: rgba(0, 0, 0, 0.2);
  box-shadow:2px 15px 5px rgba(0, 0, 0, 0.40);
    -moz-transform: matrix(-1, -0.1, 0, 1, 0, 0);
 -webkit-transform: matrix(-1, -0.1, 0, 1, 0, 0);
      -o-transform: matrix(-1, -0.1, 0, 1, 0, 0);
     -ms-transform: matrix(-1, -0.1, 0, 1, 0, 0);
         transform: matrix(-1, -0.1, 0, 1, 0, 0);
}

.my-textarea {
  width: 100%;
}
// overwrite the 2em margin-top of VcABox
.ps-container /deep/ .box-card.tail {
  margin: 0;
  //font-size: 0.75em;
}

.ps-container /deep/ .el-card__body {
  flex: 1;
  padding: 10px 0px 10px 0px;
}

 .ps-container /deep/ .el-card__header {
  padding: 10px 20px 5px 20px;
 }

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
  font-size: 0.75em;
}

.ps-links-top {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex-wrap: wrap;
  border-bottom: 1px solid #ebeef5;
  padding: 5px 20px 5px 20px;
}

.likes-thumb {
  color: blue;
  font-size: 75%;
  align-content: center;
}

.p-button-label {
  font-size: 75%;
}

.like-button {
  float: right;
}

.ps-content {
  text-align: left;
  border-bottom: 1px solid #ebeef5;
  padding: 20px;
}

.ps-interaction {
  padding: 5px 20px 0px 20px;
  align-content: flex-start;
}

.ps-interaction-buttons {
  text-align: left;
  //flex: 1;
  //display: inline-flex;
  //align-self: flex-start;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
}

.ps-container /deep/ .p-togglebutton {
  background-color: white;
}

.ps-interaction-button {
  margin-right: 5px;
}

.ps-interaction-button-magnify {
  flex: 0;
  margin-right: 5px;
}

.ps-interaction-info {
  margin-top: 5px;
  text-align: left;
  font-size: 75%;
}

.ps-interaction-button-details:extend(.ps-interaction-button){
  flex: 0;
  margin-left: 5px;
  border-radius: 50%;
}

.ps-links /deep/ .p-button.p-button-icon-only {
  padding: 5px;
}

</style>
