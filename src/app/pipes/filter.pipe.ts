import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filter',
})
export class FilterPipe implements PipeTransform {

 transform(items: any, term: string) {
  return term ? items.filter(item => item.title.toLowerCase().indexOf(term) !== -1) : items;
 }
}