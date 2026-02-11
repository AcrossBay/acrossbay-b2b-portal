export type CustomerConfig = {
  id: string;
  name: string;
  notes?: string;

  // Placeholder per futuro
  paymentMethod?: "stripe" | "invoice" | "bank_transfer";
  minOrderValue?: number;
  discountPolicy?: string;
};

export const CUSTOMERS: Record<string, CustomerConfig> = {
  ACROSS001: {
    id: "ACROSS001",
    name: "Cliente Demo 1",
    notes: "Placeholder: condizioni, sconti, documenti, pagamenti…",
    paymentMethod: "invoice",
    minOrderValue: 0,
    discountPolicy: "Da definire",
  },
};
