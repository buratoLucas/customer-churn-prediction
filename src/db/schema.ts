import { integer, real, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const accountGroups = sqliteTable('account_groups', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  baseCurrency: text('base_currency').notNull()
});

export const accounts = sqliteTable('accounts', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  type: text('type', { enum: ['current', 'travel_card', 'credit_card', 'cash', 'broker', 'savings'] }).notNull(),
  groupId: text('group_id').references(() => accountGroups.id),
  baseCurrency: text('base_currency').notNull(),
  openingBalance: real('opening_balance').notNull(),
  isActive: integer('is_active', { mode: 'boolean' }).notNull(),
  notes: text('notes'),
  createdAt: integer('created_at').notNull()
});

export const accountSubbalances = sqliteTable('account_subbalances', {
  id: text('id').primaryKey(),
  accountId: text('account_id').notNull().references(() => accounts.id),
  currency: text('currency').notNull(),
  balance: real('balance').notNull(),
  updatedAt: integer('updated_at').notNull()
});

export const categories = sqliteTable('categories', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  parentId: text('parent_id'),
  icon: text('icon'),
  color: text('color'),
  isSystem: integer('is_system', { mode: 'boolean' }).notNull()
});

export const travelSessions = sqliteTable('travel_sessions', {
  id: text('id').primaryKey(),
  country: text('country').notNull(),
  localCurrency: text('local_currency').notNull(),
  startDate: integer('start_date').notNull(),
  endDate: integer('end_date'),
  note: text('note'),
  isActive: integer('is_active', { mode: 'boolean' }).notNull()
});

export const importJobs = sqliteTable('import_jobs', {
  id: text('id').primaryKey(),
  filename: text('filename').notNull(),
  source: text('source').notNull(),
  status: text('status', { enum: ['processing', 'review_pending', 'complete', 'error'] }).notNull(),
  totalRows: integer('total_rows').notNull(),
  importedRows: integer('imported_rows').notNull(),
  skippedDuplicates: integer('skipped_duplicates').notNull(),
  createdAt: integer('created_at').notNull()
});

export const transactions = sqliteTable('transactions', {
  id: text('id').primaryKey(),
  type: text('type', { enum: ['expense', 'income', 'transfer', 'card_payment', 'investment'] }).notNull(),
  amount: real('amount').notNull(),
  currency: text('currency').notNull(),
  accountId: text('account_id').notNull().references(() => accounts.id),
  categoryId: text('category_id').references(() => categories.id),
  description: text('description').notNull(),
  merchant: text('merchant'),
  date: integer('date').notNull(),
  tags: text('tags').notNull(),
  note: text('note'),
  travelSessionId: text('travel_session_id').references(() => travelSessions.id),
  importJobId: text('import_job_id').references(() => importJobs.id),
  duplicateOf: text('duplicate_of'),
  status: text('status', { enum: ['confirmed', 'pending_review', 'ai_pending'] }).notNull().default('confirmed'),
  createdAt: integer('created_at').notNull(),
  updatedAt: integer('updated_at').notNull()
});

export const debts = sqliteTable('debts', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  accountId: text('account_id').notNull().references(() => accounts.id),
  balance: real('balance').notNull(),
  creditLimit: real('credit_limit'),
  utilisationPct: real('utilisation_pct').notNull(),
  closingDate: integer('closing_date').notNull(),
  dueDate: integer('due_date').notNull(),
  minimumPayment: real('minimum_payment').notNull(),
  isActive: integer('is_active', { mode: 'boolean' }).notNull()
});

export const debtPayments = sqliteTable('debt_payments', {
  id: text('id').primaryKey(),
  debtId: text('debt_id').notNull().references(() => debts.id),
  transactionId: text('transaction_id').notNull().references(() => transactions.id),
  amount: real('amount').notNull(),
  date: integer('date').notNull()
});

export const transfers = sqliteTable('transfers', {
  id: text('id').primaryKey(),
  fromAccountId: text('from_account_id').notNull().references(() => accounts.id),
  toAccountId: text('to_account_id').notNull().references(() => accounts.id),
  fromAmount: real('from_amount').notNull(),
  toAmount: real('to_amount').notNull(),
  fromCurrency: text('from_currency').notNull(),
  toCurrency: text('to_currency').notNull(),
  marketRate: real('market_rate'),
  paidRate: real('paid_rate'),
  spreadPct: real('spread_pct').notNull(),
  date: integer('date').notNull(),
  note: text('note'),
  transactionId: text('transaction_id').notNull().references(() => transactions.id)
});

