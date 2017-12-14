const web3 = window.web3 || window.ethereumProvider;

let localWeb3; // Web3 and web3 are globals

const plasma_host_address = "0xd8AC480331870c5764b5430F854926b1cfd1d8B1";

const pug = require('pug');

const initWeb3 = (callback) => localWeb3.eth.net.getId((error, id) => {
    if (id !== 4) {
        alert("Requires Rinkeby test network. Change network in Metamask and refresh the page.");
        callback(error, null);
        return;
    }
    localWeb3.eth.getAccounts((error, res) => callback(error, res[0]));
});

const API_PREFIX = "/api/";

const compose_plasma_tx_id = tx => [tx.blockNumber, tx.txNumberInBlock, tx.outputNumberInTransaction].join('|');

const getTransactions = addr => $.getJSON(API_PREFIX + 'utxos/' + addr).then(res => {
    if (res.error) {
        throw res;
    }
    return res.utxos;
});

const getHistoryDeposit = addr => $.getJSON(API_PREFIX + 'plasmaParent/allDeposits/' + addr).then(res => {
    if (res.error) {
        throw res;
    }
    return res.depositRecords;
});
const getHistoryWithdraw = addr => $.getJSON(API_PREFIX + 'plasmaParent/allWithdraws/' + addr).then(res => {
    if (res.error) {
        throw res;
    }
    return res.withdrawRecords;
});
const getWithdraws = addr => $.getJSON(API_PREFIX + 'withdraws/' + addr).then(res => {
    if (res.error) {
        throw res;
    }
    return res.txs;
});

const getTxInfo = tx => $.getJSON(API_PREFIX + `plasmaTX/${tx.blockNumber}/${tx.txNumberInBlock}`);

const sendTXforSerialization = (req, cb) => $.ajax({
    url: API_PREFIX + 'createTX',
    type: "POST",
    data: JSON.stringify(req),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: cb
});

const sendSignedTX = (req, cb) => $.ajax({
    url: API_PREFIX + 'sendSignedTX',
    type: "POST",
    data: JSON.stringify(req),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: cb
});

const prepareWithdrawProof = params => $.ajax({
    url: API_PREFIX + 'prepareProofForExpressWithdraw',
    type: "POST",
    contentType: 'application/json',
    data: JSON.stringify(params),
    dataType: 'json'
}).then(res => {
    if (res.error) {
        throw res;
    }
    return res.proof;
});


const scrollbar_params = {axis: "y", mouseWheel: {enable: true, preventDefault: true}};

let templates = {};

let all_deposits = [];
let all_withdraws = [];

let history_deposits = [];
let history_withdrawals = [];


let transactions_sorting = 'date';
let history_sorting = 'date';


const renderTransactions = (txs) => {

    if (transactions_sorting === 'date') {
        txs.sort((b, a) => a.blockNumber - b.blockNumber);
    } else {
        txs.sort((b, a) => a.eth - b.eth);
    }

    all_deposits = txs;

    $('.transactions__list ._container')
        .html(templates.transactions({transactions: all_deposits}));
};


const renderHistoryDeposits = (list) => {

    if (history_sorting === 'date') {
        list.sort((b, a) => a.index - b.index);
    } else {
        list.sort((b, a) => a.eth - b.eth);
    }

    history_deposits = list;

    $('#deposits .history__list ._container')
        .html(templates.history_deposit({transactions: list}));
};


const renderHistoryWithdrawals = (list) => {

    if (history_sorting === 'date') {
        list.sort((b, a) => a.blockNumber - b.blockNumber);
    } else {
        list.sort((b, a) => a.eth - b.eth);
    }

    history_withdrawals = list;

    $('#withdrawals .history__list ._container')
        .html(templates.history_withdrawal({transactions: list}));

};

const renderIncompleteWithdrawals = (list) => {

    if (history_sorting === 'date') {
        list.sort((b, a) => a.blockNumber - b.blockNumber);
    } else {
        list.sort((b, a) => a.eth - b.eth);
    }

    all_withdraws = list;

    $('#inc-withdrawals .history__list ._container')
        .html(templates.incomlete_withdraw({txs: list}));
};

