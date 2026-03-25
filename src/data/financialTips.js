const financialTips = [
  {
    title: "The 50/30/20 Rule",
    tip: "Allocate 50% of your income to needs (rent, groceries, utilities), 30% to wants (dining out, entertainment), and 20% to savings and debt repayment. This simple framework makes budgeting manageable.",
    category: "Budgeting"
  },
  {
    title: "Pay Yourself First",
    tip: "Before paying bills or spending on wants, automatically transfer a set amount to savings. Treat savings like a non-negotiable expense. Even $50/month adds up to $600/year plus interest.",
    category: "Savings"
  },
  {
    title: "The Power of Compound Interest",
    tip: "Compound interest means you earn interest on your interest. Starting to invest $200/month at age 25 vs. 35 could mean a difference of over $200,000 by retirement, thanks to compounding.",
    category: "Investing"
  },
  {
    title: "Build an Emergency Fund",
    tip: "Aim for 3-6 months of living expenses in a high-yield savings account. This protects you from unexpected job loss, medical bills, or car repairs without going into debt.",
    category: "Savings"
  },
  {
    title: "Understand Your Credit Score",
    tip: "Your credit score (300-850) affects loan rates, rental applications, and even job prospects. The key factors: payment history (35%), credit utilization (30%), length of history (15%), new credit (10%), and credit mix (10%).",
    category: "Credit"
  },
  {
    title: "The Debt Avalanche Method",
    tip: "List all debts by interest rate. Pay minimums on everything, then throw extra money at the highest-rate debt first. This saves the most money in interest over time.",
    category: "Debt"
  },
  {
    title: "The Debt Snowball Method",
    tip: "Pay off your smallest debt first while making minimum payments on others. The psychological wins from eliminating debts quickly can keep you motivated on your debt-free journey.",
    category: "Debt"
  },
  {
    title: "Automate Your Finances",
    tip: "Set up automatic payments for bills and automatic transfers to savings/investment accounts. Automation removes the temptation to spend and ensures you never miss a payment.",
    category: "Budgeting"
  },
  {
    title: "The Latte Factor",
    tip: "Small daily expenses add up. A $5 coffee every workday costs $1,300/year. You don't have to cut everything — just be intentional. Track small expenses to find hidden savings.",
    category: "Spending"
  },
  {
    title: "Employer 401(k) Match is Free Money",
    tip: "If your employer matches 401(k) contributions, always contribute at least enough to get the full match. A 100% match means an immediate 100% return on your money — you won't find that anywhere else.",
    category: "Investing"
  },
  {
    title: "High-Yield Savings Accounts",
    tip: "Traditional banks offer ~0.01% interest. Online high-yield savings accounts offer 4-5%. On a $10,000 emergency fund, that's the difference between $1 and $500 per year in interest.",
    category: "Savings"
  },
  {
    title: "The 24-Hour Rule for Big Purchases",
    tip: "Before making any non-essential purchase over $50, wait 24 hours. This cooling-off period helps you distinguish between wants and impulse buys. You'll be surprised how often you decide not to buy.",
    category: "Spending"
  },
  {
    title: "Diversify Your Investments",
    tip: "Don't put all your eggs in one basket. Spread investments across stocks, bonds, real estate, and other assets. Index funds are an easy way to achieve instant diversification at low cost.",
    category: "Investing"
  },
  {
    title: "Understand Needs vs. Wants",
    tip: "Needs are essentials for survival and basic functioning (food, shelter, healthcare). Wants are everything else. Before any purchase, ask: 'Do I need this, or do I want this?' Being honest saves money.",
    category: "Spending"
  },
  {
    title: "Review Subscriptions Regularly",
    tip: "The average person spends $219/month on subscriptions. Review yours quarterly — cancel unused streaming services, gym memberships, and apps. Even cutting 2-3 services saves $50+/month.",
    category: "Spending"
  },
  {
    title: "Tax-Advantaged Accounts",
    tip: "Maximize tax-advantaged accounts: 401(k), IRA, HSA, and 529 plans. These accounts either reduce your taxable income now (traditional) or let your money grow tax-free (Roth). The tax savings compound over decades.",
    category: "Taxes"
  },
  {
    title: "The Rule of 72",
    tip: "Divide 72 by your annual return rate to estimate how many years it takes to double your money. At 8% returns, your money doubles every 9 years. At 3% savings rate, it takes 24 years.",
    category: "Investing"
  },
  {
    title: "Keep Credit Utilization Below 30%",
    tip: "Using more than 30% of your available credit hurts your credit score. If you have a $10,000 limit, try to keep your balance below $3,000. Paying off your balance in full each month is even better.",
    category: "Credit"
  },
  {
    title: "Negotiate Your Bills",
    tip: "Call your internet, phone, and insurance providers annually to negotiate lower rates. Mention competitor pricing. Companies often have retention discounts they don't advertise — you could save $500+/year.",
    category: "Spending"
  },
  {
    title: "Start Investing Early, Even Small Amounts",
    tip: "Time in the market beats timing the market. Starting with $25/week in an index fund at age 22 could grow to over $250,000 by age 55, assuming average market returns. The key is consistency.",
    category: "Investing"
  },
  {
    title: "Understand APR vs. APY",
    tip: "APR (Annual Percentage Rate) is the yearly interest rate on debt. APY (Annual Percentage Yield) includes compounding on savings. For loans, look for low APR. For savings, look for high APY.",
    category: "Literacy"
  },
  {
    title: "Create Multiple Income Streams",
    tip: "Don't rely on a single paycheck. Consider side hustles, freelancing, dividend stocks, rental properties, or selling digital products. Multiple income streams provide security and accelerate wealth building.",
    category: "Income"
  },
  {
    title: "The Importance of Net Worth Tracking",
    tip: "Net worth = Assets minus Liabilities. Track it monthly. Income doesn't define wealth — net worth does. A person earning $60K with $200K saved is wealthier than someone earning $150K with $100K in debt.",
    category: "Literacy"
  },
  {
    title: "Avoid Lifestyle Inflation",
    tip: "When your income rises, resist the urge to upgrade everything. If you get a $500/month raise, save at least half of it. People who maintain their lifestyle while earning more build wealth fastest.",
    category: "Spending"
  },
  {
    title: "Understand Good Debt vs. Bad Debt",
    tip: "Good debt finances appreciating assets or increases earning potential (mortgage, student loans for in-demand fields). Bad debt finances depreciating assets or consumption (credit card debt, car loans for luxury vehicles).",
    category: "Debt"
  },
  {
    title: "Build Your Financial Safety Net in Stages",
    tip: "Stage 1: $1,000 starter emergency fund. Stage 2: Pay off high-interest debt. Stage 3: Build 3-6 months expenses. Stage 4: Invest 15% of income. Stage 5: Pay off mortgage. Stage 6: Build wealth and give.",
    category: "Planning"
  },
  {
    title: "Use the Envelope System",
    tip: "Allocate cash into envelopes for different spending categories (groceries, entertainment, dining). When an envelope is empty, you stop spending in that category. It's a tangible way to enforce budget limits.",
    category: "Budgeting"
  },
  {
    title: "Check Your Free Credit Report Annually",
    tip: "You're entitled to free credit reports from Equifax, Experian, and TransUnion at AnnualCreditReport.com. Review them for errors — studies show 1 in 5 reports contain mistakes that could be lowering your score.",
    category: "Credit"
  },
  {
    title: "Dollar-Cost Averaging",
    tip: "Invest a fixed amount at regular intervals regardless of market conditions. This strategy reduces the impact of volatility — you buy more shares when prices are low and fewer when prices are high.",
    category: "Investing"
  },
  {
    title: "The True Cost of Minimum Payments",
    tip: "Paying only the minimum on a $5,000 credit card balance at 20% APR would take 25+ years and cost over $8,000 in interest. Always pay more than the minimum — even an extra $50/month makes a huge difference.",
    category: "Debt"
  },
  {
    title: "Insurance is a Financial Safety Net",
    tip: "Adequate health, auto, renters/homeowners, and life insurance protects you from catastrophic financial loss. A single uninsured medical emergency or car accident can wipe out years of savings.",
    category: "Planning"
  },
  {
    title: "Meal Planning Saves Money",
    tip: "The average American spends $3,000+/year on dining out. Meal planning and cooking at home can cut food costs by 50%. Prep meals on Sunday, make a grocery list, and stick to it.",
    category: "Spending"
  },
  {
    title: "Understand Inflation's Impact",
    tip: "At 3% annual inflation, $100 today is worth only $74 in 10 years. Cash sitting in a checking account loses purchasing power. This is why investing is essential — your money needs to grow faster than inflation.",
    category: "Literacy"
  },
  {
    title: "Set SMART Financial Goals",
    tip: "Make goals Specific, Measurable, Achievable, Relevant, and Time-bound. Instead of 'save more money,' try 'save $5,000 for an emergency fund by December by setting aside $420/month.'",
    category: "Planning"
  },
  {
    title: "The Power of Saying No",
    tip: "Peer pressure drives spending — dinners out, trips, gifts. It's okay to say 'that's not in my budget right now.' Real friends understand. Protecting your financial health is worth more than keeping up appearances.",
    category: "Spending"
  },
  {
    title: "Roth IRA: Tax-Free Growth",
    tip: "A Roth IRA is funded with after-tax dollars, but all growth and withdrawals in retirement are tax-free. If you're young and in a lower tax bracket now, a Roth IRA is often the best retirement vehicle to start with.",
    category: "Investing"
  },
  {
    title: "Track Every Dollar",
    tip: "You can't improve what you don't measure. Track every expense for at least one month — you'll likely find 10-20% of spending goes to things you don't value. Awareness is the first step to better habits.",
    category: "Budgeting"
  },
  {
    title: "Beware of Hidden Fees",
    tip: "Bank fees, ATM charges, fund expense ratios, and overdraft fees silently drain your money. Read the fine print. Choose no-fee bank accounts and low-cost index funds. Even 1% in fees can cost $100K+ over a lifetime.",
    category: "Literacy"
  },
  {
    title: "Your Biggest Investment is Yourself",
    tip: "Investing in skills, education, and certifications can have the highest ROI of any investment. A new skill that increases your salary by $10K/year is worth $300K+ over a 30-year career.",
    category: "Income"
  },
  {
    title: "Use Sinking Funds",
    tip: "Sinking funds are savings for planned future expenses — car maintenance, holidays, annual insurance premiums. Save small amounts monthly so large irregular expenses don't blow up your budget.",
    category: "Budgeting"
  },
  {
    title: "The 3-Fund Portfolio",
    tip: "A simple, diversified investment strategy: a U.S. stock index fund, an international stock index fund, and a bond index fund. This gives broad diversification at minimal cost. Adjust the ratio based on your age and risk tolerance.",
    category: "Investing"
  },
  {
    title: "Avoid Car Payment Traps",
    tip: "The average car payment is $700+/month. Consider buying reliable used cars with cash or a small loan. Follow the 20/4/10 rule: 20% down, 4-year max loan, and total car costs under 10% of gross income.",
    category: "Spending"
  },
  {
    title: "Health Savings Accounts (HSAs) are Triple Tax-Advantaged",
    tip: "HSAs offer tax-deductible contributions, tax-free growth, and tax-free withdrawals for medical expenses. After age 65, you can withdraw for any purpose (just pay income tax). It's like a super IRA for healthcare.",
    category: "Taxes"
  },
  {
    title: "Net Income is What Matters",
    tip: "Focus on take-home pay, not gross salary. A $75K salary might be ~$55K after taxes. Budget based on what actually hits your bank account, not the number on your offer letter.",
    category: "Budgeting"
  },
  {
    title: "Have Regular Money Dates",
    tip: "Schedule a weekly 15-minute review of your finances — check account balances, review spending, and track progress toward goals. Consistent small check-ins prevent money problems from snowballing.",
    category: "Planning"
  },
  {
    title: "Understand Opportunity Cost",
    tip: "Every dollar spent is a dollar that can't be invested. That $200 jacket, invested instead at 8% for 30 years, would grow to $2,000. Think of purchases in terms of what the money could become, not just what it buys today.",
    category: "Literacy"
  },
  {
    title: "Protect Against Identity Theft",
    tip: "Freeze your credit at all three bureaus (it's free). Use unique passwords for financial accounts. Enable two-factor authentication. Monitor your accounts weekly. The average identity theft victim loses $1,000+ and countless hours.",
    category: "Credit"
  },
  {
    title: "Don't Try to Time the Market",
    tip: "Missing the 10 best market days over 20 years can cut your returns in half. Stay invested through ups and downs. Historically, the S&P 500 has returned ~10% annually over the long term despite short-term volatility.",
    category: "Investing"
  },
  {
    title: "The Importance of an Estate Plan",
    tip: "Regardless of age or wealth, have a will, power of attorney, and healthcare directive. Without a will, the state decides who gets your assets. Many online services make basic estate planning affordable and simple.",
    category: "Planning"
  },
  {
    title: "Use Cash Back and Rewards Wisely",
    tip: "Credit card rewards are only valuable if you pay your balance in full monthly. A 2% cash back card earning $500/year is meaningless if you're paying $1,000+ in interest. Never spend extra just to earn rewards.",
    category: "Credit"
  },
  {
    title: "Social Security Isn't Enough",
    tip: "The average Social Security benefit is ~$1,800/month. That's likely not enough to maintain your lifestyle in retirement. Supplement with personal savings — aim to replace 70-80% of pre-retirement income from all sources combined.",
    category: "Planning"
  },
  {
    title: "Teach Kids About Money Early",
    tip: "Financial habits form young. Give children an allowance tied to chores, teach them to split money into save/spend/give jars, and involve them in age-appropriate money decisions. Financial literacy is a life skill rarely taught in schools.",
    category: "Literacy"
  },
  {
    title: "The Wealth Gap Between Savers and Investors",
    tip: "Over 30 years, $500/month in a savings account at 2% grows to ~$245K. The same amount invested at 8% average returns grows to ~$680K. Long-term, investing in diversified index funds significantly outpaces saving alone.",
    category: "Investing"
  },
  {
    title: "Know Your Tax Bracket",
    tip: "The U.S. uses progressive tax brackets — only the income within each bracket is taxed at that rate. Earning more never results in less take-home pay. Understanding this prevents fear of raises and helps with tax planning.",
    category: "Taxes"
  },
  {
    title: "Comparison is the Thief of Financial Joy",
    tip: "Social media shows highlight reels, not bank statements. Many 'wealthy-looking' people are actually deep in debt. Focus on your own financial journey, goals, and progress. True wealth is quiet and rarely flaunted.",
    category: "Mindset"
  },
];

export default financialTips;
