import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filter',
})
export class FilterPipe implements PipeTransform {

 transform(items: any, term: string) {
  return term ? items.filter(item => RegExp( "\\b" + term).test( item.meetupData.name.toLowerCase())) : items;
 }
}