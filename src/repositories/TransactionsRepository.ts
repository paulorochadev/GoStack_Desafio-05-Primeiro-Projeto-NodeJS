import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface RequestDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const incomeTotal = this.transactions
      .map((transaction: Transaction) =>
        transaction.type === 'income'
          ? transaction.value
          : 0,
      )
      .reduce((previousValue, currentValue) => previousValue + currentValue, 0);

    const outcomeTotal = this.transactions
      .map((transaction: Transaction) =>
        transaction.type === 'outcome'
          ? transaction.value
          : 0,
      )
      .reduce((previousValue, currentValue) => previousValue + currentValue, 0);

    const balance: Balance = {
      income: incomeTotal,
      outcome: outcomeTotal,
      total: incomeTotal - outcomeTotal,
    };

    return balance;
  }

  public create({ title, value, type, }: RequestDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
