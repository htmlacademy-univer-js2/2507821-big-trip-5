import { getRandomNumber, getRandomArrayElement } from '../utils/utils';

const POINT_TYPE = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

const mockOffer = [
  {
    type: 'taxi',
    offers: [
      {
        id: '8fa35f2b-9e35-4ef1-aaa2-4ad1197c2f03',
        title: 'Upgrade to a business class',
        price: 65
      },
      {
        id: '58293393-9ddb-4ef1-b404-0d96011e1283',
        title: 'Choose the radio station',
        price: 67
      },
      {
        id: '2e45f5f9-02dc-4777-a89b-8166dbcad643',
        title: 'Choose temperature',
        price: 104
      },
      {
        id: '85f99363-6a9b-4596-bebf-61784b7e4696',
        title: 'Drive quickly, I\'m in a hurry',
        price: 55
      },
      {
        id: '2115cf8b-b082-4ac1-9fdc-a8433f1a59d5',
        title: 'Drive slowly',
        price: 186
      }
    ]
  },
  {
    type: 'bus',
    offers: [
      {
        id: '2b7093a4-a080-44cb-a005-c086fbea7537',
        title: 'Infotainment system',
        price: 46
      },
      {
        id: '21432194-f8f5-4131-abb4-472eaa5db3d1',
        title: 'Order meal',
        price: 103
      },
      {
        id: 'd9d8f9dd-1699-481a-b9e4-1d1dddde6fd7',
        title: 'Choose seats',
        price: 141
      }
    ]
  },
  {
    type: 'train',
    offers: [
      {
        id: 'e315a33b-73da-4576-95f9-3713289b1730',
        title: 'Book a taxi at the arrival point',
        price: 66
      },
      {
        id: '28f4e3f1-25a1-474f-9ee2-a66a0555ef1e',
        title: 'Order a breakfast',
        price: 83
      },
      {
        id: '4418e4e7-e4ce-45e1-80c8-74acb1aee6ba',
        title: 'Wake up at a certain time',
        price: 79
      }
    ]
  },
  {
    type: 'flight',
    offers: [
      {
        id: '7de32439-2d60-4500-940d-7d6a9afeb484',
        title: 'Choose meal',
        price: 75
      },
      {
        id: '717700f3-f2cf-4e25-a570-2eb11bf59794',
        title: 'Choose seats',
        price: 160
      },
      {
        id: '06f89b77-d65e-4598-b652-fb1d880b8e03',
        title: 'Upgrade to comfort class',
        price: 143
      },
      {
        id: '7eb156f4-9e0a-4385-8a72-936026f2cde5',
        title: 'Upgrade to business class',
        price: 121
      },
      {
        id: '2cc790e7-556f-4adf-9bcd-770a1793c2c0',
        title: 'Add luggage',
        price: 200
      },
      {
        id: '7de59165-35f5-4452-a345-756e4423d18d',
        title: 'Business lounge',
        price: 32
      }
    ]
  },
  {
    type: 'check-in',
    offers: [
      {
        id: '0de0b698-ed14-4f9b-b40e-95bc8b1803e7',
        title: 'Choose the time of check-in',
        price: 146
      },
      {
        id: 'd5e4cce3-4db5-4044-965a-245aba9cd4ad',
        title: 'Choose the time of check-out',
        price: 64
      },
      {
        id: '252b5dea-80eb-4be1-a52a-3b2e4abb1598',
        title: 'Add breakfast',
        price: 158
      },
      {
        id: '9887344d-3da1-40cf-a155-0d6013c407c4',
        title: 'Laundry',
        price: 186
      },
      {
        id: '8ecdfed9-a233-48de-b011-38d95b0d09a2',
        title: 'Order a meal from the restaurant',
        price: 70
      }
    ]
  },
  {
    type: 'sightseeing',
    offers: []
  },
  {
    type: 'ship',
    offers: [
      {
        id: '92dc83f6-a763-4cee-af08-0cd989250a58',
        title: 'Choose meal',
        price: 53
      },
      {
        id: 'f639c780-f6c2-419d-addf-e230a9d5ebfa',
        title: 'Choose seats',
        price: 182
      },
      {
        id: '863df192-a58a-47b9-87ed-9e90aa3dacf6',
        title: 'Upgrade to comfort class',
        price: 89
      },
      {
        id: '5bc01488-1be5-417b-b169-7eda0b39a084',
        title: 'Upgrade to business class',
        price: 115
      },
      {
        id: '26ee0e55-2c66-439b-b291-9c78627cef34',
        title: 'Add luggage',
        price: 166
      },
      {
        id: '57c12d05-fd69-4d3e-9227-eaf96b1ec69f',
        title: 'Business lounge',
        price: 193
      }
    ]
  },
  {
    type: 'drive',
    offers: [
      {
        id: '6bff3f07-470c-444a-863a-e28973f3089f',
        title: 'With automatic transmission',
        price: 64
      },
      {
        id: 'f801d1f0-69c2-42a9-b48d-42375f83dd82',
        title: 'With air conditioning',
        price: 96
      }
    ]
  },
  {
    type: 'restaurant',
    offers: [
      {
        id: 'f5522e8f-77a5-4aa2-b49b-13d53fbbfd0f',
        title: 'Choose live music',
        price: 192
      },
      {
        id: '3ec7f435-fe54-4262-8ed7-447184927917',
        title: 'Choose VIP area',
        price: 182
      }
    ]
  }
];

