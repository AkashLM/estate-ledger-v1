import { Transaction, Asset } from "@meshsdk/core";

const unLockingScript = async ({ unitId, recieverAddress }) => {
  try {
    async function _getAssetUtxo({ scriptAddress, asset, datum }) {
      const koios = new KoiosProvider("preprod");

      const utxos = await koios.fetchAddressUTxOs(scriptAddress, asset);

      const dataHash = resolveDataHash(datum);

      let utxo = utxos.find((utxo) => {
        return utxo.output.dataHash == dataHash;
      });

      return utxo;
    }

    // fetch input UTXO
    const assetUtxo = await _getAssetUtxo({
      scriptAddress:
        "addr_test1wpnlxv2xv9a9ucvnvzqakwepzl9ltx7jzgm53av2e9ncv4sysemm8",
      asset: unitId,
      datum: "supersecret",
    });

    // get wallet change address
    const address = await wallet.getChangeAddress();

    // create the unlock asset transaction
    const tx = new Transaction({ initiator: wallet })
      .redeemValue({
        value: assetUtxo,
        script: {
          version: "V1",
          code: "4e4d01000033222220051200120011",
        },
        datum: "supersecret",
      })
      .sendValue(recieverAddress, assetUtxo) // address is recipient address
      .setRequiredSigners([recieverAddress]);

    const unsignedTx = await tx.build();
    // note that the partial sign is set to true
    const signedTx = await wallet.signTx(unsignedTx, true);
    const txHash = await wallet.submitTx(signedTx);
  } catch (e) {
    console.log("Error", e);
  }
};
export default unLockingScript;
