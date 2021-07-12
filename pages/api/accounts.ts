// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import parseLinkHeader from 'parse-link-header'

export type Emoji = {
  shortcode: string
  static_url: string
  url: string
  visible_in_picker: boolean
}

export type Source = {
  privacy: string | null
  sensitive: boolean | null
  language: string | null
  note: string
  fields: object
}

export type Account = {
    id: string
    username: string
    acct: string
    display_name: string
    locked: boolean
    created_at: string
    followers_count: number
    following_count: number
    statuses_count: number
    note: string
    url: string
    avatar: string
    avatar_static: string
    header: string
    header_static: string
    emojis: Array<Emoji>
    moved: Account | null
    fields: object | null
    bot: boolean | null
    source?: Source
  }

export type AccountInfo = {
    id: string,
    username: string,
    domain: string | null,
    created_at: string,
    email: string,
    ip: string,
    role: string,
    confirmed: boolean,
    suspended: boolean,
    silenced: boolean,
    disabled: boolean,
    approved: boolean,
    locale: string,
    invite_request: object | null,
    account: Account
  }

export async function fetchAllAccounts() {

  let url = `${process.env.MASTODON_BASE_URL}/api/v1/admin/accounts?local=true`
  let accounts: AccountInfo[] = []

  for(;;) {
    const r = await axios.get<AccountInfo[]>(url, {
      headers: {
        authorization: `Bearer ${process.env.MASTODON_API_TOKEN}`
      }
    })

    if(r.status !== 200) {
      throw new Error('Something went wrong.')
    }

    accounts = accounts.concat(r.data)
    const links = parseLinkHeader(r.headers.link)
    if ( links !== null && links.next ) {
      url = links.next.url
    } else {
      break;
    }
  }

  return accounts
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // res.status(200).json({ name: 'John Doe' })
  const accounts = await fetchAllAccounts()
  if(accounts) {
    res.status(200).send(accounts)
  }
  res.status(500)
}
