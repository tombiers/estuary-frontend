<template>
  <div class="workshop-body-tag-container">
    <WorkshopTag v-for="tag in tags" :key="tag" :tag="tag" :link="linkTagsToSearch" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import WorkshopTag from "@/components/WorkshopTag.vue";

@Component({
  components: {
    WorkshopTag
  }
})
export default class WorkshopTags extends Vue {
  @Prop() private tags!: string[];
  @Prop({default: false}) private linkTagsToSearch!: boolean;

  clicked(event: any) {
    console.log("hi tag " + event);
    console.log(event);
    console.log(event.srcElement);
    console.log(event.srcElement.id);
  }

  invoke = (event:any) => {
    this.clicked(event)
  }
}

</script>

<style scoped lang="less">

.workshop-body-tag-container {
  margin: 0.5em;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.tag {
  flex-shrink: 1;
}

</style>