const fetchData = addr => {

    getTransactions(addr).then(utxos => {

        if (utxos.length === 0) {
            $('.no_transactions').show();
            $('.transactions__sort ').addClass('disabled');
        } else {

            $('.no_transactions').hide();
            $('.transactions__sort').removeClass('disabled');

            utxos.forEach(t => {
                t.eth = localWeb3.utils.fromWei(t.value);
                t.id = compose_plasma_tx_id(t);
                t.short_id = t.id; // .slice(0,12) + '...' + t.id.slice(-3)
                t.bn = localWeb3.utils.toBN(t.value);
            });

            renderTransactions(utxos);
        }

    }).fail((r, status, error_text) => console.log(status, error_text));


    getHistoryDeposit(addr).then(list => {

        list.forEach(t => {
            t.eth = localWeb3.utils.fromWei(t.amount);
        });

        renderHistoryDeposits(list);
    });

    getHistoryWithdraw(addr).then(list => {

        list.forEach(t => {
            t.index = [t.blockNumber, t.txNumberInBlock, t.index].join('|');
            t.eth = localWeb3.utils.fromWei(t.amount);
        });

        renderHistoryWithdrawals(list);
    });

    getWithdraws(addr).then(list => {

        $.when(...list.map(getTxInfo)).then((...res) => {

            if (res[1] === 'success') {
                res = [res];
            }

            for (let i = 0; i < res.length; i++) {
                list[i].value = res[i][0].outputs[0].value;
                list[i].eth = localWeb3.utils.fromWei(list[i].value);
            }

            renderIncompleteWithdrawals(list);
        });
    });


};


