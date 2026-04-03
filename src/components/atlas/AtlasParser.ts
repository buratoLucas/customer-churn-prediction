export type ParsedAtlasInput = {
  type?: 'expense' | 'income' | 'transfer' | 'card_payment' | 'investment';
  amount?: number;
  currency?: string;
  merchant?: string;
  date?: number;
};

export function parseAtlasInput(input: string): ParsedAtlasInput {
  const amount = input.match(/(\d+[\.,]?\d*)/);
  return {
    amount: amount ? Number(amount[1].replace(',', '.')) : undefined
  };
}
