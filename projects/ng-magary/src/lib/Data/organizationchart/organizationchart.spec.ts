import { importProvidersFrom } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { LucideAngularModule, icons } from 'lucide-angular';
import { MagaryTreeNode } from '../tree/tree-node.interface';
import { MagaryOrganizationChart } from './organizationchart';

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

describe('MagaryOrganizationChart behavior', () => {
  let fixture: ComponentFixture<MagaryOrganizationChart>;
  let component: MagaryOrganizationChart;

  const nodes: MagaryTreeNode[] = [
    {
      label: 'CEO',
      expanded: true,
      children: [
        { label: 'COO', expanded: true },
        { label: 'CFO', expanded: true },
      ],
    },
    {
      label: 'CTO',
      expanded: true,
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MagaryOrganizationChart],
      providers: [
        provideNoopAnimations(),
        importProvidersFrom(LucideAngularModule.pick(lucideIcons)),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MagaryOrganizationChart);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('value', nodes);
    fixture.componentRef.setInput('selectionMode', 'single');
    fixture.componentRef.setInput('collapsible', true);
    fixture.detectChanges();
  });

  it('renders labels for all visible nodes from hierarchical input', () => {
    const labels = Array.from(
      fixture.nativeElement.querySelectorAll('.magary-organizationchart-node-label'),
    ).map((element: any) => element.textContent?.trim());

    expect(labels).toContain('CEO');
    expect(labels).toContain('COO');
    expect(labels).toContain('CFO');
    expect(labels).toContain('CTO');
  });

  it('emits node selection and unselection based on current selection input', () => {
    const selectEvents: any[] = [];
    const unselectEvents: any[] = [];
    component.onNodeSelect.subscribe((event) => selectEvents.push(event));
    component.onNodeUnselect.subscribe((event) => unselectEvents.push(event));

    const nodeContent = fixture.nativeElement.querySelector(
      '.magary-organizationchart-node-content',
    ) as HTMLElement;

    nodeContent.click();
    fixture.detectChanges();
    expect(selectEvents).toHaveLength(1);
    expect(selectEvents[0].node.label).toBe('CEO');

    fixture.componentRef.setInput('selection', nodes[0]);
    fixture.detectChanges();

    nodeContent.click();
    fixture.detectChanges();
    expect(unselectEvents).toHaveLength(1);
    expect(unselectEvents[0].node.label).toBe('CEO');
  });

  it('toggles collapsible node and emits expand/collapse events', () => {
    const collapsed: string[] = [];
    const expanded: string[] = [];
    component.onNodeCollapse.subscribe((node) => collapsed.push(node.label));
    component.onNodeExpand.subscribe((node) => expanded.push(node.label));

    const toggler = fixture.nativeElement.querySelector(
      '.magary-organizationchart-toggler',
    ) as HTMLElement;

    toggler.click();
    fixture.detectChanges();

    expect(collapsed).toEqual(['CEO']);
    expect(nodes[0].expanded).toBe(false);

    toggler.click();
    fixture.detectChanges();

    expect(expanded).toEqual(['CEO']);
    expect(nodes[0].expanded).toBe(true);
  });
});
