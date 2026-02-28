import { Component, inject } from '@angular/core';
import { MagaryTabs, MagaryTab } from 'ng-magary';
import { Highlight } from 'ngx-highlightjs';
import { DemoI18nService } from '../../../../i18n/demo-i18n.service';
import { DocsTextKey } from '../../../../i18n/translations/docs-text.translations';

type TabInputRow = {
  name: string;
  type: string;
  default: string;
  descriptionKey: DocsTextKey;
};

@Component({
  selector: 'magary-view-tab',
  imports: [MagaryTabs, MagaryTab, Highlight],
  templateUrl: './view-tab.html',
  styleUrl: './view-tab.scss',
})
export class ViewTab {
  readonly i18n = inject(DemoI18nService);
  readonly t = (key: DocsTextKey) => this.i18n.translateDocs(key);

  importExample = "import { MagaryTabs, MagaryTab } from 'ng-magary';";
  exampleTab = `
  <magary-tabs
    [lineColor]="'#06b6d4'"
    [activeBg]="'#2f4158'"
    [activeText]="'#f8fafc'"
    [hoverBg]="'#25364b'"
    [positionContent]="'flex-start'"
    tabListAriaLabel="Principal sections"
  >
    <magary-tab label="Inicio">
      <h2>Bienvenido</h2>
      <p>Contenido de la pestaña de inicio.</p>
    </magary-tab>
    <magary-tab label="Perfil">
      <h2>Tu perfil</h2>
      <p>Detalles personales, ajustes, etc.</p>
    </magary-tab>
    <magary-tab label="Ayuda">
      <p>Aquí puedes encontrar asistencia.</p>
    </magary-tab>
    <magary-tab label="Contacto">
      <p>Aquí puedes encontrar los numeros de contacto.</p>
    </magary-tab>
  </magary-tabs>`;
  exampleBasicHTML = `
  <magary-tabs
    lineColor="#d946ef"
    activeBg="#4a2854"
    hoverBg="#3a2242"
    tabListAriaLabel="Profile sections"
  >
    <magary-tab label="Perfil">
      <p>Contenido del perfil</p>
    </magary-tab>
    <magary-tab label="Configuración">
      <p>Contenido de configuración</p>
    </magary-tab>
    <magary-tab label="Seguridad">
      <p>Contenido de seguridad</p>
    </magary-tab>
  </magary-tabs>`;
  exampleBasicTS = `
  import { MagaryTabs, MagaryTab } from 'ng-magary';

  @Component({
    imports: [MagaryTabs, MagaryTab],
    // ...
  })
  export class MyComponent {}`;

  readonly inputRows: TabInputRow[] = [
    {
      name: 'lineColor',
      type: 'string',
      default: "'#06b6d4'",
      descriptionKey: 'components.panel.tab.inputs.lineColor.desc',
    },
    {
      name: 'activeBg',
      type: 'string | null',
      default: 'null',
      descriptionKey: 'components.panel.tab.inputs.activeBg.desc',
    },
    {
      name: 'activeText',
      type: 'string | null',
      default: 'null',
      descriptionKey: 'components.panel.tab.inputs.activeText.desc',
    },
    {
      name: 'hoverBg',
      type: 'string | null',
      default: 'null',
      descriptionKey: 'components.panel.tab.inputs.hoverBg.desc',
    },
    {
      name: 'positionContent',
      type: 'string',
      default: "'center'",
      descriptionKey: 'components.panel.tab.inputs.positionContent.desc',
    },
    {
      name: 'panelWidth',
      type: "'auto' | 'full'",
      default: "'full'",
      descriptionKey: 'components.panel.tab.inputs.panelWidth.desc',
    },
    {
      name: 'tabListAriaLabel',
      type: 'string',
      default: "'Tabs'",
      descriptionKey: 'components.panel.tab.inputs.tabListAriaLabel.desc',
    },
    {
      name: 'backgroundLine / activeTabBackground / activeTabTextColor',
      type: 'string | null',
      default: 'null',
      descriptionKey: 'components.panel.tab.inputs.legacy.desc',
    },
  ];
}
