export type Subscription = {
  id: string
  merchant: string
  amount: number
  currency: string
  intervalDays: number
  nextChargeDate: string // ISO date
  priceChanged: boolean
  previousAmount?: number
  stillUsing: boolean | null
}

export const mockSubscriptions: Subscription[] = [
  { id: '1', merchant: 'Netflix', amount: 4500, currency: 'NGN', intervalDays: 30, nextChargeDate: '2026-07-17', priceChanged: false, stillUsing: true },
  { id: '2', merchant: 'Adobe Creative Cloud', amount: 32000, currency: 'NGN', intervalDays: 30, nextChargeDate: '2026-07-16', priceChanged: true, previousAmount: 27000, stillUsing: true },
  { id: '3', merchant: 'Spotify', amount: 1900, currency: 'NGN', intervalDays: 30, nextChargeDate: '2026-07-25', priceChanged: false, stillUsing: true },
  { id: '4', merchant: 'Duolingo Plus', amount: 45000, currency: 'NGN', intervalDays: 365, nextChargeDate: '2026-08-02', priceChanged: false, stillUsing: null },
  { id: '5', merchant: 'iCloud+', amount: 1500, currency: 'NGN', intervalDays: 30, nextChargeDate: '2026-07-19', priceChanged: false, stillUsing: true },
]