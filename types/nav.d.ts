type ReactNode = import("react").ReactNode;

export interface Nav {
  title: string;
  name?: string;
  url?: string;
  target?: string;
  active?: boolean;
  icon?: ReactNode;
  children?: Nav[];
}
