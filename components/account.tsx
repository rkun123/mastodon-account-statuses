import { AccountInfo } from "../pages/api/accounts";
import styles from '../styles/Account.module.css';

export default function Account({ account }: { account: AccountInfo }) {
	return (
		<div className={styles.container}>
			<div className={styles.row}>
				<img
					className={styles.avatar}
					src={account.account.avatar}
				>

				</img>
				<div className={styles.nameContainer}>
					<div className={styles.title}>
						{
							account.account.bot
							? (
								<div className={styles.botBadge}>bot</div>
							)
							: null
						}
						{ account.account.display_name || account.account.username }
					</div>
					<div className={styles.username}>
						@{ account.account.username }
					</div>
				</div>
			</div>
		</div>
	)
}