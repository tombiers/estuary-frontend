<template>
  <div class="pannel">
    <Button
      class="testButton"
      label="close"
      icon="pi pi-chevron-left"
      icon-pos="right"
      @click="$emit('close')"
    />
    <div class="status">
      My status is {{ this.status }}
    </div>  
    <div class="tags">
      <WorkshopTags :tags="workshopStore.selectedWorkshop.tags" />
    </div>  
    <div class="authors">
      <ul>
        <li v-for="author in authors"
        :key="author"
        >{{ author }}</li>
      </ul>
    </div>
    
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import WorkshopStore from "@/store/modules/Workshops.ts";
import { WorkshopFull } from "@/shared/models/WorkshopFull.model.ts";
import { getModule } from "vuex-module-decorators";
import WorkshopTags from "@/components/WorkshopTags.vue";

@Component({
  components: {
    WorkshopTags
  }
})
export default class WorkshopDetailsMeta extends Vue{
  workshopStore = getModule(WorkshopStore);
  id = -1;

  mounted() {
    this.id = Number(this.$route.params.id);
  }

  get authors(): string[] {
    return this.workshopStore.selectedWorkshop.authors;
  }

  get status(): string {
    if (this.id > -1) {
      return this.workshopStore.selectedWorkshop.status;
    } else {
      return "";
    }
  }
}

</script>

<style scoped lang="less">

.pannel {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
}

.status {
  background: greenyellow;
}

.authors {
  background: grey;
}

.tags {
  background: cyan;
}

</style>