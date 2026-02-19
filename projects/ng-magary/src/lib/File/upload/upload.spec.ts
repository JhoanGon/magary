import { importProvidersFrom } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LucideAngularModule, icons } from 'lucide-angular';
import { MagaryUpload } from './upload';

const kebabCase = (value: string) =>
  value
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([a-zA-Z])([0-9])/g, '$1-$2')
    .toLowerCase();

const lucideIcons = Object.entries(icons).reduce(
  (acc, [key, icon]) => {
    acc[key] = icon;
    acc[kebabCase(key)] = icon;
    return acc;
  },
  {} as Record<string, any>,
);

describe('MagaryUpload behavior', () => {
  let fixture: ComponentFixture<MagaryUpload>;
  let component: MagaryUpload;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MagaryUpload],
      providers: [importProvidersFrom(LucideAngularModule.pick(lucideIcons))],
    }).compileComponents();

    fixture = TestBed.createComponent(MagaryUpload);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
    fixture.destroy();
  });

  it('rejects files larger than maxFileSize and emits onError', () => {
    fixture.componentRef.setInput('maxFileSize', 1);
    fixture.detectChanges();

    const errors: string[] = [];
    component.onError.subscribe((event) => {
      errors.push(event.error);
    });

    const oversized = new File(['ab'], 'big.txt', { type: 'text/plain' });
    component.handleFiles([oversized], new Event('change'));

    expect(errors).toHaveLength(1);
    expect(errors[0]).toContain('big.txt');
    expect(component.files()).toHaveLength(0);
  });

  it('keeps only first file in single mode and emits onSelect', () => {
    const selectedBatches: string[][] = [];
    component.onSelect.subscribe((event) => {
      selectedBatches.push(event.files.map((file) => file.name));
    });

    const fileA = new File(['a'], 'a.txt', { type: 'text/plain' });
    const fileB = new File(['b'], 'b.txt', { type: 'text/plain' });
    component.handleFiles([fileA, fileB], new Event('change'));

    expect(component.files().map((file) => file.file.name)).toEqual(['a.txt']);
    expect(selectedBatches).toEqual([['a.txt', 'b.txt']]);
  });

  it('appends files in multiple mode across selections', () => {
    fixture.componentRef.setInput('multiple', true);
    fixture.detectChanges();

    const fileA = new File(['a'], 'a.txt', { type: 'text/plain' });
    const fileB = new File(['b'], 'b.txt', { type: 'text/plain' });
    component.handleFiles([fileA], new Event('change'));
    component.handleFiles([fileB], new Event('change'));

    expect(component.files().map((file) => file.file.name)).toEqual([
      'a.txt',
      'b.txt',
    ]);
  });

  it('simulates upload, marks files completed and emits onUpload', () => {
    vi.useFakeTimers();
    vi.spyOn(Math, 'random').mockReturnValue(1);

    const uploads: string[][] = [];
    component.onUpload.subscribe((event) => {
      uploads.push(event.files.map((file) => file.name));
    });

    const file = new File(['payload'], 'demo.txt', { type: 'text/plain' });
    component.handleFiles([file], new Event('change'));

    component.upload();
    expect(component.uploading()).toBe(true);

    vi.advanceTimersByTime(2200);
    fixture.detectChanges();

    expect(component.uploading()).toBe(false);
    expect(component.progress()).toBe(100);
    expect(component.files().every((entry) => entry.status === 'completed')).toBe(
      true,
    );
    expect(uploads).toEqual([['demo.txt']]);
  });

  it('clears selected files and emits onClear', () => {
    let clearCalls = 0;
    component.onClear.subscribe(() => {
      clearCalls += 1;
    });

    const file = new File(['payload'], 'demo.txt', { type: 'text/plain' });
    component.handleFiles([file], new Event('change'));
    expect(component.files()).toHaveLength(1);

    component.clear();

    expect(component.files()).toHaveLength(0);
    expect(component.progress()).toBe(0);
    expect(component.uploading()).toBe(false);
    expect(clearCalls).toBe(1);
  });
});
