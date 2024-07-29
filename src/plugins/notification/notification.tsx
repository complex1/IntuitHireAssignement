import './notification.css'
const directions = ['top-right', 'top-left', 'bottom-right', 'bottom-left', 'top-center', 'bottom-center']
const NOTIFICATION_CONFIG = {
  position: 'top-right',
  duration: 5000,
  type: 'default',
  className: '',
  title: ''
}
directions.forEach(direction => {
  if (!document.querySelector(`.notification-container--${direction}`)) {
    const container = document.createElement('div')
    container.classList.add('notification-container', `notification-container--${direction}`)
    document.body.appendChild(container)
  }
})

const notification = (message: string, config: typeof NOTIFICATION_CONFIG) => {
  const html = `
    <div class="notification--container">
      <div class="notification__content">
        ${config.title ? `<div class="notification__title">${config.title}</div>` : ''}
        <div class="notification__message">${message}</div>
      </div>
      <div class="notification__close">
      </div>
    </div>
  `
  const notification = document.createElement('div')
  notification.classList.add('notification')
  notification.classList.add('notification--hide')
  notification.classList.add(`notification--${config.type}`)
  notification.classList.add(config.className || 'default')
  notification.classList.add(`notification--${config.position}`)

  notification.innerHTML = html
  const container = document.querySelector(`.notification-container--${config.position}`)
  container?.appendChild(notification)

  setTimeout(() => {
    notification.classList.remove('notification--hide')
    notification.classList.add('notification--show')
  }, 100)
  setTimeout(() => {
    notification.classList.remove('notification--show')
    notification.classList.add('notification--hide')
    setTimeout(() => {
      notification.remove()
    }, 500)
  }, config.duration)
}

const Notification = {
  success: (message: string, config: typeof NOTIFICATION_CONFIG = {} as typeof NOTIFICATION_CONFIG) => {
    return notification(message, { ...NOTIFICATION_CONFIG, ...config, type: 'success' })
  },
  alert: (message: string, config: typeof NOTIFICATION_CONFIG = {} as typeof NOTIFICATION_CONFIG) => {
    return notification(message, { ...NOTIFICATION_CONFIG, ...config, type: 'alert' })
  },
  // This method is for backword compatibility for existing code in the project flex ehr electron app
  error: (message: string, config: typeof NOTIFICATION_CONFIG = {} as typeof NOTIFICATION_CONFIG) => {
    return notification(message, { ...NOTIFICATION_CONFIG, ...config, type: 'alert' })
  },
  info: (message: string, config: typeof NOTIFICATION_CONFIG = {} as typeof NOTIFICATION_CONFIG) => {
    return notification(message, { ...NOTIFICATION_CONFIG, ...config, type: 'primary' })
  },
  warning: (message: string, config: typeof NOTIFICATION_CONFIG = {} as typeof NOTIFICATION_CONFIG) => {
    return notification(message, { ...NOTIFICATION_CONFIG, ...config, type: 'warning' })
  },
  default: (message: string, config: typeof NOTIFICATION_CONFIG = {} as typeof NOTIFICATION_CONFIG) => {
    return notification(message, { ...NOTIFICATION_CONFIG, ...config, type: 'default' })
  },
  dark: (message: string, config: typeof NOTIFICATION_CONFIG = {} as typeof NOTIFICATION_CONFIG) => {
    return notification(message, { ...NOTIFICATION_CONFIG, ...config, type: 'dark' })
  },
  show: (message: string, config: typeof NOTIFICATION_CONFIG = {} as typeof NOTIFICATION_CONFIG) => {
    return notification(message, { ...NOTIFICATION_CONFIG, ...config })
  }
}

export default Notification
