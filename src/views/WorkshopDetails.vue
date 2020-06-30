<template>
<div class="element">
  <div class="workshop-details-body">
    <div class="pannel-left" v-bind:class="{ show: !showLeftPannel }">
      <WorkshopDetailsMeta @close="open('left')" />
    </div>
    <div class="main-pannel">
      <div class="workshop-details-header">
        <div class="button-open-left" v-bind:class="{ show: showLeftPannel }">
          <Button
            class="testButton"
            label="open"
            icon="pi pi-chevron-right"
            icon-pos="right"
            @click="open('left')"
          />
        </div>
        <div class="button-open-right" v-bind:class="{ show: showRightPannel }">
          <Button
            class="testButton"
            label="open"
            icon="pi pi-chevron-left"
            icon-pos="left"
            @click="open('right')"
          />
        </div>
      </div>
      <span> Placeholder for the main content of a workshop </span>
    </div>
    <div class="pannel-right" v-bind:class="{ show: !showRightPannel }">
      <Button
            class="testButton"
            label="close"
            icon="pi pi-chevron-right"
            icon-pos="left"
            @click="open('right')"
          />
      <div> Placeholder for Blog/Chat</div>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import WorkshopDetailsMeta from "@/components/WorkshopDetailsMeta.vue";
import { Component, Vue } from "vue-property-decorator";


@Component({
  components: {
    WorkshopDetailsMeta
  }
})
export default class WorkshopDetails extends Vue{
  showLeftPannel = false;
  showRightPannel = false;

  public open(hi:string) {
    if(hi.match("left"))
    this.showLeftPannel = !this.showLeftPannel;
    if(hi.match("right"))
    this.showRightPannel = !this.showRightPannel;
  }

  closeMe(event: any) {
    alert("child called me");
    console.log(event);
  }

}
</script>

<style scoped lang="less">

.workshop-details-header{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.button-open-left{
  flex: 1;
  text-align: left;
}

.button-open-right{
  flex: 1;
  text-align: right;
}

.testButton{
  margin: 0.25em;
}

.workshop-details-body{
  display: flex;
  flex-direction: row;
}

.pannel-left {
  flex: 1;
}

.main-pannel {
  flex: 3;
}

.pannel-right {
  flex: 1;
}

.show {
  display: none
}

</style>
