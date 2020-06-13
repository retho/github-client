import gql from 'graphql-tag';
import {gqlQuery} from 'utils/ajax';

export const userInfoQuery = () =>
  gqlQuery(gql`
    query {
      viewer {
        login
      }
    }
  `);
