import gql from 'graphql-tag';
import { gqlQuery } from 'utils/ajax';

export interface IQuerySearchParams {
  q: string;
  first: number;
}
export const queryRepositorySearch = (params: IQuerySearchParams) =>
  gqlQuery(
    gql`
      query($first: Int!, $q: String!) {
        search(first: $first, query: $q, type: REPOSITORY) {
          repositoryCount
        }
      }
    `,
    params
  );
