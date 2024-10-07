import actions from 'src/modules/pay/view/payViewActions';

const initialData = {
  loading: false,
  record: null,
  checkoutLoading:false,
  checkout: null,
};

export default (state = initialData, { type, payload }) => {
  if (type === actions.FIND_STARTED) {
    return {
      ...state,
      record: null,
      loading: true,
    };
  }

  if (type === actions.FIND_SUCCESS) {
    return {
      ...state,
      record: payload,
      loading: false,
    };
  }

  if (type === actions.FIND_ERROR) {
    return {
      ...state,
      record: null,
      loading: false,
    };
  }


  if (type === actions.FIND_CHECKOUT_STARTED) {
    return {
      ...state,
      checkout: null,
      checkoutLoading: true,
    };
  }

  if (type === actions.FIND_CHECKOUT_SUCCESS) {
    return {
      ...state,
      checkout: payload,
      checkoutLoading: false,
    };
  }

  if (type === actions.FIND_CHECKOUT_ERROR) {
    return {
      ...state,
      checkout: null,
      checkoutLoading: false,
    };
  }

  return state;
};
