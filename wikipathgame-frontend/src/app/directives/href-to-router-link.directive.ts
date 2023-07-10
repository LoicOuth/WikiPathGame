import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

@Directive({
  selector: '[HrefToRouterLink]',
})
export class HrefToRouterLinkDirective implements OnInit {
  private _listeners: { destroy: () => void }[] = [];
  private processing = false;
  private observer = new MutationObserver(() => this.getDom());

  constructor(
    private _router: Router,
    private _el: ElementRef,
    private _renderer: Renderer2
  ) {}

  ngOnInit() {
    this.getDom();
    this.registerListenerForDomChanges();
  }

  private getDom(): void {
    if (!this.processing) {
      if (this._el.nativeElement.nodeName === 'A') {
        this.addRouterLink(this._el.nativeElement);
      } else {
        const links = this._el.nativeElement.querySelectorAll('a');
        links.forEach((linkHtmlElement: any) =>
          this.addRouterLink(linkHtmlElement)
        );
      }

      if (this._el.nativeElement.className === 'mw-editsection') {
        this.removeEditClass(this._el.nativeElement);
      } else {
        const edits =
          this._el.nativeElement.querySelectorAll('.mw-editsection');

        edits.forEach((classHtmlElement: any) => {
          this.removeEditClass(classHtmlElement);
        });
      }
    }
  }

  private addRouterLink(linkHtmlElement: any) {
    if (linkHtmlElement?.getAttribute('href')) {
      this._renderer.setAttribute(
        linkHtmlElement,
        'routerLink',
        `game/${linkHtmlElement?.getAttribute('href').split('/')[2]}`
      );
      this._renderer.setAttribute(linkHtmlElement, 'replaceUrl', 'true');

      const destroyListener = this._renderer.listen(
        linkHtmlElement,
        'click',
        (_event) => {
          _event.preventDefault();
          _event.stopPropagation();
          this._router.navigateByUrl(
            `game/${linkHtmlElement?.getAttribute('href').split('/')[2]}`
          );
        }
      );
      this._listeners.push({ destroy: destroyListener });
    }
  }

  private removeEditClass(classHtmlElement: any) {
    this._renderer.removeChild(classHtmlElement.parentNode, classHtmlElement);
  }

  private registerListenerForDomChanges() {
    const attributes = false;
    const childList = true;
    const subtree = true;
    this.observer.observe(this._el.nativeElement, {
      attributes,
      childList,
      subtree,
    });
  }

  ngOnDestroy(): void {
    this._listeners?.forEach((listener) => listener.destroy());
    this._listeners = [];
    this.observer.disconnect();
  }
}
