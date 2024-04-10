# Multichain NFT Indexer API Documentation

Welcome to the Multichain NFT Indexer API! This API allows you to retrieve information about NFTs minted across multiple blockchains, including Binance Smart Chain (BSC), Ethereum (ETH), and more. It provides details such as the NFT provider, timestamp, token ID, contract address, owner address, name, symbol, description, and URI.

The Data of the reader is gotten from the scanner; the repo is [here](https://github.com/WrungCodes/nft.nft-scanner) the data is gotten through a RabbitMQ connection

## Features

- **Multi-Blockchain Support:** Query NFTs from various blockchains.
- **Pagination:** Navigate through records with pagination support.
- **Filtering and Sorting:** Filter and sort results based on provider, token ID, owner address, and more.
- **Detailed NFT Information:** Access detailed information about each NFT, including metadata and asset links.

## Base URL

http://137.184.246.58:5500/api/nfts


## Endpoints

### Get NFTs

- **URL:** `/api/nfts`
- **Method:** `GET`
- **Query Parameters:**
  - `page`: Page number (default: 1)
  - `limit`: Number of items per page (default: 10)
  - `provider`: Filter by blockchain provider (e.g., `BSC`, `ETH`)
  - `address`: Filter by owner address
  - `symbol`: Filter by NFT symbol
  - `id`: Query by specific NFT id
  - `sort`: Sort results by any of the NFT attributes (e.g., `timestamp`, `name`)

### Example Request

To get the first page of NFTs from the BSC provider:

GET /api/nfts?provider=BSC&page=1


## Response Structure

Responses will include an array of NFT objects, pagination details, and total pages. Each NFT object contains the following fields:

- `provider`: The blockchain provider.
- `timestamp`: Timestamp of the NFT minting.
- `tokenId`: The token ID of the NFT.
- `contractAddress`: The smart contract address of the NFT.
- `ownerAddress`: The address of the NFT's current owner.
- `name`: The name of the NFT.
- `symbol`: The symbol of the NFT.
- `description`: A description of the NFT.
- `uri`: A URI to the NFT's metadata.
- `id`: A unique identifier for the NFT within the indexer.

### Sample Response

```json
{
  "nfts": [
    {
      "provider": "BSC",
      "timestamp": "1710054412",
      "tokenId": "10266611",
      "contractAddress": "0xADc466855ebe8d1402C5F7e6706Fccc3AEdB44a0",
      "ownerAddress": "0x643b73281994dba0cf9da03ad5f01fcb557c4050",
      "name": "Galaxy OAT",
      "symbol": "OAT",
      "description": "",
      "uri": "https://graphigo.prd.galaxy.eco/metadata/0xadc466855ebe8d1402c5f7e6706fccc3aedb44a0/10266611.json",
      "id": "65ee0e63e68d066b2c904029"
    }
    // Additional NFT objects...
  ],
  "page": 1,
  "totalPages": 219
}
```

Using the API
You can use this API to build applications that require information about NFTs across multiple blockchains. It's perfect for portfolio trackers, NFT marketplaces, and analytics tools.

Thank you for using the Multichain NFT Indexer API. If you have any questions or feedback, please reach out to me.
