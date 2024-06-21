import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent {
  @Input() user: User | undefined;
  @Output() saveChanges = new EventEmitter<void>();
  @Output() closeProfileModal = new EventEmitter<void>();

  onSaveChanges() {
    this.saveChanges.emit();
  }

  onCloseProfileModal() {
    this.closeProfileModal.emit();
  }
}
