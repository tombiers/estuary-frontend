<template>
  <div class="workshop-container">
    <VcABox
      :id="workshop.id"
      :title="workshop.type"
      :expand="true"
      class="vca-blue-background vca-more-shadow workshop"
    >
      <template slot="header">
        <div>
          {{ date }}
        </div>
        <div>
          {{ workshop.place.name }}
        </div>
      </template>
      <div class="workshop-body">
        <div class="workshop-body-teaser">
          {{ workshop.teaser }}
        </div>
        <div class="workshop-body-tag-container">
          <VcAFilterTag
            class="tag"
            v-for="tag in workshop.tags"
            :key="tag"
            field
            :value="tag"
          />
        </div>
        <div class="workshop-body-likes">
          Likes: {{ workshop.upvotes }}
        </div>
      </div>
    </VcABox>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Workshop } from "@/shared/models/Workshop.model";
import WorkshopStore from "@/store/modules/Workshops.ts";
import { getModule } from "vuex-module-decorators";

@Component
export default class WorkshopCard extends Vue {
  @Prop() private workshop!: Workshop;

  // computed getter
  // format date as month.year
  get date() {
    const fullDate = new Date(this.workshop.date);
    return fullDate.getMonth() + 1 + "." + fullDate.getFullYear(); // months are counted from 0, add 1 for display
  }

  mounted() {

  document.getElementById(this.workshop.id.toString())!.onclick = this.openCard;
  }

 openCard()  {
  // tell vuex to get full information on the choosen card (workshop) and than open the page 
  // TODO: this should be done with the router
  const workshopStore = getModule(WorkshopStore);
  workshopStore.selectWorkshop(this.workshop.id);
  this.$router.push({ name: 'WorkshopDetails', params: { id: this.workshop.id.toString() } });
}

}
</script>

<style scoped lang="less">
.workshop-container {
  height: 100%;
}

// overwrite the 2em margin-top of VcABox
.workshop-container /deep/ .box-card.tail {
  margin: 0;
}

.workshop-container /deep/ .el-card__body {
  flex: 1;
}

.workshop {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.workshop-body {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.workshop-body-tag-container {
  margin: 0.5em;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.workshop-body-likes {
  align-self: flex-end;
  margin-top: auto;
}

.tag {
  flex-shrink: 1;
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

.vca-blue-background:hover {
  background: whitesmoke;
}
</style>
