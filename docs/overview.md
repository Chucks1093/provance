# Provance — Full Project Description

A personal savings app on Stellar, built for Nigerians who want to save small money regularly and protect it from the naira losing value.

---

## The problem

Naira loses value while it sits in your hand. A person who saves ₦3,000 a month is watching that money quietly shrink, even as the number stays the same.

And saving alone is hard. That is why the Ajo woman exists. She knocks on your door, collects your small money, holds it so you cannot spend it, and gives it back to you months later as a lump sum. Nigerians already trust this system and have used it for generations.

But she has three weaknesses. She keeps naira, so the money still loses value. She takes a cut, so you get back less than you saved. And she can disappear with the money, because there is nothing holding her to it but trust.

---

## What we built

The same habit, rebuilt so the money is safe and it grows.

- Instead of a knock on the door, a **bot messages you** on Telegram or WhatsApp.
- Instead of naira in her pocket, your money becomes **dollars (USDC) on Stellar**.
- Instead of her holding it, a **smart contract locks it**, and nobody holds a key that can move it. Not us. Not anyone.
- Instead of her taking a cut while it sits, the money **earns yield** while it waits.

She takes from your savings. We add to it.

---

## How it works

**1. You save small, regularly.**
The bot reminds you. You send your ₦100, or whatever amount you chose, from your bank app or mobile money. No app to open, no wallet to manage.

**2. Your naira collects, then converts in one batch.**
Small daily amounts sit in a local currency wallet. Once they reach a threshold, they convert to USDC in a single transaction. This keeps fees small, because converting ₦100 thirty times costs far more than converting ₦3,000 once.

**3. Your dollars go into a locked contract on Stellar.**
The contract tracks exactly what is yours. It enforces the lock period. You choose to save, the contract makes sure you cannot break your own promise on a weak day.

**4. Your money earns while it waits.**
The savings sit in a yield source, so they earn interest rather than sitting idle. Not because a token price went up, because the money is being put to work and paid interest for it.

**5. You withdraw when the lock ends.**
The contract releases the funds. Your USDC converts back to naira and lands in your bank account. We take a small cut at this point, and only at this point. You pay nothing to save. You only pay when you have something to collect.

---

## What makes it different

**We never hold your money.**
This is the core promise. There is no admin key. We cannot move your funds, we cannot freeze them, we cannot run away with them. The contract holds them, and only your key releases them. Not a policy. A fact written into the code.

**We save in dollars, not naira.**
Every other savings app in Nigeria saves your naira. Naira keeps losing value. We convert to a dollar stablecoin, so what you save holds its worth.

**We add instead of subtract.**
The Ajo collector takes a cut of your savings for the service of holding them. Your bank pays you almost nothing. We put your savings somewhere that pays interest, and that interest goes to you.

**The habit is the product.**
Saving is not hard because people do not know how. It is hard because nobody reminds them and nothing stops them spending it. The reminder and the lock are the whole point. The technology is just what makes them possible.

---

## Built on Stellar

Stellar is built for moving real money cheaply and quickly, which is exactly what a savings app for small amounts needs. A chain with high fees would make ₦100 savings impossible.

The pieces:

| Piece | What it does |
|---|---|
| **Soroban smart contract** | Holds the savings, tracks ownership, enforces the lock. No admin key. |
| **Privy** | Creates a wallet from an email or phone number. The user never sees a seed phrase. The keys are theirs, not ours. |
| **DeFindex** | The yield source. Puts the saved dollars to work. |
| **Yellow Card** | The naira on and off ramp. Licensed across Africa, handles compliance and the local banking rails. |
| **Telegram / WhatsApp bot** | The front door. Reminds, confirms, and shows the balance. |
| **USDC on Stellar** | The dollar the savings are held in. |

---

## Honest about the risks

We would rather tell you than have you find out.

- **The lock is real.** If you commit to six months, you cannot withdraw before six months. Not by begging us, because we have no power to release it. Think carefully before you commit money you may need.
- **Yield is not guaranteed.** Interest rates move. We will never promise you a fixed return, because nobody honestly can.
- **Dollars can move too.** If the naira strengthens, savings held in dollars are worth less in naira. We believe the long term direction favours the saver, but we will not pretend the risk does not exist.
- **Money in transit is still naira.** Between your deposit and the batch conversion, your money is still naira and is not yet protected or earning. We show you this split honestly in your balance rather than hiding it behind one number.

---

## Where the money goes, plainly

You pay nothing to deposit.
You pay a small cut when you withdraw.

That is it. We only earn when you successfully finish what you started.

---

## Status

Early. In build.

Nothing here is a promise of returns, and none of it is financial advice.
