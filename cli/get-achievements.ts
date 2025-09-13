import * as admin from "firebase-admin";
import { prisma } from "../lib/prisma";
import fs from "fs/promises";
// Initialize Firebase Admin SDK
if (!admin.apps.length) {
	try {
		const serviceAccountString = process.env.FIREBASE_ADMIN_SDK_CONFIG;
		if (serviceAccountString) {
			const serviceAccount = JSON.parse(serviceAccountString);
			admin.initializeApp({
				credential: admin.credential.cert(serviceAccount),
			});
		} else {
			console.error("Firebase Admin SDK config not found.");
			process.exit(1);
		}
	} catch (e) {
		console.error("Failed to initialize Firebase Admin SDK:", e);
		process.exit(1);
	}
}

async function main() {
	await prisma.$connect();
	const achievements = await prisma.achievement.findMany();
	console.log(achievements);
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
