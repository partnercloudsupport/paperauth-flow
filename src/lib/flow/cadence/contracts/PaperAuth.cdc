pub contract PaperAuth {

  // Defines the resource
  pub resource Esignature {
    pub let id: UInt64
    pub let metadata: {String: String}

    // Initializes the resource
    init(signature: String) {
      self.id = self.uuid
      self.metadata = {
        "e_signature": signature
      }
    }
  }

  // Stores the eSignatures
  pub fun createSignature(signature: String): @Esignature {
    let newEsignature <- create Esignature(signature: signature)
    return <- newEsignature
  }
}
