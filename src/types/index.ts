import type { ComponentType, ReactNode } from "react";
import type { IconType } from "react-icons";

export type TLocale = "uz" | "ru" | "en";

export type TDynamic = string | number | boolean | object;

export type TObject<T = TDynamic> = Record<string, T>;

export interface IInitialData {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface ISelect<T = TDynamic, I = string> {
  value: T;
  label: I;
}

export interface IRoute {
  path: string;
  name?: string;
  icon?: IconType;
  children?: IRoute[];
  access: Set<string>;
  component: ComponentType;
}

export interface IChildren {
  children: ReactNode;
}

export interface IFetchingProps {
  url?: string;
  params?: TObject;
  enabled?: boolean;
  staleTime?: number;
}
