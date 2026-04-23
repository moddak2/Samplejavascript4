const people = [
  {
    id: 'person_0001',
    name: 'Kim Hana',
    phone: '010-0000-0001',
    email: 'hana.kim@example.com',
    customerRef: 'CUST-FICT-000001',
    address: 'Seoul (Fictional), Republic of Korea'
  },
  {
    id: 'person_0002',
    name: 'Park Jisoo',
    phone: '010-0000-0002',
    email: 'jisoo.park@example.com',
    customerRef: 'CUST-FICT-000002',
    address: 'Busan (Fictional), Republic of Korea'
  },
  {
    id: 'person_0003',
    name: 'Lee Minjun',
    phone: '010-0000-0003',
    email: 'minjun.lee@example.com',
    customerRef: 'CUST-FICT-000003',
    address: 'Incheon (Fictional), Republic of Korea'
  }
];

const bankAccounts = [
  {
    id: 'acct_0001',
    ownerId: 'person_0001',
    bankName: 'Fictional Bank',
    accountAlias: 'Salary Account',
    accountNumberMasked: 'FB-0000-****-0001',
    currency: 'KRW',
    balance: 1250000
  },
  {
    id: 'acct_0002',
    ownerId: 'person_0002',
    bankName: 'Fictional Bank',
    accountAlias: 'Savings Account',
    accountNumberMasked: 'FB-0000-****-0002',
    currency: 'KRW',
    balance: 9900000
  }
];

const eMoneyWallets = [
  {
    id: 'wallet_0001',
    ownerId: 'person_0001',
    provider: 'FictPay',
    walletIdMasked: 'FP-WALLET-****-0001',
    currency: 'KRW',
    balance: 42000
  },
  {
    id: 'wallet_0002',
    ownerId: 'person_0001',
    provider: 'CoinDemo',
    walletIdMasked: 'CD-ADDR-****-A1B2',
    currency: 'USDT',
    balance: 150.25
  },
  {
    id: 'wallet_0003',
    ownerId: 'person_0003',
    provider: 'GiftCard+',
    walletIdMasked: 'GC-****-MINJUN-0003',
    currency: 'KRW',
    balance: 30000
  }
];

module.exports = {
  people,
  bankAccounts,
  eMoneyWallets
};
