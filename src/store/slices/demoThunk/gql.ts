import gql from 'graphql-tag';
import {gqlQuery} from 'utils/ajax';
import {IGqlUser} from 'graphqlapi/types';

export interface IQuerySearchParams {}
export type LoadDataResult = {
  viewer: Pick<IGqlUser, 'login'>;
};
export const queryLoadData = (params: IQuerySearchParams) =>
  gqlQuery<LoadDataResult>(
    gql`
      query {
        viewer {
          login
        }
      }
    `,
    params
  );
