(function() {
    window.TestTokens = {
        getTokensButton: $('#get-test-tokens'),
        web3: null,
        address: null,

        showSocialNetworksPopup: function(e) {
            // openPopup('.popup-get-test-tokens', e);
        },

        init: function(web3, address) {
            this.web3 = web3;
            this.address = address;

            twttr.widgets.createShareButton(
                '/',
                document.getElementById('get-test-tokens-twitter-button'),
                {
                    text: `Requesting faucet funds into ${address} on the #Rinkeby #Ethereum test network.'\n https://plasma.bankex.com/ test text`
                }
            );

            $('#get-test-tokens-facebook-button').on('click', function() {
                FB.ui(
                    {
                        method: 'share',
                        href: 'https://plasma.bankex.com/',
                    },
                    // callback
                    function(response) {
                        if (response && !response.error_message) {
                            alert('Posting completed. Your ETH in a way');
                        } else {
                            alert('Error while posting.');
                        }
                    }
                );
            });





            this.getTokensButton.on('click', this.showSocialNetworksPopup.bind(this));
        }
    };




}());