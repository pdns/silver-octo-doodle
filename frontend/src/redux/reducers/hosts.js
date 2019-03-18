import {
  GET_HOST_LIST,
  CREATE_HOST,
  CREATE_TARGET,
  DISMISS_ERROR,
} from '../actions';

const initialState = {
  summary: {},
  create: {},
};

export default function (state = initialState, action) {
  console.log('ACTION:', action);
  switch (action.type) {
    case GET_HOST_LIST.SUCCESS: {
      const summary = {
        data: action.payload.viewer.hosts,
        errors: undefined,
        isPending: false,
      };
      return {
        ...state,
        summary,
      };
    }
    case GET_HOST_LIST.FAILURE: {
      const summary = {
        data: undefined,
        errors: action.payload,
        isPending: false,
      };
      return {
        ...state,
        summary,
      };
    }
    case GET_HOST_LIST.PENDING: {
      const summary = {
        data: undefined,
        errors: undefined,
        isPending: true,
      };
      return {
        ...state,
        summary,
      };
    }
    case CREATE_HOST.SUCCESS: {
      const summary = {
        ...state.summary,
        data: {
          edges: [
            ...state.summary.data.edges,
            action.payload.createHost.hostEdge,
          ],
        },
      };
      const create = {
        errors: undefined,
        isPending: undefined,
      };
      return {
        ...state,
        summary,
        create,
      };
    }
    case CREATE_HOST.FAILURE: {
      const create = {
        errors: action.payload,
        isPending: false,
      };
      return {
        ...state,
        create,
      };
    }
    case CREATE_HOST.PENDING: {
      const create = {
        errors: undefined,
        isPending: true,
      };
      return {
        ...state,
        create,
      };
    }
    case CREATE_TARGET.SUCCESS: {
      const hosts = state.summary.data.edges;
      const hostIndex = hosts.findIndex(e => e.node.id === action.context.hostId);
      const oldHost = hosts[hostIndex].node;
      const newHost = {
        node: {
          ...oldHost,
          targetCount: oldHost.targetCount + 1,
          targets: {
            edges: [
              ...oldHost.targets.edges,
              action.payload.createTarget.targetEdge,
            ],
          },
        },
      };
      const summary = {
        ...state.summary,
        data: {
          edges: [
            ...state.summary.data.edges.slice(0, hostIndex),
            newHost,
            ...state.summary.data.edges.slice(hostIndex + 1),
          ],
        },
      };
      const create = {
        errors: undefined,
        isPending: undefined,
      };
      return {
        ...state,
        summary,
        create,
      };
    }
    case CREATE_TARGET.FAILURE: {
      const create = {
        errors: action.payload,
        isPending: false,
      };
      return {
        ...state,
        create,
      };
    }
    case CREATE_TARGET.PENDING: {
      const create = {
        errors: undefined,
        isPending: true,
      };
      return {
        ...state,
        create,
      };
    }
    case DISMISS_ERROR: {
      const create = {
        ...state.create,
        errors: undefined,
      };
      return {
        ...state,
        create,
      };
    }
    default:
      return state;
  }
}
