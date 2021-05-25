function
cti_encode(
    txn_hash="1C0FA22BBF5D0A8A7A105EB7D0AD7A2532863AA48584493D4BC45741AEDC4826" /* hex string */,
    txn_index="25",
    ledger_hash="F8A87917637D476E871D22A1376D7C129DAC9E25D45AD4B67D1E75EA4418654C" /* hex string */, 
    ledger_index="62084722")
{
    let ledger_check = BigInt(parseInt(ledger_hash.slice(0,1), 16));
    let txn_check = BigInt(parseInt(txn_hash.slice(0,1), 16));
    let cti = (ledger_check << 4n) + txn_check;
    cti <<= 16n;
    cti += BigInt(txn_index);
    cti <<= 32n;
    cti += BigInt(ledger_index);
    return cti;


}

function
cti_is_simple(
    cti)
{
    return (cti >> 56n) == 0;
}

function
cti_transaction_index(
    cti)
{
    return (cti >> 32n) & 0xFFFFn;
}

function
cti_ledger_index(
    cti)
{
    return (cti & 0xFFFFFFFFn);
}

function
cti_ledger_check(
    cti)
{
    return (cti >> 52n) & 0xFn;
}

function
cti_transaction_check(
    cti)
{
    return (cti >> 48n) & 0xFn;
}