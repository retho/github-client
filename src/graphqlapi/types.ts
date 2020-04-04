export type ID = string;
export type URI = string;
export type DateTime = string;
export type Int = number;

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
