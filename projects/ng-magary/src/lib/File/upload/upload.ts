import { CommonModule } from '@angular/common';
import {
  Component,
  input,
  output,
  signal,
  ViewChild,
  ElementRef,
  ChangeDetectionStrategy,
  inject,
} from '@angular/core';
import { MagaryButton } from '../../Button/button/button';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import {
  HttpClient,
  HttpEventType,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';

export interface UploadEvent {
  originalEvent: Event;
  files: File[];
}

interface UploadedFile {
  file: File;
  objectURL?: SafeUrl;
  status?: 'pending' | 'uploading' | 'completed' | 'error';
  progress?: number;
}

@Component({
  selector: 'magary-upload',
  imports: [CommonModule, MagaryButton],
  templateUrl: './upload.html',
  styleUrl: './upload.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MagaryUpload {
  mode = input<'basic' | 'advanced'>('basic');
  multiple = input<boolean>(false);
  accept = input<string>('*');
  maxFileSize = input<number | null>(null);
  url = input<string>('');
  name = input<string>('file');
  chooseLabel = input<string>('Choose');
  chooseIcon = input<string>('fas fa-plus');
  uploadLabel = input<string>('Upload');
  uploadIcon = input<string>('fas fa-upload');
  cancelLabel = input<string>('Cancel');
  cancelIcon = input<string>('fas fa-times');
  withCredentials = input<boolean>(false);

  onUpload = output<UploadEvent>();
  onSelect = output<UploadEvent>();
  onClear = output<void>();
  onError = output<{ error: string }>();

  files = signal<UploadedFile[]>([]);
  uploading = signal<boolean>(false);
  progress = signal<number>(0);
  isDragOver = false;

  private http = inject(HttpClient, { optional: true });

  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(private sanitizer: DomSanitizer) {}

  onFileSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.handleFiles(Array.from(input.files), event);
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = false;
    if (event.dataTransfer?.files) {
      this.handleFiles(Array.from(event.dataTransfer.files), event);
    }
  }

  handleFiles(files: File[], event: Event) {
    const validFiles: UploadedFile[] = [];

    for (const file of files) {
      if (this.maxFileSize() && file.size > this.maxFileSize()!) {
        this.onError.emit({ error: `File ${file.name} exceeds max size` });
        continue;
      }

      // Create wrapper object
      const uploadedFile: UploadedFile = {
        file: file,
        status: 'pending',
        progress: 0,
      };

      if (this.isImage(file)) {
        uploadedFile.objectURL = this.sanitizer.bypassSecurityTrustUrl(
          URL.createObjectURL(file),
        );
      }
      validFiles.push(uploadedFile);
    }

    if (this.multiple()) {
      this.files.update((current) => [...current, ...validFiles]);
    } else {
      this.files.set(validFiles.slice(0, 1));
    }

    this.onSelect.emit({
      originalEvent: event,
      files: validFiles.map((f) => f.file),
    });
  }

  removeFile(file: UploadedFile) {
    this.files.update((current) => current.filter((f) => f !== file));
    if (this.files().length === 0 && this.fileInput) {
      this.fileInput.nativeElement.value = '';
    }
  }

  clear() {
    this.files.set([]);
    this.progress.set(0);
    this.uploading.set(false);
    if (this.fileInput) {
      this.fileInput.nativeElement.value = '';
    }
    this.onClear.emit();
  }

  upload() {
    if (this.files().length === 0) return;

    this.uploading.set(true);
    this.progress.set(0);

    // Mark all pending files as uploading
    this.files.update((files) =>
      files.map((f) =>
        f.status === 'pending' ? { ...f, status: 'uploading', progress: 0 } : f,
      ),
    );

    if (this.url()) {
      this.uploadWithHttp();
    } else {
      this.simulateUpload();
    }
  }

  private uploadWithHttp() {
    if (!this.http) {
      console.error('HttpClient is required for upload but was not provided.');
      this.onError.emit({ error: 'HttpClient not configured' });
      this.uploading.set(false);
      return;
    }

    const formData = new FormData();
    this.files().forEach((f) => {
      if (f.status === 'uploading') {
        formData.append(this.name(), f.file);
      }
    });

    const req = new HttpRequest('POST', this.url(), formData, {
      reportProgress: true,
      withCredentials: this.withCredentials(),
    });

    this.http.request(req).subscribe({
      next: (event) => {
        if (event.type === HttpEventType.UploadProgress) {
          if (event.total) {
            const percent = Math.round((100 * event.loaded) / event.total);
            this.progress.set(percent);
            this.updateFilesProgress(percent);
          }
        } else if (event instanceof HttpResponse) {
          this.uploading.set(false);
          this.markFilesAsCompleted();
          this.onUpload.emit({
            originalEvent: new Event('upload'),
            files: this.files().map((f) => f.file),
          });
        }
      },
      error: (error: HttpErrorResponse) => {
        this.uploading.set(false);
        this.markFilesAsError();
        this.onError.emit({
          error: error.message || 'Upload failed',
        });
      },
    });
  }

  private simulateUpload() {
    const interval = setInterval(() => {
      this.progress.update((p) => {
        const newProgress = Math.min(p + Math.random() * 10, 100);

        this.updateFilesProgress(newProgress);

        if (newProgress >= 100) {
          clearInterval(interval);
          this.uploading.set(false);
          this.markFilesAsCompleted();

          this.onUpload.emit({
            originalEvent: new Event('upload'),
            files: this.files().map((f) => f.file),
          });
        }
        return newProgress;
      });
    }, 200);
  }

  private updateFilesProgress(percent: number) {
    this.files.update((files) =>
      files.map((f) => {
        if (f.status === 'uploading') {
          return { ...f, progress: percent };
        }
        return f;
      }),
    );
  }

  private markFilesAsCompleted() {
    this.files.update((files) =>
      files.map((f) =>
        f.status === 'uploading'
          ? { ...f, status: 'completed', progress: 100 }
          : f,
      ),
    );
  }

  private markFilesAsError() {
    this.files.update((files) =>
      files.map((f) =>
        f.status === 'uploading' ? { ...f, status: 'error', progress: 0 } : f,
      ),
    );
  }

  isImage(file: File): boolean {
    return /^image\//.test(file.type);
  }

  formatSize(bytes: number): string {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}
