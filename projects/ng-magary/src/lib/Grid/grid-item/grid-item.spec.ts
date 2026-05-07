import { Component, ElementRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MagaryGridItem } from './grid-item';
import { MagaryGrid } from '../grid/grid';

/**
 * Mock MagaryGrid that satisfies the inject(forwardRef(() => MagaryGrid)) requirement
 * without loading GridStack. This allows MagaryGridItem to be instantiated in isolation.
 */
@Component({
  standalone: true,
  template: '<ng-content></ng-content>',
})
class MockMagaryGrid {
  registerWidget(_el: HTMLElement): void {
    // No-op: GridStack not available in test environment
  }
}

describe('MagaryGridItem', () => {
  describe('Rendering limitation', () => {
    it('documents that MagaryGridItem requires parent MagaryGrid which depends on GridStack', () => {
      // MagaryGridItem hard-injects parent MagaryGrid via inject(forwardRef(() => MagaryGrid)).
      // MagaryGrid depends on GridStack (a third-party drag-and-drop library), which cannot be
      // loaded in a JSDOM test environment.
      //
      // Full rendering tests for grid-item behavior (attribute sync, GridStack registration)
      // are covered by the parent Grid integration spec at:
      //   projects/ng-magary/src/lib/Grid/grid/grid.spec.ts
      //
      // Tests below use a MockMagaryGrid to verify signal inputs accept values.
      expect(MagaryGridItem).toBeDefined();
    });
  });

  describe('Signal inputs accept values via componentRef.setInput', () => {
    let fixture: ComponentFixture<MagaryGridItem>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [MagaryGridItem],
        providers: [
          { provide: MagaryGrid, useClass: MockMagaryGrid },
          { provide: ElementRef, useValue: new ElementRef(document.createElement('div')) },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(MagaryGridItem);
      fixture.detectChanges();
    });

    it('accepts layout signal inputs: col, row, cols, rows', () => {
      fixture.componentRef.setInput('col', 2);
      fixture.componentRef.setInput('row', 1);
      fixture.componentRef.setInput('cols', 4);
      fixture.componentRef.setInput('rows', 3);
      fixture.detectChanges();

      expect(fixture.componentInstance.col()).toBe(2);
      expect(fixture.componentInstance.row()).toBe(1);
      expect(fixture.componentInstance.cols()).toBe(4);
      expect(fixture.componentInstance.rows()).toBe(3);
    });

    it('accepts gridstack property signal inputs: x, y, w, h', () => {
      fixture.componentRef.setInput('x', 0);
      fixture.componentRef.setInput('y', 0);
      fixture.componentRef.setInput('w', 6);
      fixture.componentRef.setInput('h', 4);
      fixture.detectChanges();

      expect(fixture.componentInstance.x()).toBe(0);
      expect(fixture.componentInstance.y()).toBe(0);
      expect(fixture.componentInstance.w()).toBe(6);
      expect(fixture.componentInstance.h()).toBe(4);
    });

    it('accepts lock and identity signal inputs: id, noResize, noMove, locked', () => {
      fixture.componentRef.setInput('id', 'widget-1');
      fixture.componentRef.setInput('noResize', true);
      fixture.componentRef.setInput('noMove', false);
      fixture.componentRef.setInput('locked', true);
      fixture.detectChanges();

      expect(fixture.componentInstance.id()).toBe('widget-1');
      expect(fixture.componentInstance.noResize()).toBe(true);
      expect(fixture.componentInstance.noMove()).toBe(false);
      expect(fixture.componentInstance.locked()).toBe(true);
    });
  });
});
