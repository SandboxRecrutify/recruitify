import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'modal-button',
  templateUrl: './modal.component.html',
})


export class NzModalComponent implements OnInit{
  isVisible = false;

  constructor() {}
  
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }
}