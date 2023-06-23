import { libs, signTx } from '@waves/waves-transactions';

export default class ProviderWeb {
    _seed;
    _options = {
        NETWORK_BYTE: 'N'.charCodeAt(0),
        NODE_URL: 'https://nodes.krossexplorer.com'
    };
    _clientUrl;
    user;

    constructor(clientUrl) {
        this._clientUrl = clientUrl || "http://webprovider.krosscoin.io/"
    }

    connect(options) {
        this._options = options;

        return Promise.resolve();
    }

    async sign(
        list
    ) {
        const seed = this._seed;

        return Promise.resolve(
            list.map((params) =>
                signTx(
                    {
                        chainId: this._options.NETWORK_BYTE,
                        ...params,
                    },
                    seed
                )
            )
        );
    }

     async login() {
        if (this.user) {
            return Promise.resolve(this.user);
        }

        var popupWindow = window.open(this._clientUrl, "Popup", "width=300,height=500");

        return new Promise((resolve, reject) => {
            var options = this._options;
            window.addEventListener("message", function(event) {
                if (event.data.isKross) {

                    // Handle the received data from the popup window
                    var selectedSeed = event?.data?.seed;
                    this.user = {
                        address: libs.crypto.address(
                            selectedSeed,
                            options.NETWORK_BYTE
                        ),
                        publicKey: libs.crypto.publicKey(selectedSeed),
                    }

                    return resolve(this.user);
                }
            });

            var popupCheckInterval = setInterval(function() {
                if (popupWindow && popupWindow.closed) {
                    reject(new Error("User cancelled the selection."))
                    clearInterval(popupCheckInterval);
                    popupWindow = null;
                }
            }, 500)
        })
    }

    logout() {
        return Promise.resolve();
    }

    signTypedData(data) {
        return Promise.resolve('// TODO'); // TODO
    }

    signMessage(data) {
        return Promise.resolve('// TODO'); // TODO
    }

    on(
        event,
        handler,
    ) {
        console.error('Not implemented');
        return this;
    }

    once(
        event,
        handler,
    ){
        console.error('Not implemented');
        return this;
    };

    off(
        event,
        handler,
    ) {
        console.error('Not implemented');
        return this;
    }
}