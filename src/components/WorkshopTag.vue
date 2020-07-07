<template>
  <VcAFilterTag class="tag" field :value="tag" :id="tag"/>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class WorkshopTag extends Vue {
  @Prop() private tag!: string;

  clicked() {
    console.log("hi tag " + this.tag);
  }

  mounted() {
      document.getElementById(this.tag)!.onclick = this.clicked;
  }

}

</script>

<style scoped lang="less">

.tag {
  flex-shrink: 1;
}

</style>