const mockPoints = [
  {
    id: 'bad9e73b-d6d5-4506-b719-d4d18181230c',
    basePrice: Math.floor(getRandomNumber(10000)),
    dateFrom: '2025-04-30T08:45:15.510Z',
    dateTo: '2025-04-30T18:15:15.510Z',
    destination: 'cf9162f6-739b-4029-8f41-204ae002820f',
    isFavorite: false,
    offers: [],
    type: getRandomArrayElement(POINT_TYPE),
  },
  {
    id: '2ca26bde-39b3-492a-a4a2-134f1190c90d',
    basePrice: Math.floor(getRandomNumber(10000)),
    dateFrom: '2025-05-02T05:48:15.510Z',
    dateTo: '2025-05-03T00:42:15.510Z',
    destination: '64ba5ef4-708a-4787-b1f7-086a5759fee2',
    isFavorite: false,
    offers: [],
    type: getRandomArrayElement(POINT_TYPE),
  },
  {
    id: '1d5de439-e332-428e-83cf-00d7d6ff3a70',
    basePrice: Math.floor(getRandomNumber(10000)),
    dateFrom: '2025-05-04T17:59:15.510Z',
    dateTo: '2025-05-06T14:30:15.510Z',
    destination: '598bd2dd-f2fb-4208-bb59-59ec443c56bf',
    isFavorite: true,
    offers: [],
    type: getRandomArrayElement(POINT_TYPE),
  },
  {
    id: 'fbf8c305-5b08-421f-b4bd-c7091174a167',
    basePrice: Math.floor(getRandomNumber(10000)),
    dateFrom: '2025-05-07T21:14:15.510Z',
    dateTo: '2025-05-09T22:07:15.510Z',
    destination: '051784f6-84f5-4a5a-a9bc-24d71058e3f1',
    isFavorite: true,
    offers: [],
    type: getRandomArrayElement(POINT_TYPE),
  },
  {
    id: '659d0d33-9c61-457c-b416-d679ed1c4a20',
    basePrice: Math.floor(getRandomNumber(10000)),
    dateFrom: '2025-05-10T08:14:15.510Z',
    dateTo: '2025-05-11T10:54:15.510Z',
    destination: 'a79889bd-7230-439d-bf53-d87173817261',
    isFavorite: false,
    offers: [],
    type: getRandomArrayElement(POINT_TYPE),
  },
  {
    id: 'c1cfd132-f183-4845-becf-16f0a011225c',
    basePrice: Math.floor(getRandomNumber(10000)),
    dateFrom: '2025-05-12T11:56:15.510Z',
    dateTo: '2025-05-13T13:06:15.510Z',
    destination: '051784f6-84f5-4a5a-a9bc-24d71058e3f1',
    isFavorite: false,
    offers: [],
    type: getRandomArrayElement(POINT_TYPE),
  },
  {
    id: '57eac60a-d625-4638-9a51-bc298371e146',
    basePrice: Math.floor(getRandomNumber(10000)),
    dateFrom: '2025-05-15T02:24:15.510Z',
    dateTo: '2025-05-16T09:18:15.510Z',
    destination: 'a79889bd-7230-439d-bf53-d87173817261',
    isFavorite: true,
    offers: [],
    type: getRandomArrayElement(POINT_TYPE),
  },
  {
    id: '424769cc-26f6-43c4-8e41-59dc3f4926fe',
    basePrice: Math.floor(getRandomNumber(10000)),
    dateFrom: '2025-05-17T17:24:15.510Z',
    dateTo: '2025-05-19T03:26:15.510Z',
    destination: '7ab719cb-c384-4254-8374-d8aeb6dcfe45',
    isFavorite: true,
    offers: [],
    type: getRandomArrayElement(POINT_TYPE),
  },
  {
    id: '06950c4a-ff52-4631-b2ba-05f563012500',
    basePrice: Math.floor(getRandomNumber(10000)),
    dateFrom: '2025-05-20T11:55:15.510Z',
    dateTo: '2025-05-22T12:33:15.510Z',
    destination: '64ba5ef4-708a-4787-b1f7-086a5759fee2',
    isFavorite: true,
    offers: [],
    type: getRandomArrayElement(POINT_TYPE),
  },
  {
    id: '8baaad28-a1a6-4e88-995d-50c1d1e87762',
    basePrice: Math.floor(getRandomNumber(10000)),
    dateFrom: '2025-05-24T00:35:15.510Z',
    dateTo: '2025-05-25T13:47:15.510Z',
    destination: 'cf9162f6-739b-4029-8f41-204ae002820f',
    isFavorite: false,
    offers: [],
    type: getRandomArrayElement(POINT_TYPE),
  },
  {
    id: 'f1f008f4-8400-47bb-b2d4-7f69ca20bd19',
    basePrice: Math.floor(getRandomNumber(10000)),
    dateFrom: '2025-05-25T20:08:15.510Z',
    dateTo: '2025-05-26T03:04:15.510Z',
    destination: '64ba5ef4-708a-4787-b1f7-086a5759fee2',
    isFavorite: true,
    offers: [],
    type: getRandomArrayElement(POINT_TYPE),
  },
  {
    id: 'df7a3c70-f286-42db-9603-e60aeb5315d1',
    basePrice: Math.floor(getRandomNumber(10000)),
    dateFrom: '2025-05-27T01:52:15.510Z',
    dateTo: '2025-05-28T00:33:15.510Z',
    destination: 'cf9162f6-739b-4029-8f41-204ae002820f',
    isFavorite: false,
    offers: [],
    type: getRandomArrayElement(POINT_TYPE),
  },
  {
    id: '91360454-af76-46b0-8ab4-709623cd38d1',
    basePrice: Math.floor(getRandomNumber(10000)),
    dateFrom: '2025-05-28T12:22:15.510Z',
    dateTo: '2025-05-29T00:12:15.510Z',
    destination: '7ab719cb-c384-4254-8374-d8aeb6dcfe45',
    isFavorite: false,
    offers: [],
    type: getRandomArrayElement(POINT_TYPE),
  },
  {
    id: '1488fa13-1d53-4193-badb-b6b2c8793476',
    basePrice: Math.floor(getRandomNumber(10000)),
    dateFrom: '2025-05-30T08:27:15.510Z',
    dateTo: '2025-05-31T15:24:15.510Z',
    destination: '7bdb2851-ba05-4800-9a74-2e1048eae6e8',
    isFavorite: true,
    offers: [],
    type: getRandomArrayElement(POINT_TYPE),
  },
  {
    id: '321b4485-bdc2-48f9-b789-5cefc4a9cc90',
    basePrice: Math.floor(getRandomNumber(10000)),
    dateFrom: '2025-06-01T07:45:15.510Z',
    dateTo: '2025-06-02T09:16:15.510Z',
    destination: '7bdb2851-ba05-4800-9a74-2e1048eae6e8',
    isFavorite: false,
    offers: [],
    type: getRandomArrayElement(POINT_TYPE),
  },
  {
    id: 'd334b076-41e9-48e5-baa8-6623250ef42c',
    basePrice: Math.floor(getRandomNumber(10000)),
    dateFrom: '2025-06-03T09:48:15.510Z',
    dateTo: '2025-06-03T23:07:15.510Z',
    destination: 'cf9162f6-739b-4029-8f41-204ae002820f',
    isFavorite: true,
    offers: [],
    type: getRandomArrayElement(POINT_TYPE),
  },
  {
    id: '16dcdcd8-5e7c-46d0-94af-0d7663ae2f6a',
    basePrice: Math.floor(getRandomNumber(10000)),
    dateFrom: '2025-06-05T22:17:15.510Z',
    dateTo: '2025-06-07T22:42:15.510Z',
    destination: 'a6fdad58-b352-4f3b-9289-badf1f37dbc1',
    isFavorite: true,
    offers: [],
    type: getRandomArrayElement(POINT_TYPE),
  },
  {
    id: '0a21d764-1c2d-458f-85c5-e59047174b2a',
    basePrice: Math.floor(getRandomNumber(10000)),
    dateFrom: '2025-06-09T22:00:15.510Z',
    dateTo: '2025-06-11T22:39:15.510Z',
    destination: 'a79889bd-7230-439d-bf53-d87173817261',
    isFavorite: false,
    offers: [],
    type: getRandomArrayElement(POINT_TYPE),
  },
  {
    id: '7b16da7d-17ae-4d1c-a9bf-743fe5c91c58',
    basePrice: Math.floor(getRandomNumber(10000)),
    dateFrom: '2025-06-13T21:46:15.510Z',
    dateTo: '2025-06-15T06:56:15.510Z',
    destination: 'a79889bd-7230-439d-bf53-d87173817261',
    isFavorite: true,
    offers: [],
    type: getRandomArrayElement(POINT_TYPE),
  },
  {
    id: '0b25715b-a64e-4596-8d29-4137c39c55be',
    basePrice: Math.floor(getRandomNumber(10000)),
    dateFrom: '2025-06-16T10:01:15.510Z',
    dateTo: '2025-06-17T08:16:15.510Z',
    destination: '64ba5ef4-708a-4787-b1f7-086a5759fee2',
    isFavorite: true,
    offers: [],
    type: getRandomArrayElement(POINT_TYPE),
  },
  {
    id: 'bdaaa537-d183-49e3-b69d-c5500a8298b1',
    basePrice: Math.floor(getRandomNumber(10000)),
    dateFrom: '2025-06-18T20:03:15.510Z',
    dateTo: '2025-06-19T02:56:15.510Z',
    destination: '051784f6-84f5-4a5a-a9bc-24d71058e3f1',
    isFavorite: true,
    offers: [],
    type: getRandomArrayElement(POINT_TYPE),
  },
  {
    id: '397466d4-e091-4f3a-8ff9-eb5d5d468d2c',
    basePrice: Math.floor(getRandomNumber(10000)),
    dateFrom: '2025-06-20T22:27:15.510Z',
    dateTo: '2025-06-21T17:55:15.510Z',
    destination: '598bd2dd-f2fb-4208-bb59-59ec443c56bf',
    isFavorite: true,
    offers: [],
    type: getRandomArrayElement(POINT_TYPE),
  },
  {
    id: 'd1f5496f-c2d5-4370-b66b-7ee613c2fccf',
    basePrice: Math.floor(getRandomNumber(10000)),
    dateFrom: '2025-06-22T20:27:15.510Z',
    dateTo: '2025-06-23T13:34:15.510Z',
    destination: 'a6fdad58-b352-4f3b-9289-badf1f37dbc1',
    isFavorite: true,
    offers: [],
    type: getRandomArrayElement(POINT_TYPE),
  },
  {
    id: '72d3bb63-6fa4-465c-9b79-d994547ec522',
    basePrice: Math.floor(getRandomNumber(10000)),
    dateFrom: '2025-06-24T03:06:15.510Z',
    dateTo: '2025-06-25T03:37:15.510Z',
    destination: '051784f6-84f5-4a5a-a9bc-24d71058e3f1',
    isFavorite: true,
    offers: [],
    type: getRandomArrayElement(POINT_TYPE),
  },
  {
    id: 'c6f698d5-d138-465b-b9ca-aa7254f22589',
    basePrice: Math.floor(getRandomNumber(10000)),
    dateFrom: '2025-06-26T17:17:15.510Z',
    dateTo: '2025-06-27T23:30:15.510Z',
    destination: '19702d07-9e4c-4a92-9efd-9ac111d2ea71',
    isFavorite: false,
    offers: [],
    type: getRandomArrayElement(POINT_TYPE),
  }
];

const getPointOffers = (type) => mockOffer.filter((typeObj) => (typeObj.type === type.toLowerCase()))[0].offers;

const getRandomPoint = () => {
  const point = getRandomArrayElement(mockPoints);
  const offers = getPointOffers(point.type);
  return {
    id: 0,
    ...point,
    offers,
  };
};

export {getRandomPoint, getPointOffers};
