export class Language {
  id: number;
  label: string;
  value: string;

  constructor(id: number, label: string, value: string) {
    this.id = id;
    this.label = label;
    this.value = value;
  }
}
