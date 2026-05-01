import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmModalService, ConfirmModalConfig } from './confirm-modal.service';

@Component({
  selector: 'app-confirm-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirm-modal.html',
  styleUrl: './confirm-modal.scss',
})
export class ConfirmModalComponent {
  protected modalService = inject(ConfirmModalService);

  get config(): ConfirmModalConfig | null {
    return this.modalService.config();
  }

  confirm() {
    this.modalService.resolve(true);
  }

  cancel() {
    this.modalService.resolve(false);
  }
}
