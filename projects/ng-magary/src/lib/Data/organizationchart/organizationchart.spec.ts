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

type LucideIconData = (typeof icons)[keyof typeof icons];

const lucideIcons = Object.entries(icons).reduce(
  (acc, [key, icon]) => {
    acc[key] = icon;
    acc[kebabCase(key)] = icon;
    return acc;
  },
  {} as Record<string, LucideIconData>,
);

describe('MagaryOrganizationChart behavior', () => {
  let fixture: ComponentFixture<MagaryOrganizationChart>;
  let component: MagaryOrganizationChart;

  const nodes: MagaryTreeNode[] = [
    {
      key: 'ceo',
      label: 'CEO',
      expanded: true,
      children: [
        { key: 'coo', label: 'COO', expanded: true },
        { key: 'cfo', label: 'CFO', expanded: true },
      ],
    },
    {
      key: 'cto',
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
    const nativeElement = fixture.nativeElement as HTMLElement;
    const nodeLabels = nativeElement.querySelectorAll(
      '.magary-organizationchart-node-label',
    ) as NodeListOf<HTMLElement>;
    const labels = Array.from(nodeLabels).map((element) =>
      element.textContent?.trim(),
    );

    expect(labels).toContain('CEO');
    expect(labels).toContain('COO');
    expect(labels).toContain('CFO');
    expect(labels).toContain('CTO');
  });

  it('renders chart region with configurable aria label', () => {
    fixture.componentRef.setInput('chartAriaLabel', 'Company organization chart');
    fixture.detectChanges();

    const container = fixture.nativeElement.querySelector(
      '.magary-organizationchart',
    ) as HTMLElement;
    const table = fixture.nativeElement.querySelector(
      '.magary-organizationchart-table',
    ) as HTMLTableElement;

    expect(container.getAttribute('role')).toBe('region');
    expect(container.getAttribute('aria-label')).toBe('Company organization chart');
    expect(table.getAttribute('aria-label')).toBe('Company organization chart');
  });

  it('emits node selection and unselection based on current selection input', () => {
    const selectEvents: { node: MagaryTreeNode }[] = [];
    const unselectEvents: { node: MagaryTreeNode }[] = [];
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

  it('supports keyboard selection and key-based selection map', () => {
    const selectEvents: { node: MagaryTreeNode }[] = [];
    component.onNodeSelect.subscribe((event) => selectEvents.push(event));

    const nodeContents = fixture.nativeElement.querySelectorAll(
      '.magary-organizationchart-node-content',
    ) as NodeListOf<HTMLElement>;
    const ceoNodeContent = nodeContents[0];
    ceoNodeContent.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    fixture.detectChanges();

    expect(selectEvents).toHaveLength(1);
    expect(selectEvents[0].node.label).toBe('CEO');

    fixture.componentRef.setInput('selection', { cto: true });
    fixture.detectChanges();

    const ctoNodeContent = Array.from(
      fixture.nativeElement.querySelectorAll(
        '.magary-organizationchart-node-content',
      ) as NodeListOf<HTMLElement>,
    ).find((element) => element.textContent?.includes('CTO'));

    expect(ctoNodeContent?.classList.contains('magary-organizationchart-selected')).toBe(
      true,
    );
  });

  it('toggles collapsible node and emits expand/collapse events', () => {
    const collapsed: string[] = [];
    const expanded: string[] = [];
    component.onNodeCollapse.subscribe((node) => collapsed.push(node.label ?? ''));
    component.onNodeExpand.subscribe((node) => expanded.push(node.label ?? ''));

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

  it('exposes accessible labels for toggler controls', () => {
    const toggler = fixture.nativeElement.querySelector(
      '.magary-organizationchart-toggler',
    ) as HTMLButtonElement;

    expect(toggler.getAttribute('aria-label')).toBe('Collapse CEO');
    toggler.click();
    fixture.detectChanges();
    expect(toggler.getAttribute('aria-label')).toBe('Expand CEO');
  });
});
