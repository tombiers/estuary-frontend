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
      Status: {{ this.status }}
    </div>  
    <div class="tags">
      <WorkshopTags :tags="workshopStore.selectedWorkshop.tags" />
    </div>  
    <div class="authors">
      Autoren
      <ul class="author-list">
        <li v-for="author in authors"
        :key="author"
        class="author"
        >{{ author }}</li>
      </ul>
    </div>
    
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import WorkshopStore from "@/store/modules/Workshops.ts";
import { Workshop } from "@/shared/models/Workshop.model.ts";
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
  border-right-style: solid;
  border-color: whitesmoke;
}

.status {
  flex: 1;
  padding: 10px;
  border-bottom-style: solid;
  border-color: whitesmoke;
}

.authors {
  flex: 1;
  padding: 10px;
  border-bottom-style: solid;
  border-color: whitesmoke;
}

.author-list {
  list-style-type: none;
  padding-left: 0px;
  margin: unset;
}

.author {
  text-align: center;
}

.tags {
  flex: 1;
  border-bottom-style: solid;
  border-color: whitesmoke;
}

</style>