export const fxQuotes = sqliteTable('fx_quotes', {
  id: text('id').primaryKey(),
  base: text('base').notNull(),
  target: text('target').notNull(),
  rate: real('rate').notNull(),
  fetchedAt: integer('fetched_at').notNull()
});

export const travelExpenses = sqliteTable('travel_expenses', {
  id: text('id').primaryKey(),
  sessionId: text('session_id').notNull().references(() => travelSessions.id),
  transactionId: text('transaction_id').notNull().references(() => transactions.id),
  localAmount: real('local_amount').notNull(),
  localCurrency: text('local_currency').notNull(),
  homeAmount: real('home_amount').notNull(),
  homeCurrency: text('home_currency').notNull(),
  paidRate: real('paid_rate')
});

export const holdings = sqliteTable('holdings', {
  id: text('id').primaryKey(),
  broker: text('broker').notNull(),
  assetName: text('asset_name').notNull(),
  assetType: text('asset_type', { enum: ['etf', 'stock', 'crypto', 'bond', 'pie', 'other'] }).notNull(),
  ticker: text('ticker'),
  currency: text('currency').notNull(),
  status: text('status', { enum: ['planned', 'tracking', 'bought', 'review', 'sold'] }).notNull(),
  thesis: text('thesis'),
  referenceUrl: text('reference_url'),
  currentValue: real('current_value'),
  notes: text('notes')
});

export const investmentTransactions = sqliteTable('investment_transactions', {
  id: text('id').primaryKey(),
  holdingId: text('holding_id').notNull().references(() => holdings.id),
  type: text('type', { enum: ['buy', 'sell', 'dividend', 'fee', 'contribution'] }).notNull(),
  amount: real('amount').notNull(),
  quantity: real('quantity'),
  pricePerUnit: real('price_per_unit'),
  fees: real('fees').notNull(),
  date: integer('date').notNull(),
  note: text('note'),
  transactionId: text('transaction_id').references(() => transactions.id)
});

export const watchlistItems = sqliteTable('watchlist_items', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  ticker: text('ticker'),
  assetType: text('asset_type').notNull(),
  status: text('status', { enum: ['watching', 'researching', 'decided'] }).notNull(),
  thesis: text('thesis'),
  referenceUrl: text('reference_url'),
  createdAt: integer('created_at').notNull()
});

export const calendarEvents = sqliteTable('calendar_events', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  type: text('type', { enum: ['bill', 'income', 'investment_review', 'transfer_checkpoint', 'travel', 'custom'] }).notNull(),
  date: integer('date').notNull(),
  recurring: integer('recurring', { mode: 'boolean' }).notNull(),
  recurrenceRule: text('recurrence_rule'),
  accountId: text('account_id'),
  amount: real('amount'),
  note: text('note'),
  linkedTransactionId: text('linked_transaction_id')
});

export const duplicateChecks = sqliteTable('duplicate_checks', {
  id: text('id').primaryKey(),
  transactionId: text('transaction_id').references(() => transactions.id),
  importJobId: text('import_job_id').notNull().references(() => importJobs.id),
  duplicateOfId: text('duplicate_of_id').references(() => transactions.id),
  status: text('status', { enum: ['pending', 'confirmed_duplicate', 'confirmed_unique'] }).notNull(),
  matchFields: text('match_fields').notNull()
});

export const aiPendingActions = sqliteTable('ai_pending_actions', {
  id: text('id').primaryKey(),
  sessionId: text('session_id').notNull(),
  actionType: text('action_type', { enum: ['create_transaction', 'create_transfer', 'create_investment', 'update', 'delete'] }).notNull(),
  parsedData: text('parsed_data').notNull(),
  missingFields: text('missing_fields').notNull(),
  status: text('status', { enum: ['collecting', 'preview_shown', 'confirmed', 'cancelled'] }).notNull(),
  createdAt: integer('created_at').notNull()
});

export const assistantConversations = sqliteTable('assistant_conversations', {
  id: text('id').primaryKey(),
  sessionId: text('session_id').notNull(),
  role: text('role', { enum: ['user', 'assistant'] }).notNull(),
  content: text('content').notNull(),
  timestamp: integer('timestamp').notNull(),
  pendingActionId: text('pending_action_id').references(() => aiPendingActions.id)
});

export const settings = sqliteTable('settings', {
  key: text('key').primaryKey(),
  value: text('value').notNull()
});
