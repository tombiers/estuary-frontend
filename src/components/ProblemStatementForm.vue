<template>
  <div>
      <div class="ps-content">
        <div>
          <span>{{$t("problemStatement.iAm")}}:</span>
          <br />
          <Textarea v-model="problemStatement.iAm" :autoResize="true" rows="1" cols="40" />
        </div>
        <div>
          <span>{{$t("problemStatement.iWant")}}</span>
          <br />
          <Textarea v-model="problemStatement.iWant" :autoResize="true" rows="3" cols="40" />
        </div>
        <div>
          <span>{{$t("problemStatement.but")}}</span>
          <br />
          <Textarea v-model="problemStatement.but" :autoResize="true" rows="3" cols="40" />
        </div>
        <div>
          <span>{{$t("problemStatement.because")}}</span>
          <br />
          <Textarea v-model="problemStatement.because" :autoResize="true" rows="3" cols="40" />
        </div>
        <div>
          <span>{{$t("problemStatement.feel")}}</span>
          <br />
          <Textarea v-model="problemStatement.feel" :autoResize="true" rows="2" cols="40" />
        </div>
      </div>

      <div class="ps-links-top">
        <div class="ps-links">
          <div class="ps-link-elements">{{$t('related')}}:</div>
          <div class="ps-link-elements" v-for="pslink in orderedPsLinks" :key="pslink.id">
            <div>
              <ProblemStatementLinkComponent
                :problemStatementLink="pslink"
                @openLink="highlight"
                :detailed="true"
                :editMode="true"
                @removeLink="removeLink"
              />
            </div>
          </div>
            <div class="ps-link-elements">
              <ProblemStatementLinkComponent
                :problemStatementLink="newPsLink"
                :detailed="true"
                :editMode="true"
                :newMode="true"
                @addLink="addPsLink"
              />
            </div>
        </div>
      </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { ProblemStatement } from '@/shared/models/ProblemStatement.model';
import { ProblemStatementLink } from '@/shared/models/ProblemStatementLink.model';
import ProblemStatementLinkComponent from "@/components/ProblemStatementLinkComponent.vue";
import { i18n } from "@/main";

@Component({
  components: {
    ProblemStatementLinkComponent
  }
})
export default class ProblemStatementForm extends Vue {
  @Prop() private problemStatement!: ProblemStatement;

  public newPsLink = new ProblemStatementLink(0,"");

  get orderedPsLinks(): ProblemStatementLink[] {
    return this.problemStatement.linked.sort((a, b) => a.id! - b.id!);
  }

    addPsLink() {
    if (
      this.newPsLink.id > 0 && // id is "valid"- TODO: this should be checked with the backend
      this.problemStatement.linked.every(link => link.id != this.newPsLink.id) && // link id is unique
      this.problemStatement.id != this.newPsLink.id // can't link to yourself
    ) { 
      // link is valid, add it
      this.problemStatement.linked.push(new ProblemStatementLink(this.newPsLink.id, this.newPsLink.tag));
      this.newPsLink.id = 0;
      this.newPsLink.tag = "";
    } else {
      // link id invalid, tell the user
      alert(this.$i18n.t("problemStatement.unkonwn"));
    }
  }

  removeLink(id: number) {
    const position = this.problemStatement.linked.findIndex(link => link.id == id);
    this.problemStatement.linked.splice(position, 1)
  }

  highlight(id: string) {
    this.$emit("highlight", id);
  }

}
</script>

<style lang="less" scoped>

.ps-content {
  text-align: left;
  border-bottom: 1px solid #ebeef5;
  padding: 20px;
}

</style>