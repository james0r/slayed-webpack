export default {
  name: 'product',
  component() {
    return {
      quantity: 0,
      selectedVariantPrice: 0,
      selectedVariant: null,
      addToCartButtonText: 'Add to cart', 
      showBuyNow: true,
      variants: [],
      option1: null,
      option2: null,
      option3: null,
      init(variants, selectedVariantId) {
        // Return if not explicitly called by component
        if (!selectedVariantId) return

        // First make variants and selected variant id reactive
        this.variants = variants
        this.selectedVariant = selectedVariantId

        // Find the selected variant object in our variants list
        const variantSelected = this.variants.find((variant) => {
          return variant.id == selectedVariantId
        })

        // Set button text and visibility
        if (variantSelected.available) {
          this.addToCartButtonText = 'Add to cart'
          this.showBuyNow = true
        } else {
          this.addToCartButtonText = 'Out of stock'
          this.showBuyNow = false
        }

        // Set variant option values if they exist
        if (variantSelected.option1) {
          this.option1 = variantSelected.option1
        }
        if (variantSelected.option2) {
          this.option2 = variantSelected.option2
        }
        if (variantSelected.option3) {
          this.option3 = variantSelected.option3
        }

        // Set selected variant price
        this.selectedVariantPrice = variantSelected.price
        
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
              this.addToCartButtonText = 'Out of stock'
              this.showBuyNow = false
            } else {
              this.addToCartButtonText = 'Add to cart'
              this.showBuyNow = true
            }

            this.replaceSection(el)
          } 
        })

        if (!variantExists) {
          // this.replaceSection(el)
          this.addToCartButtonText = 'Unavailable'
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