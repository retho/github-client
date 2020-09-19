import gql from 'graphql-tag';
import {gqlQuery} from 'utils/ajax';
import {
  GqlLanguage,
  GqlRepository,
  GqlRepositoryOwner,
  GqlLicense,
  GqlRepositoryTopic,
  GqlTopic,
} from 'graphqlapi/types';

export type QuerySearchParams = {
  q: string;
  first: number;
};
export type RepositorySearchResultItem = Pick<
  GqlRepository,
  'id' | 'name' | 'description' | 'updatedAt' | 'nameWithOwner' | 'url'
> & {
  primaryLanguage?: GqlLanguage;
  owner: Pick<GqlRepositoryOwner, 'login'>;
  licenseInfo?: Pick<GqlLicense, 'name'>;
  repositoryTopics: {
    nodes: (Pick<GqlRepositoryTopic, 'url'> & {
      topic: Pick<GqlTopic, 'name'>;
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
export const queryRepositorySearch = (params: QuerySearchParams) =>
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
