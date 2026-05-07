import { TestBed } from '@angular/core/testing';
import { MagaryToastService, MagaryToastMessage } from './toast.service';

describe('MagaryToastService', () => {
  let service: MagaryToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MagaryToastService);
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('adds a toast with auto-generated id', () => {
    service.add({ message: 'Hello' });
    expect(service.toasts()).toHaveLength(1);
    expect(service.toasts()[0].message).toBe('Hello');
    expect(service.toasts()[0].id).toMatch(/^toast-/);
  });

  it('preserves explicit id when provided', () => {
    service.add({ id: 'custom-1', message: 'Explicit' });
    expect(service.toasts()[0].id).toBe('custom-1');
  });

  it('removes a toast by id', () => {
    service.add({ id: 'remove-me', message: 'Temp' });
    expect(service.toasts()).toHaveLength(1);
    service.remove('remove-me');
    expect(service.toasts()).toHaveLength(0);
  });

  it('clear() removes all toasts', () => {
    service.add({ message: 'A' });
    service.add({ message: 'B' });
    expect(service.toasts()).toHaveLength(2);
    service.clear();
    expect(service.toasts()).toHaveLength(0);
  });

  it('auto-removes non-sticky toasts after default 3000ms', () => {
    vi.useFakeTimers();
    service.add({ message: 'Auto-close' });
    expect(service.toasts()).toHaveLength(1);
    vi.advanceTimersByTime(3001);
    expect(service.toasts()).toHaveLength(0);
  });

  it('does not auto-remove sticky toasts', () => {
    vi.useFakeTimers();
    service.add({ message: 'Sticky', sticky: true });
    expect(service.toasts()).toHaveLength(1);
    vi.advanceTimersByTime(10000);
    expect(service.toasts()).toHaveLength(1);
  });

  it('uses life as alias for duration', () => {
    vi.useFakeTimers();
    service.add({ message: 'Life alias', life: 1000 });
    expect(service.toasts()).toHaveLength(1);
    vi.advanceTimersByTime(1001);
    expect(service.toasts()).toHaveLength(0);
  });

  it('respects custom duration over default 3000ms', () => {
    vi.useFakeTimers();
    service.add({ message: 'Custom', duration: 500 });
    expect(service.toasts()).toHaveLength(1);
    vi.advanceTimersByTime(501);
    expect(service.toasts()).toHaveLength(0);
  });

  it('toasts signal returns a snapshot of the array', () => {
    service.add({ message: 'Snapshot' });
    const arr = service.toasts();
    expect(arr).toHaveLength(1);
    expect(arr[0].message).toBe('Snapshot');
  });
});
