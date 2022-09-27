# got MEV?

A web application to help people uncover MEV within historical Ethereum transactions.

## Description

A user can paste a transaction hash and then view a summary of all the token transfers that occurred. The transaction is checked against the [Flashbots Blocks API](https://blocks.flashbots.net/) to see if it was submitted to the network through the Flashbots Relay. If so, the other bundled transactions are listed as well to help identify frontrunning, backrunning, sandwiching, etc.

This app was written in TypeScript using React, [Next.js](https://nextjs.org/), and the [Alchemy SDK](https://www.alchemy.com/sdk).

This is a project submission for the [Encode x Wintermute MEV Hack](https://www.encode.club/wintermute-mev-hack).

## Features

- Addresses are color coded to make it easier to visually trace flow of tokens
- All blocks, transactions, and addresses link to Etherscan
- Detects direct miner payments via "internal" transactions using the [Alchemy Transfers API](https://docs.alchemy.com/reference/transfers-api-quickstart)
- Sums up token transfers for each address & asset (combining ETH & WETH in the summary)

## Example

![backrun example](/images/screenshot.png)
The second transaction "backrunning" the first one.

Check out https://explore.flashbots.net/leaderboard to see more examples of MEV.

## Further work

- Identify and label DEX pools (Uniswap, Sushiswap, etc.)
- Find related transactions based on the pools they interact with (to identify backrunning/frontrunning not submitted through Flashbots)
- Clean up the code and only query necessary data

## Inspiration

- [Public MEV Explorer](https://metablock.dev/tools/mev/) by [Timur Badretdinov](https://twitter.com/DestinerX)
- [mev-inspect-js](https://github.com/Destiner/mev-inspect-js) also by Timur
- [mev-inspect-py](https://github.com/flashbots/mev-inspect-py) by Flashbots
