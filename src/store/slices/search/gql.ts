import gql from 'graphql-tag';
import {gqlQuery} from 'utils/ajax';
import {
  IGqlLanguage,
  IGqlRepository,
  IGqlRepositoryOwner,
  IGqlLicense,
  IGqlRepositoryTopic,
  IGqlTopic,
} from 'graphqlapi/types';

export interface IQuerySearchParams {
  q: string;
  first: number;
}
export type RepositorySearchResultItem = Pick<
  IGqlRepository,
  'id' | 'name' | 'description' | 'updatedAt' | 'nameWithOwner' | 'url'
> & {
  primaryLanguage?: IGqlLanguage;
  owner: Pick<IGqlRepositoryOwner, 'login'>;
  licenseInfo?: Pick<IGqlLicense, 'name'>;
  repositoryTopics: {
    nodes: (Pick<IGqlRepositoryTopic, 'url'> & {
      topic: Pick<IGqlTopic, 'name'>;
    })[];
  };
  stargazers: {
    totalCount: number;
  };
};
export type RepositorySearchResult = {
  search: {
    repositoryCount: number;
    nodes: RepositorySearchResultItem[];
  };
};
export const queryRepositorySearch = (params: IQuerySearchParams) =>
  gqlQuery<RepositorySearchResult>(
    gql`
      query($first: Int!, $q: String!) {
        search(first: $first, query: $q, type: REPOSITORY) {
          repositoryCount
          nodes {
            ... on Repository {
              id
              url
              name
              description
              updatedAt
              repositoryTopics(first: 6) {
                nodes {
                  topic {
                    name
                  }
                  url
                }
              }
              nameWithOwner
              owner {
                login
              }
              primaryLanguage {
                id
                name
                color
              }
              stargazers {
                totalCount
              }
              licenseInfo {
                name
              }
            }
          }
        }
      }
    `,
    params
  );
