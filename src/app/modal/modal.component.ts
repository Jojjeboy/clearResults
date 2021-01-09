import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Input() modalData: any = {};
  @Output() parentEvent = new EventEmitter();
  constructor() { }
  

  ngOnInit(): void {
    //console.log(this.modalData);
  }

  childmethod() {
    this.parentEvent.emit();
  }

  openModal(): void {
    this.modalData.open = true;
  }

  closeModal(): void{
    this.modalData.open = false;
  }

  callBackConfirmed() {
    this.parentEvent.emit();
  }

}
