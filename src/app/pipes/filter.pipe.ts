import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filter',
})
export class FilterPipe implements PipeTransform {

 transform(items: any, term: string) {
  //return term ? items.filter(item => RegExp( "\\b" + term).test( item.meetupData.name.toLowerCase())) : items;
  return term ? items.filter(item => item.meetupData.name.toLowerCase().indexOf(term.toLowerCase()) !== -1) : items;
 }
}