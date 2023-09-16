import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'FormatLanguagePromotionPipe',
})
export class FormatLanguagePromotionPipe implements PipeTransform {
  transform(value: any) {
    //
    // formatData.filter(i => {
    //   if (i.key === value) {
    //     let nameFormat = i.value;
    //     console.log(nameFormat);
    //     return nameFormat;
    //   } else {
    //     return value;
    //   }
    // })


  }
}
