import connection from "../models/connection";
import packs from "./packs";
import products from "./products";

async function main() {
  await connection.products.createMany({
    data: products,
  });

  await connection.packs.createMany({
    data: packs,
  });
}

main()
  .catch(async (e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await connection.$disconnect();
  });
