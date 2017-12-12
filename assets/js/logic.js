
var web3 = web3 || ethereumProvider;

var localWeb3; // Web3 and web3 are globals

var plasma_host_address = "0xd8AC480331870c5764b5430F854926b1cfd1d8B1";

const pug = require('pug')

const initWeb3 = (callback) => localWeb3.eth.net.getId((error, id) => {
    if (id != 4) {
        alert("Requires Rinkeby test network. Change network in Metamask and refresh the page.")
        callback(error, null);
        return
    }
    localWeb3.eth.getAccounts( (error, res) => callback(error, res[0]))});

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

const sendTXforSerialization = (req, cb) => $.ajax({
  url:API_PREFIX + 'createTX',
  type:"POST",
  data:req,
  data: JSON.stringify(req),
  contentType:"application/json; charset=utf-8",
  dataType:"json",
  success: cb
});

const sendSignedTX = (req, cb) => $.ajax({
  url:API_PREFIX + 'sendSignedTX',
  type:"POST",
  data:req,
  data: JSON.stringify(req),
  contentType:"application/json; charset=utf-8",
  dataType:"json",
  success: cb
});

const sendTX = (params) => {

    $.post({
        url: API_PREFIX + 'createTX',
        contentType : 'application/json',
        data: JSON.stringify(params),
        dataType: 'json'
    }).then(res => { if (res.error) {throw error} return res.tx})

}

const scrollbar_params = { axis:"y", mouseWheel:{enable: true,preventDefault:true}}


var all_deposits = []

$(() => {

    const templates = {
        transactions: pug.compile($('script#transactions_list').text()),
        history_deposit: pug.compile($('script#history_list_deposit').text()),
        history_withdrawal: pug.compile($('script#history_list_withdrawal').text())
    }

    localWeb3 = new Web3(web3.currentProvider);

    initWeb3((err, address) => {

        if (err) {throw err}

        const plasma_contract = new localWeb3.eth.Contract(plasma_abi, plasma_host_address, {from: address});

        // console.log(address);

        getTransactions(address).then(utxos=> {


            utxos.forEach(t=>{
                t.eth = localWeb3.utils.fromWei(t.value);
                t.id  = compose_plasma_tx_id(t)
                t.short_id = t.id.slice(0,12) + '...' + t.id.slice(-3)
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

            let first  = active_deposit.eth/2
            let second = active_deposit.eth - first

            $('.popup').find('.output1').find('#split_amount').focus().val(first).blur()
            $('.popup').find('.output2').find('#split_amount').focus().val(second).blur()

        })

        $('.popup-add').on('click', '.popup__button', event => {

            let eth = $(event.target).closest('.popup').find('.value').val()

            plasma_contract.methods.deposit().send({value: localWeb3.utils.toWei(eth)}, closePopup)
        })

        $('.popup-split').on('click', '.popup__button', event => {
                        const deposit = active_deposit
                        if (deposit == undefined) {
                            closePopup();
                        }
                        const blockNumber = deposit.blockNumber
                        const txNumberInBlock = deposit.txNumberInBlock
                        const outputNumberInTransaction = deposit.outputNumberInTransaction
                        const depositAmount = localWeb3.utils.toBN(deposit.value)
                        let am1 = $(event.target).closest('.popup').find('.output1').find('#split_amount').val()
                        let am2 = $(event.target).closest('.popup').find('.output2').find('#split_amount').val()
                        let address1 = $(event.target).closest('.popup').find('.output1').find('#split_receiver').val()
                        let address2 = $(event.target).closest('.popup').find('.output2').find('#split_receiver').val()
                        if (am1 == undefined ||
                            am2 == undefined ||
                            address1 == undefined ||
                            address2 == undefined)
                            {
                                closePopup();
                            }
                        am1 = localWeb3.utils.toWei(am1)
                        am2 = localWeb3.utils.toWei(am2)
                        am1 = localWeb3.utils.toBN(am1)
                        am2 = localWeb3.utils.toBN(am2)
                        let sum = am1.add(am2)
                        if ( !(sum.eq(depositAmount)) ){
                            closePopup();
                        }
                        if (!localWeb3.utils.isAddress(address1) || !localWeb3.utils.isAddress(address2)) {
                            closePopup();
                        }

                        let requestData = {
                                "txType" : 1,
                                "inputs": [
                                        {
                                        "blockNumber": blockNumber,
                                        "txNumber": txNumberInBlock,
                                        "outputNumber" : outputNumberInTransaction
                                        }
                                    ],
                                "outputs": [{
                                        "to": address1,
                                        "amount": am1.toString(10)
                                        },
                                        {
                                        "to": address2,
                                        "amount": am2.toString(10)
                                        }]
                            }
                        sendTXforSerialization(requestData, function(res, status){
                            if (status != "success" || res.error) {
                                alert("Invalid transaction parameters")
                            }
                            const hash = res.txPersonalHash
                            localWeb3.eth.sign(hash, address,function(error, sigRes) {
                                    console.log(error);
                                    requestData["signature"] = sigRes
                                    if (!error){
                                        sendSignedTX(requestData, function(resSigned, statusSigned) {
                                            if (status != "success" || resSigned.error) {
                                                alert("Invalid transaction signature")
                                            }
                                            closePopup()
                                        });
                                    }
                                    closePopup();
                                })
                            })
                        })

    })


})
