import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MagaryUpload, UploadEvent } from 'ng-magary';
import { MagaryToastService } from 'ng-magary';
import { MagaryCard } from 'ng-magary';
import { Highlight } from 'ngx-highlightjs';

const CODE_EXAMPLES = {
  import: `import { MagaryUpload } from 'ng-magary';`,
  basic: `<magary-upload
  mode="basic"
  chooseLabel="Select File"
  (onSelect)="onSelect($event)"
></magary-upload>`,
  advanced: `<magary-upload
  mode="advanced"
  url="https://api.mysite.com/upload"
  name="myFile"
  [withCredentials]="true"
  [multiple]="true"
  accept="image/*"
  [maxFileSize]="1000000"
  (onUpload)="onUpload($event)"
  (onError)="onError($event)"
></magary-upload>`,
  manual: `<!-- Template -->
<magary-upload
  mode="advanced"
  (onSelect)="onSelect($event)"
></magary-upload>

// Component
onSelect(event: UploadEvent) {
  const files = event.files;
  // Implement your custom upload logic here
  this.myService.upload(files).subscribe();
}`,
};

@Component({
  selector: 'app-view-upload',
  imports: [CommonModule, MagaryUpload, MagaryCard, Highlight],
  templateUrl: './view-upload.html',
  styleUrl: './view-upload.scss',
})
export class ViewUpload {
  readonly importExample = CODE_EXAMPLES.import;
  readonly exampleBasic = CODE_EXAMPLES.basic;
  readonly exampleAdvanced = CODE_EXAMPLES.advanced;
  readonly exampleManual = CODE_EXAMPLES.manual;

  private toastService = inject(MagaryToastService);

  onUpload(event: UploadEvent) {
    this.toastService.add({
      type: 'success',
      title: 'Success',
      message: 'File Uploaded',
    });
  }

  onSelect(event: UploadEvent) {
    this.toastService.add({
      type: 'info',
      title: 'Success',
      message: 'File Selected',
    });
  }

  onError(event: { error: string }) {
    this.toastService.add({
      type: 'error',
      title: 'Error',
      message: event.error,
    });
  }
}
