// header.component.ts
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  isMenuOpen = false;
  openDesktopIndex: number | null = null;
  openMobileIndex: number | null = null;

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
    if (!this.isMenuOpen) {
      this.openDesktopIndex = null;
      this.openMobileIndex = null;
    }
  }

  closeMenu(): void {
    this.isMenuOpen = false;
    this.openDesktopIndex = null;
    this.openMobileIndex = null;
  }

  toggleDesktopSubmenu(index: number, event: Event): void {
    event.preventDefault();
    this.openDesktopIndex = this.openDesktopIndex === index ? null : index;
  }

  toggleMobileSubmenu(index: number, event: Event): void {
    event.preventDefault();
    this.openMobileIndex = this.openMobileIndex === index ? null : index;
  }

  closeDesktopSubmenu(): void {
    this.openDesktopIndex = null;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.app-header')) {
      this.closeDesktopSubmenu();
    }
  }

  @HostListener('document:keydown.escape', ['$event'])
  onEscape(event: Event): void {
    if (this.openDesktopIndex !== null) {
      this.closeDesktopSubmenu();
    }
    if (this.isMenuOpen) {
      this.closeMenu();
    }
  }
  
}
