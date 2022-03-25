import { client } from '../../lib/sanity'

const getUserInfo = async (req, res) => {
  try {
    const query = `
      *[_type == "users" && _id != "${req.query.activeAccount}"]{
          name,
          walletAddress,
          "imageUrl": profileImage.asset->url
        }
    `

    const sanityResponse = await client.fetch(query)

    res.status(200).send({ message: 'success', data: sanityResponse })
  } catch (error) {
    res.status(500).send({ message: 'error', data: error.message })
  }
}

export default getUserInfo
