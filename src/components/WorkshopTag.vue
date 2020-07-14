<template>
  <VcAFilterTag class="tag" field :value="tag" :id="tag"/>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class WorkshopTag extends Vue {
  @Prop() private tag!: string;
  @Prop({default: false}) private link!: boolean;

  clicked() {
    this.$router.push({ name: 'WorkshopOverview', params: { searchTerm: this.tag } });
  }

  mounted() {
    if(this.link)
      document.getElementById(this.tag)!.onclick = this.clicked;
  }

}

</script>

<style scoped lang="less">

.tag {
  flex-shrink: 1;
}

</style>
