export type Product = {
  id: string;        // interno, stabile
  sku: string;       // "scientifico", mostrato al cliente
  name: string;
  unit: string;      // es: "60 caps"
  priceGbp: number;  // prezzo unitario GBP
  active: boolean;
};

export const PRODUCTS: Product[] = [
  {
    id: "p_0001",
    sku: "NP-VITD3-4000IU-60C-V1",
    name: "Vitamin D3 4000 IU",
    unit: "60 caps",
    priceGbp: 9.99,
    active: true,
  },
  {
    id: "p_0002",
    sku: "NP-MAG-375MG-60T-V1",
    name: "Magnesium 375 mg",
    unit: "60 tabs",
    priceGbp: 8.5,
    active: true,
  },
];
