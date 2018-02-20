
export class Phase {

  private valueFrom: number;
  private valueTo: number;

  constructor(valueFrom: number, valueTo: number) { 
      if (valueFrom >= 0 && valueFrom <= 360 && valueTo >= 0 && valueTo <= 360) {
          this.valueFrom = valueFrom;
          this.valueTo = valueTo;
      } else {
        throw('Wrong arguments!');
      }
  }

  public contains(value: number) {
      if (this.valueFrom > this.valueTo) {
        return value > this.valueFrom || value < this.valueTo;
      } else {
        return value >= this.valueFrom && value <= this.valueTo
      }

  }  
}
