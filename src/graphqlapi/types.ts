import {Brand} from 'utils/common';

const IDBrand = Symbol('ID');
const URIBrand = Symbol('URI');
const DateTimeBrand = Symbol('DateTime');
const IntBrand = Symbol('Int');

export type ID = Brand<typeof IDBrand, string>;
export type URI = Brand<typeof URIBrand, string>;
export type DateTime = Brand<typeof DateTimeBrand, string>;
export type Int = Brand<typeof IntBrand, number>;

export type GqlUser = {
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
};

export type GqlLanguage = {
  id: ID;
  name: string;
  color?: string;
};

export type GqlTopic = {
  id: ID;
  name: string;
  viewerHasStarred: boolean;
};

export type GqlRepositoryTopic = {
  id: ID;
  resourcePath: URI;
  url: URI;
};

export type GqlRepositoryOwner = {
  id: ID;
  avatarUrl: URI;
  login: string;
  resourcePath: URI;
  url: URI;
};

export type GqlLicense = {
  id: ID;
  body: string;
  description?: string;
  key: string;
  name: string;
  nickname?: string;
  pseudoLicense: boolean;
  spdxId?: string;
  url?: URI;
};

export type GqlRepository = {
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
};
