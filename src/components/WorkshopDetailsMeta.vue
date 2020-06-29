<template>
  <div>
    Hello WorkshopDetailsMeta {{ this.id }}  
    My status is {{ this.status }}
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import WorkshopStore from "@/store/modules/Workshops.ts";
import { WorkshopFull } from "@/shared/models/WorkshopFull.model.ts";
import { getModule } from "vuex-module-decorators";

@Component
export default class WorkshopDetailsMeta extends Vue{
  workshopStore = getModule(WorkshopStore);
  id = -1;

mounted() {
  this.id = Number(this.$route.params.id);
}

  get status(): string {
    if (this.id > -1) {
      return this.workshopStore.workshopFull(this.id).status;
    } else {
      return "";
    }
  }

}

</script>

<style scoped lang="less">

</style>