import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Avatar } from './avatar';

@NgModule({
  imports: [CommonModule, Avatar],
  exports: [Avatar],
})
export class AvatarModule {}
