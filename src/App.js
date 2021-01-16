import {useState} from 'react'
import './App.css';

function App() {

  const [showSnippet,setShowSnippet] = useState(false)
  
  return (
    <>
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
      <div className="App">      
        <button type='btn' onClick={() => setShowSnippet(!showSnippet)}>
          {/* show to */}
          <i className="material-icons">account_circle</i>
          Create profile block
        </button>
        <br/>
        <hr/>
        {showSnippet && <Form />}

      </div>
    </>
  );
}

function Form() {
  const [profile, setProfile] = useState({ name: '', detail: '', photo: null });
  const [showProfile, setShowProfile] = useState(false);
  const [showWarning,setShowWarning] = useState({});

  const handleChange = (e) => {
    if (e.target.name === 'photo') {
      if (e.target.files && e.target.files[0]) {
        let img = e.target.files[0];
        setProfile({ ...profile, photo: URL.createObjectURL(img) });
      }
    } else {
      const name = e.target.name;
      const value = e.target.value;
      setProfile({ ...profile, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    if (profile.name && profile.detail && profile.photo) {
      setShowProfile(true)
      setShowWarning({})
    } else {
      setShowProfile(false)
      switch (true) {
        case !profile.name:
          setShowWarning({name:true})
          break
        case !profile.detail:
          setShowWarning({detail:true})
          break
        case !profile.photo:
          setShowWarning({photo:true})
          break
        default :
          break
      }
    }
  }

  return <>
    <form>
        <span><b><u>Please fill in all info</u></b></span>
        <div className='form-control'>
          <label htmlFor='name'>Name : </label>
          <input 
            type="text"
            id='name'
            name='name'
            placeholder="Insert person's name"
            value={profile.age}
            required={true}
            onChange={handleChange}  
          />
          { showWarning.name &&  <Warning message='Name cannot be empty'/>}

        </div>
        <div className='form-control'>
          <label htmlFor='name'>Detail : </label>
          <textarea 
            id='detail'
            name='detail'
            cols='50'
            placeholder="Insert person's detail"
            value={profile.detail}
            required={true}
            onChange={handleChange} 
          />
          { showWarning.detail &&  <Warning message='Detail cannot be empty'/>}
        </div>
        <div className='form-control'>
          <label htmlFor='photo'>Photo : </label>
          <input 
            type="file" 
            name="photo" 
            required={true} 
            onChange={handleChange} 
          />
          { showWarning.photo &&  <Warning message='Please upload a photo'/>}
        </div>
        <br/>
        <button type='submit' onClick={handleSubmit}>
        {/* show to */}
          Create Profile Block
        </button>
      </form>
      <hr />
      {showProfile && <ProfileBlock profile={profile} />}
  </>
}

function ProfileBlock(props) {
  const {name,detail,photo} = props.profile
  const [showDetail,setShowDetail] = useState(false)

  const toggleDetail = (e) => {
    setShowDetail(!showDetail)
  }

  return <>
    <span>Result Preview:</span>
    <div className={'profile_block_'+(showDetail? 'open' : 'close')} onClick={toggleDetail}>
      <div className='photo_block'>
        <img src={photo} alt="" className='profile_photo'></img>
      </div>
      
      <h4 
        id='profile_name' 
        name='profile_name' 
        className={'profile_name_'+(showDetail? 'open' : 'close')}
      >
        {name}
      </h4>
      {showDetail && 
        <p className='profile_detail'>
          {detail}
        </p>
      }
    </div>
  </>
}

function Warning(props) {
  const {message} = props
  return (
    <>
      <span className="warning"><i>{message}</i></span>
    </>
  )
}

export default App;
