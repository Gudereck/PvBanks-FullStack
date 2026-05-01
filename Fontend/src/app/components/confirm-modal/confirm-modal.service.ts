import { Injectable, signal } from '@angular/core';

export interface ConfirmModalConfig {
  title: string;
  message: string;
  confirmLabel?: string;   // padrão: 'Confirmar'
  cancelLabel?: string;    // padrão: 'Cancelar'
  danger?: boolean;        // true = botão confirmar fica vermelho
}

@Injectable({ providedIn: 'root' })
export class ConfirmModalService {
  config = signal<ConfirmModalConfig | null>(null);

  private resolveFn: ((value: boolean) => void) | null = null;

  open(cfg: ConfirmModalConfig): Promise<boolean> {
    this.config.set(cfg);
    return new Promise((resolve) => {
      this.resolveFn = resolve;
    });
  }

  resolve(value: boolean) {
    this.config.set(null);
    this.resolveFn?.(value);
    this.resolveFn = null;
  }
}
