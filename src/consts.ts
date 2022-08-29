import { ToasterProps } from "react-hot-toast";

/**   Toast configurations   */
export const toastOptions: ToasterProps['toastOptions'] = {
  duration: 5000,
  position: "bottom-center",
  error: {
    style: {
      border: '2px solid #ff4b4b',
      color: '#ff4b4b'
    }
  },
  success: {
    style: {
      border: '2px solid #61d345',
      color: '#61d345'
    }
  },
  style: {
    padding: '9px',
    zIndex: 19999999,
    maxWidth: 'none'
  }
}
