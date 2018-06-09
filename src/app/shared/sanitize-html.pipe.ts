import { Pipe, PipeTransform } from '@angular/core';
import { BrowserModule, DomSanitizer, SafeHtml } from '@angular/platform-browser'

@Pipe({
  name: 'safeHTML'
})
export class SanitizeHtmlPipe implements PipeTransform {

  constructor(protected sanitizer: DomSanitizer) { }

  transform(value: any, type: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(value);
  }
}
