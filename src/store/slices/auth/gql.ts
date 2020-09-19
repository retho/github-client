import gql from 'graphql-tag';
import {gqlQuery} from 'utils/ajax';
import {GqlUser} from 'graphqlapi/types';

export type UserInfoResult = {
  viewer: Pick<GqlUser, 'login'>;
};

export const userInfoQuery = () =>
  gqlQuery<UserInfoResult>(gql`
    query {
      viewer {
        login
      }
    }
  `);
