#!/usr/bin/env zx

$.verbose = true

async function main() {
  await $`docker compose down`
  await $`npm install`
  await $`docker compose up -d --force-recreate`
  await $`sleep 3`

  await $`npx prisma db push`
}
main().catch((e) => {
  console.error(e)
})
