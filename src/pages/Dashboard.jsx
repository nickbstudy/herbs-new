import {useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import HerbItem from '../components/HerbItem'
import Spinner from '../components/Spinner'
import {getHerbs, reset, searchTerm} from '../features/herbs/herbSlice'

function Dashboard() {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  let herbsToShow = useSelector(searchTerm)

  const {user} = useSelector((state) => state.auth)
  const {herbs, isLoading, isError, message} = useSelector((state) => state.herbs)

  useEffect(() => {
    if(isError) {
      console.log(message)
    }
    if (!user) {
      navigate('/login')
    }
    if (user) {
      dispatch(getHerbs())
    }
    return () => {
      dispatch(reset())
    }
     
  }, [user, navigate, isError, message, dispatch])

  if(isLoading) {
    return <Spinner />
  }

  return ( 
  <>
    <section>
      {herbs.length > 0 && user ? (
        <div className="herbs" style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(175px, 1fr)', rowGap: "8px"}}>
          {herbs.map((herb) => {
            if(herb.name.includes(herbsToShow)) {
               return (<HerbItem key={herb._id} herbID={herb._id} herb={herb} />)
            }
            return;
          })}
        </div>
      ) : (<h3>You have not added any herbs yet</h3>)}
    </section>
  </>
  )
}

export default Dashboard