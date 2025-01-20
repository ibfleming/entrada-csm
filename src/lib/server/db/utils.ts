import { db as Database } from '$lib/index';

export function checkDatabaseConnection(db: Database): Promise<boolean> {
	return db
		.execute('SELECT 1')
		.then(() => true)
		.catch(() => false);
}
