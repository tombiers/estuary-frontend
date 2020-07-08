<template>
  <div class="pannel">
    <Button
      class="testButton"
      label="close"
      icon="pi pi-chevron-left"
      icon-pos="right"
      @click="$emit('close')"
    />
    <div class="status" v-if="editeMode">
      Status: {{ this.status }}
    </div>
    <div class="status">
      {{ this.place }}
    </div>
    <div class="status">
      {{ this.date }}
    </div>
    
    <div class="tags">
      <WorkshopTags :tags="workshopStore.selectedWorkshop.tags" linkTagsToSearch="true" />
    </div>  
    <div class="authors">
      <span class="authors-headline">Autoren</span>
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
import { Component, Vue, Prop } from "vue-property-decorator";
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
  @Prop({default: false}) private editeMode!: boolean;
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
  get place(): string {
    if (this.id > -1) {
      return this.workshopStore.selectedWorkshop.place.name;
    } else {
      return "";
    }
  }
  get date(): string {
    if (this.id > -1) {
      const fullDate = new Date(this.workshopStore.selectedWorkshop.date);
      return (fullDate.getMonth() + 1).toString().padStart(2,"0") + "." + fullDate.getFullYear();
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

.authors-headline {
  font-weight: 700;
  font-size: 1.25em;
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