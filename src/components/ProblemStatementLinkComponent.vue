<template>
  <div :id="uniqueId" class="layer-low">
    <div v-show="editMode">
      <div class="badge" :href="linkToPS">
<div class="badge-flex">
<div class="badge-id">

        PS
        <input type="number" v-model="problemStatementLink.id" placeholder class="id-input" />
</div>
        <div class="badge-inner">
            <input v-model="problemStatementLink.tag" placeholder />
        </div>
        <div v-if="newMode" class="badge-inner marker-class" :id="uniqueNewId" v-tooltip="$t('problemStatement.addLink')">
            <div class="badge-id">
            <i class="pi pi-check"></i>
            </div>
        </div>
        <div :class="hide" class="badge-inner marker-class layer-high" :id="uniqueRemoveId" v-tooltip="$t('problemStatement.removeLink')">
            <div class="badge-id">
            <i class="pi pi-trash"></i>
            </div>
        </div>
</div>
      </div>
    </div>
    <div v-show="!editMode">
      <div v-if="detailed" class="badge" :href="linkToPS">
        {{ PSid }}
        <div v-if="problemStatementLink.tag != ''" class="badge-inner">{{ problemStatementLink.tag }}</div>
      </div>

      <a v-else class="link" :href="linkToPS">{{ PSid }}</a>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { ProblemStatementLink } from "@/shared/models/ProblemStatementLink.model";
import WorkshopTags from "@/components/WorkshopTags.vue";
import { mixins } from "vue-class-component";
import UidMixin from "@/mixins/UidMixin";

@Component({
  components: {
    WorkshopTags
  }
})
export default class ProblemStatementLinkComponent extends mixins(UidMixin) {
  @Prop() private problemStatementLink!: ProblemStatementLink;
  @Prop({ default: false }) private detailed!: boolean;
  @Prop({ default: false }) private editMode!: boolean;
  @Prop({ default: false }) private newMode!: boolean;

  get hide() {
    if (!this.editMode || this.newMode) {
      return "hide";
    } else {
      return "";
    }
  }

  mounted() {
    if(this.newMode) {
      document.getElementById(this.uniqueNewId)!.onclick = this.addLink;
    } else {
      document.getElementById(this.uniqueId)!.onclick = this.openLink;
      document.getElementById(this.uniqueRemoveId)!.onclick = this.removeLink;
    }
  }

  addLink() {
    console.log(this.problemStatementLink.id + " " + this.problemStatementLink.tag);
  this.$emit("addLink");
  }

  removeLink() {
    if (typeof event !== "undefined" ){
      event!.cancelBubble = true; // stop the event from bubbling up to the next onclick handler, so openLink() dosn't get triggered 
    }
    this.$emit("removeLink", this.problemStatementLink.id);
  }

  openLink() {
    this.$emit("openLink", this.problemStatementLink.id);
  }

  get uniqueId() {
    return this.uid + this.PSid;
  }

  get uniqueNewId() {
    return this.uid + "new";
  }

  get uniqueRemoveId() {
    return this.uid + "remove";
  }

  get PSid() {
    return "PS" + this.problemStatementLink.id;
  }

  get linkToPS() {
    return "#" + this.PSid;
    //return "/ProblemStatement/" + this.problemStatementLink.id;
  }

  get tags() {
    return this.problemStatementLink.tag
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

.badge-base {
  border: none;
  color: black;
  padding: 2.5px 10px 2.5px 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  cursor: pointer;
  border-radius: 16px;
}

.badge:extend(.badge-base) {
  background-color: greenyellow;
  margin: 4px 2px;
}

.badge-inner:extend(.badge-base) {
  background-color: whitesmoke;
}

.badge-flex {
  display: flex;
}

.badge-id {
  display: inline-block;
  margin: auto;
}

.id-input {
  width: 4em;
}

.badge-id /deep/ i {
  margin: 3px;
}

.layer-low {
  z-index: 0;
}

.layer-high {
  z-index: 1;
}

.hide {
  display: none;
}
</style>
