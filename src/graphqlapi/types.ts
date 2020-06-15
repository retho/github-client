import {Brand} from 'utils/common';

const IDBrand = Symbol('ID');
const URIBrand = Symbol('URI');
const DateTimeBrand = Symbol('DateTime');
const IntBrand = Symbol('Int');

export type ID = Brand<typeof IDBrand, string>;
export type URI = Brand<typeof URIBrand, string>;
export type DateTime = Brand<typeof DateTimeBrand, string>;
export type Int = Brand<typeof IntBrand, number>;

export interface IGqlUser {
  id: ID;
  bio?: string;
  createdAt: DateTime;
  email: string;
  location?: string;
  login: string;
  name?: string;
  projectsResourcePath: URI;
  projectsUrl: URI;
  updatedAt: DateTime;
  url: URI;
  websiteUrl?: URI;
}

export interface IGqlLanguage {
  id: ID;
  name: string;
  color?: string;
}

export interface IGqlTopic {
  id: ID;
  name: string;
  viewerHasStarred: boolean;
}

export interface IGqlRepositoryTopic {
  id: ID;
  resourcePath: URI;
  url: URI;
}

export interface IGqlRepositoryOwner {
  id: ID;
  avatarUrl: URI;
  login: string;
  resourcePath: URI;
  url: URI;
}

export interface IGqlLicense {
  id: ID;
  body: string;
  description?: string;
  key: string;
  name: string;
  nickname?: string;
  pseudoLicense: boolean;
  spdxId?: string;
  url?: URI;
}

export interface IGqlRepository {
  id: ID;
  createdAt: DateTime;
  description?: string;
  diskUsage?: Int;
  name: string;
  nameWithOwner: string;
  pushedAt?: DateTime;
  updatedAt: DateTime;
  url: URI;
  viewerHasStarred: boolean;
}
