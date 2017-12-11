
var web3 = web3 || ethereumProvider;

var localWeb3; // Web3 and web3 are globals

var plasma_host_address = "0x158cb5485ea2e7fe03845d45c40c63469814bd9a";

const pug = require('pug')

const initWeb3 = (callback) => localWeb3.eth.getAccounts( (error, res) => callback(error, res[0]) );

const API_PREFIX = "/api/"

const compose_plasma_tx_id = tx => [tx.blockNumber, tx.txNumberInBlock, tx.outputNumberInTransaction, tx.to].join('|')

const getTransactions = addr => $.getJSON(API_PREFIX + 'utxos/' + addr).then(res=>{
    if (res.error) {throw error}
    return res.utxos
})

const getHistoryDeposit = addr => $.getJSON(API_PREFIX + 'plasmaParent/allDeposits/' + addr).then(res => {
    if (res.error) {throw error}
    return res.depositRecords
})
const getHistoryWithdraw = addr => $.getJSON(API_PREFIX + 'plasmaParent/allWithdraws/' + addr).then(res => {
    if (res.error) {throw error}
    return res.withdrawRecords
})

const sendTX = (params) => {

    $.post({
        url: API_PREFIX + 'createTX',
        contentType : 'application/json',
        data: JSON.stringify(params),
        dataType: 'json'
    }).then(res => { if (res.error) {throw error} return res.tx})

}

const scrollbar_params = { axis:"y", mouseWheel:{enable: true,preventDefault:true}}


const all_deposits = []

$(() => {

    const templates = {
        transactions: pug.compile($('script#transactions_list').text()),
        history_deposit: pug.compile($('script#history_list_deposit').text()),
        history_withdrawal: pug.compile($('script#history_list_withdrawal').text())
    }

    localWeb3 = new Web3(web3.currentProvider);

    initWeb3((err, address) => {

        if (err) {throw err}

        const plasma_contract = new localWeb3.eth.Contract(plasma_abi, "0x158cb5485ea2e7fe03845d45c40c63469814bd9a", {from: address});


        getTransactions(address).then(utxos=> {

            utxos.forEach(t=>{
                t.eth = localWeb3.utils.fromWei(t.value);
                t.id  = compose_plasma_tx_id(t)
            })

            all_deposits = utxos

            $('.transactions__list')
                .html(templates.transactions({transactions: utxos}))
                .mCustomScrollbar(scrollbar_params);

        }).fail((r, status, error_text) => console.log(status, error_text))


        getHistoryDeposit(address).then( list => {

            list.forEach(t=>{
                t.eth = localWeb3.utils.fromWei(t.amount)
            })

            $('#deposits .history__list')
                .html(templates.history_deposit({transactions: list}))
                .mCustomScrollbar(scrollbar_params);
        })

        getHistoryWithdraw(address).then( list => {

            list.forEach(t=>{
                t.index = [t.blockNumber, t.txNumberInBlock, t.index].join('|')
                t.eth = localWeb3.utils.fromWei(t.amount)
            })

            $('#withdrawals .history__list')
                .html(templates.history_withdrawal({transactions: list}))
                .mCustomScrollbar(scrollbar_params);
        })


        // $('.transactions__add').on('click', event => {


        //     $('.popup-add .address').val(address).attr('disabled', true);
        //     $('.popup-add .address_label').hide()

        // })


        $('.make_halves').on('click', event => {

            console.log(active_deposit);
            // console.log(event);

        })

        $('.popup-add').on('click', '.popup__button', event => {

            let eth = $(event.target).closest('.popup').find('.value').val()

            plasma_contract.methods.deposit().send({value: localWeb3.utils.toWei(eth)}, res=>{
                closePopup()})
        })

    })


})
