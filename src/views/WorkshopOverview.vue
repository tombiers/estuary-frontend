<template>
  <div>
    <WorkshopList />
  </div>
</template>

<script lang="ts">
import WorkshopList from "@/components/WorkshopList.vue";
import { Component, Vue } from "vue-property-decorator";


@Component({
  components: {
    WorkshopList
  }
})
export default class WorkshopOverview extends Vue{

}
</script>
