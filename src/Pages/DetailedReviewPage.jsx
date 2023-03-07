import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

const DetailedReviewPage = () => {
  const { reviewId } = useParams()
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(true)
  const [review, setReview] = useState()

  const fetchReview = async () => {
    try {
      const response = await fetch(`http://localhost:5005/reviews/${reviewId}`)
      const parsed = await response.json()
      if (parsed === null) {
        navigate('/404')
      } else {
        console.log(parsed)
        setReview(parsed)
        setIsLoading(false)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchReview()
  }, [reviewId])

  const handleDelete = async () => {
    await fetch(`http://localhost:5005/reviews/delete/${reviewId}`, {
      method: 'DELETE',
    })
    navigate('/')
  }

  return isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <>
      <h1>{review.title}</h1>
      <p>Rating: {review.rating}</p>
      <Link to={`/reviews/update/${review._id}`}>
        <button type='button'>Update</button>
      </Link>
      <button type='button' onClick={handleDelete}>
        Delete
      </button>
    </>
  )
}

export default DetailedReviewPage;