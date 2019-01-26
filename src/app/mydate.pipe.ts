import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mydate'
})
export class MydatePipe implements PipeTransform {

  // value: 파이프 앞의 대응대는 변수가 넘어온다.
  // args: mydate: 다음 변수 리스트
  // return: 새로운 output ? => optional 파라메타
  transform(value: any, args?: any): any {
    console.log(value);

    return (value as string).substring(0, 16);
  }

}
