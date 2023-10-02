# `Bank Account API`

A REST API in Express with Prisma and an sqlite db. 

## How To Run

```
pnpm i
// Create prisma/dev.db
prisma generate
prisma migrate dev
pnpm run db:seed

pnpm run dev
```

## Run Tests

```
pnpm run test
```

## Valid and Invalid request

```
// Valid request
{
  cashAmount: 100,
  destinationAccount: 1,
  sourceAccount: 2,
};

// Invalid request (based on amount)
{
  cashAmount: -100,
  destinationAccount: 1,
  sourceAccount: 2,
};

// Invalid request (based on similar account numbers)
{
  cashAmount: 100,
  destinationAccount: 1,
  sourceAccount: 1,
};
}
```
