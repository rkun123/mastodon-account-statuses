import { AccountInfo } from "../pages/api/accounts";
import styles from '../styles/Statuses.module.css'

export default function Statuses({ accounts }: { accounts: AccountInfo[]}) {
	return (
		<div className={styles.container}>
			<div className={styles.row} >
				<span className={styles.accountsNum}>{ accounts.length }</span>&nbsp;accounts exist.
			</div>
		</div>
	)
}