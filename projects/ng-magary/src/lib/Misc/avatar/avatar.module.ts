import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MagaryAvatar } from './avatar';
export * from './avatar';
@NgModule({
  imports: [CommonModule, MagaryAvatar],
  exports: [MagaryAvatar],
})
export class AvatarModule {}
