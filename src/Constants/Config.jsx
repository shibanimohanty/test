export const APP_CONFIG = {
    IMAGE_PATH: '/assets/images',
    DATE_FORMAT: 'DD.MM.YYYY, hh:mm',
    DEFAULT_LOCALE: 'de-DE',
    get LOCALE() {
        return this.DEFAULT_LOCALE
    },
    CURRENCY: 'EUR',
}