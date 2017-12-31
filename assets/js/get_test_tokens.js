(function() {
    window.TestTokens = {
        getTokensButton: $('#get-test-tokens'),
        web3: null,
        address: null,

        showSocialNetworksPopup: function(e) {
            openPopup('.popup-get-test-tokens', e);
        },

        init: function(web3, address) {
            const self = this;
            this.web3 = web3;
            this.address = address;

            // twttr.ready((twttr) => {
            //     twttr.widgets.createShareButton(
            //         '/',
            //         document.getElementById('get-test-tokens-twitter-button'),
            //         {
            //             url: 'https://plasma.bankex.com/',
            //             text: `Requesting faucet funds into ${address} on the #Rinkeby #Ethereum test network.'\n https://plasma.bankex.com/ test text`
            //         }
            //     );
            //     twttr.events.bind(
            //         'click',
            //         (event) => {
            //             console.log(event);
            //             // this.giveMeTokens('twitter');
            //         }
            //     );
            // });

            $('#get-free-tokens').on('click', self.showSocialNetworksPopup);

            $('#show-facebook-popup').on('click', () => {
                this.showFacebookShareModal();
                closePopup();
            });

            this.getTokensButton.on('click', this.showSocialNetworksPopup);
        },

        showFacebookShareModal: function() {
            FB.login(() => {
                FB.ui(
                    {
                        method: 'share',
                        // todo: change quote
                        quote:'Check out Plasma for Ethereum',
                        href: 'https://plasma.bankex.com/'
                    },
                    // callback
                    (response) => {
                        if (response && !response.error_message) {
                            const userID = FB.getUserID();
                            this.giveMeTokens('fb', userID);
                        }
                    }
                );
            })
        },

        giveMeTokens: function(networkName, userId) {
            // todo: should be replaced on correct one
            const url = 'https://faucet.ook.su/web3/rinkeby/tokensPlease';
            var data = new FormData();
            data.append('json', {
                wallet: this.address,
                social: {
                    name: networkName,
                    userId: userId
                }
            });

            $.ajax({
                url: url,
                type: 'JSON',
                method: 'POST',
                data: {
                    wallet: this.address,
                    networkName: networkName,
                    userId: userId
                }
            })
                .success(function(res) {
                    if (res.success) {
                        alert('Your tokens are coming. Transaction hash: ' + res.transactionHash);
                    } else {
                        showError({title: "Error", description: res.message});
                    }
                })
                .error(function(err) {
                    showError({title: "Error", description: err.responseText});
                });

        }

    };




}());