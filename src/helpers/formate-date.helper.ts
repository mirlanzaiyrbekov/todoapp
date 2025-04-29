export const formateDate = (createdAt: string) => {
	const date = new Date(createdAt)
	return date.toLocaleDateString('ru-RU')
}
