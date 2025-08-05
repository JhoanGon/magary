export interface SpeedDialItem {
  icon: string;
  tooltip?: string;
  command?: (event?: Event) => void;
}
