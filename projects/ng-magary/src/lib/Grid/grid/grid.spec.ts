import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GridStack } from 'gridstack';
import { MagaryGrid } from './grid';

type GridEvent = { type: string };
type GridItem = { id: string };
type GridListeners = Record<
  string,
  (event: GridEvent, items: GridItem[]) => void
>;

describe('MagaryGrid behavior', () => {
  let fixture: ComponentFixture<MagaryGrid>;
  let component: MagaryGrid;
  let listeners: GridListeners;
  let gridApi: {
    on: ReturnType<typeof vi.fn>;
    destroy: ReturnType<typeof vi.fn>;
    makeWidget: ReturnType<typeof vi.fn>;
  };
  let initSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MagaryGrid],
    }).compileComponents();
  });

  beforeEach(() => {
    vi.useFakeTimers();

    listeners = {};
    gridApi = {
      on: vi.fn(
        (
          event: string,
          callback: (event: GridEvent, items: GridItem[]) => void,
        ) => {
        listeners[event] = callback;
        },
      ),
      destroy: vi.fn(),
      makeWidget: vi.fn(),
    };

    initSpy = vi
      .spyOn(GridStack, 'init')
      .mockReturnValue(gridApi as unknown as GridStack);

    fixture = TestBed.createComponent(MagaryGrid);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('initializes GridStack with provided options and keeps grid instance', () => {
    fixture.componentRef.setInput('options', {
      float: true,
      margin: 8,
    });

    fixture.detectChanges();
    vi.runAllTimers();

    expect(initSpy).toHaveBeenCalledTimes(1);
    expect(initSpy.mock.calls[0][0]).toMatchObject({
      float: true,
      margin: 8,
    });
    expect(initSpy.mock.calls[0][1]).toBeInstanceOf(HTMLElement);
    expect(component.getGridInstance()).toBe(gridApi);
  });

  it('emits change, added and removed outputs when grid callbacks are triggered', () => {
    const changeSpy = vi.fn();
    const addedSpy = vi.fn();
    const removedSpy = vi.fn();

    component.change.subscribe(changeSpy);
    component.added.subscribe(addedSpy);
    component.removed.subscribe(removedSpy);

    fixture.detectChanges();
    vi.runAllTimers();

    listeners['change']({ type: 'change' }, [{ id: 'widget-1' }]);
    listeners['added']({ type: 'added' }, [{ id: 'widget-2' }]);
    listeners['removed']({ type: 'removed' }, [{ id: 'widget-3' }]);

    expect(changeSpy).toHaveBeenCalledWith({
      event: { type: 'change' },
      items: [{ id: 'widget-1' }],
    });
    expect(addedSpy).toHaveBeenCalledWith({
      event: { type: 'added' },
      items: [{ id: 'widget-2' }],
    });
    expect(removedSpy).toHaveBeenCalledWith({
      event: { type: 'removed' },
      items: [{ id: 'widget-3' }],
    });
  });

  it('registers widget only for elements that are not item-content nodes', () => {
    fixture.detectChanges();
    vi.runAllTimers();

    const widgetElement = document.createElement('div');
    component.registerWidget(widgetElement);

    const contentElement = document.createElement('div');
    contentElement.classList.add('grid-stack-item-content');
    component.registerWidget(contentElement);

    expect(gridApi.makeWidget).toHaveBeenCalledTimes(1);
    expect(gridApi.makeWidget).toHaveBeenCalledWith(widgetElement);
  });

  it('destroys grid instance on component destroy', () => {
    fixture.detectChanges();
    vi.runAllTimers();

    component.ngOnDestroy();

    expect(gridApi.destroy).toHaveBeenCalledTimes(1);
  });
});
