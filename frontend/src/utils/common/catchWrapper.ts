import { ModalHandler } from 'src/hooks';
import { toast } from 'react-toastify';

export const catchWrapper = (cb: any,
                             successText: string,
                             errorText: string,
                             modalHandler: ModalHandler,
) => async () => {
  try {
    await cb();
    toast.success(successText);
  } catch (e) {
    toast.error(errorText);
  } finally {
    modalHandler.close();
  }
};
