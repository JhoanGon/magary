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

describe('MagaryToolbar', () => {
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

  it('has toolbar role for accessibility', () => {
    const toolbar = fixture.nativeElement.querySelector('.magary-toolbar');
    expect(toolbar.getAttribute('role')).toBe('toolbar');
  });

  it('renders content in start group', () => {
    const startGroup = fixture.nativeElement.querySelector('.magary-toolbar-group-start');
    expect(startGroup).toBeTruthy();
    expect(startGroup.textContent).toContain('Start');
  });

  it('renders content in center group', () => {
    const centerGroup = fixture.nativeElement.querySelector('.magary-toolbar-group-center');
    expect(centerGroup).toBeTruthy();
    expect(centerGroup.textContent).toContain('Center');
  });

  it('renders content in end group', () => {
    const endGroup = fixture.nativeElement.querySelector('.magary-toolbar-group-end');
    expect(endGroup).toBeTruthy();
    expect(endGroup.textContent).toContain('End');
  });

  it('renders three separate slot groups', () => {
    const groups = fixture.nativeElement.querySelectorAll('[class*="magary-toolbar-group"]');
    expect(groups.length).toBe(3);
  });
});
