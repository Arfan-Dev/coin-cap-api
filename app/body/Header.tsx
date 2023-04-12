import Link from 'next/link';
import { type } from 'os';
import React from 'react'


type coin = {
    "id": string,
    "rank": number,
    "symbol": string,
    "name": string,
    "supply": number,
    "maxSupply": number,
    "marketCapUsd": number,
    "volumeUsd24Hr": number,
    "priceUsd": number,
    "changePercent24Hr": number,
    "vwap24Hr": number,
    "explorer": string
}

async function getData() {
    const res = await fetch('https://api.coincap.io/v2/assets?limit=20');
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    // Recommendation: handle errors
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data');
    }

    return res.json();
}

export default async function Body() {

    const info = await getData();
    const coins = info.data;
    const url= coins.explorer
    // console.log(coins)
    return (
        <div>
            {/* <h1>Static Page</h1>
            <ul>{for (let index = 0; index < btc.length; index++) {const element = array[index]; }}
            </ul> */}
            {/* {for (const property in btc) {console.log(`${property}: ${btc[property]}`);}} */}
            <h1>Static Page</h1>
            <ul className='px-32 text-xl py-10 grid grid-cols-4'>
                {coins.map((Coin: coin) => (
                    <li key={Coin.id} className='text-center pl-4 py-2 shadow-2xl opacity-2 mix-blend-multiply'>
                        <div className='shadow-inner shadow-rose-600'>
                            <div>{ Coin.name}</div>
                            <div>{Coin.id}</div>
                            <div>{Coin.symbol}</div>
                            <div>Price- {Math.round((Coin.priceUsd)*100)/100}</div>
                        </div>                    {/* <Link href={url} target='_blank'>About</Link> */}
                    </li>
                ))}
            </ul>

        </div>
    );
}
