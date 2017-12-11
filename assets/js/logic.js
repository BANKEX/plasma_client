


var web3 = web3 || ethereumProvider

var account;
var localWeb3; // Web3 and web3 are globals

var plasma_host_address = "0x158cb5485ea2e7fe03845d45c40c63469814bd9a";


const pug = require('pug')

const initWeb3 = (callback) => localWeb3.eth.getAccounts( (error, res) => callback(error, res[0]) );

// console.log(error);
// if (!error) {
//     console.log(res);
//     account=res[0];
// }

const API_PREFIX = "/api/"


const compose_plasma_tx_id = tx => [tx.blockNumber, tx.txNumberInBlock, tx.to].join('.')


const getTransactions = addr => $.getJSON(API_PREFIX + 'utxos/' + addr).then(res=>{
    if (res.error) {throw error}
    return res.utxos
})

$(() => {

    const templates = {
        transactions: pug.compile($('script#transactions_list').text())
    }

    localWeb3 = new Web3(web3.currentProvider);

    console.log(localWeb3);

    initWeb3((err, address) => {

        if (err) {throw err}

        let addr = '0xE6877A4d8806e9A9F12eB2e8561EA6c1db19978d'

        // return;

        getTransactions(addr).then(utxos=> {

            utxos.forEach(t=>{
                t.eth = localWeb3.fromWei(t.value);
                t.id  = compose_plasma_tx_id(t)
            })

            $('.transactions__list')
                .html(templates.transactions({transactions: utxos}))
                .mCustomScrollbar({
                    axis:"y",
                    mouseWheel:{enable: true,preventDefault:true}
                });

        })


        $('.transactions__add').on('click', event => {

            alert('not implemented')

        })

    })


})
