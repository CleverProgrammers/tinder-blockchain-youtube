import { client } from '../../lib/sanity'

const saveLike = async (req, res) => {
  try {
    await client
      .patch(req.body.currentUser)
      .setIfMissing({ likes: [] })
      .insert('after', 'likes[-1]', [
        {
          _key: `${req.body.likedUser} - ${req.body.currentUser}`,
          _ref: req.body.likedUser,
          _type: 'reference',
        },
      ])
      .commit()

    res.status(200).send({ message: 'success' })
  } catch (error) {
    res.status(500).send({ message: 'error', data: error.message })
  }
}

export default saveLike
