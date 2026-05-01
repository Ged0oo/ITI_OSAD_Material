import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'egyprionId',
})
export class EgyprionIdPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
