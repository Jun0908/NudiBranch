"use client"

import React, { useState, ChangeEvent } from 'react';
import {
  RepositoryFactoryHttp,
  Account,
  Address,
  TransferTransaction,
  Deadline,
  PlainMessage,
  UInt64,
} from "symbol-sdk";
import { firstValueFrom } from 'rxjs';

const alicePrivateKey = process.env.NEXT_PUBLIC_ALICE_PRIVATE_KEY; 
const bobAddress = "TDEPNA5TIUEGP5NWIFO4KKCOGNYZLYOHTS7AZ5I";

const TransactionComponent = () => {
  const [tokenAmount, setTokenAmount] = useState<number>(2000000);

  const handleTransaction = async () => {
    try {
      const nodeUrl = "http://sym-test-01.opening-line.jp:3000";
      //const nodeUrl = "https://sym-test-04.opening-line.jp:3001";
      const repositoryFactory = new RepositoryFactoryHttp(nodeUrl);
      const epochAdjustment = await firstValueFrom(repositoryFactory.getEpochAdjustment());
      const networkType = await firstValueFrom(repositoryFactory.getNetworkType());
      const networkGenerationHash = await firstValueFrom(repositoryFactory.getGenerationHash());
      const recipientAddress = Address.createFromRawAddress(bobAddress);

      const transferTransaction = TransferTransaction.create(
        Deadline.create(epochAdjustment),
        recipientAddress,
        [],
        PlainMessage.create("This is a test message"),
        networkType,
        UInt64.fromUint(tokenAmount)
      );
      
      if (!alicePrivateKey) {
        throw new Error('Private key (ALICE_PRIVATE_KEY) is not defined in environment variables.');
      }

      const account = Account.createFromPrivateKey(alicePrivateKey, networkType);
      const signedTransaction = account.sign(
        transferTransaction,
        networkGenerationHash
      );

      console.log(signedTransaction.hash, "hash");
      console.log("--------------------------------")
      console.log(signedTransaction.payload, "payload");
      const transactionRepository = repositoryFactory.createTransactionRepository();
      const response = await firstValueFrom (transactionRepository.announce(signedTransaction));
      console.log("Transaction response:", response);

      alert("Transaction successful!");
      
    } catch (error) {
      console.error("Transaction error:", error);
      alert("Transaction ?: " );
    }
  };

  const handleTokenAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTokenAmount(parseInt(event.target.value));
  };

  return (
    <div>
      <input type="number" value={tokenAmount} onChange={handleTokenAmountChange} />
      <button onClick={handleTransaction}>Send Token</button>
    </div>
  );
};

export default TransactionComponent;
