import { IDashboard, ILook, IFolder, IUser, IBoard } from '@looker/sdk';

export interface TransformedAsset {
  type: 'Dashboard' | 'Explore';
  name: string;
  domain: string;
  subdomain: string;
  status: 'Operational' | 'Warning' | 'Critical';
  owner: string;
  id?: string;
}

export interface ActivityItem {
  name: string;
  domain: string;
  timestamp: string;
  id?: string;
}

export interface DirectoryItem {
  id: string;
  type: 'Dashboard' | 'Explore';
  name: string;
  domain: string;
  subdomain?: string;
  status: 'Operational' | 'Warning' | 'Critical';
  environment?: string;
  access?: string;
  owner: string;
  isFavorite?: boolean;
}

export type {
  IDashboard,
  ILook,
  IFolder,
  IUser,
  IBoard
};
