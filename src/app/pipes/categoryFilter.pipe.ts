import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'categoryFilter',
})
export class categoryFilterPipe implements PipeTransform {

  transform(items: any, term: string) {
    if(term === "Выберете основную категорию") {
      return items;
    }
    if (term) {
      return items.filter(item => {
        return term.indexOf(item.meetupData.category) !== -1
      });
    } else {
      return items;
    }
   }
}