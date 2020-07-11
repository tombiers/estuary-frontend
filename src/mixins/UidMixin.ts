import { Component, Vue } from "vue-property-decorator";

@Component
export default class UidMixin extends Vue{
  private static _uid = 0;
  public uid!: string;
  beforeCreate() {
    this.uid = "uid-"+UidMixin._uid ++;
  }
}
