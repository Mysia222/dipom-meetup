import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'sort',
})
export class SortPipe implements PipeTransform {
  comparePrice(meetupA, meetupB) {
    return meetupA.price - meetupB.price;
  }
 transform(value: any, sort: string) {
  
console.log(value);

  if(sort === "SortPrice: Lowest to Highest") {

    return value.sort(this.comparePrice);

  }
 if (sort === "SortPrice: Highest to Lowest") {
    
    return value.sort(this.comparePrice).reverse();

  }
  if (sort === "Выберете селектор" || !sort) {
    
    return value;
  }
  if (sort == undefined || sort == "No sort") {
    return value;
  }
  if (sort === "free" || value.meetupData.price == "0" ) {
    return value.filter(item => item.meetupData.price === 0);
  }
  return value;
 }
}