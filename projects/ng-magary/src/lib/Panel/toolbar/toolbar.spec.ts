import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MagaryToolbar } from './toolbar';

@Component({
  standalone: true,
  imports: [MagaryToolbar],
  template: `
    <magary-toolbar
      [styleClass]="'custom-toolbar'"
      [style]="{ 'justify-content': 'center' }"
    >
      <button start type="button">Start</button>
      <span center>Center</span>
      <button end type="button">End</button>
    </magary-toolbar>
  `,
})
class ToolbarHostComponent {}

describe('MagaryToolbar behavior', () => {
  let fixture: ComponentFixture<ToolbarHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToolbarHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ToolbarHostComponent);
    fixture.detectChanges();
  });

  it('applies styleClass and style inputs', () => {
    const toolbar = fixture.nativeElement.querySelector(
      '.magary-toolbar',
    ) as HTMLElement;

    expect(toolbar.classList.contains('custom-toolbar')).toBe(true);
    expect(toolbar.style.justifyContent).toBe('center');
  });
});
