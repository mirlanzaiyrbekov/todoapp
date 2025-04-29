export const getRemainingTime = (
	currentTime: number,
	createdAt: number,
	expiresIn: number
) => {
	const remaining = Math.ceil(
		(createdAt + expiresIn * 1000 - currentTime) / 1000
	)
	return remaining > 0 ? remaining : 0
}
