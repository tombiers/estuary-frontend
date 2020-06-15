<template>
  <div>
    <h1>Here be some Workshops</h1>
    TODO: Display Workshop Cards (custom Component)
    <WorkshopCard v-bind:workshop = "aWorkshop"/>
    <WorkshopCard v-bind:workshop = "anotherWorkshop"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import WorkshopCard from "@/components/WorkshopCard.vue";
import { Workshop } from "@/shared/models/Workshop.model.ts";

@Component({
  // Specify `components` option.
  // See Vue.js docs for all available options:
  // https://vuejs.org/v2/api/#Options-Data
  components: {
    WorkshopCard
  }
})
export default class WorkshopList extends Vue {
  data() {
    return {
      aWorkshop: {id: 1, name:"der zweite", place:"Berlin", date:12345678, tags:["abcd","fghi","poiu"],upvotes:37},
      anotherWorkshop: new Workshop(33, "another Workshop", "Hamburg", 321312, ["hjk","sdf"], 87)  
    }
  }
}


// TODO: Get workshops from vuex store and instantiate WorkshopCards
</script>

<style scoped lang="less">
</style>
