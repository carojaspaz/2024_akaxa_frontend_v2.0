/** @format */

import toastr from 'toastr'
import 'toastr/build/toastr.min.css'
import { ToasterTypes } from '../../helpers/config/constants'

const useToaster = () => {
  const showToaster = (message, title, typeToaster) => {
    toastr.options = {
      closeButton: true,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      showDuration: '300',
      hideDuration: '1000',
      timeOut: '5000',
      extendedTimeOut: '1000',
      showEasing: 'swing',
      hideEasing: 'linear',
      showMethod: 'fadeIn',
      hideMethod: 'fadeOut',
    }

    switch (typeToaster) {
      case ToasterTypes.Success:
        toastr.success(message, title)
        break
      case ToasterTypes.Error:
        toastr.error(message, title)
        break
      case ToasterTypes.Info:
        toastr.info(message, title)
        break
      default:
        toastr.warning(message, title)
        break
    }
  }

  return { showToaster }
}

export default useToaster
