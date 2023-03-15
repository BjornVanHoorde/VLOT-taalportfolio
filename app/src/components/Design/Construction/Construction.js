import constructionIcon from '../../../img/construction.svg';
import '../Construction/styles/construction.css';


const Construction = () => {
  return(
    <div className="construction">
      <div className='construction-container'>
        <div className='construction-icon'>
          <img src={constructionIcon} alt='onder constructie'></img>
        </div>
        <div className='construction-title'>
          <span>Dit onderdeel is momenteel onder constructie</span>
        </div>
      </div>
    </div>
  )
};

export default Construction;
