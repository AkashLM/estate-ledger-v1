import { Transaction, Asset } from "@meshsdk/core";

const lockingScript = async (unitId) => {
  try {
    // this is the script address of always succeed contract
    const scriptAddress =
      "addr_test1wpnlxv2xv9a9ucvnvzqakwepzl9ltx7jzgm53av2e9ncv4sysemm8";

    const tx = new Transaction({ initiator: wallet }).sendAssets(
      {
        address: scriptAddress,
        datum: {
          value: "supersecret",
        },
      },
      [
        {
          unit: unitId,
          quantity: "1",
        },
      ]
    );

    const unsignedTx = await tx.build();
    const signedTx = await wallet.signTx(unsignedTx);
    const txHash = await wallet.submitTx(signedTx);
    console.log("wee", txHash);
  } catch (e) {
    console.log("Error", e);
  }
};
export default lockingScript;
