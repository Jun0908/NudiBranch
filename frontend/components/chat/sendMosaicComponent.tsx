"use client"

//import React, { useState } from 'react';
import React from 'react';
import {
  RepositoryFactoryHttp,
  Account,
  Address,
  TransferTransaction,
  Deadline,
  PlainMessage,
  UInt64,
  Mosaic,
  MosaicId,
  EmptyMessage
} from "symbol-sdk";
import { firstValueFrom } from 'rxjs';

const alicePrivateKey = process.env.NEXT_PUBLIC_ALICE_PRIVATE_KEY; 
const bobAddress = "TDEPNA5TIUEGP5NWIFO4KKCOGNYZLYOHTS7AZ5I";

const sendMosaicComponent = () => {
  //export default function sendMosaicComponent () {
  //const [transactionResult, setTransactionResult] = useState({ hash: '', payload: '', response: '' });

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
      UInt64.fromUint(2000000)
    );
    
    // プライベートキーが未定義の場合はエラーを投げる
    if (!alicePrivateKey) {
    throw new Error('Private key (ALICE_PRIVATE_KEY) is not defined in environment variables.');
    }
    const alice = Account.createFromPrivateKey(alicePrivateKey, networkType);
   
    const signedTransaction = alice.sign(
      transferTransaction,
      networkGenerationHash
    );

    const transactionRepository = repositoryFactory.createTransactionRepository();
    const response = await firstValueFrom(transactionRepository.announce(signedTransaction));

    // Update state with transaction results
    const tx = TransferTransaction.create(
      Deadline.create(epochAdjustment),
      //bob.address,
      recipientAddress,
      [
        new Mosaic(new MosaicId("72C0212E67A08BCE"), UInt64.fromUint(10000000)),
        new Mosaic(new MosaicId("0E3199E233E1A6DC"), UInt64.fromUint(1000)), // createMosaicTransactionで作成したモザイクIDを指定する
      ],
      EmptyMessage,
      networkType,
    ).setMaxFee(100);
  
    const txRepo = repositoryFactory.createTransactionRepository();
  
    const signedTx = alice.sign(tx, networkGenerationHash);
    console.log("Payload:", signedTx.payload);
    console.log("Transaction Hash:", signedTx.hash);
    console.log(response);

    alert("Transaction successful!");

  } catch (error) {
    console.error("Transaction error:", error);
    alert("Transaction ?: " );
  }
  };
  
  return (
    <div>
      <button onClick={handleTransaction}>SendMosaic</button>
    </div>
  );
};

export default sendMosaicComponent;

