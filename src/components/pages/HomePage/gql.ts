import gql from 'graphql-tag';
import {gqlQuery} from 'utils/ajax';

export const queryUserData = () =>
  gqlQuery(
    gql`
      query {
        viewer {
          login
        }
      }
    `,
    {}
  );