$(() => {

    templates = {
        transactions: pug.compile($('script#transactions_list').text()),
        history_deposit: pug.compile($('script#history_list_deposit').text()),
        history_withdrawal: pug.compile($('script#history_list_withdrawal').text()),
        merge_options: pug.compile($('script#merge_options').text()),
        incomlete_withdraw: pug.compile($('script#incomlete_withdraw').text())
    };

    localWeb3 = new Web3(web3.currentProvider);

    initWeb3((err, address) => {

        if (err) {
            throw err;
        }

        $('.address').css({visibility: 'visible'}).find('#user_address').html(address);

        const plasma_contract = new localWeb3.eth.Contract(plasma_abi, plasma_host_address, {from: address});

        // console.log(address);

        fetchData(address);

        setInterval(() => {
            fetchData(address);
        }, 10000);


        $('.make_halves').on('click', event => {

            let first = active_deposit.eth / 2;
            let second = active_deposit.eth - first;

            $('.popup').find('.output1').find('#split_amount').focus().val(first).blur();
            $('.popup').find('.output2').find('#split_amount').focus().val(second).blur();

        });


        $('.popup-add').on('click', '.popup__button', event => {

            let eth = $(event.target).closest('.popup').find('.value').val();

            plasma_contract.methods.deposit().send({value: localWeb3.utils.toWei(eth)}, closePopup);
        });

        $('.transactions__sort select').on('change', event => {

            transactions_sorting = event.target.value;

            renderTransactions(all_deposits);
        });

        $('.history__sort select').on('change', event => {

            history_sorting = event.target.value;

            renderHistoryDeposits(history_deposits);
            renderHistoryWithdrawals(history_withdrawals);
            renderIncompleteWithdrawals(all_withdraws);
        });

        const getInput = d => {
            return {
                "blockNumber": d.blockNumber,
                "txNumber": d.txNumberInBlock,
                "outputNumber": d.outputNumberInTransaction
            };
        };

        const tx_sign_callback = function (res, status) {
            if (status !== "success" || res.error) {
                alert("Invalid transaction signature");
            }
        };

        const processTX = function (requestData) {

            sendTXforSerialization(requestData, function (res, status) {
                if (status != "success" || res.error) {
                    alert("Invalid transaction parameters");
                    return;
                }
                const hash = res.txPersonalHash;
                localWeb3.eth.sign(hash, address, function (error, sigRes) {
                    requestData["signature"] = sigRes;
                    if (!error) {
                        sendSignedTX(requestData, tx_sign_callback);
                    } else {
                        console.log(error);
                    }
                    closePopup();
                });
            });
        };

        $('.popup-split').on('click', '.popup__button', event => {
            const deposit = active_deposit;
            if (deposit === undefined) {
                closePopup();
                return;
            }
            const blockNumber = deposit.blockNumber;
            const txNumberInBlock = deposit.txNumberInBlock;
            const outputNumberInTransaction = deposit.outputNumberInTransaction;
            const depositAmount = localWeb3.utils.toBN(deposit.value);
            let am1 = $(event.target).closest('.popup').find('.output1').find('#split_amount').val();
            let am2 = $(event.target).closest('.popup').find('.output2').find('#split_amount').val();
            let address1 = $(event.target).closest('.popup').find('.output1').find('#split_receiver').val();
            let address2 = $(event.target).closest('.popup').find('.output2').find('#split_receiver').val();
            if (am1 === undefined ||
                am2 === undefined ||
                address1 === undefined ||
                address2 === undefined) {
                closePopup();
            }
            am1 = localWeb3.utils.toWei(am1);
            am2 = localWeb3.utils.toWei(am2);
            am1 = localWeb3.utils.toBN(am1);
            am2 = localWeb3.utils.toBN(am2);
            let sum = am1.add(am2);
            if (!(sum.eq(depositAmount))) {
                closePopup();
            }
            if (!localWeb3.utils.isAddress(address1) || !localWeb3.utils.isAddress(address2)) {
                closePopup();
            }

            let requestData = {
                "txType": 1,
                "inputs": [
                    {
                        "blockNumber": blockNumber,
                        "txNumber": txNumberInBlock,
                        "outputNumber": outputNumberInTransaction
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
            };

            sendTXforSerialization(requestData, function (res, status) {
                if (status !== "success" || res.error) {
                    alert("Invalid transaction parameters");
                }
                const hash = res.txPersonalHash;
                localWeb3.eth.sign(hash, address, function (error, sigRes) {
                    requestData["signature"] = sigRes;
                    if (!error) {
                        sendSignedTX(requestData, tx_sign_callback);
                    } else {
                        console.log(error);
                    }
                    closePopup();
                });
            });
        });


        $('.popup-merge').on('_show', event => {

            let options = all_deposits.filter(d => d.id !== active_deposit.id);
            $(event.target).find('select').html(templates.merge_options({options: options}));
        });


        $('.popup-merge').on('click', '.popup__button', event => {

            const $popup = $(event.target).closest('.popup');

            const merge_id = $popup.find('select').val();

            const merging = all_deposits.find(d => d.id === merge_id);

            const deposit = active_deposit;

            if (deposit === undefined || merging === undefined) {
                closePopup();
                return;
            }

            processTX({
                "txType": 2,
                "inputs": [getInput(deposit), getInput(merging)],
                "outputs": [{
                    "to": address,
                    "amount": deposit.bn.add(merging.bn).toString(10)
                }]
            });

        });


        $('.popup-transfer').on('click', '.popup__button', event => {

            const $popup = $(event.target).closest('.popup');

            const deposit = active_deposit;

            const reciever = $popup.find('.popup__input-transfer input').val();

            if (deposit === undefined || !localWeb3.utils.isAddress(reciever)) {
                closePopup();
                return;
            }

            processTX({
                "txType": 5,
                "inputs": [getInput(deposit)],
                "outputs": [{
                    "to": reciever,
                    "amount": deposit.bn.toString(10)
                }]
            });

        });


        $('.popup-withdraw').on('click', '.popup__button', event => {

            if (active_deposit === undefined) {
                closePopup();
                return;
            }

            processTX({
                "txType": 3,
                "inputs": [getInput(active_deposit)]
            });
        });

        $('#inc-withdrawals').on('click', '.finish_withdrawal', event => {

            const withdraw = all_withdraws[$(event.target).closest('.transaction').index()];

            prepareWithdrawProof({
                blockNumber: withdraw.blockNumber,
                txNumber: withdraw.txNumberInBlock
            }).then(p => {

                plasma_contract.methods
                    .makeWithdrawExpress(p.blockNumber, p.txNumber, p.tx, p.merkleProof)
                    .send({from: address}).then(res => {

                    console.log(res.events);

                }).catch(console.log);
            });

        });
    });


});
