import generateAction from '../utils/generateGraphQLActions';
import {
  QUERY_HOST_LIST,
  MUTATION_CREATE_HOST,
  MUTATION_CREATE_TARGET,
} from '../graphql/queries';

export const {
  types: GET_HOST_LIST,
  action: getHostList,
} = generateAction('GET_HOST_LIST', '/graphql', QUERY_HOST_LIST);

export const {
  types: CREATE_HOST,
  action: createHost,
} = generateAction('CREATE_HOST', '/graphql', MUTATION_CREATE_HOST);

export const {
  types: CREATE_TARGET,
  action: createTarget,
} = generateAction('CREATE_TARGET', '/graphql', MUTATION_CREATE_TARGET);

export const DISMISS_ERROR = 'DISMISS_ERROR';
export const dismissError = () => ({ type: DISMISS_ERROR });
