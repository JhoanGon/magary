import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MagaryUpload, UploadEvent } from 'ng-magary';
import { MagaryToastService } from 'ng-magary';
import { MagaryCard } from 'ng-magary';
import { Highlight } from 'ngx-highlightjs';
import { DemoI18nService } from '../../../../i18n/demo-i18n.service';
import { DocsTextKey } from '../../../../i18n/translations/docs-text.translations';

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

type UploadInputRow = {
  name: string;
  type: string;
  default: string;
  descriptionKey: DocsTextKey;
};

type UploadOutputRow = {
  name: string;
  type: string;
  descriptionKey: DocsTextKey;
};

@Component({
  selector: 'app-view-upload',
  imports: [CommonModule, MagaryUpload, MagaryCard, Highlight],
  templateUrl: './view-upload.html',
  styleUrl: './view-upload.scss',
})
export class ViewUpload {
  readonly i18n = inject(DemoI18nService);
  readonly t = (key: DocsTextKey) => this.i18n.translateDocs(key);

  readonly importExample = CODE_EXAMPLES.import;
  readonly exampleBasic = CODE_EXAMPLES.basic;
  readonly exampleAdvanced = CODE_EXAMPLES.advanced;
  readonly exampleManual = CODE_EXAMPLES.manual;

  readonly inputRows: UploadInputRow[] = [
    {
      name: 'mode',
      type: "'basic' | 'advanced'",
      default: "'basic'",
      descriptionKey: 'components.file.upload.apiInputs.mode.desc',
    },
    {
      name: 'multiple',
      type: 'boolean',
      default: 'false',
      descriptionKey: 'components.file.upload.apiInputs.multiple.desc',
    },
    {
      name: 'accept',
      type: 'string',
      default: "'*'",
      descriptionKey: 'components.file.upload.apiInputs.accept.desc',
    },
    {
      name: 'maxFileSize',
      type: 'number',
      default: 'null',
      descriptionKey: 'components.file.upload.apiInputs.maxFileSize.desc',
    },
    {
      name: 'url',
      type: 'string',
      default: "''",
      descriptionKey: 'components.file.upload.apiInputs.url.desc',
    },
    {
      name: 'name',
      type: 'string',
      default: "'file'",
      descriptionKey: 'components.file.upload.apiInputs.name.desc',
    },
    {
      name: 'withCredentials',
      type: 'boolean',
      default: 'false',
      descriptionKey: 'components.file.upload.apiInputs.withCredentials.desc',
    },
    {
      name: 'chooseLabel',
      type: 'string',
      default: "'Choose'",
      descriptionKey: 'components.file.upload.apiInputs.chooseLabel.desc',
    },
    {
      name: 'uploadLabel',
      type: 'string',
      default: "'Upload'",
      descriptionKey: 'components.file.upload.apiInputs.uploadLabel.desc',
    },
    {
      name: 'cancelLabel',
      type: 'string',
      default: "'Cancel'",
      descriptionKey: 'components.file.upload.apiInputs.cancelLabel.desc',
    },
  ];

  readonly outputRows: UploadOutputRow[] = [
    {
      name: 'onSelect',
      type: 'EventEmitter<UploadEvent>',
      descriptionKey: 'components.file.upload.apiOutputs.onSelect.desc',
    },
    {
      name: 'onUpload',
      type: 'EventEmitter<UploadEvent>',
      descriptionKey: 'components.file.upload.apiOutputs.onUpload.desc',
    },
    {
      name: 'onError',
      type: 'EventEmitter<{ error: string }>',
      descriptionKey: 'components.file.upload.apiOutputs.onError.desc',
    },
    {
      name: 'onClear',
      type: 'EventEmitter<void>',
      descriptionKey: 'components.file.upload.apiOutputs.onClear.desc',
    },
  ];

  private toastService = inject(MagaryToastService);

  onUpload(event: UploadEvent) {
    this.toastService.add({
      type: 'success',
      title: this.t('components.file.upload.toast.upload.title'),
      message: this.t('components.file.upload.toast.upload.message'),
    });
  }

  onSelect(event: UploadEvent) {
    this.toastService.add({
      type: 'info',
      title: this.t('components.file.upload.toast.select.title'),
      message: this.t('components.file.upload.toast.select.message'),
    });
  }

  onError(event: { error: string }) {
    this.toastService.add({
      type: 'error',
      title: this.t('components.file.upload.toast.error.title'),
      message: event.error,
    });
  }
}
