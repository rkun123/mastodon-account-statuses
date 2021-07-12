import { AccountInfo } from "../pages/api/accounts";
import styles from '../styles/Account.module.css';
import Image from 'next/image'

export default function Account({ account }: { account: AccountInfo }) {
	return (
		<div className={styles.container}>
			<div className={styles.row}>
				<Image
					className={styles.avatar}
					src={account.account.avatar}
					width={80}
					height={80}
				/>
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