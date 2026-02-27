import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { importProvidersFrom, signal } from '@angular/core';
import { Subject } from 'rxjs';
import { LucideAngularModule, icons } from 'lucide-angular';
import { Layout } from './layout';
import { PwaService } from './service/pwa.service';

class RouterStub {
  readonly events = new Subject<unknown>();
}

const pwaServiceStub = {
  installable: signal(false),
  isIos: signal(false),
  install: vi.fn(),
};

const kebabCase = (value: string) =>
  value.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();

const lucideIcons = Object.entries(icons).reduce(
  (acc, [key, icon]) => {
    acc[key] = icon;
    acc[kebabCase(key)] = icon;
    return acc;
  },
  {} as Record<string, (typeof icons)[keyof typeof icons]>,
);

describe('Layout', () => {
  let component: Layout;
  let fixture: ComponentFixture<Layout>;
  let router: RouterStub;

  beforeEach(async () => {
    router = new RouterStub();

    await TestBed.configureTestingModule({
      imports: [Layout],
      providers: [
        importProvidersFrom(LucideAngularModule.pick(lucideIcons)),
        { provide: Router, useValue: router },
        { provide: ActivatedRoute, useValue: {} },
        { provide: PwaService, useValue: pwaServiceStub },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Layout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    router.events.complete();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('toggles and closes sidebar state', () => {
    expect(component.isSidebarOpen()).toBe(false);

    component.toggleSidebar();
    expect(component.isSidebarOpen()).toBe(true);

    component.toggleSidebar();
    expect(component.isSidebarOpen()).toBe(false);

    component.toggleSidebar();
    component.closeSidebar();
    expect(component.isSidebarOpen()).toBe(false);
  });

  it('resets content scroll on NavigationEnd after view init', () => {
    const wrapper = fixture.nativeElement.querySelector(
      '.content-wrapper',
    ) as HTMLElement;

    wrapper.scrollTop = 250;
    component.ngAfterViewInit();

    router.events.next({ type: 'irrelevant' });
    expect(wrapper.scrollTop).toBe(250);

    router.events.next(new NavigationEnd(1, '/a', '/a'));
    expect(wrapper.scrollTop).toBe(0);
  });

  it('logs when logout is triggered', () => {
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => undefined);

    component.handleLogout();

    expect(logSpy).toHaveBeenCalledWith('Usuario cerrando sesion...');
  });
});
