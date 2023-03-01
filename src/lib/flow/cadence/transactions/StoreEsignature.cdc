import PaperAuth from 0xf8d6e0586b0a20c7

transaction(signature: String) {
  prepare(acct: AuthAccount) {

    let paperAuthRef = acct.borrow<&PaperAuth>(from: /storage/PaperAuth)

    let esignatureRef <- paperAuthRef?.createSignature(signature: signature)
    acct.save(<-esignatureRef, to: /storage/eSignature)

    log("eSignature stored with ID:".concat(signature))
  }
}