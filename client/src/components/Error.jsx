import image from '../assets/error.jpg'

export default function Error({msg}) {
  return (
    <div>
      <h1>{msg}</h1>
      <img src={image} alt="error"/>
    </div>
  )
}