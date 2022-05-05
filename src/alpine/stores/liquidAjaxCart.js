export default {
  name: 'liquidAjaxCart',
  store() {
    return {
      state: {
        cart: {
          attributes: {},
          cart_level_discount_applications: [],
          currency: 'USD',
          item_count: 0,
          items: [],
          note: null,
          original_total_price: 0,
          requires_shipping: null,
          token: '',
          total_discount: 0,
          total_price: 0,
          total_weight: 0
        },
        status: {
          cartStateSet: false,
          requestInProgress: false
        }
      }
    }
  }
}