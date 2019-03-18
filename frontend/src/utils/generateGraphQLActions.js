
export default function generateGraphqlQueryAction(typeNamespace, url, graphqlQuery) {
  if (!typeNamespace || !url || !graphqlQuery) {
    throw new Error('generateGraphqlQueryActions: missing at least one of three arguments');
  }

  const types = {
    PENDING: `${typeNamespace}.PENDING`,
    SUCCESS: `${typeNamespace}.SUCCESS`,
    FAILURE: `${typeNamespace}.FAILURE`,
  };

  const action = ({ variables, context } = {}) => async (dispatch) => {
    try {
      dispatch({ type: types.PENDING, context });
      // eslint-disable-next-line no-undef
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: graphqlQuery, variables }),
      });
      if (response.status !== 200) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const { data, errors } = await response.json();
      if (!errors) {
        dispatch({ type: types.SUCCESS, payload: data, context });
      } else {
        dispatch({ type: types.FAILURE, payload: errors, context });
      }
    } catch (err) {
      dispatch({ type: types.FAILURE, payload: [err], context });
    }
  };

  return {
    types,
    action,
  };
}
