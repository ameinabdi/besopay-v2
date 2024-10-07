import actions from 'src/modules/auth/authActions';
import AuthCurrentTenant from 'src/modules/auth/authCurrentTenant';

const initialData = {
  currentUser: null,
  currentTenant: null,
  loadingInit: true,
  loadingEmailConfirmation: false,
  loadingPasswordResetEmail: false,
  loadingPasswordChange: false,
  loadingVerifyEmail: false,
  loadingPasswordReset: false,
  loadingUpdateProfile: false,
  loading: false,
  errorMessage: null,
  loadingVerifyTwoFA:false,
  permissions:null

};

export default (state = initialData, { type, payload }) => {
  if (type === actions.ERROR_MESSAGE_CLEARED) {
    return {
      ...state,
      errorMessage: null,
    };
  }

  if (type === actions.CURRENT_USER_REFRESH_SUCCESS) {
    return {
      ...state,
      currentUser: payload.currentUser || null,
      currentTenant: AuthCurrentTenant.selectAndSaveOnStorageFor(
        payload.currentUser,
      ),
      permissions:  AuthCurrentTenant.selectAndSaveOnStorageForPermission(
        payload.currentUser?.permissions,
      ),
    };
  }

  if (type === actions.CURRENT_USER_REFRESH_ERROR) {
    return {
      ...state,
      currentUser: null,
      currentTenant: AuthCurrentTenant.selectAndSaveOnStorageFor(
        null,
      ),
      permissions:  AuthCurrentTenant.selectAndSaveOnStorageForPermission(
        null),
    };
  }

  if (type === actions.AUTH_START) {
    return {
      ...state,
      errorMessage: null,
      loading: true,
    };
  }

  if (type === actions.AUTH_SUCCESS) {
    return {
      ...state,
      currentUser: payload.currentUser || null,
      permissions:  AuthCurrentTenant.selectAndSaveOnStorageForPermission(
        payload.currentUser?.permissions,
      ),
      currentTenant: AuthCurrentTenant.selectAndSaveOnStorageFor(
        payload.currentUser,
      ),
      errorMessage: null,
      loading: false,
    };
  }

  if (type === actions.AUTH_ERROR) {
    return {
      ...state,
      currentUser: null,
      currentTenant: null,
      permissions: AuthCurrentTenant.selectAndSaveOnStorageForPermission(null),
      errorMessage: payload || null,
      loading: false,
    };
  }

  if (type === actions.EMAIL_CONFIRMATION_START) {
    return {
      ...state,
      loadingEmailConfirmation: true,
    };
  }

  if (type === actions.EMAIL_CONFIRMATION_SUCCESS) {
    return {
      ...state,
      loadingEmailConfirmation: false,
    };
  }

  if (type === actions.EMAIL_CONFIRMATION_ERROR) {
    return {
      ...state,
      loadingEmailConfirmation: false,
    };
  }

  if (type === actions.PASSWORD_RESET_EMAIL_START) {
    return {
      ...state,
      loadingPasswordResetEmail: true,
    };
  }

  if (type === actions.PASSWORD_RESET_EMAIL_SUCCESS) {
    return {
      ...state,
      loadingPasswordResetEmail: false,
    };
  }

  if (type === actions.PASSWORD_RESET_EMAIL_ERROR) {
    return {
      ...state,
      loadingPasswordResetEmail: false,
    };
  }

  if (type === actions.UPDATE_PROFILE_START) {
    return {
      ...state,
      loadingUpdateProfile: true,
    };
  }

  if (type === actions.UPDATE_PROFILE_SUCCESS) {
    return {
      ...state,
      loadingUpdateProfile: false,
    };
  }

  if (type === actions.UPDATE_PROFILE_ERROR) {
    return {
      ...state,
      loadingUpdateProfile: false,
    };
  }

  if (type === actions.PASSWORD_CHANGE_START) {
    return {
      ...state,
      loadingPasswordChange: true,
    };
  }

  if (type === actions.PASSWORD_CHANGE_SUCCESS) {
    return {
      ...state,
      loadingPasswordChange: false,
    };
  }

  if (type === actions.PASSWORD_CHANGE_ERROR) {
    return {
      ...state,
      loadingPasswordChange: false,
    };
  }

  if (type === actions.AUTH_INIT_SUCCESS) {
    return {
      ...state,
      currentUser: payload.currentUser || null,
      permissions: AuthCurrentTenant.selectAndSaveOnStorageForPermission(
        payload.currentUser?.permissions,
      ),
      currentTenant: AuthCurrentTenant.selectAndSaveOnStorageFor(
        payload.currentUser,
      ),
      loadingInit: false,
    };
  }

  if (type === actions.AUTH_INIT_ERROR) {
    return {
      ...state,
      currentUser: null,
      currentTenant: null,
      loadingInit: false,
    };
  }

  if (type === actions.EMAIL_VERIFY_START) {
    return {
      ...state,
      loadingVerifyEmail: true,
    };
  }

  if (type === actions.EMAIL_VERIFY_SUCCESS) {
    return {
      ...state,
      loadingVerifyEmail: false,
    };
  }

  if (type === actions.EMAIL_VERIFY_ERROR) {
    return {
      ...state,
      loadingVerifyEmail: false,
    };
  }

  if (type === actions.TWOFA_VERIFY_START) {
    return {
      ...state,
      loadingVerifyTwoFA: true,
    };
  }

  if (type === actions.TWOFA_VERIFY_SUCCESS) {
    return {
      ...state,
      loadingVerifyTwoFA: false,
    };
  }

  if (type === actions.TWOFA_VERIFY_ERROR) {
    return {
      ...state,
      loadingVerifyTwoFA: false,
    };
  }

  if (type === actions.RESEND_TWOFA_VERIFY_START) {
    return {
      ...state,
      loadingVerifyTwoFA: true,
    };
  }

  if (type === actions.RESEND_TWOFA_VERIFY_SUCCESS) {
    return {
      ...state,
      loadingVerifyTwoFA: false,
    };
  }

  if (type === actions.RESEND_TWOFA_VERIFY_ERROR) {
    return {
      ...state,
      loadingVerifyTwoFA: false,
    };
  }

  return state;
};
