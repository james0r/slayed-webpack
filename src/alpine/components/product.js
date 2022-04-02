export default {
  name: 'product',
  component() {
    return {
      quantity: 0,
      selectedVariantPrice: 0,
      selectedVariant: null,
      selectedExists: null,
      selectedOutOfStock: null,
      addButtonText: 'Add to cart',
      showBuyNow: true,
      variants: [],
      option1: null,
      option2: null,
      option3: null,
      filteredVariants: [],
      activeOption: null,
      initialize(variants) {
        this.variants = variants;
        this.filteredVariants = variants;
      },
      onOptionChangeHandler(el) {
        this.quantity = 1
        let variantExists = false
        
        this.variants.forEach((variant) => {
          if (variant.option1 == this.option1 && variant.option2 == this.option2 && variant.option3 == this.option3) {
            this.selectedVariant = variant.id
            this.selectedVariantPrice = variant.price
            variantExists = true
            
            window.history.replaceState({ }, '', `${el.dataset.url}?variant=${this.selectedVariant}`);

            if (!variant.available) {
              this.addButtonText = 'Out of stock'
              this.showBuyNow = false
            } else {
              this.addButtonText = 'Add to cart'
              this.showBuyNow = true
            }

            this.replaceSection(el)
          } 
        })

        if (!variantExists) {
          this.replaceSection(el)
          this.addButtonText = 'Unavailable'
          this.showBuyNow = false
        }
      },
      replaceSection(el) {
        fetch(`${el.dataset.url}?variant=${this.selectedVariant}&section_id=${el.dataset.section}`)
        .then((response) => response.text())
        .then((responseText) => {
          const html = new DOMParser().parseFromString(responseText, 'text/html')
          const destination = document.querySelector('.pdp-main')
          const source = html.querySelector('.pdp-main')

          destination.innerHTML = source.innerHTML
        });
      }
    }
  }
}
