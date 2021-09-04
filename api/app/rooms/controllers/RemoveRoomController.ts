import Container from '../../../shared/Container'

export default async (data: { id: string }) => {
  const removeRoom = Container.getRemoveRoom()

  await removeRoom.dispatch({
    id: data.id
  })
}
