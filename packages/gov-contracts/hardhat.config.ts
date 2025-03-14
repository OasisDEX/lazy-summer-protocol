import { default as dotenv } from 'dotenv'
import { resolve } from 'path'

dotenv.config({ path: resolve(__dirname, '../../.env') })

import '@nomicfoundation/hardhat-foundry'
import '@nomicfoundation/hardhat-ignition-viem'
import type { HardhatUserConfig } from 'hardhat/config'

if (!process.env.API_KEY_ARBISCAN) {
  throw new Error('Please set your process.env.API_KEY_ARBISCAN in a .env file')
}

const config: HardhatUserConfig = {
  etherscan: {
    apiKey: {
      arbitrumOne: process.env.API_KEY_ARBISCAN,
    },
  },
  ignition: {
    blockPollingInterval: 1_000,
    requiredConfirmations: 1,
  },
  solidity: {
    version: '0.8.28',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
      evmVersion: 'cancun',
      viaIR: true,
    },
  },
  paths: {
    sources: './src',
  },
  networks: {
    local: {
      url: `http://127.0.0.1:8545`,
      chainId: 8453,
    },
    hardhat: {
      accounts: [
        {
          privateKey: `0x${process.env.DEPLOYER_PRIV_KEY}`,
          balance: '1000000000000000000000', // 1000 ETH in wei
        },
      ],
    },
    // mainnets
    mainnet: {
      url: `${process.env.MAINNET_RPC_URL}`,
      accounts: [`0x${process.env.DEPLOYER_PRIV_KEY}`],
    },
    optimism: {
      url: `${process.env.OPTIMISM_RPC_URL}`,
      accounts: [`0x${process.env.DEPLOYER_PRIV_KEY}`],
    },
    arbitrum: {
      url: `${process.env.ARBITRUM_RPC_URL}`,
      accounts: [`0x${process.env.DEPLOYER_PRIV_KEY}`],
      chainId: 42161,
    },
    base: {
      url: `${process.env.BASE_RPC_URL}`,
      accounts: [`0x${process.env.DEPLOYER_PRIV_KEY}`],
      chainId: 8453,
    },

    // testnets
    sepolia_mainnet: {
      url: `${process.env.SEPOLIA_MAINNET_RPC_URL}`,
      accounts: [`0x${process.env.DEPLOYER_PRIV_KEY}`],
    },
    sepolia_optimism: {
      url: `${process.env.SEPOLIA_OPTIMISM_RPC_URL}`,
      accounts: [`0x${process.env.DEPLOYER_PRIV_KEY}`],
    },
    sepolia_arbitrum: {
      url: `${process.env.SEPOLIA_ARBITRUM_RPC_URL}`,
      accounts: [`0x${process.env.DEPLOYER_PRIV_KEY}`],
    },
    sepolia_base: {
      url: `${process.env.SEPOLIA_BASE_RPC_URL}`,
      accounts: [`0x${process.env.DEPLOYER_PRIV_KEY}`],
    },
  },
}

export default config
