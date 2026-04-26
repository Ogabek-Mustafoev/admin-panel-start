import type { ComponentType, ReactNode } from "react";
import type { IconType } from "react-icons";

export type TLocale = "uz" | "ru" | "en";

export type TDynamic = string | number | boolean | object;

export type TObject<T = TDynamic> = Record<string, T>;

export interface IInitialData {
  id: string;
  created_at: string;
  updated_at: string;
}

export type TTheme = "light" | "dark" | "system";

export interface IMeta {
  page: number;
  total: number;
  pageSize: number;
  pageCount: number;
}

export interface IResponse<T = any> {
  data: T;
  message: string;
  success: boolean;
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
