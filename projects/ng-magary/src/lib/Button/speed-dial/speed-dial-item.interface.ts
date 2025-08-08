export interface SpeedDialItem {
  readonly icon: string;
  readonly tooltip?: string;
  readonly command?: (event?: Event) => void;
  readonly id?: string;
  readonly ariaLabel?: string;
  readonly backgroundColor?: string;
  readonly disabled?: boolean;
}
