(function() {
    async function sha256(str) {
      var inputBuffer = new TextEncoder().encode(str);
      
      var cryptoObj = window.crypto || window.msCrypto;
      if (!cryptoObj || !cryptoObj.subtle || !cryptoObj.subtle.digest) {
        return null;
      }

      try {
        var hashBuffer = await cryptoObj.subtle.digest('SHA-256', inputBuffer);
        var hashArray = Array.from(new Uint8Array(hashBuffer));
        var hashHex = hashArray.map(byte => ('00' + byte.toString(16)).slice(-2)).join('');
        return hashHex;
      } catch (error) {
        return null;
      }
    }

    document.addEventListener('wpcf7submit', async function (event) {
      var formInputs = event.detail.inputs;
      var formId = event.detail.contactFormId;
      var pageId = event.detail.containerPostId;
      var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/g;
      var inputs = {}
     
      for ( var i = 0; i < formInputs.length; i++ ) {
        inputs[formInputs[i].name] = formInputs[i].value;
      }

      if (inputs) {
        var entries = Object.entries(inputs);

        for(var i = 0; i < entries.length; i++) {
            var entri = entries[1];
            var key = entri[0];
            var value = entri[1];

            if (emailRegex.test(value)) {
                var hashValue = await sha256(value);
                if (hashValue) {
                  inputs['hash_' + key] = hashValue;
                }
            }
        }
      }

      window.dataLayer = window.dataLayer || [];
      dataLayer.push({
        event: 'cf7_submit',
        formId: formId,
        pageId: pageId,
        inputs: inputs,
      });
    }, false);
})();
