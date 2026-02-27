import { importProvidersFrom } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { LucideAngularModule, icons } from 'lucide-angular';
import { MagaryConfirmationService } from './confirmation.service';
import { MagaryConfirmDialog } from './confirm-dialog';

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
  {} as Record<string, (typeof icons)[keyof typeof icons]>,
);

describe('MagaryConfirmDialog behavior', () => {
  let fixture: ComponentFixture<MagaryConfirmDialog>;
  let component: MagaryConfirmDialog;
  let confirmationService: MagaryConfirmationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MagaryConfirmDialog],
      providers: [
        MagaryConfirmationService,
        provideNoopAnimations(),
        importProvidersFrom(LucideAngularModule.pick(lucideIcons)),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MagaryConfirmDialog);
    component = fixture.componentInstance;
    confirmationService = TestBed.inject(MagaryConfirmationService);
    fixture.detectChanges();
  });

  afterEach(() => {
  });

  it('opens only when confirmation key matches component key', () => {
    fixture.componentRef.setInput('key', 'delete-flow');
    fixture.detectChanges();

    confirmationService.confirm({
      key: 'other-flow',
      message: 'Ignored confirmation',
    });
    fixture.detectChanges();
    expect(component.visible()).toBe(false);

    confirmationService.confirm({
      key: 'delete-flow',
      header: 'Delete record',
      message: 'Do you want to delete this item?',
      acceptLabel: 'Delete',
    });
    fixture.detectChanges();

    expect(component.visible()).toBe(true);
    expect(component.effectiveHeader()).toBe('Delete record');
    expect(component.effectiveMessage()).toBe('Do you want to delete this item?');
    expect(component.effectiveAcceptLabel()).toBe('Delete');
  });

  it('runs accept callback and resets dialog state', () => {
    const acceptSpy = vi.fn();

    confirmationService.confirm({
      message: 'Accept this operation?',
      accept: acceptSpy,
    });
    fixture.detectChanges();
    expect(component.visible()).toBe(true);

    component.accept();
    fixture.detectChanges();

    expect(acceptSpy).toHaveBeenCalledTimes(1);
    expect(component.visible()).toBe(false);
    expect(component.confirmation()).toBeNull();
  });

  it('runs reject callback and resets dialog state', () => {
    const rejectSpy = vi.fn();

    confirmationService.confirm({
      message: 'Reject this operation?',
      reject: rejectSpy,
    });
    fixture.detectChanges();
    expect(component.visible()).toBe(true);

    component.reject();
    fixture.detectChanges();

    expect(rejectSpy).toHaveBeenCalledTimes(1);
    expect(component.visible()).toBe(false);
    expect(component.confirmation()).toBeNull();
  });

  it('hides when confirmation service closes active dialog', () => {
    confirmationService.confirm({
      message: 'Close me',
    });
    fixture.detectChanges();
    expect(component.visible()).toBe(true);

    confirmationService.close();
    fixture.detectChanges();

    expect(component.visible()).toBe(false);
    expect(component.confirmation()).toBeNull();
  });
});

