<template>
<div>
  <div class="workshop-details-body">
    <div class="pannel-left" v-bind:class="{ show: !showLeftPannel }">
      <WorkshopDetailsMeta @close="open('left')" />
    </div>
    <div class="main-pannel">
      <div class="workshop-details-header">
        <div class="button-open-left" v-bind:class="{ show: showLeftPannel }">
          <Button
            class="testButton"
            label="Infos"
            icon="pi pi-chevron-right"
            icon-pos="right"
            @click="open('left')"
          />
        </div>

        <div class="workshop-info">
          <div class="workshop-info-title">
            {{ type }}  {{ date }}  {{ place }}
          </div>
          <div class="lod-switch">
            <div class="lod-switch-text">
              Ansicht {{ isSimple  }}
            </div>
            <div class="lod-switch-switch">
              <InputSwitch v-model="simplified" />
            </div>
          </div>
        </div>

        <div class="button-open-right" v-bind:class="{ show: showRightPannel }">
          <Button
            class="testButton"
            label="Blog"
            icon="pi pi-chevron-left"
            icon-pos="left"
            @click="open('right')"
          />
        </div>
      </div>
      <div class="workshop-main-content"> Placeholder for the main content of a workshop </div>
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
import { Component, Vue } from "vue-property-decorator";
import WorkshopDetailsMeta from "@/components/WorkshopDetailsMeta.vue";
import { getModule } from "vuex-module-decorators";
import WorkshopStore from "@/store/modules/Workshops.ts";

@Component({
  components: {
    WorkshopDetailsMeta
  }
})
export default class WorkshopDetails extends Vue{
  showLeftPannel = false;
  showRightPannel = false;
  workshopStore = getModule(WorkshopStore);
  id = -1;
  simplified = false;

  mounted() {
    this.id = Number(this.$route.params.id);
  }

  get date() {
    const fullDate = new Date(this.workshopStore.selectedWorkshop.date);
    return (fullDate.getMonth() + 1).toString().padStart(2,"0") + "." + fullDate.getFullYear(); // months are counted from 0, add 1 for display
  }

  get type() {
    return this.workshopStore.selectedWorkshop.type;
  }
  
  get place() {
    return this.workshopStore.selectedWorkshop.place.name;
  }

  get isSimple() {
    if (this.simplified) {
      return "Vollständig"
    } else {
      return "Vereinfacht"
    }
  }


  public open(side: string) {
    if(side.match("left"))
    this.showLeftPannel = !this.showLeftPannel;
    if(side.match("right"))
    this.showRightPannel = !this.showRightPannel;
  }

}
</script>

<style scoped lang="less">

.workshop-details-header{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
}

.button-open-left{
  flex:1;
  text-align: left;
}

.button-open-right{
  flex: 1;
  text-align: right;
}

.workshop-info {
  flex: 10;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-left: 5px;
  margin-right: 5px;
}

.workshop-info-title {
  font-size: x-large;
  font-weight: bold;
  margin: auto;
  flex: 1
}

.testButton{
  margin: 0.25em;
}

.lod-switch {
  margin-left: auto;
  margin-top: 5px;
  margin-bottom: 5px;
  display: flex;
  flex-direction: column;
}

.lod-switch-text {
  font-size: small;
  flex: 1;
  margin-bottom: 5  px;
}

.lod-switch-switch {
  flex: 1;
}

.workshop-details-body{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
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

.workshop-main-content {
  border-style: solid;
}

.show {
  display: none
}

</style>
