import ApiResponseHandler from '../apiResponseHandler';
import PayService from '../../services/payService';

export default async (req, res, next) => {
  try {

    const payload = await new PayService(req).findCheckoutByToken(
      req.params.token,
    );

    await ApiResponseHandler.success(req, res, payload);
  } catch (error) {
    await ApiResponseHandler.error(req, res, error);
  }
};
