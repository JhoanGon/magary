import { Component, effect, inject } from '@angular/core';
import { AvatarClickEvent, MagaryAvatar } from 'ng-magary';
import { Highlight } from 'ngx-highlightjs';
import { DemoI18nService } from '../../../../i18n/demo-i18n.service';
import { DocsTextKey } from '../../../../i18n/translations/docs-text.translations';

type AvatarInputRow = {
  name: string;
  type: string;
  default: string;
  descriptionKey: DocsTextKey;
};

type AvatarOutputRow = {
  name: string;
  type: string;
  descriptionKey: DocsTextKey;
};

type LastClickState =
  | { kind: 'none' }
  | { kind: 'avatar'; label: string }
  | { kind: 'badge'; value: string; severity: string };

@Component({
  selector: 'magary-view-avatar',
  imports: [MagaryAvatar, Highlight],
  templateUrl: './view-avatar.html',
  styleUrl: './view-avatar.scss',
})
export class ViewAvatar {
  readonly i18n = inject(DemoI18nService);
  readonly t = (key: DocsTextKey) => this.i18n.translateDocs(key);

  private lastClickState: LastClickState = { kind: 'none' };
  lastAvatarClick = '';

  importExample = "import { MagaryAvatar } from 'ng-magary';";

  exampleLabel = `
  <magary-avatar
    [label]="'MG'"
    [shape]="'circle'"
    [size]="'large'"
    [badgeValue]="'3'"
    [badgeSeverity]="'success'"
    [customStyle]="{ background: '#ece9fc', color: '#000' }"
  />`;

  exampleIcon = `
  <magary-avatar
    [icon]="'bell'"
    [shape]="'circle'"
    [size]="'large'"
    [badgeValue]="'3'"
    [badgeSeverity]="'warning'"
  />`;

  exampleImage = `
  <magary-avatar
    [image]="'assets/pika.jpg'"
    [shape]="'circle'"
    [size]="'large'"
    [badgeValue]="'5'"
    [badgeSeverity]="'info'"
  />`;

  exampleInteractive = `
  <magary-avatar
    [label]="'Usuario Activo'"
    [shape]="'circle'"
    [size]="'large'"
    [badgeValue]="'9+'"
    [badgeSeverity]="'danger'"
    (avatarClick)="onAvatarClick($event)"
  />`;

  inputsConfig: AvatarInputRow[] = [
    {
      name: 'label',
      type: 'string',
      default: "''",
      descriptionKey: 'components.misc.avatar.inputs.label.desc',
    },
    {
      name: 'image',
      type: 'string',
      default: "''",
      descriptionKey: 'components.misc.avatar.inputs.image.desc',
    },
    {
      name: 'icon',
      type: 'string',
      default: "''",
      descriptionKey: 'components.misc.avatar.inputs.icon.desc',
    },
    {
      name: 'shape',
      type: "'circle' | 'square'",
      default: "'square'",
      descriptionKey: 'components.misc.avatar.inputs.shape.desc',
    },
    {
      name: 'size',
      type: "'normal' | 'large' | 'xlarge'",
      default: "'normal'",
      descriptionKey: 'components.misc.avatar.inputs.size.desc',
    },
    {
      name: 'badgeValue',
      type: 'string',
      default: "''",
      descriptionKey: 'components.misc.avatar.inputs.badgeValue.desc',
    },
    {
      name: 'badgeSeverity',
      type: "'info' | 'success' | 'warning' | 'danger'",
      default: "'danger'",
      descriptionKey: 'components.misc.avatar.inputs.badgeSeverity.desc',
    },
    {
      name: 'customStyle',
      type: 'Record<string, unknown>',
      default: '-',
      descriptionKey: 'components.misc.avatar.inputs.customStyle.desc',
    },
  ];

  outputsConfig: AvatarOutputRow[] = [
    {
      name: 'avatarClick',
      type: 'AvatarClickEvent',
      descriptionKey: 'components.misc.avatar.outputs.avatarClick.desc',
    },
  ];

  a11yItems: DocsTextKey[] = [
    'components.misc.avatar.a11y.item.aria',
    'components.misc.avatar.a11y.item.keyboard',
    'components.misc.avatar.a11y.item.focus',
    'components.misc.avatar.a11y.item.contrast',
    'components.misc.avatar.a11y.item.fallback',
  ];

  constructor() {
    effect(() => {
      this.i18n.language();
      this.lastAvatarClick = this.getLastClickText();
    });
  }

  private getLastClickText(): string {
    if (this.lastClickState.kind === 'none') {
      return this.t('components.misc.avatar.interactive.status.none');
    }

    if (this.lastClickState.kind === 'avatar') {
      return `${this.t('components.misc.avatar.click.avatar')}: ${this.lastClickState.label}`;
    }

    return `${this.t('components.misc.avatar.click.badge')}: ${this.lastClickState.value} (${this.lastClickState.severity})`;
  }

  onAvatarClick(event: AvatarClickEvent): void {
    if (event.type === 'avatar') {
      const label = String(
        event.data?.label ??
          event.data?.icon ??
          this.t('components.misc.avatar.click.fallbackUser'),
      );

      this.lastClickState = { kind: 'avatar', label };
      this.lastAvatarClick = this.getLastClickText();
      return;
    }

    if (event.type === 'badge') {
      const value = String(event.data?.value ?? '');
      const severity = String(event.data?.severity ?? '');

      this.lastClickState = { kind: 'badge', value, severity };
      this.lastAvatarClick = this.getLastClickText();

      if (severity === 'danger') {
        alert(
          this.t('components.misc.avatar.alert.criticalPrefix') +
            value +
            this.t('components.misc.avatar.alert.criticalSuffix') +
            '!',
        );
      } else if (severity === 'info') {
        alert(
          this.t('components.misc.avatar.alert.messagesPrefix') +
            value +
            this.t('components.misc.avatar.alert.messagesSuffix'),
        );
      }
    }
  }
}
