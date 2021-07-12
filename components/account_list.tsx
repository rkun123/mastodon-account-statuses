import { AccountInfo } from "../pages/api/accounts";
import styles from '../styles/AccountList.module.css'
import Account from "./account";

export default function AccountList({ accounts }: { accounts: AccountInfo[]}) {
	return (
		<div className={styles.container}>
			{
				accounts.map(a => (
					<Account account={a} />
				))
			}
		</div>
	)
}