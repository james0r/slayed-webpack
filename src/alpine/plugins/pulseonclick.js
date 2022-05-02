export default function (Alpine) {
  Alpine.directive(
    'pulse-on-click',
    (el, { value, modifiers, expression }, { Alpine, effect, cleanup }) => {
      const clickCallback = (e) => {
        if (document.getElementById('pulse-on-click')) {
          document.getElementById('pulse-on-click').remove()
        }

        if (document.getElementById('pulse-on-click-styles')) {
          document.getElementById('pulse-on-click-styles').remove()
        }

        const y = e.clientY
        const x = e.clientX

        console.log(x, y)
        const head = document.head || document.getElementsByTagName('head')[0]
        const style = document.createElement('style')
        style.id = 'pulse-on-click-styles'
        const css = `
        #pulse-on-click {
          display: block;
          height: 0px;
          width: 0px;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          animation-name: pulse;
          animation-duration: .5s;
          animation-timing-function: ease-out;
          animation-iteration-count: 1;
          position: fixed;
          top: ${y}px;
          left: ${x}px;
        }

        @keyframes pulse {
          0% {
            width: 0px;
            height: 0px;
            border: 0px solid rgba(255,0,79, 1);
          }
          
          20% {
            border: 8px solid rgba(255,0,79, 1);
          }
          
          50% {
            border: 8px solid rgba(255,0,79, 1);
          }
          
          100% {
            width: 70px;
            height: 70px;
            border: 8px solid rgba(255,0,79, 0.0);
          }
        }
        `
        style.appendChild(document.createTextNode(css));
        head.appendChild(style);

        const pulseEl = document.createElement('div')
        pulseEl.id = 'pulse-on-click'

        document.body.appendChild(pulseEl)
      }

      el.addEventListener('click', clickCallback)

      cleanup(() => {
        el.removeEventListner('click', clickCallback)
        if (document.getElementById('pulse-on-click')) {
          document.getElementById('pulse-on-click').remove()
        }

        if (document.getElementById('pulse-on-click-styles')) {
          document.getElementById('pulse-on-click-styles').remove()
        }
      })
    }
  )
}
