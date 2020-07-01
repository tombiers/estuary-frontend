<template>
  <div>
    I have everything for the ps workshops with id {{id}}
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getModule } from "vuex-module-decorators";
import WorkshopStore from "@/store/modules/Workshops.ts";

@Component
export default class PsWorkshopContent extends Vue {
  workshopStore = getModule(WorkshopStore);
  id = this.workshopStore.selectedWorkshop.id; 

}

</script>

<style scoped langs="less">

</style>