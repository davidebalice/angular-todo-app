import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OffcanvasService {
  private offcanvasStates: { [key: string]: BehaviorSubject<boolean> } = {};

  getOffcanvasState$(id: string) {
    if (!this.offcanvasStates[id]) {
      this.offcanvasStates[id] = new BehaviorSubject<boolean>(false);
    }
    return this.offcanvasStates[id].asObservable();
  }

  open(id: string) {
    if (!this.offcanvasStates[id]) {
      this.offcanvasStates[id] = new BehaviorSubject<boolean>(false);
    }
    this.offcanvasStates[id].next(true);
  }

  close(id: string) {
    if (!this.offcanvasStates[id]) {
      this.offcanvasStates[id] = new BehaviorSubject<boolean>(false);
    }
    this.offcanvasStates[id].next(false);
  }

  toggle(id: string) {
    if (!this.offcanvasStates[id]) {
      this.offcanvasStates[id] = new BehaviorSubject<boolean>(false);
    }
    this.offcanvasStates[id].next(!this.offcanvasStates[id].value);
    setTimeout(() => {
      var body = document.querySelector("body")
      if (body?.classList.contains('overlay_active')) {

        body.addEventListener('click', () => {
          this.close('offcanvas')
          body?.classList.remove('overlay_active')
        }, { once: true })
      }
    }, 200);
  }
}