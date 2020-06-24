export class AutoCompleteItem{
  constructor(
    public value: string | number
  ) { }
  get display():string {
    if (typeof this.value === "string") {
      return this.value;
    } else {
      const date = new Date(this.value);
      return date.getMonth() + 1 + "." + date.getFullYear(); // months are counted from 0, add 1 for display
    }
  }
}