 
const paymentRoutes = [
  {
    path: '/checkout',
    loader: () => import('src/view/payment/PaymentPage'),
  },
  {
    path: '/success',
    loader: () => import('src/view/payment/SuccessPage'),
  },
  {
    path: '/successfully-paid',
    loader: () => import('src/view/payment/SuccessPaidPage'),
  },
  {
    path: '/500',
    loader: () =>
      import('src/view/shared/errors/Error500Page'),
  },
  {
    path: '/400',
    loader: () =>
      import('src/view/shared/errors/Error400Page'),
  },
  {
    path: '/auth/forgot-password',
    loader: () =>
      import('src/view/auth/ForgotPasswordPage'),
  },
].filter(Boolean);

 

export default {
  paymentRoutes,
};
